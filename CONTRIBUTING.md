# Contributing to Longbridge Developers

This document is written for AI agents. It describes the full structure of this repository so that an AI can make accurate, consistent contributions with minimal back-and-forth.

---

## Repository Overview

This is the source for **https://open.longbridge.com** — the official Longbridge developer platform. It is a [VitePress 2.0 alpha](https://vitepress.dev/) multilingual documentation site built with [Bun](https://bun.sh/).

```
/
├── docs/                    # All site content and VitePress config
│   ├── .vitepress/          # VitePress configuration and theme
│   │   ├── config.mts       # Main VitePress config
│   │   ├── config/
│   │   │   ├── locales.ts   # Aggregates all three locale configs
│   │   │   └── markdown.ts  # Markdown-it plugins
│   │   ├── locales/         # Per-locale nav/sidebar/search config
│   │   │   ├── en/
│   │   │   ├── zh-CN/
│   │   │   └── zh-HK/
│   │   ├── theme/
│   │   │   ├── index.ts     # Theme entry, registers global Vue components
│   │   │   ├── components/  # Vue components (usable directly in Markdown)
│   │   │   ├── composables/
│   │   │   ├── locales/     # i18n JSON files (en / zh-CN / zh-HK)
│   │   │   └── utils/
│   │   │       └── gen.ts   # Auto-generates sidebar from filesystem
│   │   ├── md-plugins/      # Custom markdown-it plugins
│   │   └── utils.ts         # Route rewriting logic
│   ├── en/                  # English content
│   ├── zh-CN/               # Simplified Chinese content
│   └── zh-HK/               # Traditional Chinese content
├── skills/
│   └── longbridge/
│       └── SKILL.md         # The AI Skill for Longbridge APIs
├── scripts/                 # Build scripts
│   ├── generate-llms.ts     # Generates llms.txt
│   └── normalize_md.ts      # Normalizes Markdown formatting
├── openapi/                 # OpenAPI specifications (YAML)
├── CONTRIBUTING.md          # This file
└── package.json
```

---

## Content: Docs

### Three-Language Rule

**Every `.md` page must exist in all three language directories.** When you add or modify documentation, always create or update the corresponding files in:

- `docs/en/` — English (root locale, served at `/docs/...`)
- `docs/zh-CN/` — Simplified Chinese (served at `/zh-CN/docs/...`)
- `docs/zh-HK/` — Traditional Chinese (served at `/zh-HK/docs/...`)

Never add a page to only one language directory.

### Frontmatter

Every `.md` file requires frontmatter:

```yaml
---
title: 'Page Title'
id: category_file-name          # e.g., quote_pull-static
slug: '/quote/pull/static'      # must start with /, matches the URL path
sidebar_position: 3             # lower = higher in sidebar
sidebar_icon: book              # optional: book | zap | cpu | terminal | sparkles
---
```

### Directory Categories

Each subdirectory needs a `_category_.json` to appear in the sidebar:

```json
{
  "position": 1,
  "label": "Market Data",
  "collapsed": false,
  "link": null
}
```

### Sidebar Generation

The sidebar is **auto-generated** from the filesystem by `docs/.vitepress/theme/utils/gen.ts`. Do not manually edit sidebar arrays. Control ordering via `sidebar_position` frontmatter and `_category_.json` `position` fields.

### Images and Static Assets

**Never commit images or static files to this repository.** Upload all media to the CDN and reference the CDN URL:

```markdown
<!-- Wrong -->
![diagram](../../static/diagram.png)

<!-- Correct -->
![diagram](https://pub.pbkrs.com/files/xxx/diagram.png)
```

### Global Vue Components

These components are globally registered and can be used directly in any `.md` file:

| Component | Purpose |
|-----------|---------|
| `<Tabs>` / `<TabItem>` | Code group tabs |
| `<TipContainer>` | Callout/tip boxes |
| `<TryIt>` | Interactive API playground |
| `<SDKLinks>` / `<SDK>` | SDK download links |
| `<Skill>` | AI Skill feature showcase |
| `<HomePage>` | Homepage layout |

To add a new component: create the Vue file in `docs/.vitepress/theme/components/` and export it from `index.ts`.

---

## Content: API Reference

### OpenAPI Specifications

API reference pages are generated from OpenAPI YAML files in `openapi/`. When updating API reference:

1. Edit the relevant `.yaml` file in `openapi/`
2. Ensure the corresponding docs pages in all three locales stay in sync
3. The `<TryIt>` component reads from these specs for the interactive playground

### API Docs Structure

API reference pages live under `docs/{lang}/api/`:

```
docs/en/api/
├── quote/          # Market data APIs
│   ├── pull/       # REST pull APIs
│   └── push/       # WebSocket push APIs
├── trade/          # Trading APIs
│   ├── order/
│   └── history/
└── account/        # Account management APIs
```

Each API endpoint needs a corresponding page in all three language directories.

---

## Content: AI Skill

The AI Skill is the primary way AI agents learn about the Longbridge API. It lives at:

```
skills/longbridge/SKILL.md
```

### When to update the Skill

Update `SKILL.md` when:
- A new API endpoint is added or an existing one changes
- A new SDK language is supported
- New features are added to the CLI or MCP server
- Common AI usage patterns change

### Skill structure

The Skill is a self-contained Markdown document that gives an AI agent everything needed to call Longbridge APIs correctly. It includes:
- Authentication and environment setup
- All major API endpoints with parameters and response shapes
- Common workflows (quote → order → confirm)
- Error handling guidance

Keep the Skill accurate and current — AI agents may invoke it instead of reading the full docs.

---

## Internationalization (i18n)

### Locale configuration

| Locale | Directory | URL prefix | Config path |
|--------|-----------|------------|-------------|
| English | `docs/en/` | `/` (root) | `docs/.vitepress/locales/en/` |
| Simplified Chinese | `docs/zh-CN/` | `/zh-CN/` | `docs/.vitepress/locales/zh-CN/` |
| Traditional Chinese | `docs/zh-HK/` | `/zh-HK/` | `docs/.vitepress/locales/zh-HK/` |

### Adding nav items

To add a page to the top navigation, edit the appropriate `nav.ts` files inside each locale directory:

```
docs/.vitepress/locales/en/nav.ts
docs/.vitepress/locales/zh-CN/nav.ts
docs/.vitepress/locales/zh-HK/nav.ts
```

### UI string translations

UI strings (button labels, tooltips, etc.) are in:

```
docs/.vitepress/theme/locales/en.json
docs/.vitepress/theme/locales/zh-CN.json
docs/.vitepress/theme/locales/zh-HK.json
```

### Route rewriting

The `docs/.vitepress/utils.ts` `rewriteMarkdownPath` function handles URL generation. The `slug` frontmatter field overrides the default path:
- An absolute `slug` like `/trade-order-create` replaces the entire path segment
- A relative `slug` resolves relative to the file's directory

---

## Related Repositories

When making changes that affect the API surface, check whether these related repositories need corresponding updates:

### [`longbridge/openapi`](https://github.com/longbridge/openapi)

The canonical OpenAPI specification source. The `openapi/` directory in this repo may mirror or derive from it. If the API schema changes, both repos may need updating.

### [`longbridge/openapi-go`](https://github.com/longbridge/openapi-go)

The official Go SDK. Reflects the same API surface documented here. If you update API docs, check whether the Go SDK's method signatures, parameter names, or response types are consistent with what's documented.

### [`longbridge/longbridge-terminal`](https://github.com/longbridge/longbridge-terminal)

The `longbridge` CLI binary (distributed via Homebrew). CLI reference docs at `docs/{lang}/cli.md` must accurately reflect the CLI's actual commands and flags. When documenting CLI features, verify against the terminal repo.

---

## Development

```bash
# Install dependencies
bun install

# Start dev server (uses canary API)
bun run dev

# Start dev server (uses production API)
bun run dev:prod

# Build for canary
bun run build:canary

# Build for production
bun run build:release

# Generate llms.txt (run after build)
bun run build:llms
```

---

## Pull Request Checklist

Before submitting a PR, verify:

- [ ] All three language directories (`en/`, `zh-CN/`, `zh-HK/`) have been updated
- [ ] Frontmatter is present and correct (`title`, `id`, `slug`, `sidebar_position`)
- [ ] No images or static assets added to the repo (use CDN URLs)
- [ ] If a new component was added, it is exported from `theme/components/index.ts`
- [ ] If the API surface changed, `openapi/` YAML and the AI Skill (`skills/longbridge/SKILL.md`) are updated
- [ ] Related repositories are checked for consistency
- [ ] Markdown formatting is clean (run `autocorrect --fix .` for Chinese/English spacing)
