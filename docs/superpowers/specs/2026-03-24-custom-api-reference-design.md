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
- Sidebar width persisted to `localStorage`
- Right area split top/bottom with a horizontal divider
- Top half: scrollable, contains endpoint header + description + parameters
- Bottom half: scrollable, contains cURL shell block + JSON response block

## Sidebar Navigation

- Endpoints grouped by `tags` from `openapi.yaml`
- Each item shows HTTP method badge + endpoint summary
- Active item: rounded corners + teal brand-color background (`color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent)`), no left border
- Inactive item: plain text, hover state with subtle background

HTTP method badge colors:
- GET: green (`#dcfce7` bg / `#16a34a` text)
- POST: blue (`#dbeafe` bg / `#2563eb` text)
- PUT: amber (`#fef3c7` bg / `#d97706` text)
- DELETE: red (`#fee2e2` bg / `#dc2626` text)
- PATCH: purple

## Right Panel — Top Half

Per endpoint:
1. Method badge + path in monospace
2. `summary` as heading
3. `description` rendered via `markdown-it` — **code blocks are stripped out** (moved to bottom half), only prose text is shown here
4. Parameters section:
   - Has parameters: table with columns — Name / Type / Location / Required / Description
   - No parameters: single line `No parameters.` in muted color
5. Request body (POST/PUT/PATCH): fields extracted from `requestBody.content['application/json'].schema.properties`, rendered same as parameters table

## Right Panel — Bottom Half

Code blocks are extracted from the endpoint's `description` Markdown using regex ` ```lang\n...\n``` `.

Rendering:
- Each extracted code block is rendered via `markdown-it` to produce standard VitePress `.vp-doc` styled output
- This gives consistent syntax highlighting, language label bar, and Copy button — identical to regular docs pages
- **No `box-shadow`** on code blocks (override `.vp-doc div[class*=language-] { box-shadow: none }` scoped to this component)
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
            code[]  → markdown-it.render() → v-html in bottom half
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
- `js-yaml` — YAML parsing at runtime
- `@types/js-yaml` — TypeScript types (dev dep)

Remove:
- `@scalar/api-reference`

`markdown-it` is already a project dependency — no change needed.

## Not In Scope

- Try It / live API execution (future milestone, needs OAuth client_id integration)
- i18n of endpoint descriptions (spec is English only)
- Search within the API reference
- Deep-link to specific endpoint via URL hash (nice-to-have, out of scope)
