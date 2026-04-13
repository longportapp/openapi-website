---
title: 'Release Notes'
sidebar_label: 'Release Notes'
sidebar_position: 100
sidebar_icon: newspaper
---

# Release Notes

### [v0.16.0](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.16.0)

**New: Company & Fundamentals**

- `company` — company overview (founding date, employees, IPO price, address)
- `executive` — company executives and key personnel
- `industry-valuation` — industry valuation comparison with peers (PE/PB/EPS/DY); `dist` subcommand for percentile ranking
- `operating` — operating reviews: financial indicators table + management review
- `corp-action` — corporate actions (splits, dividends, rights, etc.)
- `invest-relation` — investment relations (subsidiary/parent companies)

**New: Market & Quotes**

- `constituent` — index/ETF constituent stocks with sorting + rise/fall stats
- `market-status` — market open/close status for each exchange
- `broker-holding` — broker holding positions for HK stocks (top/detail/daily)
- `ah-premium` — A/H premium ratio kline and intraday data for dual-listed stocks
- `trade-stats` — trade statistics (price distribution by volume)
- `anomaly` — quote anomalies / unusual market movements

**New: Account**

- `alert` — price alerts (list/add/delete)
- `profit-analysis` — P&L summary + per-stock breakdown; `detail` for individual stock P&L with transaction flows; `by-market` for market-filtered view

**Enhancements**

- `update` — cross-platform self-update with Windows support and CDN acceleration; `--release-notes` to view changelog; auto-shows release notes on version change
- `intraday --date` — retrieve historical intraday data for a past date
- `BROWSER` env var support for custom browser selection during login

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
