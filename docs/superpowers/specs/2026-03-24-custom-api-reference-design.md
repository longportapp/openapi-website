# Custom API Reference Design

**Date**: 2026-03-24
**Status**: Approved

## Overview

Replace the Scalar third-party component with a custom Vue component that renders the OpenAPI reference page at `/docs/api`. The custom component reads `openapi.yaml` directly, follows VitePress theme conventions, and avoids CSS conflicts.

## Goals

- Two-column layout (left: endpoint nav, right: description + code)
- Follows VitePress light/dark theme exactly — no custom CSS overrides needed
- Code blocks use the same style as the rest of the docs (no shadow, VitePress vp-doc style)
- Sidebar is resizable and collapsible
- OAuth 2.0 Authorization Code + PKCE with a fixed client_id (no Try It for now — display only)
- Available at `/docs/api`, `/zh-CN/docs/api`, `/zh-HK/docs/api`

## Layout

```
┌─────────────────────────────────────────────────┐
│  VitePress top nav (Logo + links + theme toggle) │
├────────────────┬────────────────────────────────┤
│  Sidebar       ║  TOP: method + path + title     │
│  (resizable,   ║       description text          │
│   collapsible) ║       parameters table          │
│                ╠────────────────────────────────┤
│  tags          ║  BOTTOM: shell code block       │
│    endpoint    ║          json code block        │
│    endpoint    ║                                 │
└────────────────┴────────────────────────────────┘
```

- Left sidebar: fixed background, resizable via drag handle (min 160px / max 400px), collapsible via toggle button `‹ ›`
- Sidebar width persisted to `localStorage` under key `api-reference-sidebar-width`
- Right area split top/bottom with a fixed horizontal divider (not resizable) at 50/50 proportion
- Top half: scrollable, contains endpoint header + description + parameters
- Bottom half: scrollable, contains cURL shell block + JSON response block

## Sidebar Navigation

- Endpoints grouped by `tags` from `openapi.yaml`
- Each item shows HTTP method badge + endpoint summary
- Active item: rounded corners + teal brand-color background (`color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent)`), no left border
- Inactive item: plain text, hover state with subtle background

HTTP method badge colors — use VitePress semantic CSS variables so dark mode is handled automatically:

| Method | Color variable (text) | Color variable (bg) |
|--------|----------------------|---------------------|
| GET    | `var(--vp-c-success-1)` | `var(--vp-c-success-soft)` |
| POST   | `var(--vp-c-brand-1)`   | `var(--vp-c-brand-soft)`   |
| PUT    | `var(--vp-c-warning-1)` | `var(--vp-c-warning-soft)` |
| DELETE | `var(--vp-c-danger-1)`  | `var(--vp-c-danger-soft)`  |
| PATCH  | `var(--vp-c-important-1)` | `var(--vp-c-important-soft)` |

This mirrors the existing pattern in `TryIt/Content.vue` and automatically adapts to light/dark mode.

## Right Panel — Top Half

Per endpoint:
1. Method badge + path in monospace
2. `summary` as heading
3. `description` rendered via `markdown-it` — **code blocks are stripped out** (moved to bottom half), only prose text is shown here
4. Parameters section:
   - Has parameters: table with columns — Name / Type / Location / Required / Description
   - No parameters: single line `No parameters.` in muted color
5. Request body (POST/PUT/PATCH): fields extracted from `requestBody.content['application/json'].schema.properties`, rendered same as parameters table. If `schema` has no `properties` key (e.g. `$ref`, `allOf`, array body), show a single row: "Request body — see code example below."

## Right Panel — Bottom Half

Code blocks are extracted from the endpoint's `description` Markdown using `splitDescriptionAndCode()`:

```ts
function splitDescriptionAndCode(md: string): { prose: string; codeBlocks: string[] } {
  const codeBlockRegex = /^```[\w-]*\n[\s\S]*?^```/gm
  const codeBlocks = [...md.matchAll(codeBlockRegex)].map(m => m[0])
  const prose = md.replace(codeBlockRegex, '').trim()
  return { prose, codeBlocks }
}
```

Rendering — two different renderers for prose vs code blocks:

**Prose (top half):** `md.render(prose)` → `v-html`. Plain `markdown-it` with no special highlight option. Prose in endpoint descriptions contains no fenced code blocks (those are stripped out), so highlighting is irrelevant here.

**Code blocks (bottom half):** Do NOT re-render through `markdown-it`. Instead render each extracted block as a plain styled `<pre><code>` element manually:

```ts
// Extract lang and content from the fenced block string
function parseCodeBlock(raw: string): { lang: string; code: string } {
  const match = raw.match(/^```([\w-]*)\n([\s\S]*?)^```/m)
  return { lang: match?.[1] ?? '', code: match?.[2] ?? '' }
}
```

Then render in template:
```html
<div class="code-block-wrapper">
  <div class="code-block-header">
    <span class="lang-label">{{ block.lang }}</span>
    <button @click="copy(block.code)">Copy</button>
  </div>
  <pre><code>{{ block.code }}</code></pre>
</div>
```

Style `.code-block-wrapper` using VitePress CSS variables to match the docs code block appearance:
- Background: `var(--vp-code-block-bg)`
- Text: `var(--vp-code-block-color)`
- Font: `var(--vp-font-family-mono)`
- Border-radius: `8px`, border: `1px solid var(--vp-c-divider)`
- No `box-shadow` (intentional — no global override needed)

**No Shiki syntax highlighting** for the bottom panel code blocks. The content (cURL commands and JSON responses) is fully readable without token coloring. This avoids a Shiki dependency and is implementable with zero additional packages.

- `markdown-it` is instantiated once at module level: `const md = new MarkdownIt({ html: false, linkify: false })`
- Code blocks appear in order: `shell` (cURL) first, then `json` (response example)

## Data Flow

```
openapi.yaml (imported as ?raw string)
  → js-yaml.load()                    # runtime parse, ~5ms for 22 endpoints
  → group endpoints by tags[]         # builds sidebar nav structure
  → user selects endpoint
      operation.description           # markdown string
        → splitDescriptionAndCode()   # regex splits prose vs code blocks
            prose   → markdown-it.render() → v-html in top half
            code[]  → parseCodeBlock() → <pre><code> in bottom half
      operation.parameters[]          # array → parameters table
      operation.requestBody           # optional → request body table
```

## Component Structure

Single file: `docs/.vitepress/theme/components/ApiReference.vue`

Internal structure (all within one SFC):
- `parseSpec()` — called once on mount, returns `{ tags, endpoints }`
- `splitDescriptionAndCode(md)` — regex splits prose from fenced code blocks
- `selectedEndpoint` ref — drives both panels
- Sidebar resize logic — `mousedown` on divider → `mousemove` on document → update `sidebarWidth` ref
- Sidebar collapse — `isCollapsed` ref, toggle button

No sub-components needed at this scale (22 endpoints).

## OAuth Configuration

The component passes OAuth config to the VitePress page metadata for future Try It integration. For now, the client_id is documented here for reference:

- **client_id**: `fd52fbc5-02a9-47f5-ad30-0842c841aae9`
- **authorization_url**: `https://openapi.longbridge.com/oauth2/authorize`
- **token_url**: `https://openapi.longbridge.com/oauth2/token`
- **scope**: `openapi`
- **PKCE**: SHA-256
- **redirect_uris**: `https://open.longbridge.com/docs/api`, `/zh-CN/docs/api`, `/zh-HK/docs/api`

## openapi.yaml Changes

1. Update servers — replace `https://openapi.longbridgeapp.com` with `https://openapi.longbridge.cn`:

```yaml
servers:
  - url: https://openapi.longbridge.com
    description: Global
  - url: https://openapi.longbridge.cn
    description: China mainland
```

2. `securitySchemes` and global `security` field are already present from the Scalar integration — no further changes needed.

## Files Changed

| Action | File |
|--------|------|
| Create | `docs/.vitepress/theme/components/ApiReference.vue` |
| Delete | `docs/.vitepress/theme/components/ScalarApiReference.vue` |
| Modify | `docs/.vitepress/theme/layouts/LayoutInner.vue` (update import) |
| Modify | `openapi.yaml` (servers field) |
| Modify | `package.json` (add `js-yaml`, `@types/js-yaml`; remove `@scalar/api-reference`) |

`docs/en/docs/api.md`, `docs/zh-CN/docs/api.md`, `docs/zh-HK/docs/api.md` — unchanged (still use `layout: api-reference`).

Nav files — unchanged.

## Dependencies

Add:
- `js-yaml` — YAML parsing at runtime (move to `dependencies`)
- `@types/js-yaml` — TypeScript types (devDependencies)

Remove:
- `@scalar/api-reference`

Move:
- `markdown-it` — currently in `devDependencies`, must be moved to `dependencies` so it is available in the client bundle at runtime. Run `bun remove markdown-it && bun add markdown-it` to move it.

## Not In Scope

- Try It / live API execution (future milestone, needs OAuth client_id integration)
- i18n of endpoint descriptions (spec is English only)
- Search within the API reference
- Deep-link to specific endpoint via URL hash (nice-to-have, out of scope)
