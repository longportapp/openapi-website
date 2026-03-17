---
sidebar_position: 2.1
slug: /cli
sidebar_label: CLI
sidebarCollapsed: true
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

**Homebrew**

```bash
brew install longbridge/tap/longbridge-terminal
```

**Install script**

```bash
curl -sSL https://github.com/longbridge/longbridge-terminal/raw/main/install | sh
```

Installs the `longbridge` binary to `/usr/local/bin`.

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
longbridge kline-history TSLA.US --start 2024-01-01 --end 2024-12-31 # Historical candlestick data
longbridge intraday TSLA.US                                           # Intraday minute-by-minute data
longbridge static TSLA.US                                             # Static reference info
longbridge calc-index TSLA.US --index pe,pb,eps                       # Financial indexes (PE, PB, EPS, etc.)
longbridge capital-flow TSLA.US                                       # Intraday capital flow time series
longbridge capital-dist TSLA.US                                       # Capital distribution snapshot
longbridge market-temp [HK|US|CN|SG]                                  # Market sentiment temperature (0–100)
```

### Options & warrants

```bash
longbridge option-quote AAPL240119C190000         # Real-time option quotes
longbridge option-chain AAPL.US                   # Option chain: all expiry dates
longbridge option-chain AAPL.US --date 2024-01-19 # Strike prices for a given expiry
longbridge warrant-quote 12345.HK                 # Real-time warrant quotes
longbridge warrant-list 700.HK                    # Warrants linked to an underlying
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

Install the skill to give AI tools (like Claude) full knowledge of all `longbridge` commands:

```bash
npx skills add longbridge/longbridge-terminal
```

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

## Rate limits

Longbridge OpenAPI: maximum 10 calls per second. The SDK auto-refreshes OAuth tokens.
