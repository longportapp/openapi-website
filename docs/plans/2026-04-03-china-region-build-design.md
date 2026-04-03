# China Region Build — Design Document

Date: 2026-04-03
Branch: `feat/deploy_cn`

## Background

Due to compliance requirements, the site needs a separate China version with:
- Route/page-level hiding (whitelist model — only explicitly allowed pages are included)
- In-page section-level filtering (remove specific headings/paragraphs)
- Independent API endpoints pointing to China infrastructure
- Deployed to an independent domain (e.g., `open.longbridge.cn`)

## Core Approach: Build-Time Separation

Use environment variable `VITE_REGION=cn` to produce a completely independent static build. The China build artifact contains **zero traces** of excluded content — no HTML, no JS chunks, no sitemap entries.

## Configuration

### `region.config.ts` (project root)

Centralized whitelist + section exclusion config:

```typescript
import type { RegionConfig } from './docs/.vitepress/types'

export const regionConfig: Record<string, RegionConfig> = {
  cn: {
    // API endpoints
    apiBaseUrl: 'https://openapi.longbridge.cn',
    portalGatewayBaseUrl: 'https://m.longbridge.cn',

    // Whitelist — only matched pages are built into China version
    // Uses glob patterns via micromatch, ** prefix matches all 3 locales
    includePages: [
      '**/docs/index.md',
      '**/docs/getting-started.md',
      '**/docs/changelog.md',
      '**/docs/cli.md',
      '**/docs/sdk.md',
      '**/docs/quote/**',
      '**/docs/socket/**',
      '**/docs/qa/**',
      '**/api/**',
    ],

    // In-page section exclusion (within whitelisted pages)
    excludeSections: [
      {
        page: '**/docs/getting-started.md',
        headings: ['US Stock Trading', '美股交易', '美股交易'],
      },
    ],
  },
}
```

### Key Design Decisions

1. **Whitelist model** — New pages are excluded by default; must be explicitly added. This is the safe default for compliance.
2. **Glob patterns with `**` prefix** — One rule covers all 3 locales (en, zh-CN, zh-HK). All 3 languages are preserved in China version.
3. **`micromatch` for matching** — Already a VitePress dependency, no new packages needed.
4. **Filtering inside VitePress pipeline** — Not post-build file deletion. Ensures JS bundles, route manifests, and search indices are all clean.

## Build Script

```jsonc
// package.json
{
  "build:cn": "cross-env VITE_REGION=cn VITE_API_BASE_URL=https://openapi.longbridge.cn VITE_PORTAL_GATEWAY_BASE_URL=https://m.longbridge.cn vitepress build docs"
}
```

## Integration Points

| Integration Point | File | What Changes |
|-------------------|------|-------------|
| **Route generation** | `docs/.vitepress/utils.ts` — `rewriteMarkdownPath` | Pages not in whitelist return empty/excluded, VitePress skips route generation |
| **Sidebar generation** | `docs/.vitepress/theme/utils/gen.ts` — `genMarkdowDocs` | Filter files against `includePages` during directory traversal |
| **In-page section removal** | `docs/.vitepress/md-plugins/region-filter.ts` (new) | Markdown-it plugin: parse AST, match headings from `excludeSections`, remove heading + content until next same-level heading |
| **Sitemap** | `docs/.vitepress/config.mts` — `sitemap.transformItems` | Filter out excluded pages |
| **LLMs.txt** | `scripts/generate-llms.ts` | Skip excluded pages during generation |

## Deployment

### OSS Paths

- Global: `oss://lb-assets/github/release/open.longbridge.com/new-docs/raw/`
- China: `oss://lb-assets/github/release/open.longbridge.cn/new-docs/raw/`

### CI/CD

Add `deploy-cn` job to `.github/workflows/release.yml`, running in parallel with the global deploy job:

```yaml
deploy-cn:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
      with:
        submodules: true
    - run: bun install
    - run: bun run build:cn
    - name: Upload to Aliyun OSS (CN prefix)
      run: |
        aliyun oss sync docs/.vitepress/dist/ \
          oss://lb-assets/github/release/open.longbridge.cn/new-docs/raw/ \
          --force --update
    - name: Deploy to Cloudflare Pages
      uses: cloudflare/pages-action@v1
      with:
        projectName: openapi-cn
        directory: docs/.vitepress/dist
```

Both global and China versions deploy from a single push to `main` / `release`.

## File Change Summary

| Action | File |
|--------|------|
| **New** | `region.config.ts` — Whitelist + section exclusion config |
| **New** | `docs/.vitepress/md-plugins/region-filter.ts` — Markdown section removal plugin |
| **Modify** | `docs/.vitepress/utils.ts` — Route filtering by whitelist |
| **Modify** | `docs/.vitepress/theme/utils/gen.ts` — Sidebar filtering |
| **Modify** | `docs/.vitepress/config.mts` — Sitemap filtering + region config loading |
| **Modify** | `scripts/generate-llms.ts` — LLMs.txt filtering |
| **Modify** | `package.json` — Add `build:cn` script |
| **Modify** | `.github/workflows/release.yml` — Add `deploy-cn` job |

## Implementation Phases

### Phase 1: Foundation
- Create `region.config.ts` with type definitions
- Add `build:cn` script to `package.json`
- Implement region config loading utility (read `VITE_REGION` env)

### Phase 2: Page-Level Filtering
- Modify `genMarkdowDocs` to filter sidebar entries
- Modify `rewriteMarkdownPath` to exclude non-whitelisted routes
- Filter sitemap entries

### Phase 3: Section-Level Filtering
- Implement `region-filter.ts` markdown-it plugin
- Register plugin in VitePress markdown config

### Phase 4: Build Verification
- Run `build:cn` and verify:
  - Excluded pages have no HTML files in dist/
  - Sidebar doesn't show excluded pages
  - Sitemap doesn't contain excluded URLs
  - Excluded sections are removed from whitelisted pages
  - API base URL points to CN endpoint

### Phase 5: CI/CD
- Add `deploy-cn` job to release workflow
- Configure OSS CN prefix path
- Configure Cloudflare Pages CN project
