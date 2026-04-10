# CLI Section Design

**Date:** 2026-04-10  
**Status:** Approved

## Overview

Add a dedicated CLI section to the Longbridge Developers site, accessible via a top-nav "CLI" item. Each CLI command gets an individual documentation page with usage, parameters, output fields, and JSON examples. The CLI section lives under `/docs/cli/` to preserve the existing `/docs/cli` URL.

## Decisions

- **Scope:** All 50+ commands covered (full coverage, not phased)
- **Language:** English first; zh-CN / zh-HK added later
- **Existing `cli.md`:** Deleted; content redistributed into `index.md`, `setup.md`, and `release-notes.md`
- **URL base:** `/docs/cli/` (existing `/docs/cli` path preserved)
- **login / logout / check / update:** Combined into one `setup.md` page as a Getting Started guide

---

## Top Navigation

```
Home | Skill | Docs | CLI | API Reference | SDK | Issues
```

| Nav Item | Link        | activeMatch                              |
| -------- | ----------- | ---------------------------------------- |
| Docs     | `/docs`     | `^(/en)?/docs(?!/cli)(?!/api)`           |
| CLI      | `/docs/cli` | `^(/en)?/docs/cli`                       |

Applied to: `docs/.vitepress/locales/en/nav.ts`, `zh-CN/nav.ts`, `zh-HK/nav.ts`

---

## File Structure

```
docs/en/docs/cli/
  index.md              → /docs/cli          (Overview + Installation)
  setup.md              → /docs/cli/setup    (login, logout, check, update — one guide page)
  tui.md                → /docs/cli/tui
  release-notes.md      → /docs/cli/release-notes

  market-data/
    _category_.json     { "label": "Market Data", "position": 1, "collapsed": false }
    quote.md            → /docs/cli/market-data/quote
    depth.md
    brokers.md
    trades.md
    intraday.md
    kline.md
    static.md
    calc-index.md
    capital.md
    market-temp.md
    trading.md
    security-list.md
    participants.md
    subscriptions.md

  derivatives/
    _category_.json     { "label": "Derivatives", "position": 2, "collapsed": true }
    option.md
    warrant.md

  fundamentals/
    _category_.json     { "label": "Fundamentals", "position": 3, "collapsed": true }
    financial-report.md
    institution-rating.md
    dividend.md
    forecast-eps.md
    consensus.md
    finance-calendar.md
    valuation.md

  content/
    _category_.json     { "label": "Content", "position": 4, "collapsed": true }
    news.md
    filing.md
    topic.md

  watchlist/
    _category_.json     { "label": "Watchlist", "position": 5, "collapsed": true }
    watchlist.md

  orders/
    _category_.json     { "label": "Orders & Trading", "position": 6, "collapsed": true }
    order.md
    margin-ratio.md
    max-qty.md
    exchange-rate.md

  account/
    _category_.json     { "label": "Portfolio & Account", "position": 7, "collapsed": true }
    assets.md
    cash-flow.md
    portfolio.md
    positions.md
    fund-positions.md
    fund-holder.md

  research/
    _category_.json     { "label": "Research", "position": 8, "collapsed": true }
    shareholder.md
    insider-trades.md
    investors.md
```

**Total pages:** ~45 (index + setup + tui + release-notes + 41 command pages)

---

## Sidebar Architecture

`docs/.vitepress/locales/en/sidebar.ts` changes from a single sidebar to a multi-sidebar object:

```ts
import { genMarkdowDocs } from '../../theme/utils/gen'

const docsSidebar = genMarkdowDocs('en', 'docs', { exclude: ['cli'] })
const cliSidebar  = genMarkdowDocs('en', 'docs/cli')

export const sidebar = {
  '/docs/cli': cliSidebar(),
  '/docs/':    docsSidebar(),
}
```

`genMarkdowDocs` gains an optional `exclude: string[]` parameter. When set, top-level subdirectories matching any entry are skipped during sidebar generation.

Same pattern applied to `zh-CN/sidebar.ts` and `zh-HK/sidebar.ts` (CLI sidebar returns empty until translations exist).

---

## Command Page Template

**Writing philosophy:** Capability-first, not parameter-first. Each page explains what you can *do* with the command, then shows real invocations as evidence. Think user scenarios, not man pages. Use `longbridge <command> --help` and live command runs to source real output for examples.

Frontmatter:

```yaml
---
title: 'quote'
slug: '/cli/market-data/quote'
sidebar_label: 'quote'
sidebar_position: 1
---
```

Page sections (in order):

1. **H1** — `longbridge <command>`
2. **Opening paragraph** — what this command lets you do, from the user's perspective (1–3 sentences). Focus on capability and value, not mechanics.
3. **`## Basic Usage`** — the simplest invocation with a `<CliCommand>` block
4. **`## Scenarios`** — 2–5 named use cases, each with:
   - A short sentence explaining the scenario
   - A `<CliCommand>` block with real examples (run the command to get actual output where possible)
   - Brief explanation of what the output means or how to use it
   - **Where relevant, surface key prerequisites inline** — e.g., "Level 2 quote subscription required", "requires trade permission in OAuth", "only available for HK market". Use a `<TipContainer>` for blockers the user must resolve before the scenario works.
5. **`## Requirements`** — (include when the command has non-obvious permission or account prerequisites):
   - OpenAPI quote tier (e.g., Level 1 / Level 2 required for `depth`, `brokers`)
   - OAuth permission scope (e.g., trade permission needed for `order`, account permission for `assets`, `portfolio`)
   - Account type or market access (e.g., options account needed for `option`, HK-only for `brokers`, crypto access for `.HAS` symbols)
6. **`## Notes`** — (optional) edge cases, limitations, related commands, tips

**What to omit:**
- Arguments / flags tables — use `longbridge <cmd> --help` for exhaustive reference; pages focus on what to *do*, not what flags exist
- `--format` explanation — universal flag, documented once on the index page
- Output field tables — stale-prone; JSON examples in scenarios serve as the field reference

**Permission reference (for authors):**

The existing Docs section (`/docs/getting-started`, `/docs/quote/`, `/docs/trade/`, etc.) has complete coverage of OpenAPI permissions, OAuth scopes, and account requirements. CLI command pages should **link to those pages** rather than duplicating the detail. Surface the key constraint in one sentence inline or in a `<TipContainer>`, then point to the relevant Docs page for the full explanation.

| Command group       | Key requirements                                              |
| ------------------- | ------------------------------------------------------------- |
| `depth`, `brokers`  | Level 2 quote subscription                                    |
| `option`, `warrant` | Options / warrant market data permission                      |
| `order`             | OAuth trade permission                                        |
| `assets`, `portfolio`, `positions`, `cash-flow`, `statement` | OAuth account permission |
| `margin-ratio`, `max-qty` | OAuth trade or account permission                     |
| `.HAS` symbols      | Crypto market access (not available on all account types)     |

---

## Setup Page Structure (`setup.md`)

A guide-style page, not a command reference. Structure:

```markdown
# Setup

## login
description + headless variant + CliCommand

## logout
description + CliCommand

## check
description + what it shows + CliCommand

## update
description + CliCommand
```

---

## index.md Structure

```markdown
# Longbridge CLI

One-line description.

## Installation
(Tabs block from existing cli.md)

## Quick Start
(2–3 CliCommand examples showing the most common workflows)
```

---

## Files to Delete

- `docs/en/docs/cli.md`
- `docs/zh-CN/docs/cli.md`
- `docs/zh-HK/docs/cli.md`

---

## Files to Modify

| File | Change |
| ---- | ------ |
| `docs/.vitepress/locales/en/nav.ts` | Update Docs `activeMatch`, add CLI nav item |
| `docs/.vitepress/locales/zh-CN/nav.ts` | Same |
| `docs/.vitepress/locales/zh-HK/nav.ts` | Same |
| `docs/.vitepress/locales/en/sidebar.ts` | Multi-sidebar |
| `docs/.vitepress/locales/zh-CN/sidebar.ts` | Multi-sidebar |
| `docs/.vitepress/locales/zh-HK/sidebar.ts` | Multi-sidebar |
| `docs/.vitepress/theme/utils/gen.ts` | Add `exclude` option to `genMarkdowDocs` |

---

## Out of Scope

- zh-CN / zh-HK translations of CLI pages (future work)
- MCP section (same pattern, future work)
- Automated CLI output generation (pages authored manually using `longbridge --help` and live command runs)
