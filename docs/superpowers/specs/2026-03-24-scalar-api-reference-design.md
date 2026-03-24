# Scalar API Reference Integration Design

**Date**: 2026-03-24
**Status**: Approved

## Overview

Add a new `/docs/api` section to the VitePress documentation site that renders an interactive OpenAPI reference using [Scalar](https://scalar.com). The existing hand-written `.md` API documentation is left untouched.

## Goals

- Mintlify-style API reference layout (two-column: description left, cURL + response right)
- OAuth 2.0 Authorization Code + PKCE Try It functionality (no API key)
- Driven by `openapi.yaml` at the project root
- No disruption to existing `.md` docs or `build:llms` pipeline
- Available at `/docs/api`, `/zh-CN/docs/api`, `/zh-HK/docs/api`

## Architecture

### New files

| File | Purpose |
|------|---------|
| `docs/.vitepress/theme/components/ScalarApiReference.vue` | Scalar component with OAuth config |
| `docs/en/docs/api.md` | English entry page (`layout: api-reference`) |
| `docs/zh-CN/docs/api.md` | Simplified Chinese entry page |
| `docs/zh-HK/docs/api.md` | Traditional Chinese entry page |

### Modified files

| File | Change |
|------|--------|
| `docs/.vitepress/theme/layouts/LayoutInner.vue` | Add `v-if/else` branch for `layout === 'api-reference'` |
| `docs/.vitepress/locales/en/nav.ts` | Add API nav entry with `activeMatch` |
| `docs/.vitepress/locales/zh-CN/nav.ts` | Add API nav entry with `activeMatch` |
| `docs/.vitepress/locales/zh-HK/nav.ts` | Add API nav entry with `activeMatch` |
| `openapi.yaml` | Add `securitySchemes` and global `security` |
| `docs/.vitepress/config.mts` | No change needed |
| `package.json` | Add `@scalar/api-reference` dependency |

### Not changed

- All existing `.md` API documentation files
- `build:llms` / `generate-llms.ts` script
- Existing `<TryIt>` component and `httpInfo` frontmatter convention
- `docs/.vitepress/theme/index.ts`

## Layout Registration

The project uses a single `Layout.vue` (not VitePress's `layouts` map). `Layout.vue` is a thin slot wrapper — the actual template logic lives in `LayoutInner.vue`. Custom layout is handled by checking `frontmatter.layout` inside `LayoutInner.vue`:

```vue
<template>
  <ScalarApiReference v-if="frontmatter.layout === 'api-reference'" />
  <DefaultLayout v-else />
</template>
```

`ScalarApiReference` must be wrapped in `<ClientOnly>` because Scalar uses browser APIs (`window`, DOM) that break SSG. This mirrors the existing pattern in the codebase.

## Page Layout

```
┌─────────────────────────────────────────────┐
│  VitePress top nav (Logo + links + theme)    │
├──────────┬──────────────────────────────────┤
│  Scalar  │  Endpoint title + description     │
│  sidebar │  Parameters / Request body        │
│ (by tag) │                    ┌─────────────┤
│          │                    │ cURL example │
│          │                    │ Response     │
│          │                    │ (sticky)     │
└──────────┴────────────────────┴─────────────┘
```

- VitePress top nav is preserved; Scalar's own sidebar handles left navigation
- Scalar region height: `calc(100vh - <nav-height>)`, internal scroll only
- VitePress sidebar, aside, and footer are hidden on this layout

## openapi.yaml Changes

Add to `components` section:

```yaml
components:
  securitySchemes:
    oauth2:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: https://openapi.longbridge.com/oauth2/authorize
          tokenUrl: https://openapi.longbridge.com/oauth2/token
          scopes:
            openapi: Full OpenAPI access
```

Add global security at top level:

```yaml
security:
  - oauth2:
      - openapi
```

## ScalarApiReference.vue Implementation Notes

### Import

```ts
import { ApiReferenceVue as ApiReference } from '@scalar/api-reference'
import '@scalar/api-reference/style.css'
import spec from '../../../../openapi.yaml?raw'
// Path: components(1) → theme(2) → .vitepress(3) → docs(4) → project root
```

### Dark mode sync

Use `isDark` from `useData()` reactively — `darkMode: true` is a static value and does not sync with VitePress theme automatically:

```ts
const { isDark, frontmatter } = useData()
const config = computed(() => ({
  content: spec,
  darkMode: isDark.value,
  // ...
}))
```

### OAuth redirect URI

Must be set at runtime (not as a static string) inside `onMounted`, because it requires `window.location`:

```ts
const redirectUri = ref('')
onMounted(() => {
  redirectUri.value = window.location.origin + window.location.pathname
})
```

Pass as `x-scalar-redirect-uri: redirectUri.value` inside the computed config.

### Full authentication config

```ts
authentication: {
  securitySchemes: {
    oauth2: {
      flows: {
        authorizationCode: {
          'x-usePkce': 'SHA-256',
          'x-scalar-redirect-uri': redirectUri.value,
        }
      }
    }
  }
}
```

## Vite Config Change

No change needed. Vite's `?raw` suffix works natively for any file type including `.yaml` — it is handled by Vite's built-in raw transform without any additional config.

## Nav Entries

Include `activeMatch` consistent with existing nav entries:

```ts
{ text: 'API', link: '/docs/api', activeMatch: '^(/(?:zh-CN|zh-HK)/)?docs/api' }
```

## Routing

| URL | File |
|-----|------|
| `/docs/api` | `docs/en/docs/api.md` |
| `/zh-CN/docs/api` | `docs/zh-CN/docs/api.md` |
| `/zh-HK/docs/api` | `docs/zh-HK/docs/api.md` |

Each `.md` file contains only frontmatter:

```md
---
layout: api-reference
title: API Reference
---
```

## llms.txt Impact

The `generate-llms.ts` script scans `.md` files. The three `api.md` files contain only frontmatter with no body text. Verify that `generate-llms.ts` skips files with empty body content; if not, a simple guard (`if (!content.trim()) continue`) should be added.

## Dependency

```
@scalar/api-reference  (latest)
```
