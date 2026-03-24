# Scalar API Reference Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an interactive OpenAPI reference page at `/docs/api` using Scalar, with OAuth 2.0 + PKCE Try It support.

**Architecture:** A new `ScalarApiReference.vue` component wraps `@scalar/api-reference`. `LayoutInner.vue` gains a third layout branch (`frontmatter.layout === 'api-reference'`) alongside the existing `showTryIt` branch. Three minimal `api.md` entry files (one per locale) trigger this layout.

**Tech Stack:** `@scalar/api-reference` (Vue 3 component), VitePress 2.0 alpha, Vite `?raw` import, OAuth 2.0 Authorization Code + PKCE.

**Note:** This project has no test suite. Verification is done with `bun run dev` and browser inspection.

---

## File Map

| Action | File |
|--------|------|
| Modify | `openapi.yaml` |
| Create | `docs/.vitepress/theme/components/ScalarApiReference.vue` |
| Modify | `docs/.vitepress/theme/layouts/LayoutInner.vue` |
| Create | `docs/en/docs/api.md` |
| Create | `docs/zh-CN/docs/api.md` |
| Create | `docs/zh-HK/docs/api.md` |
| Modify | `docs/.vitepress/locales/en/nav.ts` |
| Modify | `docs/.vitepress/locales/zh-CN/nav.ts` |
| Modify | `docs/.vitepress/locales/zh-HK/nav.ts` |
| Modify | `package.json` (via bun add) |

---

## Task 1: Install dependency

**Files:** `package.json`, `bun.lock`

- [ ] **Step 1: Install `@scalar/api-reference`**

```bash
bun add @scalar/api-reference
```

Expected: package added to `dependencies` in `package.json`.

- [ ] **Step 2: Commit**

```bash
git add package.json bun.lock
git commit -m "chore: add @scalar/api-reference"
```

---

## Task 2: Add `securitySchemes` to `openapi.yaml`

**Files:** `openapi.yaml`

`openapi.yaml` already has a `components:` section at line 2784 with `schemas:` (including `Error` and `Order`). We need to:
1. Add `security:` at the top level (before `paths:` at line 24)
2. Add `securitySchemes:` as a sibling of `schemas:` inside the existing `components:` block

Do NOT create a new `components:` block — that would duplicate the key and produce invalid YAML.

- [ ] **Step 1: Add `security` field before `paths:` (line 24)**

Insert these two lines immediately before the `paths:` line:

```yaml
security:
  - oauth2:
      - openapi
```

- [ ] **Step 2: Add `securitySchemes` inside the existing `components:` block**

The existing `components:` block starts at line 2784:
```yaml
components:
  schemas:
    Error:
    ...
```

Insert `securitySchemes:` as a new sibling of `schemas:`, so the block becomes:

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
  schemas:
    Error:
      ...  (existing content unchanged)
```

Use the Edit tool to insert just the `securitySchemes:` block between `components:` and `  schemas:`.

- [ ] **Step 3: Verify YAML is parseable**

```bash
npx --yes js-yaml openapi.yaml > /dev/null && echo "YAML OK"
```

Expected: prints `YAML OK` with no errors.

- [ ] **Step 4: Commit**

```bash
git add openapi.yaml
git commit -m "feat: add OAuth2 securitySchemes to openapi.yaml"
```

---

## Task 3: Create `ScalarApiReference.vue`

**Files:** `docs/.vitepress/theme/components/ScalarApiReference.vue`

- [ ] **Step 1: Create the component**

```vue
<script setup lang="ts">
import { ApiReferenceVue as ApiReference } from '@scalar/api-reference'
import '@scalar/api-reference/style.css'
import { useData } from 'vitepress'
import { computed, onMounted, ref } from 'vue'
import spec from '../../../../openapi.yaml?raw'

const { isDark } = useData()

const redirectUri = ref('')
onMounted(() => {
  redirectUri.value = window.location.origin + window.location.pathname
})

const configuration = computed(() => ({
  content: spec,
  darkMode: isDark.value,
  authentication: {
    securitySchemes: {
      oauth2: {
        flows: {
          authorizationCode: {
            'x-usePkce': 'SHA-256',
            'x-scalar-redirect-uri': redirectUri.value,
          },
        },
      },
    },
  },
}))
</script>

<template>
  <div class="scalar-wrapper">
    <ApiReference :configuration="configuration" />
  </div>
</template>

<style>
.scalar-wrapper {
  height: calc(100vh - var(--vp-nav-height));
  overflow: hidden;
}

/* Ensure Scalar fills the wrapper */
.scalar-wrapper .scalar-app,
.scalar-wrapper > div {
  height: 100%;
}
</style>
```

- [ ] **Step 2: Verify the import path resolves**

From `docs/.vitepress/theme/components/`, four `../` hops reach the project root:
- `../` → `docs/.vitepress/theme/`
- `../../` → `docs/.vitepress/`
- `../../../` → `docs/`
- `../../../../` → project root (where `openapi.yaml` lives)

This is correct. No changes needed.

- [ ] **Step 3: Commit**

```bash
git add docs/.vitepress/theme/components/ScalarApiReference.vue
git commit -m "feat: add ScalarApiReference Vue component"
```

---

## Task 4: Add `api-reference` layout branch to `LayoutInner.vue`

**Files:** `docs/.vitepress/theme/layouts/LayoutInner.vue`

The existing layout already has a `v-if="!showTryIt"` / `v-else` pattern for the main content area. The sidebar and local nav need to be hidden for the API reference layout, and Scalar rendered instead.

- [ ] **Step 1: Add import for `ScalarApiReference` at the top of the `<script setup>` block**

After the existing imports, add:

```ts
import ScalarApiReference from '../components/ScalarApiReference.vue'
```

- [ ] **Step 2: Add computed for `isApiReference`**

After `const { showTryIt } = useTryItMode()`, add:

```ts
const isApiReference = computed(() => frontmatter.value.layout === 'api-reference')
```

- [ ] **Step 3: Conditionally hide sidebar and local nav**

Change:
```vue
<VPLocalNav :open="isSidebarOpen" @open-menu="openSidebar" />

<VPSidebar :open="isSidebarOpen">
```

To:
```vue
<VPLocalNav v-if="!isApiReference" :open="isSidebarOpen" @open-menu="openSidebar" />

<VPSidebar v-if="!isApiReference" :open="isSidebarOpen">
```

- [ ] **Step 4: Add the Scalar branch to the content area**

Change:
```vue
<VPContent v-if="!showTryIt">
  ...
</VPContent>
<ClientOnly v-else>
  <Content>
    <TryItContent />
  </Content>
</ClientOnly>
```

To:
```vue
<VPContent v-if="!showTryIt && !isApiReference">
  ...
</VPContent>
<ClientOnly v-else-if="showTryIt">
  <Content>
    <TryItContent />
  </Content>
</ClientOnly>
<ClientOnly v-else-if="isApiReference">
  <ScalarApiReference />
</ClientOnly>
```

- [ ] **Step 5: Commit**

```bash
git add docs/.vitepress/theme/layouts/LayoutInner.vue
git commit -m "feat: add api-reference layout branch to LayoutInner"
```

---

## Task 5: Create `api.md` entry pages for all three locales

**Files:**
- `docs/en/docs/api.md`
- `docs/zh-CN/docs/api.md`
- `docs/zh-HK/docs/api.md`

- [ ] **Step 1: Create `docs/en/docs/api.md`**

```markdown
---
layout: api-reference
title: API Reference
---
```

- [ ] **Step 2: Create `docs/zh-CN/docs/api.md`**

```markdown
---
layout: api-reference
title: API Reference
---
```

- [ ] **Step 3: Create `docs/zh-HK/docs/api.md`**

```markdown
---
layout: api-reference
title: API Reference
---
```

- [ ] **Step 4: Commit**

```bash
git add docs/en/docs/api.md docs/zh-CN/docs/api.md docs/zh-HK/docs/api.md
git commit -m "feat: add api-reference entry pages for all locales"
```

---

## Task 6: Add API nav entries to all three locale nav files

**Files:**
- `docs/.vitepress/locales/en/nav.ts`
- `docs/.vitepress/locales/zh-CN/nav.ts`
- `docs/.vitepress/locales/zh-HK/nav.ts`

- [ ] **Step 1: Update `docs/.vitepress/locales/en/nav.ts`**

Add before the `Issues` entry:

```ts
{ text: 'API', link: '/docs/api', activeMatch: '^(/(?:zh-CN|zh-HK)/)?docs/api' },
```

Full result:
```ts
export const nav = (): DefaultTheme.NavItem[] => {
  return [
    { text: 'Home', link: '/', activeMatch: '^(/en)?/$' },
    { text: 'Skill', link: '/skill', activeMatch: '^(/en)?/skill' },
    { text: 'SDK', link: '/sdk', activeMatch: '^(/en)?/sdk' },
    { text: 'Docs', link: '/docs', activeMatch: '^(/en)?/docs(?!/api)' },
    { text: 'API', link: '/docs/api', activeMatch: '^(/en)?/docs/api' },
    { text: 'Issues', link: 'https://github.com/longbridge/openapi/issues', target: '_blank' },
  ]
}
```

Note: `'^(/en)?/docs(?!/api)'` uses a negative lookahead so "Docs" does not highlight when on `/docs/api`.

- [ ] **Step 2: Update `docs/.vitepress/locales/zh-CN/nav.ts`**

Add before the `Issues` entry:

```ts
{ text: 'API', link: `/${lang}/docs/api`, activeMatch: `^/${lang}/docs/api` },
```

Full result:
```ts
export const nav = (lang: string): DefaultTheme.NavItem[] => {
  return [
    { text: '首页', link: `/${lang}/`, activeMatch: `^/${lang}/$` },
    { text: 'Skill', link: `/${lang}/skill`, activeMatch: `^/${lang}/skill` },
    { text: 'SDK', link: `/${lang}/sdk`, activeMatch: `^/${lang}/sdk` },
    { text: '文档', link: `/${lang}/docs`, activeMatch: `^/${lang}/docs` },
    { text: 'API', link: `/${lang}/docs/api`, activeMatch: `^/${lang}/docs/api` },
    { text: 'Issues', link: 'https://github.com/longbridge/openapi/issues', target: '_blank' },
  ]
}
```

- [ ] **Step 3: Update `docs/.vitepress/locales/zh-HK/nav.ts`**

Same pattern as zh-CN but with `'文檔'` (Traditional):

```ts
export const nav = (lang: string): DefaultTheme.NavItem[] => {
  return [
    { text: '首頁', link: `/${lang}/`, activeMatch: `^/${lang}/$` },
    { text: 'Skill', link: `/${lang}/skill`, activeMatch: `^/${lang}/skill` },
    { text: 'SDK', link: `/${lang}/sdk`, activeMatch: `^/${lang}/sdk` },
    { text: '文檔', link: `/${lang}/docs`, activeMatch: `^/${lang}/docs` },
    { text: 'API', link: `/${lang}/docs/api`, activeMatch: `^/${lang}/docs/api` },
    { text: 'Issues', link: 'https://github.com/longbridge/openapi/issues', target: '_blank' },
  ]
}
```

- [ ] **Step 4: Commit**

```bash
git add docs/.vitepress/locales/en/nav.ts docs/.vitepress/locales/zh-CN/nav.ts docs/.vitepress/locales/zh-HK/nav.ts
git commit -m "feat: add API nav entries to all locale navs"
```

---

## Task 7: Verify in dev server

- [ ] **Step 1: Start dev server**

```bash
bun run dev
```

- [ ] **Step 2: Open `http://localhost:5173/docs/api`**

Expected:
- VitePress top nav visible with new "API" entry highlighted
- No VitePress sidebar on left
- Scalar renders with endpoints grouped by tag
- Dark/light mode toggle works and Scalar follows

- [ ] **Step 3: Check dark mode sync**

Toggle the VitePress dark mode switch. Scalar should switch themes accordingly.

- [ ] **Step 4: Check Try It OAuth flow**

Click any endpoint → "Try It" → "Authorize" → Should redirect to `https://openapi.longbridge.com/oauth2/authorize` with PKCE params.

- [ ] **Step 5: Check zh-CN route**

Open `http://localhost:5173/zh-CN/docs/api` — Scalar should render identically (same English spec).

- [ ] **Step 6: Final commit if any fixups were needed**

```bash
git add -A
git commit -m "fix: scalar api reference integration fixups"
```
