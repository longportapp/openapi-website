---
sidebar_position: 2.1
slug: /cli
sidebar_label: CLI
sidebarCollapsed: true
sidebar_icon: terminal
id: cli
---

# Longbridge Terminal CLI

Longbridge Terminal is an AI-native CLI covering every Longbridge OpenAPI endpoint — real-time market data, account management, and trading. Designed for scripting, AI-agent tool-calling, and daily trading workflows from the terminal.

**GitHub:** [longbridge/longbridge-terminal](https://github.com/longbridge/longbridge-terminal)

```bash
$ longbridge static NVDA.US
+---------+--------------------+----------+----------+----------+--------------+--------------+--------------------+--------------------+-------------------+----------------+
| Symbol  | Name (EN)          | Exchange | Currency | Lot Size | Total Shares | Circ. Shares | EPS                | EPS TTM            | BPS               | Dividend Yield |
+============================================================================================================================================================================+
| NVDA.US | NVIDIA Corporation | NASD     | USD      | 1        | 24300000000  | 23501828621  | 4.9410288065843621 | 4.9410288065843621 | 6.472962962962963 | 0.04           |
+---------+--------------------+----------+----------+----------+--------------+--------------+--------------------+--------------------+-------------------+----------------+

$ longbridge quote TSLA.US NVDA.US --format json
[
  {
    "high": "403.730",
    "last": "395.560",
    "low": "394.420",
    "open": "396.220",
    "prev_close": "391.200",
    "status": "Normal",
    "symbol": "TSLA.US",
    "turnover": "23138752546.000",
    "volume": "58068343"
  },
  {
    "high": "188.880",
    "last": "183.220",
    "low": "181.410",
    "open": "182.970",
    "prev_close": "180.250",
    "status": "Normal",
    "symbol": "NVDA.US",
    "turnover": "40023702698.000",
    "volume": "217307380"
  }
]
```

## Installation

**macOS** (requires [Homebrew](https://brew.sh))

```bash
brew install --cask longbridge/tap/longbridge-terminal
```

**macOS / Linux**

```bash
curl -sSL https://github.com/longbridge/longbridge-terminal/raw/main/install | sh
```

**Windows** ([Scoop](https://scoop.sh))

```powershell
scoop install https://raw.githubusercontent.com/longbridge/longbridge-terminal/main/.scoop/longbridge.json
```

**Windows** (PowerShell)

```powershell
iwr https://github.com/longbridge/longbridge-terminal/raw/main/install.ps1 | iex
```

Installs `longbridge` to `/usr/local/bin` (macOS/Linux) or `%LOCALAPPDATA%\Programs\longbridge` (Windows). On Windows the binary is `longbridge.exe`.

After installation, authenticate and explore available commands:

```bash
longbridge --help   # List all available commands
longbridge login    # Opens browser for OAuth, saves token to ~/.longbridge/terminal/.openapi-session
```

## Authentication

Uses OAuth 2.0 — no manual token management required:

```bash
longbridge login    # Opens browser for OAuth, saves token to ~/.longbridge/terminal/.openapi-session
longbridge logout   # Clear saved token
```

## Available capabilities

### Market data

```bash
longbridge quote TSLA.US 700.HK                                       # Real-time quotes
longbridge depth TSLA.US                                              # Level 2 order book depth
longbridge trades TSLA.US [--count 50]                                # Recent tick-by-tick trades
longbridge kline TSLA.US [--period day] [--count 100]                 # OHLCV candlestick data
longbridge kline history TSLA.US --start 2024-01-01 --end 2024-12-31 # Historical candlestick data
longbridge intraday TSLA.US                                           # Intraday minute-by-minute data
longbridge static TSLA.US                                             # Static reference info
longbridge calc-index TSLA.US --index pe,pb,eps                       # Financial indexes (PE, PB, EPS, etc.)
longbridge capital flow TSLA.US                                       # Intraday capital flow time series
longbridge capital dist TSLA.US                                       # Capital distribution snapshot
longbridge market-temp [HK|US|CN|SG]                                  # Market sentiment temperature (0–100)
```

### Company filings & announcements

```bash
longbridge filing list AAPL.US [--count 20]          # Company filings and announcements (earnings, disclosures, SEC filings, etc.)
longbridge filing detail AAPL.US <id>            # Full Markdown content of a filing; --file-index N for multi-file filings (e.g. 8-K exhibit)
```

### Fundamentals & analysis

```bash
# Financial statements (income, balance sheet, cash flow)
longbridge financial-report TSLA.US
# Income statement, annual
longbridge financial-report TSLA.US --kind IS --report af
# Balance sheet, quarterly
longbridge financial-report TSLA.US --kind BS --report qf
# Valuation snapshot: P/E, P/B, P/S, dividend yield + peer comparison
longbridge valuation TSLA.US
# Historical P/E time series
longbridge valuation TSLA.US --history
# P/B history, 5-year range
longbridge valuation TSLA.US --history --indicator pb --range 5
# Analyst EPS forecast consensus
longbridge forecast-eps TSLA.US
# Revenue/profit/EPS consensus with beat/miss annotations
longbridge consensus TSLA.US
# Rating distribution and consensus target price
longbridge institution-rating TSLA.US
# Monthly rating trends and analyst accuracy
longbridge institution-rating detail TSLA.US
# Institutional shareholders with change tracking
longbridge shareholder AAPL.US
# Increasing holders, sorted by position size
longbridge shareholder AAPL.US --range inc --sort owned
# Funds and ETFs that hold a symbol (top 20)
longbridge fund-holder AAPL.US
# All holders
longbridge fund-holder AAPL.US --count -1
# Historical dividends
longbridge dividend AAPL.US
# Dividend distribution plan details
longbridge dividend detail AAPL.US
# Upcoming financial events
longbridge finance-calendar financial
# Earnings calendar for specific symbols
longbridge finance-calendar report --symbol AAPL.US --symbol TSLA.US
# High-importance macro events only
longbridge finance-calendar macrodata --star 3
# Upcoming US dividend events
longbridge finance-calendar dividend --market US
# Exchange rates for all supported currencies
longbridge exchange-rate
```

### Community content

```bash
longbridge topic mine                           # My published topics (all types)
longbridge topic mine --type article            # Articles only
longbridge topic mine --type post --size 10     # Short posts, 10 per page
longbridge topic mine --page 2                  # Paginate
longbridge topic create --body "Bullish on 700.HK"                                    # Short post (plain text)
longbridge topic create --body "NVDA GTC highlights" --tickers NVDA.US                # With related tickers
longbridge topic create --title "My Analysis" --body "$(cat post.md)" --type article  # Article from file
```

### Options & warrants

```bash
longbridge option quote AAPL240119C190000         # Real-time option quotes
longbridge option chain AAPL.US                   # Option chain: all expiry dates
longbridge option chain AAPL.US --date 2024-01-19 # Strike prices for a given expiry
longbridge warrant quote 12345.HK                 # Real-time warrant quotes
longbridge warrant list 700.HK                    # Warrants linked to an underlying
```

### Watchlist

```bash
longbridge watchlist                                             # List watchlist groups
longbridge watchlist create "My Portfolio"                       # Create a new group
longbridge watchlist update <id> --add TSLA.US --remove AAPL.US  # Add/remove securities
longbridge watchlist delete <id>                                 # Delete a group
```

### Trading

```bash
longbridge orders                                      # Today's orders; add --history for past orders
longbridge buy TSLA.US 100 --price 250.00              # Submit a buy order (prompts for confirmation)
longbridge sell TSLA.US 100 --price 260.00             # Submit a sell order (prompts for confirmation)
longbridge cancel <order_id>                           # Cancel a pending order (prompts for confirmation)
longbridge replace <order_id> --qty 200 --price 255.00 # Modify a pending order
longbridge balance                                     # Account cash balance
longbridge positions                                   # Stock positions
longbridge fund-positions                              # Fund positions
longbridge executions                                  # Trade executions (fills)
```

### Account statements

```bash
longbridge statement list                                                       # List recent daily statements
longbridge statement list --type monthly                                        # List monthly statements
longbridge statement export --file-key <KEY> --section equity_holdings          # Export a section as Markdown to stdout
longbridge statement export --file-key <KEY> --section stock_trades -o trades.csv  # Export to CSV file
longbridge statement export --file-key <KEY> --all                             # Export all non-empty sections
longbridge statement export --file-key <KEY> --all -o ./report/                # Export all non-empty sections as CSV
```

### Symbol format

```
<CODE>.<MARKET>   e.g.   TSLA.US   700.HK   600519.SH
```

Markets: `HK` (Hong Kong) · `US` (United States) · `CN` / `SH` / `SZ` (China A-share) · `SG` (Singapore)

## AI integration

### JSON output

All commands support `--format json` for machine-readable output, suitable for AI-agent tool-calling and piping:

```bash
longbridge quote TSLA.US --format json
longbridge positions --format json | jq '.[] | {symbol, quantity}'
```

### Install the AI skill

Install the Longbridge Skill to let your AI assistant (Claude Code, Codex, Cursor, etc.) use all `longbridge` commands on your behalf. Once installed, you can ask in plain language and the AI handles the data fetching, analysis, and order execution.

Things you can do after installing the Skill:

- Screen stocks across US, HK, A-shares, and Singapore markets using conditions like market cap, P/E, and technical signals
- Get a full technical diagnosis for any stock — MA, MACD, KDJ, RSI, support/resistance levels, across daily/hourly/15-min charts
- Analyze earnings: actual vs analyst estimates, revenue by segment, valuation metrics, SEC filings
- Track insider trades and institutional position changes for any stock
- Place limit orders, trailing stops, and options orders — with confirmation before execution
- Review your portfolio P&L, position breakdown, and contribution by stock for any date range

```bash
npx skills add longbridge/developers
```

If the Skill isn't triggered automatically, prefix your request with `/longbridge` to force it — for example: `/longbridge get the current quote for AAPL`.

Once installed, AI can query market data, run technical analysis, and manage trades directly from the conversation:

```
claude> Show me recent 5 days performance of NVDA and TSLA

⏺ Bash(longbridge kline TSLA.US --period day --count 5 & longbridge kline NVDA.US --period day --count 5 & wait)
  ⎿  +---------------------+---------+---------+---------+---------+----------+-----------------+
     | Time                | Open    | High    | Low     | Close   | Volume   | Turnover        |
     … +11 lines (ctrl+o to expand)

⏺ TSLA data loaded. Here's what we have:

  TSLA.US — Last 5 Days

  ┌────────┬────────┬────────┬────────┬────────┬──────────┐
  │  Date  │  Open  │  High  │  Low   │ Close  │  Change  │
  ├────────┼────────┼────────┼────────┼────────┼──────────┤
  │ Mar 10 │ 402.22 │ 406.59 │ 398.19 │ 399.24 │ —        │
  ├────────┼────────┼────────┼────────┼────────┼──────────┤
  │ Mar 11 │ 402.28 │ 416.38 │ 402.15 │ 407.82 │ ▲ +2.15% │
  ├────────┼────────┼────────┼────────┼────────┼──────────┤
  │ Mar 12 │ 405.18 │ 406.50 │ 394.65 │ 395.01 │ ▼ -3.14% │
  ├────────┼────────┼────────┼────────┼────────┼──────────┤
  │ Mar 13 │ 399.17 │ 400.20 │ 389.95 │ 391.20 │ ▼ -0.96% │
  ├────────┼────────┼────────┼────────┼────────┼──────────┤
  │ Mar 16 │ 396.22 │ 403.73 │ 394.42 │ 395.56 │ ▲ +1.11% │
  └────────┴────────┴────────┴────────┴────────┴──────────┘

  5-day return: -0.92% | Range: $389.95 – $416.38
```

### Earnings analysis example

AI can use `filings` to discover filing IDs, then `filing-detail` to pull the full content and run cross-company earnings comparisons:

```
claude> Compare TSLA and NVDA Q4 2025 earnings

⏺ Bash(longbridge filing list TSLA.US & longbridge filing list NVDA.US & wait)
  ⎿  TSLA.US  610186794100660481  10-K   2025-02-26  Annual Report FY2025
     NVDA.US  620129220687041793  8-K    2026-02-26  Q4 FY2026 Earnings Release
     … +18 filings

⏺ Bash(longbridge filing detail TSLA.US 610186794100660481 --file-index 0 &
        longbridge filing detail NVDA.US 620129220687041793 --file-index 1 & wait)
  ⎿  [TSLA 10-K FY2025 / NVDA 8-K Exhibit 99.1 Q4 FY2026 loaded]

⏺ Source: official filings via Longbridge filings + filing-detail
  - TSLA: 10-K FY2025 (filing-detail TSLA.US 610186794100660481 --file-index 0)
  - NVDA: 8-K Exhibit 99.1 Q4 FY2026 (filing-detail NVDA.US 620129220687041793 --file-index 1)

  1. Income statement comparison (full year)

  ┌──────────────────┬─────────────┬─────────────┬─────────────┐
  │      Metric      │ TSLA FY2025 │ NVDA FY2026 │    Delta    │
  ├──────────────────┼─────────────┼─────────────┼─────────────┤
  │ Revenue          │    $94,827M │   $215,938M │  NVDA 2.3x  │
  │ Revenue YoY      │         -3% │        +65% │           — │
  │ Gross profit     │    $17,094M │   $153,463M │    NVDA 9x  │
  │ Gross margin     │       18.0% │       71.1% │   +53 ppts  │
  │ Operating income │     $4,355M │   $130,387M │   NVDA 30x  │
  │ Operating margin │        4.6% │       60.4% │   +56 ppts  │
  │ Net income       │     $3,794M │   $120,067M │   NVDA 32x  │
  │ Diluted EPS      │       $1.08 │       $4.90 │           — │
  └──────────────────┴─────────────┴─────────────┴─────────────┘

  2. Cash flow comparison (full year)

  ┌──────────────────┬─────────────┬─────────────┐
  │      Metric      │ TSLA FY2025 │ NVDA FY2026 │
  ├──────────────────┼─────────────┼─────────────┤
  │ Operating CF     │    $14,747M │   $102,718M │
  │ CapEx            │     $8,527M │     $6,042M │
  │ Free cash flow   │     $6,220M │    $96,676M │
  │ FCF margin       │        6.6% │       44.8% │
  └──────────────────┴─────────────┴─────────────┘

  NVDA's CapEx is lower than TSLA's yet it generates 15x the free cash flow.

  3. Key risks

  TSLA: intensifying EV competition, brand headwinds, Musk attention risk;
        auto revenue -10% YoY, partially offset by energy (+27%) and services (+19%).
  NVDA: China export controls; Q1 FY27 guidance of $78B already excludes China
        data-center revenue — a single quarter roughly equal to TSLA's full year.
```

## Rate limits

Longbridge OpenAPI: maximum 10 calls per second. The SDK auto-refreshes OAuth tokens.

## Release notes

### [v0.13.0](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.13.0)

- **New: Fundamentals & analysis commands** — `financial-report`, `valuation`, `forecast-eps`, `consensus`, `institution-rating`, `shareholder`, `fund-holder`, `dividend`, `finance-calendar`, `exchange-rate`
- **Breaking: command restructure** — 19 flat commands moved into subcommand trees (e.g. `news-detail` → `news detail`, `kline-history` → `kline history`, `warrant-list` → `warrant list`)
- **CN region support** — set `LONGBRIDGE_REGION=cn` to route through the China endpoint

### [v0.12.0](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.12.0)

- **New: `statement` commands** — list and export daily/monthly account statements
- **TUI** — fixed `q` quit; added news list and detail views inside watchlist

---

Full changelog: [github.com/longbridge/longbridge-terminal/releases](https://github.com/longbridge/longbridge-terminal/releases)
