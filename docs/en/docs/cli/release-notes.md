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
