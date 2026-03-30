# CLI Overview

**GitHub:** https://github.com/longbridge/longbridge-terminal

AI-native CLI covering every Longbridge OpenAPI endpoint. Designed for scripting, AI-agent tool-calling, and daily trading workflows from the terminal.

## Discovering Commands

Always use the CLI's built-in help — it reflects the currently installed version:

```bash
longbridge --help                  # List all available commands
longbridge <command> --help        # Options and flags for a specific command
```

Do not rely on hardcoded documentation for command syntax or flags — use `--help` instead.

## Installation

```bash
# macOS (Homebrew — recommended)
brew install --cask longbridge/tap/longbridge-terminal

# Any platform (install script)
curl -sSL https://github.com/longbridge/longbridge-terminal/raw/main/install | sh
# Installs `longbridge` binary to /usr/local/bin
```

## Authentication

Uses OAuth 2.0 — no manual token or key management needed:

```bash
longbridge login    # Opens browser OAuth flow; token saved to
                    # ~/.longbridge/terminal/.openapi-session
longbridge logout   # Clear saved session token
longbridge check    # Verify connectivity and token (no auth required)
longbridge update   # Update the CLI to the latest version
```

**China Mainland:** The CLI auto-detects CN by probing `geotest.lbkrs.com` on startup (non-blocking). Result cached at `~/.longbridge/openapi/region-cache`. CN users automatically use `.cn` endpoints.

## Environment Variables

| Variable         | Value     | Description                                                        |
| ---------------- | --------- | ------------------------------------------------------------------ |
| `LONGBRIDGE_ENV` | `staging` | Switch all endpoints to the staging environment (`openapi.longbridge.xyz`). Useful for testing against non-production data. |

```bash
# Run any command against the staging environment
LONGBRIDGE_ENV=staging longbridge login
LONGBRIDGE_ENV=staging longbridge statement list

# Or export for the entire shell session
export LONGBRIDGE_ENV=staging
```

When set, OAuth, HTTP API, and WebSocket endpoints are all redirected to staging. Unset the variable (or omit it) to use production.

## Output Formats

```bash
--format table   # Human-readable table (default)
--format json    # Machine-readable JSON — use for piping to jq, AI agents, scripts
```

All commands support `--format json`. Example with `jq`:

```bash
longbridge positions --format json | jq '.[] | {symbol, quantity, cost_price}'
longbridge orders --format json | jq '.[] | select(.status == "New")'
```

## AI Agent Integration

### Parallel execution pattern

Use `&` and `wait` to run multiple queries concurrently (faster results):

```bash
longbridge quote TSLA.US & longbridge quote AAPL.US & wait
longbridge kline TSLA.US --period day --count 30 & longbridge kline NVDA.US --period day --count 30 & wait
```

### Earnings analysis pattern

```bash
# Step 1: discover filing IDs
longbridge filing list TSLA.US
# Step 2: pull full Markdown content of a specific filing
longbridge filing detail TSLA.US 610186794100660481 --file-index 0
```

## Extended Hours (Pre/Post Market)

`quote`, `intraday`, `kline`, `kline history` all support extended-hours data. Use `longbridge <command> --help` for exact flags — key points:

- **`quote`**: always returns `pre_market_quote` / `post_market_quote` / `overnight_quote` when available (US only). Table format appends an "Extended Hours" section; JSON includes them as nested objects.
- **`intraday` / `kline` / `kline history`**: default to intraday session only; pass `--session all` to include pre/post-market data. `kline`/`kline history` add a **Session** column when `--session all` is used.

## Rate Limits

- Max **10 API calls/second**
- Token is auto-refreshed; no manual renewal needed
- WebSocket subscriptions are not available in the CLI (use SDK for real-time push)
