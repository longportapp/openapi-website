# API Reference Integration & API 附录 Removal — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the "API 附录" sidebar section by integrating HTTP auth/error docs into `openapi.yaml` via `x-pages`, and moving socket docs to a new standalone category.

**Architecture:** Add `x-pages` top-level extension to `openapi.yaml` with two info pages (Authentication, Error Codes). Update `ApiReference.vue` to parse `x-pages` and show them in the sidebar, rendering markdown on click. Move socket/* docs out of `api-reference/` into a new `socket/` category directory (3 locales). Delete the 12 files that become redundant.

**Tech Stack:** Vue 3 (Composition API), TypeScript, markdown-it, js-yaml, OpenAPI 3.0.3 YAML

---

## File Map

| File | Change |
|------|--------|
| `openapi.yaml` | Add `x-pages` top-level field with Authentication and Error Codes pages |
| `docs/.vitepress/theme/components/ApiReference.vue` | Parse x-pages, add sidebar section, render page panel |
| `docs/en/docs/api-reference/socket/` → `docs/en/docs/socket/` | Move (git mv) |
| `docs/zh-CN/docs/api-reference/socket/` → `docs/zh-CN/docs/socket/` | Move (git mv) |
| `docs/zh-HK/docs/api-reference/socket/` → `docs/zh-HK/docs/socket/` | Move (git mv) |
| `docs/*/docs/api-reference/_category_.json` (×3) | Delete |
| `docs/*/docs/api-reference/error-codes.md` (×3) | Delete |
| `docs/*/docs/api-reference/how-to-access-api.md` (×3) | Delete |
| `docs/*/docs/api-reference/refresh-token-api.md` (×3) | Delete |

---

## Task 1: Add `x-pages` to openapi.yaml

**Files:**
- Modify: `openapi.yaml` (after line 7, after `version: '1.0.0'`)

**Content preparation notes:**
- Source files for English authentication content: `docs/en/docs/api-reference/how-to-access-api.md` + `docs/en/docs/api-reference/refresh-token-api.md`
- Source files for Chinese auth content: `docs/zh-CN/docs/api-reference/how-to-access-api.md` + `docs/zh-CN/docs/api-reference/refresh-token-api.md`
- Source files for error codes: `docs/en/docs/api-reference/error-codes.md` (English) and `docs/zh-CN/docs/api-reference/error-codes.md` (Chinese)
- The `x-content-zh` field is used for both zh-CN and zh-HK (same content is acceptable since they are nearly identical)
- **Content adaptation rules** (because `ApiReference.vue` uses plain `markdown-it`, not VitePress):
  - Strip YAML frontmatter (`---` blocks)
  - Convert `:::success Tip` ... `:::` → `> **Tip:** ...` (blockquote)
  - Remove `<Tabs groupId="shell">` and `</Tabs>` wrapper lines
  - Remove `<TabItem value="bash" ...>` and `</TabItem>` lines (keep the bash block)
  - Remove `<TabItem value="powershell" ...>` through its closing `</TabItem>` entirely (including the powershell code block)
  - Merge content: auth page = how-to-access-api body + append refresh-token-api body (with a `---` separator), remove duplicate section titles if any

- [ ] **Step 1.1: Read source files to gather content**

  Read and note the body content (after frontmatter) of:
  - `docs/en/docs/api-reference/how-to-access-api.md`
  - `docs/en/docs/api-reference/refresh-token-api.md`
  - `docs/zh-CN/docs/api-reference/how-to-access-api.md`
  - `docs/zh-CN/docs/api-reference/refresh-token-api.md`
  - `docs/en/docs/api-reference/error-codes.md`
  - `docs/zh-CN/docs/api-reference/error-codes.md`

- [ ] **Step 1.2: Insert `x-pages` into openapi.yaml after `version: '1.0.0'`**

  In `openapi.yaml`, after the `info:` block (after line 7), insert:

  ```yaml
  x-pages:
    - id: authentication
      title: Authentication
      x-title-zh: 认证
      content: |
        <EN merged content here: how-to-access-api body (adapted) + "---" + refresh-token-api body (adapted)>
      x-content-zh: |
        <ZH-CN merged content here: how-to-access-api body (adapted) + "---" + refresh-token-api body (adapted)>
    - id: error-codes
      title: Error Codes
      x-title-zh: 错误码
      content: |
        <EN content from error-codes.md body>
      x-content-zh: |
        <ZH-CN content from error-codes.md body>
  ```

  Use YAML literal block scalar (`|`). Indent the content 6 spaces (consistent with the block). Tables and code fences work fine inside YAML `|` blocks.

- [ ] **Step 1.3: Verify YAML is valid**

  ```bash
  node -e "const y = require('js-yaml'); y.load(require('fs').readFileSync('openapi.yaml','utf8')); console.log('OK')"
  ```

  Expected: `OK`

- [ ] **Step 1.4: Commit**

  ```bash
  git add openapi.yaml
  git commit -m "feat(openapi): add x-pages with Authentication and Error Codes info pages"
  ```

---

## Task 2: Update ApiReference.vue — Parse and Render x-pages

**Files:**
- Modify: `docs/.vitepress/theme/components/ApiReference.vue`

The file has three sections: `<script setup>` (lines 1–489), `<template>` (lines 491–683), `<style>` (685–end).

- [ ] **Step 2.1: Add `PageItem` interface after the `EndpointItem` interface (around line 83)**

  ```typescript
  interface PageItem {
    id: string
    title: string
    titleZh?: string
    content: string
    contentZh?: string
  }
  ```

- [ ] **Step 2.2: Update `parseSpec()` to return `pages`**

  Change the return type signature from:
  ```typescript
  function parseSpec(): { groups: TagGroup[]; serverUrl: string } {
  ```
  to:
  ```typescript
  function parseSpec(): { groups: TagGroup[]; pages: PageItem[]; serverUrl: string } {
  ```

  After the `return {` near the end of `parseSpec()`, add `pages` extraction. The full updated return block:

  ```typescript
    const rawPages: any[] = (parsed['x-pages'] ?? []) as any[]
    const pages: PageItem[] = rawPages.map((p: any) => ({
      id: p.id,
      title: p.title,
      titleZh: p['x-title-zh'],
      content: p.content ?? '',
      contentZh: p['x-content-zh'],
    }))

    return {
      groups: ordered
        .filter((x) => byTag[x])
        .map((x) => ({ name: x, nameZh: tagZhMap[x], endpoints: byTag[x] })),
      pages,
      serverUrl,
    }
  ```

- [ ] **Step 2.3: Add state refs for pages and selectedPage (in the State section, around line 264)**

  After `const searchQuery = ref('')`, add:

  ```typescript
  const pages = ref<PageItem[]>([])
  const selectedPage = ref<PageItem | null>(null)
  ```

- [ ] **Step 2.4: Add `selectedPageHtml` computed (after `selectedCodeBlocks` computed, around line 358)**

  ```typescript
  const selectedPageHtml = computed(() => {
    const page = selectedPage.value
    if (!page) return ''
    const content = (isZh.value && page.contentZh) ? page.contentZh : page.content
    return content ? md.render(content) : ''
  })
  ```

- [ ] **Step 2.5: Add `selectPage()` and update `selectEndpoint()`**

  Add new function after `selectEndpoint`:

  ```typescript
  function selectPage(page: PageItem) {
    selectedEndpoint.value = null
    selectedPage.value = page
    history.pushState(null, '', `${location.pathname}?page=${page.id}`)
  }
  ```

  Update `selectEndpoint` to clear `selectedPage`:

  ```typescript
  function selectEndpoint(ep: EndpointItem) {
    selectedPage.value = null
    selectedEndpoint.value = ep
    history.pushState(null, '', `${location.pathname}?op=${epId(ep)}`)
  }
  ```

- [ ] **Step 2.6: Replace `findByQuery()` with two separate functions**

  Replace the existing `findByQuery()` function with:

  ```typescript
  function findEndpointByQuery(): EndpointItem | null {
    const op = new URLSearchParams(location.search).get('op')
    if (!op) return null
    for (const group of tagGroups.value) {
      for (const ep of group.endpoints) {
        if (epId(ep) === op) return ep
      }
    }
    return null
  }

  function findPageByQuery(): PageItem | null {
    const pageId = new URLSearchParams(location.search).get('page')
    if (!pageId) return null
    return pages.value.find((p) => p.id === pageId) ?? null
  }
  ```

- [ ] **Step 2.7: Update `onPopState`, `onMounted` to use new functions**

  ```typescript
  function onPopState() {
    selectedEndpoint.value = findEndpointByQuery()
    selectedPage.value = findPageByQuery()
  }
  ```

  ```typescript
  onMounted(() => {
    const result = parseSpec()
    tagGroups.value = result.groups
    pages.value = result.pages
    serverUrl = result.serverUrl

    selectedEndpoint.value = findEndpointByQuery()
    selectedPage.value = findPageByQuery()
    window.addEventListener('popstate', onPopState)
  })
  ```

- [ ] **Step 2.8: Update the template — sidebar pages section**

  Inside `<div class="sidebar-scroll">`, add a pages section BEFORE the existing `v-for="group in filteredGroups"` block:

  ```html
  <div v-if="pages.length" class="page-group">
    <button
      v-for="page in pages"
      :key="page.id"
      class="nav-item nav-item-page"
      :class="{ active: selectedPage?.id === page.id }"
      @click="selectPage(page)">
      <span class="nav-label">{{ isZh ? (page.titleZh || page.title) : page.title }}</span>
    </button>
  </div>
  ```

- [ ] **Step 2.9: Update template — intro visibility and add page panel**

  Change intro panel condition from `v-if="!selectedEndpoint"` to `v-if="!selectedEndpoint && !selectedPage"`.

  Add a new panel after the intro `</div>` and before the main `<div v-if="selectedEndpoint"`:

  ```html
  <!-- Page content (info page selected) -->
  <div v-if="selectedPage && !selectedEndpoint" class="api-main">
    <div class="api-content">
      <h1 class="ep-title">{{ isZh ? (selectedPage.titleZh || selectedPage.title) : selectedPage.title }}</h1>
      <div class="prose vp-doc" v-html="selectedPageHtml" />
    </div>
  </div>
  ```

- [ ] **Step 2.10: Add CSS for `.nav-item-page` and `.page-group` (in `<style>` section)**

  The `.nav-item` class already provides the button styling. Add a subtle separator below the pages group:

  ```css
  .page-group {
    border-bottom: 1px solid var(--vp-c-divider);
    margin-bottom: 8px;
    padding-bottom: 4px;
  }

  .nav-item-page .nav-label {
    font-style: italic;
  }
  ```

- [ ] **Step 2.11: Start dev server and verify**

  ```bash
  bun run dev
  ```

  Open browser at `http://localhost:5173/docs/api` (or whichever port). Verify:
  - "Authentication" and "Error Codes" appear at top of sidebar
  - Clicking "Authentication" shows the merged OAuth 2.0 content
  - Clicking "Error Codes" shows the error table
  - Clicking any API operation still works normally
  - `?page=authentication` URL state is set when clicking Authentication
  - `?page=error-codes` URL state is set when clicking Error Codes
  - Browser back/forward navigates correctly between pages and endpoints
  - Chinese locale (`/zh-CN/docs/api`) shows 认证 and 错误码 in the sidebar

- [ ] **Step 2.12: Commit**

  ```bash
  git add docs/.vitepress/theme/components/ApiReference.vue
  git commit -m "feat(ApiReference): add x-pages sidebar section with info page rendering"
  ```

---

## Task 3: Move Socket Docs to New Standalone Category

**Files:**
- Move: `docs/en/docs/api-reference/socket/` → `docs/en/docs/socket/`
- Move: `docs/zh-CN/docs/api-reference/socket/` → `docs/zh-CN/docs/socket/`
- Move: `docs/zh-HK/docs/api-reference/socket/` → `docs/zh-HK/docs/socket/`
- Modify: `_category_.json` in each destination

**Why git mv works:** All socket markdown files use absolute `slug:` paths in frontmatter (e.g., `slug: /socket/hosts`), so the public URLs are preserved regardless of file location.

- [ ] **Step 3.1: Move English socket docs**

  ```bash
  git mv docs/en/docs/api-reference/socket docs/en/docs/socket
  ```

- [ ] **Step 3.2: Update English `_category_.json`**

  Edit `docs/en/docs/socket/_category_.json`:

  ```json
  {
    "position": 6,
    "label": "Socket Feed",
    "collapsible": true,
    "collapsed": true,
    "link": null
  }
  ```

  (position changed from 5 to 6 to avoid collision; label now standalone rather than nested)

- [ ] **Step 3.3: Move zh-CN socket docs**

  ```bash
  git mv docs/zh-CN/docs/api-reference/socket docs/zh-CN/docs/socket
  ```

- [ ] **Step 3.4: Update zh-CN `_category_.json`**

  Edit `docs/zh-CN/docs/socket/_category_.json`:

  ```json
  {
    "position": 6,
    "label": "Socket 实时推送",
    "collapsible": true,
    "collapsed": true,
    "link": null
  }
  ```

- [ ] **Step 3.5: Move zh-HK socket docs**

  ```bash
  git mv docs/zh-HK/docs/api-reference/socket docs/zh-HK/docs/socket
  ```

- [ ] **Step 3.6: Update zh-HK `_category_.json`**

  Edit `docs/zh-HK/docs/socket/_category_.json`:

  ```json
  {
    "position": 6,
    "label": "Socket 即時推送",
    "collapsible": true,
    "collapsed": true,
    "link": null
  }
  ```

- [ ] **Step 3.7: Verify socket pages still accessible in dev server**

  Check one socket URL e.g. `http://localhost:5173/socket/hosts` — should still load.

- [ ] **Step 3.8: Commit**

  (`git mv` already staged the renames — no `git add` needed.)

  ```bash
  git commit -m "refactor(docs): move socket feed docs from api-reference/ to standalone socket/ category"
  ```

---

## Task 4: Delete Redundant api-reference HTTP Docs

**Files to delete (all 3 locales × 4 files = 12 files):**
- `docs/en/docs/api-reference/error-codes.md`
- `docs/en/docs/api-reference/how-to-access-api.md`
- `docs/en/docs/api-reference/refresh-token-api.md`
- `docs/en/docs/api-reference/_category_.json`
- (same 4 for zh-CN and zh-HK)

**Prerequisite:** Tasks 1, 2, and 3 must be complete — content already lives in openapi.yaml x-pages, and `api-reference/socket/` has already been moved out.

- [ ] **Step 4.1: Remove all three locales' api-reference directories**

  ```bash
  git rm -r docs/en/docs/api-reference
  git rm -r docs/zh-CN/docs/api-reference
  git rm -r docs/zh-HK/docs/api-reference
  ```

  Expected: 12 files removed (3 md + 1 json per locale).

- [ ] **Step 4.2: Verify dev server shows no broken sidebar entries**

  In browser, check that:
  - "API Reference" / "API 附录" category no longer appears in the sidebar
  - "Socket Feed" category appears in its new position
  - `/docs/api/` still works with Authentication and Error Codes in sidebar

- [ ] **Step 4.3: Commit**

  ```bash
  git commit -m "chore(docs): remove redundant api-reference HTTP docs (content merged into openapi.yaml x-pages)"
  ```

---

## Summary

After all tasks complete:
- `/docs/api/` shows Authentication + Error Codes info pages at top of sidebar
- Socket protocol docs live at `docs/*/docs/socket/` under "Socket Feed" / "Socket 实时推送" category
- "API 附录" / "API Reference" sidebar category is gone
- All content is preserved — nothing is deleted that wasn't already integrated
