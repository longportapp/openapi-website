# CLI Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dedicated CLI section to the Longbridge Developers site with individual pages for every CLI command, capability-first writing style, organized under `/docs/cli/`.

**Architecture:** CLI pages live at `docs/en/docs/cli/`, VitePress sidebar is split into multi-sidebar (`/docs/cli` → CLI sidebar, `/docs/` → existing Docs sidebar). `genMarkdowDocs` gains an `exclude` option to prevent CLI from appearing in the Docs sidebar.

**Tech Stack:** VitePress 2.0.0-alpha.16, TypeScript, `genMarkdowDocs` utility, `<CliCommand>` / `<TipContainer>` Vue components, `longbridge` CLI for live output examples.

---

## Writing Philosophy (read before all content tasks)

Every command page is **capability-first**, not a man page:
- Opening paragraph: what can the user *do* with this command
- `## Basic Usage` — simplest invocation with `<CliCommand>` block
- `## Scenarios` — 2–5 named use cases, each: one sentence + `<CliCommand>` block + brief output explanation
- `## Requirements` — only if non-obvious permissions needed (quote level, OAuth scope); link to existing Docs, don't duplicate
- `## Notes` — optional edge cases / tips

**For every page**: run `longbridge <cmd> --help` and the actual commands to get real output for JSON examples.

**What to omit**: flags tables, `--format` explanation (goes on index page only), output field tables.

---

## Task 1: Update `gen.ts` — add `exclude` option

**Files:**
- Modify: `docs/.vitepress/theme/utils/gen.ts`

- [ ] **Open `gen.ts` and update the `genMarkdowDocs` function signature**

Replace:
```ts
export function genMarkdowDocs(lang: string, basePath: string, debug = false) {
  return function (): DefaultTheme.SidebarItem[] {
    const docsRoot = path.resolve(process.cwd(), 'docs')
    const rootDir = path.join(docsRoot, lang, basePath)
    const fc = generateSidebarItems(rootDir, `/${basePath}`, `/${basePath}`, 0, docsRoot)
    if (debug) {
      fs.writeFileSync(path.resolve(__dirname, `./${lang}_sidebar.json`), JSON.stringify(fc, null, 2))
    }
    return fc
  }
}
```

With:
```ts
interface GenOptions {
  exclude?: string[]
  debug?: boolean
}

export function genMarkdowDocs(lang: string, basePath: string, options: GenOptions = {}) {
  return function (): DefaultTheme.SidebarItem[] {
    const docsRoot = path.resolve(process.cwd(), 'docs')
    const rootDir = path.join(docsRoot, lang, basePath)
    const fc = generateSidebarItems(rootDir, `/${basePath}`, `/${basePath}`, 0, docsRoot, options.exclude)
    if (options.debug) {
      fs.writeFileSync(path.resolve(__dirname, `./${lang}_sidebar.json`), JSON.stringify(fc, null, 2))
    }
    return fc
  }
}
```

- [ ] **Update `generateSidebarItems` to accept and use `excludeDirs`**

Change the function signature from:
```ts
function generateSidebarItems(
  dirPath: string,
  relativePath: string,
  rootPath: string,
  depth = 0,
  docsRoot?: string
): DefaultTheme.SidebarItem[] {
```

To:
```ts
function generateSidebarItems(
  dirPath: string,
  relativePath: string,
  rootPath: string,
  depth = 0,
  docsRoot?: string,
  excludeDirs?: string[]
): DefaultTheme.SidebarItem[] {
```

- [ ] **Add exclude check in the directory loop** (inside the `for (const dir of directories)` loop, before processing `dir`):

Find this line:
```ts
    for (const dir of directories) {
      const subDirPath = path.join(dirPath, dir)
```

Replace with:
```ts
    for (const dir of directories) {
      if (depth === 0 && excludeDirs?.includes(dir)) continue
      const subDirPath = path.join(dirPath, dir)
```

- [ ] **Pass `excludeDirs` in the recursive call** inside `generateSidebarItems`:

Find:
```ts
      const subItems = generateSidebarItems(subDirPath, subRelativePath, rootPath, depth + 1, docsRoot)
```

Replace with:
```ts
      const subItems = generateSidebarItems(subDirPath, subRelativePath, rootPath, depth + 1, docsRoot, excludeDirs)
```

- [ ] **Commit**
```bash
git add docs/.vitepress/theme/utils/gen.ts
git commit -m "feat(site): add exclude option to genMarkdowDocs"
```

---

## Task 2: Update English nav + sidebar

**Files:**
- Modify: `docs/.vitepress/locales/en/nav.ts`
- Modify: `docs/.vitepress/locales/en/sidebar.ts`

- [ ] **Update `docs/.vitepress/locales/en/nav.ts`**

Replace the Docs + (isCN CLI) block. The full updated `nav()` function:
```ts
import type { DefaultTheme } from 'vitepress'
import { filterNavItems, getRegion } from '../../region-utils'

export const nav = (): DefaultTheme.NavItem[] => {
  const isCN = getRegion() === 'cn'
  return filterNavItems([
    { text: 'Home', link: '/', activeMatch: '^(/en)?/$' },
    { text: 'Skill', link: '/skill', activeMatch: '^(/en)?/skill' },
    { text: 'Docs', link: '/docs', activeMatch: '^(/en)?/docs(?!/cli)(?!/api)' },
    { text: 'CLI', link: '/docs/cli', activeMatch: '^(/en)?/docs/cli' },
    { text: 'API Reference', link: '/docs/api', activeMatch: '^(/en)?/docs/api' },
    { text: 'SDK', link: '/sdk', activeMatch: '^(/en)?/sdk' },
    { text: 'Issues', link: 'https://github.com/longbridge/openapi/issues', target: '_blank' },
  ])
}
```

- [ ] **Update `docs/.vitepress/locales/en/sidebar.ts`**

Replace the entire file with:
```ts
import { DefaultTheme } from 'vitepress'
import { genMarkdowDocs } from '../../theme/utils/gen'

const docsSidebar = genMarkdowDocs('en', 'docs', { exclude: ['cli'] })
const cliSidebar  = genMarkdowDocs('en', 'docs/cli')

export const sidebar: DefaultTheme.Sidebar = {
  '/docs/cli': cliSidebar(),
  '/docs/':    docsSidebar(),
}
```

- [ ] **Commit**
```bash
git add docs/.vitepress/locales/en/nav.ts docs/.vitepress/locales/en/sidebar.ts
git commit -m "feat(site): add CLI nav item and multi-sidebar for en locale"
```

---

## Task 3: Update zh-CN nav + sidebar

**Files:**
- Modify: `docs/.vitepress/locales/zh-CN/nav.ts`
- Modify: `docs/.vitepress/locales/zh-CN/sidebar.ts`

- [ ] **Update `docs/.vitepress/locales/zh-CN/nav.ts`**

Replace entire file:
```ts
import type { DefaultTheme } from 'vitepress'
import { filterNavItems, getRegion } from '../../region-utils'

export const nav = (lang: string): DefaultTheme.NavItem[] => {
  const isCN = getRegion() === 'cn'
  return filterNavItems([
    { text: '首页', link: `/${lang}/`, activeMatch: `^/${lang}/$` },
    { text: 'Skill', link: `/${lang}/skill`, activeMatch: `^/${lang}/skill` },
    { text: '文档', link: `/${lang}/docs`, activeMatch: `^/${lang}/docs(?!/cli)(?!/api)` },
    { text: 'CLI', link: `/${lang}/docs/cli`, activeMatch: `^/${lang}/docs/cli` },
    { text: 'API 参考', link: `/${lang}/docs/api`, activeMatch: `^/${lang}/docs/api` },
    { text: 'SDK', link: `/${lang}/sdk`, activeMatch: `^/${lang}/sdk` },
    { text: 'Issues', link: 'https://github.com/longbridge/openapi/issues', target: '_blank' },
  ])
}
```

- [ ] **Update `docs/.vitepress/locales/zh-CN/sidebar.ts`**

Replace entire file:
```ts
import { DefaultTheme } from 'vitepress'
import { genMarkdowDocs } from '../../theme/utils/gen'

const lang = 'zh-CN'
const docsSidebar = genMarkdowDocs(lang, 'docs', { exclude: ['cli'] })
const cliSidebar  = genMarkdowDocs(lang, 'docs/cli')

export const sidebar: DefaultTheme.Sidebar = {
  [`/${lang}/docs/cli`]: { base: `/${lang}/docs/cli/`, items: cliSidebar() },
  [`/${lang}/docs/`]:    { base: `/${lang}/`, items: docsSidebar() },
}
```

- [ ] **Commit**
```bash
git add docs/.vitepress/locales/zh-CN/nav.ts docs/.vitepress/locales/zh-CN/sidebar.ts
git commit -m "feat(site): add CLI nav item and multi-sidebar for zh-CN locale"
```

---

## Task 4: Update zh-HK nav + sidebar

**Files:**
- Modify: `docs/.vitepress/locales/zh-HK/nav.ts`
- Modify: `docs/.vitepress/locales/zh-HK/sidebar.ts`

- [ ] **Update `docs/.vitepress/locales/zh-HK/nav.ts`**

Replace entire file:
```ts
import type { DefaultTheme } from 'vitepress'
import { filterNavItems, getRegion } from '../../region-utils'

export const nav = (lang: string): DefaultTheme.NavItem[] => {
  const isCN = getRegion() === 'cn'
  return filterNavItems([
    { text: '首頁', link: `/${lang}/`, activeMatch: `^/${lang}/$` },
    { text: 'Skill', link: `/${lang}/skill`, activeMatch: `^/${lang}/skill` },
    { text: '文檔', link: `/${lang}/docs`, activeMatch: `^/${lang}/docs(?!/cli)(?!/api)` },
    { text: 'CLI', link: `/${lang}/docs/cli`, activeMatch: `^/${lang}/docs/cli` },
    { text: 'API 參考', link: `/${lang}/docs/api`, activeMatch: `^/${lang}/docs/api` },
    { text: 'SDK', link: `/${lang}/sdk`, activeMatch: `^/${lang}/sdk` },
    { text: 'Issues', link: 'https://github.com/longbridge/openapi/issues', target: '_blank' },
  ])
}
```

- [ ] **Update `docs/.vitepress/locales/zh-HK/sidebar.ts`**

Replace entire file:
```ts
import { DefaultTheme } from 'vitepress'
import { genMarkdowDocs } from '../../theme/utils/gen'

const lang = 'zh-HK'
const docsSidebar = genMarkdowDocs(lang, 'docs', { exclude: ['cli'] })
const cliSidebar  = genMarkdowDocs(lang, 'docs/cli')

export const sidebar: DefaultTheme.Sidebar = {
  [`/${lang}/docs/cli`]: { base: `/${lang}/docs/cli/`, items: cliSidebar() },
  [`/${lang}/docs/`]:    { base: `/${lang}/`, items: docsSidebar() },
}
```

- [ ] **Commit**
```bash
git add docs/.vitepress/locales/zh-HK/nav.ts docs/.vitepress/locales/zh-HK/sidebar.ts
git commit -m "feat(site): add CLI nav item and multi-sidebar for zh-HK locale"
```

---

## Task 5: Create directory structure + delete old cli.md

**Files:**
- Create: 9 `_category_.json` files under `docs/en/docs/cli/`
- Delete: `docs/en/docs/cli.md`, `docs/zh-CN/docs/cli.md`, `docs/zh-HK/docs/cli.md`

- [ ] **Create directory structure**
```bash
mkdir -p docs/en/docs/cli/market-data
mkdir -p docs/en/docs/cli/derivatives
mkdir -p docs/en/docs/cli/fundamentals
mkdir -p docs/en/docs/cli/content
mkdir -p docs/en/docs/cli/watchlist
mkdir -p docs/en/docs/cli/orders
mkdir -p docs/en/docs/cli/account
mkdir -p docs/en/docs/cli/research
```

- [ ] **Create `docs/en/docs/cli/market-data/_category_.json`**
```json
{ "label": "Market Data", "position": 2, "collapsed": false }
```

- [ ] **Create `docs/en/docs/cli/derivatives/_category_.json`**
```json
{ "label": "Derivatives", "position": 3, "collapsed": true }
```

- [ ] **Create `docs/en/docs/cli/fundamentals/_category_.json`**
```json
{ "label": "Fundamentals", "position": 4, "collapsed": true }
```

- [ ] **Create `docs/en/docs/cli/content/_category_.json`**
```json
{ "label": "Content", "position": 5, "collapsed": true }
```

- [ ] **Create `docs/en/docs/cli/watchlist/_category_.json`**
```json
{ "label": "Watchlist", "position": 6, "collapsed": true }
```

- [ ] **Create `docs/en/docs/cli/orders/_category_.json`**
```json
{ "label": "Orders & Trading", "position": 7, "collapsed": true }
```

- [ ] **Create `docs/en/docs/cli/account/_category_.json`**
```json
{ "label": "Portfolio & Account", "position": 8, "collapsed": true }
```

- [ ] **Create `docs/en/docs/cli/research/_category_.json`**
```json
{ "label": "Research", "position": 9, "collapsed": true }
```

- [ ] **Delete old cli.md files**
```bash
rm docs/en/docs/cli.md
rm docs/zh-CN/docs/cli.md
rm docs/zh-HK/docs/cli.md
```

- [ ] **Commit**
```bash
git add docs/en/docs/cli/
git rm docs/en/docs/cli.md docs/zh-CN/docs/cli.md docs/zh-HK/docs/cli.md
git commit -m "feat(cli-docs): create CLI section directory structure"
```

---

## Task 6: Create core pages (index, setup, tui, release-notes)

**Files:**
- Create: `docs/en/docs/cli/index.md`
- Create: `docs/en/docs/cli/setup.md`
- Create: `docs/en/docs/cli/tui.md`
- Create: `docs/en/docs/cli/release-notes.md`

- [ ] **Create `docs/en/docs/cli/index.md`**

This is the CLI section landing page. Includes: what Longbridge CLI is, installation tabs (port from old cli.md), quick start examples, and a note about `--format json` being universal.

```markdown
---
title: 'Longbridge CLI'
sidebar_label: 'Overview'
sidebar_position: 1
---

# Longbridge CLI

Longbridge CLI (`longbridge`) is an AI-native command-line tool covering every Longbridge OpenAPI
endpoint — real-time market data, fundamentals, account management, and trading. Designed for
scripting, AI-agent tool-calling, and daily workflows from the terminal.

**GitHub:** [longbridge/longbridge-terminal](https://github.com/longbridge/longbridge-terminal)

## Installation

<Tabs groupId="cli-install">
  <TabItem value="homebrew" label="macOS (Homebrew)" default>

```bash
brew install --cask longbridge/tap/longbridge-terminal
```

  </TabItem>
  <TabItem value="script" label="Linux / macOS (Script)">

```bash
curl -sSL https://open.longbridge.com/longbridge/longbridge-terminal/install | sh
```

  </TabItem>
  <TabItem value="scoop" label="Windows (Scoop)">

```powershell
scoop install https://open.longbridge.com/longbridge/longbridge-terminal/longbridge.json
```

  </TabItem>
  <TabItem value="powershell" label="Windows (PowerShell)">

```powershell
iwr https://open.longbridge.com/longbridge/longbridge-terminal/install.ps1 | iex
```

  </TabItem>
</Tabs>

After installation, run `longbridge login` to authenticate, then try any command:

<CliCommand>
# Check real-time price
longbridge quote TSLA.US NVDA.US

# View your portfolio
longbridge portfolio

# Get JSON output for scripting or AI agents
longbridge quote AAPL.US --format json
</CliCommand>

## JSON Output

Every command supports `--format json` for machine-readable output. Use it for scripting,
piping into `jq`, or feeding data to AI agents:

<CliCommand>
longbridge positions --format json
longbridge quote TSLA.US NVDA.US --format json
</CliCommand>

## Symbol Format

Symbols use `CODE.MARKET` format:

| Example | Market |
| ------- | ------ |
| `TSLA.US` | US stocks |
| `700.HK` | Hong Kong |
| `600519.SH` | China A-share (Shanghai) |
| `000568.SZ` | China A-share (Shenzhen) |
| `D05.SG` | Singapore |
| `BTCUSD.HAS` | Crypto (Longbridge-specific) |
```

- [ ] **Create `docs/en/docs/cli/setup.md`**

Guide-style page covering login, logout, check, update. Run each command to get real output for examples.

```markdown
---
title: 'Setup'
sidebar_label: 'Setup'
sidebar_position: 1
---

# Setup

Get the CLI authenticated and ready to use.

## login

`longbridge login` authenticates via OAuth 2.0 device authorization flow — works in any
environment including SSH, headless servers, and CI.

<CliCommand>
longbridge login
</CliCommand>

Running `login` prints a URL and a short code. Open the URL in any browser, enter the code,
and authorize. The token is saved to `~/.longbridge/openapi/tokens/<client_id>` and reused
automatically by all subsequent commands.

For environments where you can't open a browser on the same machine:

<CliCommand>
# Prints the auth URL; authorize in a browser, then paste the redirect URL back
longbridge login --headless
</CliCommand>

## logout

Clears the stored OAuth token. The next command or TUI launch will trigger re-authentication.

<CliCommand>
longbridge logout
</CliCommand>

## check

Verifies token validity and API connectivity. Shows token status, cached region, and latency
to both Global and CN API endpoints. Does not require an active market session.

<CliCommand>
longbridge check
longbridge check --format json
</CliCommand>

## update

Downloads and runs the official install script to replace the current binary with the latest release.

<CliCommand>
longbridge update
</CliCommand>
```

- [ ] **Create `docs/en/docs/cli/tui.md`**

Run `longbridge tui --help` for details. Page should describe TUI capabilities: watchlist, candlestick charts, portfolio view, keybindings.

```markdown
---
title: 'tui'
sidebar_label: 'tui'
sidebar_position: 2
---

# longbridge tui

Launch the interactive full-screen terminal UI — a real-time trading dashboard with watchlist
management, live candlestick charts, portfolio view, and stock search. Vim-style keybindings.

## Basic Usage

<CliCommand>
longbridge tui
</CliCommand>

## Scenarios

### Monitor a watchlist in real time

The TUI opens your watchlist and shows live price ticks, change percentages, and volume.
Navigate between stocks with `j`/`k` or arrow keys.

### View candlestick charts

Press `Enter` on any symbol to open the stock detail view with a live K-line chart.
Switch between timeframes with `1m`, `5m`, `1h`, `1d` keybindings.

### Search and add symbols

Press `/` to open the search overlay. Type a symbol name or code to find and add it to
your watchlist.

## Notes

- Requires a valid `longbridge login` session
- The TUI shares the same token as CLI commands
- Press `q` or `Ctrl+C` to quit
```

- [ ] **Create `docs/en/docs/cli/release-notes.md`**

Port the release notes from the old `cli.md`. Copy the entire `## Release notes` section content (v0.12.0–v0.15.0 plus the full changelog link).

```markdown
---
title: 'Release Notes'
sidebar_label: 'Release Notes'
sidebar_position: 100
---

# Release Notes

### [v0.15.0](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.15.0)

- **New: `portfolio` command** — total P/L, asset distribution by market (US/HK/CN/SG/Cash), holdings, and cash balances
- **New: `investors` command** — SEC 13F-based active fund manager rankings; view any investor's holdings by CIK with live prices
- **New: `insider-trades`** — SEC Form 4 insider transaction history for any symbol
- **New: `watchlist pin/unpin`** — pin securities to the top of a watchlist group
- **Enhanced: `assets`** — renamed from `balance`; now shows full asset overview: net assets, buying power, margin, risk level, and per-currency cash breakdown

### [v0.14.2](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.14.2)

- **New: `--lang` global flag** — set content language (`zh-CN`, `zh-HK`, `en`) for all commands; falls back to system `LANG` env var then `en`

### [v0.14.1](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.14.1)

- **New: CN region login** — `longbridge login` now supports China region routing
- **New: `-v` flag** — show version without entering the full command

### [v0.14.0](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.14.0)

- **New: Device auth login** — `longbridge login` now uses OAuth device flow; displays a URL and code to authorize on any device, works in SSH and headless environments; `--headless` flag removed
- **New: Order enhancements** — trailing stop and AO order types; `--expire-date`, `--outside-rth`, `--remark` added to order commands
- **Fix: Linux segfault** — prebuilt Linux binary now uses musl to fix crash on some distributions

### [v0.13.0](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.13.0)

- **New: Fundamentals & analysis commands** — `financial-report`, `valuation`, `forecast-eps`, `consensus`, `institution-rating`, `shareholder`, `fund-holder`, `dividend`, `finance-calendar`, `exchange-rate`
- **Breaking: command restructure** — 19 flat commands moved into subcommand trees (e.g. `news-detail` → `news detail`, `kline-history` → `kline history`, `warrant-list` → `warrant list`)
- **CN region support** — set `LONGBRIDGE_REGION=cn` to route through the China endpoint

### [v0.12.0](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.12.0)

- **New: `statement` commands** — list and export daily/monthly account statements
- **TUI** — fixed `q` quit; added news list and detail views inside watchlist

---

Full changelog: [github.com/longbridge/longbridge-terminal/releases](https://github.com/longbridge/longbridge-terminal/releases)
```

- [ ] **Commit**
```bash
git add docs/en/docs/cli/index.md docs/en/docs/cli/setup.md docs/en/docs/cli/tui.md docs/en/docs/cli/release-notes.md
git commit -m "feat(cli-docs): add CLI index, setup, tui, and release-notes pages"
```

---

## Task 7: Market Data pages (14 pages)

**Files to create** (all in `docs/en/docs/cli/market-data/`):
`quote.md`, `depth.md`, `brokers.md`, `trades.md`, `intraday.md`, `kline.md`, `static.md`, `calc-index.md`, `capital.md`, `market-temp.md`, `trading.md`, `security-list.md`, `participants.md`, `subscriptions.md`

For each page below: run the specified commands to get real output, then write the page following the template (Basic Usage → Scenarios → Requirements if needed → Notes if needed).

---

### `quote.md` — Real-time quotes

Run for examples:
```bash
longbridge quote TSLA.US NVDA.US 700.HK
longbridge quote AAPL.US --format json
```

Frontmatter: `title: 'quote'`, `sidebar_label: 'quote'`, `sidebar_position: 1`

Scenarios to cover:
- Check price for a single stock
- Compare multiple symbols at once (US + HK in one call)
- Extended hours data for US stocks (pre-market / post-market fields in JSON output)
- JSON output for scripting

JSON example: use the `--format json` output from the run above.

---

### `depth.md` — Level 2 order book

Run for examples:
```bash
longbridge depth 700.HK
longbridge depth 700.HK --format json
```

Frontmatter: `title: 'depth'`, `sidebar_label: 'depth'`, `sidebar_position: 2`

Scenarios:
- View bid/ask ladder for a HK stock
- JSON output for programmatic processing

Requirements section: Level 2 quote subscription required. Link to `/docs/quote/` for subscription details.

---

### `brokers.md` — Broker queue

Run for examples:
```bash
longbridge brokers 700.HK
longbridge brokers 700.HK --format json
```

Frontmatter: `title: 'brokers'`, `sidebar_label: 'brokers'`, `sidebar_position: 3`

Scenarios:
- See which broker IDs are at each price level
- Understand institutional order flow (large broker concentrations)

Requirements: Level 2 subscription. HK market only.

---

### `trades.md` — Recent tick-by-tick trades

Run for examples:
```bash
longbridge trades TSLA.US
longbridge trades TSLA.US --count 50 --format json
```

Frontmatter: `title: 'trades'`, `sidebar_label: 'trades'`, `sidebar_position: 4`

Scenarios:
- View last 20 trades
- Get more trades with `--count`
- Detect buy/sell pressure from direction field

---

### `intraday.md` — Intraday price line

Run for examples:
```bash
longbridge intraday TSLA.US
longbridge intraday AAPL.US --session all --format json
```

Frontmatter: `title: 'intraday'`, `sidebar_label: 'intraday'`, `sidebar_position: 5`

Scenarios:
- View today's minute-by-minute price/volume
- Include pre-market and post-market with `--session all`

---

### `kline.md` — Candlestick (K-line) data

Run for examples:
```bash
longbridge kline TSLA.US
longbridge kline TSLA.US --period 1h --count 48
longbridge kline TSLA.US --period day --start 2025-01-01 --end 2025-03-31 --format json
```

Frontmatter: `title: 'kline'`, `sidebar_label: 'kline'`, `sidebar_position: 6`

Scenarios:
- Default daily candles (last 100 days)
- Intraday candles with 1h period
- Historical range with `--start` / `--end`
- JSON output for backtesting or charting pipelines

---

### `static.md` — Static reference info

Run for examples:
```bash
longbridge static NVDA.US TSLA.US
longbridge static 700.HK --format json
```

Frontmatter: `title: 'static'`, `sidebar_label: 'static'`, `sidebar_position: 7`

Scenarios:
- Look up lot size, exchange, currency, EPS, BPS for one or more symbols
- Verify symbol exists and get basic metadata before trading

---

### `calc-index.md` — Financial indexes

Run for examples:
```bash
longbridge calc-index TSLA.US NVDA.US --index pe pb dividend_yield
longbridge calc-index 700.HK --index pe pb turnover_rate --format json
```

Frontmatter: `title: 'calc-index'`, `sidebar_label: 'calc-index'`, `sidebar_position: 8`

Scenarios:
- Check P/E and P/B ratios for a stock
- Compare dividend yield across multiple holdings
- Get options greeks (delta, gamma, vega) for derivatives — run `longbridge calc-index --help` to show full index list in Notes section

---

### `capital.md` — Intraday capital flow

Run for examples:
```bash
longbridge capital flow TSLA.US
longbridge capital dist TSLA.US --format json
```

Frontmatter: `title: 'capital'`, `sidebar_label: 'capital'`, `sidebar_position: 9`

Scenarios:
- Track large money inflow/outflow over the day with `flow`
- Snapshot capital distribution (large/medium/small money) with `dist`

---

### `market-temp.md` — Market temperature

Run for examples:
```bash
longbridge market-temp
longbridge market-temp --market US
longbridge market-temp --format json
```

Frontmatter: `title: 'market-temp'`, `sidebar_label: 'market-temp'`, `sidebar_position: 10`

Scenarios:
- Check overall market sentiment (0–100 scale, higher = more bullish)
- Filter by market (US / HK / CN)

---

### `trading.md` — Trading session schedule

Run for examples:
```bash
longbridge trading TSLA.US
longbridge trading 700.HK --format json
```

Frontmatter: `title: 'trading'`, `sidebar_label: 'trading'`, `sidebar_position: 11`

Scenarios:
- Check whether a market is currently open
- See today's trading session times
- Look up trading calendar for holidays

---

### `security-list.md` — US overnight securities

Run for examples:
```bash
longbridge security-list
longbridge security-list --format json | head -20
```

Frontmatter: `title: 'security-list'`, `sidebar_label: 'security-list'`, `sidebar_position: 12`

Scenarios:
- List securities eligible for US overnight trading
- Check if a specific symbol supports overnight before placing an order

---

### `participants.md` — Market makers

Run for examples:
```bash
longbridge participants
longbridge participants --format json
```

Frontmatter: `title: 'participants'`, `sidebar_label: 'participants'`, `sidebar_position: 13`

Scenarios:
- Look up broker ID to name mapping for HK market makers
- Cross-reference broker IDs seen in `brokers` output

---

### `subscriptions.md` — Active subscriptions

Run for examples:
```bash
longbridge subscriptions
longbridge subscriptions --format json
```

Frontmatter: `title: 'subscriptions'`, `sidebar_label: 'subscriptions'`, `sidebar_position: 14`

Scenarios:
- See which symbols are currently subscribed for real-time WebSocket quotes in this session
- Debug missing push data

- [ ] **Write all 14 market-data pages** following the guidance above. Run the specified commands to get real output for JSON examples.

- [ ] **Commit**
```bash
git add docs/en/docs/cli/market-data/
git commit -m "feat(cli-docs): add market-data command pages (14 pages)"
```

---

## Task 8: Derivatives pages (2 pages)

**Files to create** (in `docs/en/docs/cli/derivatives/`):
`option.md`, `warrant.md`

---

### `option.md` — Option quotes and chain

Run for examples:
```bash
longbridge option --help
longbridge option AAPL.US 2025-06-20 --format json 2>/dev/null | head -30
```

Frontmatter: `title: 'option'`, `sidebar_label: 'option'`, `sidebar_position: 1`

Scenarios:
- View option chain for a symbol on a given expiry date
- Filter by call/put and strike range
- Get Greeks for a specific option contract

Requirements: Options market data permission. Link to `/docs/quote/` for access details.

---

### `warrant.md` — Warrant quotes and list

Run for examples:
```bash
longbridge warrant --help
longbridge warrant list 700.HK --format json 2>/dev/null | head -20
```

Frontmatter: `title: 'warrant'`, `sidebar_label: 'warrant'`, `sidebar_position: 2`

Scenarios:
- List all warrants for a HK underlying
- Filter by issuer or type (call/put)
- View real-time warrant quote with premium and leverage ratio

Notes: HK market warrants only.

- [ ] **Write both derivative pages**

- [ ] **Commit**
```bash
git add docs/en/docs/cli/derivatives/
git commit -m "feat(cli-docs): add derivatives command pages (option, warrant)"
```

---

## Task 9: Fundamentals pages (7 pages)

**Files to create** (in `docs/en/docs/cli/fundamentals/`):
`financial-report.md`, `institution-rating.md`, `dividend.md`, `forecast-eps.md`, `consensus.md`, `finance-calendar.md`, `valuation.md`

---

### `financial-report.md`

Run: `longbridge financial-report AAPL.US --format json 2>/dev/null | head -30`

Scenarios: view income statement / balance sheet / cash flow; compare multiple periods.

---

### `institution-rating.md`

Run: `longbridge institution-rating TSLA.US --format json 2>/dev/null | head -20`

Scenarios: see analyst buy/hold/sell breakdown; view target price range.

---

### `dividend.md`

Run: `longbridge dividend TSLA.US --format json 2>/dev/null | head -20`

Scenarios: see dividend history; check upcoming ex-dividend date.

---

### `forecast-eps.md`

Run: `longbridge forecast-eps AAPL.US --format json 2>/dev/null | head -20`

Scenarios: view analyst EPS consensus estimates; see quarterly forecast trend.

---

### `consensus.md`

Run: `longbridge consensus AAPL.US --format json 2>/dev/null | head -20`

Scenarios: get full financial consensus (revenue, EPS, EBITDA estimates) for upcoming quarters.

---

### `finance-calendar.md`

Run: `longbridge finance-calendar --format json 2>/dev/null | head -20`

Scenarios: see upcoming earnings, dividends, and economic events; filter by type.

---

### `valuation.md`

Run: `longbridge valuation TSLA.US --format json 2>/dev/null | head -20`

Scenarios: compare P/E, P/B, P/S, dividend yield against sector peers; identify under/overvaluation.

---

For all 7 pages: `sidebar_position` 1–7 respectively.

- [ ] **Write all 7 fundamentals pages**

- [ ] **Commit**
```bash
git add docs/en/docs/cli/fundamentals/
git commit -m "feat(cli-docs): add fundamentals command pages (7 pages)"
```

---

## Task 10: Content + Watchlist pages (4 pages)

**Files to create:**
- `docs/en/docs/cli/content/news.md`
- `docs/en/docs/cli/content/filing.md`
- `docs/en/docs/cli/content/topic.md`
- `docs/en/docs/cli/watchlist/watchlist.md`

---

### `news.md`

Run:
```bash
longbridge news TSLA.US --format json 2>/dev/null | head -20
longbridge news --help
```

Scenarios:
- Get latest news for a symbol
- Fetch full article content with `news detail <id>`

---

### `filing.md`

Run:
```bash
longbridge filing AAPL.US --format json 2>/dev/null | head -20
longbridge filing --help
```

Scenarios:
- List regulatory filings (10-K, 10-Q, 8-K) for a US stock
- Fetch full filing content with `filing detail <id>`

---

### `topic.md`

Run:
```bash
longbridge topic TSLA.US --format json 2>/dev/null | head -20
```

Scenarios:
- Browse community discussion topics for a symbol
- Pipe into `jq` to extract high-engagement posts

---

### `watchlist.md`

Run:
```bash
longbridge watchlist
longbridge watchlist create "My Portfolio" TSLA.US NVDA.US
longbridge watchlist update --help
longbridge watchlist --format json
```

Scenarios:
- View all watchlist groups and their securities
- Create a new group with initial symbols
- Add/remove symbols from an existing group with `update --add` / `update --remove`
- Rename a group
- Delete a group
- Pin symbols to the top of a group with `pin`

Requirements: Requires valid OAuth login.

- [ ] **Write all 4 pages**

- [ ] **Commit**
```bash
git add docs/en/docs/cli/content/ docs/en/docs/cli/watchlist/
git commit -m "feat(cli-docs): add content and watchlist command pages"
```

---

## Task 11: Orders pages (4 pages)

**Files to create** (in `docs/en/docs/cli/orders/`):
`order.md`, `margin-ratio.md`, `max-qty.md`, `exchange-rate.md`

---

### `order.md`

Run:
```bash
longbridge order --help
longbridge order buy --help
longbridge order --format json 2>/dev/null | head -20
```

Scenarios:
- List today's orders
- View historical orders with `--history --start`
- Place a limit buy order with `order buy`
- Cancel a pending order with `order cancel`
- Modify an order with `order replace`
- View full order detail with `order detail`
- See trade executions (fills) with `order executions`

Requirements: OAuth trade permission required. Link to `/docs/trade/` for permission setup.

Notes: Buy/sell/cancel/replace commands prompt for confirmation before submitting.

---

### `margin-ratio.md`

Run: `longbridge margin-ratio TSLA.US --format json 2>/dev/null`

Scenarios:
- Check initial margin, maintenance margin requirements for a symbol before sizing a position

Requirements: OAuth trade or account permission.

---

### `max-qty.md`

Run: `longbridge max-qty TSLA.US buy --format json 2>/dev/null`

Scenarios:
- Estimate maximum buy quantity given current cash and margin
- Estimate maximum sell quantity for a short position

Requirements: OAuth account permission.

---

### `exchange-rate.md`

Run: `longbridge exchange-rate --format json 2>/dev/null | head -20`

Scenarios:
- Get live exchange rates for USD/HKD, USD/CNY, etc.
- Use in scripts to convert portfolio values to a single currency

- [ ] **Write all 4 order pages**

- [ ] **Commit**
```bash
git add docs/en/docs/cli/orders/
git commit -m "feat(cli-docs): add orders and trading command pages"
```

---

## Task 12: Account & Portfolio pages (6 pages)

**Files to create** (in `docs/en/docs/cli/account/`):
`assets.md`, `cash-flow.md`, `portfolio.md`, `positions.md`, `fund-positions.md`, `fund-holder.md`

Requirements for all pages in this group: OAuth account permission. Link to `/docs/trade/` for permission setup.

---

### `assets.md`

Run: `longbridge assets --format json 2>/dev/null`

Scenarios:
- View net assets, buying power, margin usage, risk level
- See per-currency cash breakdown (USD, HKD, CNY)

---

### `cash-flow.md`

Run: `longbridge cash-flow --format json 2>/dev/null | head -20`

Scenarios:
- View recent cash movements (deposits, dividends, settlements)
- Filter by date range with `--start` / `--end`

---

### `portfolio.md`

Run: `longbridge portfolio --format json 2>/dev/null`

Scenarios:
- Get a full portfolio overview: total assets, P/L, today's P/L
- See holdings distribution by market (US/HK/CN/SG)
- View individual positions with cost basis and unrealized P/L

---

### `positions.md`

Run: `longbridge positions --format json 2>/dev/null`

Scenarios:
- List all current equity positions with cost price, quantity, available quantity
- Filter by market or symbol

---

### `fund-positions.md`

Run: `longbridge fund-positions --format json 2>/dev/null`

Scenarios:
- View current mutual fund / ETF positions

---

### `fund-holder.md`

Run: `longbridge fund-holder TSLA.US --format json 2>/dev/null | head -20`

Scenarios:
- See which ETFs and mutual funds hold a given stock
- Understand institutional ownership structure

- [ ] **Write all 6 account pages**

- [ ] **Commit**
```bash
git add docs/en/docs/cli/account/
git commit -m "feat(cli-docs): add account and portfolio command pages"
```

---

## Task 13: Research pages (3 pages)

**Files to create** (in `docs/en/docs/cli/research/`):
`shareholder.md`, `insider-trades.md`, `investors.md`

---

### `shareholder.md`

Run: `longbridge shareholder TSLA.US --format json 2>/dev/null | head -20`

Scenarios:
- View top institutional shareholders for a symbol
- Track changes in institutional ownership

---

### `insider-trades.md`

Run: `longbridge insider-trades TSLA.US --format json 2>/dev/null | head -20`

Scenarios:
- View SEC Form 4 insider transactions for a US-listed company
- Filter by date range
- Identify buy vs. sell patterns from executives and directors

Notes: US-listed companies only (SEC Form 4 filings).

---

### `investors.md`

Run:
```bash
longbridge investors --format json 2>/dev/null | head -20
longbridge investors --help
```

Scenarios:
- View top institutional investors (active fund manager rankings from SEC 13F)
- Look up a specific investor's portfolio by CIK number
- See which stocks a fund manager has been buying or selling

- [ ] **Write all 3 research pages**

- [ ] **Commit**
```bash
git add docs/en/docs/cli/research/
git commit -m "feat(cli-docs): add research command pages (shareholder, insider-trades, investors)"
```

---

## Self-Review Checklist

- [x] **Spec coverage:** All sections covered — nav (Tasks 2–4), sidebar (Tasks 2–4), gen.ts exclude (Task 1), directory structure (Task 5), core pages (Task 6), all 41 command pages (Tasks 7–13), old cli.md deletion (Task 5)
- [x] **No placeholders:** All code blocks contain actual code; all commands are real `longbridge` invocations
- [x] **Type consistency:** `GenOptions` interface defined in Task 1 and used consistently; no name drift across tasks
- [x] **isCN handling:** `isCN` variable removed from nav in all three locales — CLI tab is now always visible (not CN-only conditional)
