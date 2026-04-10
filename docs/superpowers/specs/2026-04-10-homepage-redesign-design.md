# Longbridge Developers Homepage Redesign — Design Spec

## Overview

Redesign the Longbridge Developers homepage from a marketing-style landing page into a **developer-first product platform page**, modeled after bun.sh's "command-as-entry" philosophy. The new homepage clearly presents the platform's 4 core products (OpenAPI, MCP, CLI, SKILL) with actionable install commands, product introductions, and quick-start guides.

## Goals

1. **30-second onboarding** — developers can install and start using any product within 30 seconds of landing
2. **4 products, clear identity** — each product has a distinct introduction, install command, and quick-start path
3. **Code-first** — every section includes copyable code; no section is purely decorative
4. **LBUS compliant** — strictly follow Longbridge design tokens from `longbridge-websites`
5. **Brand alignment** — light theme priority, consistent with Longbridge main site visual identity

## Non-Goals

- No interactive API playground on the homepage (exists in docs via `<TryIt>`)
- No pricing/plan information
- No social proof wall (can be added in future iteration)
- No blog/changelog integration on homepage

## Design System Constraints

All styling must use LBUS design tokens from `longbridge-websites`:

| Token | Value | Usage |
|-------|-------|-------|
| `--lb-brand` | `#00B8B8` (light) / `#00F0C4` (dark) | Primary CTA, active tab, links |
| `text-text-primary` | Dark gray / White | Headings, body text |
| `text-text-secondary` | Medium gray | Descriptions, secondary info |
| `rounded-md` | 6px | All cards, buttons, inputs, code blocks |
| `shadow-card` | `0px 2px 8px rgba(0,0,0,0.08)` | Product cards, code blocks |
| `font-sans` | Inter | All UI text |
| `font-cera-pro` | Cera Pro | Hero title (marketing) — requires importing font from longbridge-websites |
| `font-sf-pro` | SF Pro Display | Numeric data (market stats) — requires importing font from longbridge-websites |
| Max content width | 1200px | Page layout container (implement via VitePress custom CSS, not `container-responsive` which is a longbridge-websites SCSS class) |

### Implementation Note

The `container-responsive` and `banner-responsive` CSS classes belong to `longbridge-websites` (SCSS-based, React). This project uses VitePress (Vue). We adopt the **design principles** (1200px max-width, responsive margins) but implement them natively in the VitePress theme CSS. Similarly, `font-cera-pro` and `font-sf-pro` font files need to be imported or referenced via CDN.

### Prohibited

- No hardcoded colors — all via CSS variables
- No `rounded-sm`, `rounded-xl`, `rounded-2xl` — only `rounded-md` (6px)
- `rounded-lg` (12px) only for AI-related cards (MCP, SKILL)
- No `shadow-sm`, `shadow-lg` — only `shadow-card`, `shadow-collapsed`, `shadow-dropdown`

## Page Architecture

```
┌─────────────────────────────────────────────────────┐
│  Section 1: Nav Bar (existing, preserved)           │
├─────────────────────────────────────────────────────┤
│  Section 2: Hero                                    │
│  - Title + subtitle                                 │
│  - Product tab switcher (OpenAPI/MCP/CLI/SKILL)     │
│  - Install command code block (per tab)             │
│  - Dual CTA buttons                                 │
├─────────────────────────────────────────────────────┤
│  Section 3: Product Showcase                        │
│  - 2x2 grid of product introduction cards           │
│  - Each: positioning + 3 selling points + code      │
├─────────────────────────────────────────────────────┤
│  Section 4: Get Started                             │
│  - 2x2 grid of quick-start cards                    │
│  - Each: 2-3 step guide with copyable code          │
├─────────────────────────────────────────────────────┤
│  Section 5: Market Coverage (compact)               │
│  - Single row: market icons + SDK languages + stats │
├─────────────────────────────────────────────────────┤
│  Section 6: Footer (existing, updated links)        │
└─────────────────────────────────────────────────────┘
```

## Section Details

### Section 1: Nav Bar

**Status:** Preserved from current implementation. No changes except updating nav links if needed.

- Frosted glass blur effect on scroll (already implemented)
- Links: Home | Skill | Docs | API Reference | SDK | Issues
- Search (Cmd+K), language switcher, theme toggle, Login button

### Section 2: Hero

**Background:** `bg-body` (light theme default)
**Layout:** Centered, within `container-responsive`

#### Title Block

```
font-cera-pro font-bold text-[40px]/[48px] lg:text-[56px]/[64px]
```

- Title: "Longbridge Developers"
- Subtitle: "All-in-one Financial Development Platform" (`text-text-secondary text-[18px]/[26px] lg:text-[20px]/[28px]`)

#### Product Tab Switcher

Horizontal tab bar with 4 tabs:

| Tab | Label | Icon concept |
|-----|-------|-------------|
| OpenAPI | OpenAPI | API/code icon |
| MCP | MCP | AI/brain icon |
| CLI | CLI | Terminal icon |
| SKILL | SKILL | Sparkles icon |

**Active tab:** `bg-brand text-white rounded-md px-4 py-2`
**Inactive tab:** `text-text-secondary hover:text-text-primary px-4 py-2`

#### Code Block (per tab)

Dark background code block (use VitePress built-in `--vp-code-block-bg` CSS variable for the dark code area — no hardcoded colors):

**OpenAPI tab:**
```bash
$ pip install longbridge
```

**MCP tab:**
```bash
$ claude mcp add --transport http longbridge https://openapi.longbridge.com/mcp
```

**CLI tab:**
```bash
$ curl -fsSL https://longbridge.sh/install | bash
```

**SKILL tab:**
```bash
$ npx skills add longbridge/developers -g -y
```

Each code block has a copy button (top-right corner).

#### CTA Buttons

- Primary: "Get Started" → links to `/docs/getting-started`
  - Style: `bg-brand text-white rounded-md px-6 py-3 font-medium`
- Secondary: "API Reference" → links to `/docs/api`
  - Style: `border border-brand text-brand rounded-md px-6 py-3 font-medium`

### Section 3: Product Showcase

**Background:** `bg-bg-secondary` (subtle contrast with hero)
**Layout:** 2x2 grid within `container-responsive`, `banner-responsive` for background

#### Card Design

Each card: `bg-card rounded-md border border-border-card shadow-card p-6`

Exception: MCP and SKILL cards use `rounded-lg` (12px) since they are AI-related.

#### Card Content

**OpenAPI Card:**
```
[API icon]  OpenAPI

Real-time market data and trading execution
for HK, US, and CN markets

· Real-time quotes — L1/L2 depth, tick-by-tick, WebSocket push
· Trading execution — limit/market/conditional orders, full lifecycle
· 6 SDKs — Python, Node.js, Rust, Go, Java, C++

┌──────────────────────────────────────┐
│ ctx = QuoteContext(Config.from_env())│
│ resp = ctx.quote(["TSLA.US"])       │
└──────────────────────────────────────┘

[View Docs →]
```

**MCP Card:**
```
[AI icon]  MCP

Connect any AI agent to real-time
financial data in one line

· One-line setup — Claude, Cursor, Zed, ChatGPT, Codex
· Real-time data — quotes, positions, orders via AI tools
· Hosted service — no deployment, official MCP endpoint

Endpoint: https://openapi.longbridge.com/mcp

[Claude] [Cursor] [Zed] [ChatGPT] ← tool logos

[View Docs →]
```

**CLI Card:**
```
[Terminal icon]  CLI

40+ commands for market data, trading,
and financial analysis

· Full coverage — quotes, orders, portfolio, filings
· Multiple formats — Table, JSON, CSV, Markdown output
· Financial intelligence — earnings, valuation, insider trades

┌──────────────────────────────────────┐
│ $ longbridge quote TSLA.US AAPL.US  │
│ $ longbridge financial-report AAPL.US│
└──────────────────────────────────────┘

[View Docs →]
```

**SKILL Card:**
```
[Sparkles icon]  SKILL

Give any AI assistant deep knowledge
of financial markets

· Instant setup — one command installs complete knowledge base
· Auto-trigger — stock analysis, SDK coding, MCP config
· Full reference — CLI, Python/Rust SDK, type definitions

┌──────────────────────────────────────┐
│ $ npx skills add longbridge/developers -g -y │
└──────────────────────────────────────┘

[View Docs →]
```

### Section 4: Get Started

**Background:** `bg-body` (back to default)
**Layout:** 2x2 grid within `container-responsive`

Each card is a stepped guide:

#### OpenAPI Quick Start
```
1. Install SDK
   $ pip install longbridge

2. Set credentials
   $ export LONGBRIDGE_APP_KEY=xxx
   $ export LONGBRIDGE_APP_SECRET=xxx
   $ export LONGBRIDGE_ACCESS_TOKEN=xxx

3. Query quotes
   from longbridge.openapi import QuoteContext, Config
   ctx = QuoteContext(Config.from_env())
   resp = ctx.quote(["TSLA.US", "700.HK"])
```

#### MCP Quick Start
```
1. Add MCP server
   $ claude mcp add --transport http \
       longbridge https://openapi.longbridge.com/mcp

2. Start using
   Ask your AI: "Query the real-time price of TSLA"
```

#### CLI Quick Start
```
1. Install
   $ curl -fsSL https://longbridge.sh/install | bash

2. Initialize
   $ longbridge init

3. Try it
   $ longbridge quote TSLA.US
```

#### SKILL Quick Start
```
1. Install
   $ npx skills add longbridge/developers -g -y

2. Use with any AI
   Your AI assistant now has full financial API knowledge
```

Card style: `bg-card rounded-md border border-border-card p-6`
Step numbers: `bg-brand text-white rounded-full w-6 h-6 text-sm font-bold` circle badges
Code blocks: dark background, copyable

### Section 5: Market Coverage (Compact)

**Background:** `bg-bg-secondary`
**Layout:** Single row, centered, within `container-responsive` + `banner-responsive`

```
[🇭🇰 HK] [🇺🇸 US] [🇨🇳 CN] [🇸🇬 SG]    ·    [Python] [Node.js] [Rust] [Go] [Java] [C++]
```

- Market flags use LBUS market color tokens (`market-hk`, `market-us`, etc.)
- SDK languages as small badges/icons
- Optional: one line of key stats like "4 Markets · 6 SDKs · 40+ CLI Commands · Real-time WebSocket"
- Clicking a market or SDK badge links to the corresponding docs section

### Section 6: Footer

Preserve current footer structure. Update right-side links to reflect 4 products:

- Left: Longbridge | Download | Terms | Privacy
- Right: OpenAPI | MCP | CLI | SKILL | GitHub icon

## Responsive Design

| Breakpoint | Layout Changes |
|------------|----------------|
| < 640px (mobile) | Hero tabs stack or scroll horizontally. Product cards 1-column. Get Started cards 1-column. Market row wraps to 2 lines. |
| 640-1024px (tablet) | Hero tabs horizontal. Product cards 2x2. Get Started cards 2x2. |
| >= 1024px (desktop) | Full layout as designed. `container-responsive` caps at 1200px. |

## Internationalization

All user-facing text managed via i18n keys in:
- `docs/.vitepress/theme/locales/en.json`
- `docs/.vitepress/theme/locales/zh-CN.json`
- `docs/.vitepress/theme/locales/zh-HK.json`

Product names (OpenAPI, MCP, CLI, SKILL) remain English across all locales.
Descriptions and step text are translated.

## Dark Mode

All colors use CSS variables — dark mode is automatic via LBUS token system.
Code blocks use the same dark background in both themes.
Hero background uses CSS variables that automatically adapt in dark mode.

## Component Inventory

New or modified Vue components needed:

| Component | Status | Description |
|-----------|--------|-------------|
| `HomePage/index.vue` | **Modify** | Restructure to new section layout |
| `HomePage/HeroSection.vue` | **New** | Title + tabs + code block + CTAs |
| `HomePage/ProductTab.vue` | **New** | Tab switcher with code content |
| `HomePage/ProductShowcase.vue` | **New** | 2x2 product intro cards |
| `HomePage/ProductCard.vue` | **New** | Single product card (icon, desc, code, link) |
| `HomePage/GetStarted.vue` | **New** | 2x2 quick-start guide cards |
| `HomePage/QuickStartCard.vue` | **New** | Stepped guide with code blocks |
| `HomePage/MarketCoverage.vue` | **New** | Compact market + SDK row |
| `HomePage/CodeBlock.vue` | **New** | Dark code block with copy button |
| `HomePage/HomeFeatures.vue` | **Remove** | Replaced by ProductShowcase |
| `HomePage/FeatureItem.vue` | **Remove** | Replaced by ProductCard |
| `HomePage/Markets.vue` | **Remove** | Replaced by MarketCoverage |
| `HomePage/Market.vue` | **Remove** | No longer needed |
| `HomePage/IconComponent.vue` | **Keep** | Reuse for market/product icons |
| `HomePage/Footer.vue` | **Modify** | Update links |

## Content Source

Product descriptions and selling points are derived from:
- `docs/en/docs/getting-started.md` — OpenAPI overview
- `docs/en/docs/mcp.md` — MCP integration
- `docs/en/docs/cli.md` — CLI reference
- `docs/en/skill/index.md` — SKILL overview
- `openapi.yaml` — API capabilities

All code examples in the homepage must be verified working commands.

## Migration Plan

1. Existing `index.md` frontmatter: Remove VitePress `hero` and `features` config, use only `<HomePage />` custom component
2. Remove old SVG illustrations (code.svg, quote.svg, trade.svg, ai.svg) from homepage references — they may still be used elsewhere
3. Old i18n keys for removed sections can be cleaned up after migration is complete

## Success Criteria

- [ ] All 4 products visible and installable from homepage
- [ ] Every code block has working copy-to-clipboard
- [ ] Page renders correctly in light and dark mode
- [ ] Responsive layout works on mobile (< 640px)
- [ ] All text available in en / zh-CN / zh-HK
- [ ] LBUS token compliance — no hardcoded colors, correct rounded/shadow values
- [ ] Page loads in < 2s on 3G connection (no heavy assets)
- [ ] All "View Docs" and CTA links resolve correctly
