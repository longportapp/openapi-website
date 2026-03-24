# Design: API Reference Integration & API 附录 Removal

Date: 2026-03-24
Status: Approved

## Problem

The sidebar currently has an "API 附录" section (`docs/*/docs/api-reference/`) containing:

1. **HTTP API docs** (error-codes, how-to-access-api, refresh-token-api) — these duplicate information already present or implied in the new `/docs/api/` page that renders `openapi.yaml`.
2. **Socket/push protocol docs** (socket/) — these do NOT duplicate the new API Reference; they cover the TCP/WebSocket push feed which is a separate system.

Goal: remove the "API 附录" section, preserve all content by integrating appropriately.

## Solution: x-pages Extension + File Reorganization

### 1. openapi.yaml — Add `x-pages` top-level field

Add a custom `x-pages` extension to `openapi.yaml` with two info pages:

```yaml
x-pages:
  - id: authentication
    title: Authentication
    x-title-zh: 认证
    content: |
      <merged content from how-to-access-api.md + refresh-token-api.md (English)>
    x-content-zh: |
      <merged content from zh-CN versions>

  - id: error-codes
    title: Error Codes
    x-title-zh: 错误码
    content: |
      <content from error-codes.md (English)>
    x-content-zh: |
      <content from zh-CN version>
```

Content is 1:1 from existing markdown files — no information is lost.

### 2. ApiReference.vue — Sidebar info pages section

Changes to `ApiReference.vue`:

- Parse `x-pages` in `parseSpec()`, return as `pages: PageItem[]`
- New `PageItem` interface: `{ id, title, titleZh?, content, contentZh? }`
- Add `selectedPage` ref (mutually exclusive with `selectedEndpoint`)
- Sidebar: add pages section above the API tag groups (below search box)
  - Render `title` (or `titleZh` when `isZh`) for each page
  - Active state styling consistent with endpoint items
- URL state: `?page=authentication` — handle in `onMounted` and `onPopState`
- Main panel: when `selectedPage` is set, render its markdown (using existing `md.render()`)
- Existing intro panel shown only when neither page nor endpoint is selected

### 3. File movements — Socket docs to new category

Move the entire `socket/` subdirectory from `api-reference/` to a new standalone `socket/` category under `docs/*/docs/`:

```
docs/en/docs/api-reference/socket/   →  docs/en/docs/socket/
docs/zh-CN/docs/api-reference/socket/ →  docs/zh-CN/docs/socket/
docs/zh-HK/docs/api-reference/socket/ →  docs/zh-HK/docs/socket/
```

Update `_category_.json` in each new socket/ directory:
- `label`: "Socket Feed" (en) / "Socket 实时推送" (zh-CN) / "Socket 即時推送" (zh-HK)
- Keep `position`, `collapsible`, `collapsed` from original

All slugs in socket files use absolute paths (e.g., `slug: /socket/hosts`) so URLs are preserved.

### 4. Files to delete (after content merged into openapi.yaml)

For all three locales (en / zh-CN / zh-HK):
- `docs/*/docs/api-reference/error-codes.md`
- `docs/*/docs/api-reference/how-to-access-api.md`
- `docs/*/docs/api-reference/refresh-token-api.md`
- `docs/*/docs/api-reference/_category_.json`

Total: 12 files deleted.

## Implementation Sequence

1. Add `x-pages` content to `openapi.yaml`
2. Update `ApiReference.vue` to parse and render x-pages
3. Move socket/ directories (3 locales)
4. Delete old api-reference HTTP docs (3 locales × 4 files = 12 files)

## Constraints

- Socket file slugs are absolute — URLs won't break after moving
- Relative links within socket/ (e.g., `../hosts`, `./protocol/...`) still work since the whole directory moves together
- zh-HK content closely mirrors zh-CN (check and adapt)
- Do not add socket-otp-api to openapi.yaml (keep as markdown per user decision)
