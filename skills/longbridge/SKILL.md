---
name: longbridge
description: "Longbridge Developers platform expert. Use when: (1) querying market data or executing trades via CLI (`longbridge` command), (2) writing Python/Rust programs using the `longbridge` SDK, (3) configuring the Longbridge MCP server for AI tools (Cursor, Claude Code, ChatGPT), (4) integrating Longbridge docs into LLM/RAG systems via llms.txt or Markdown API. Covers all markets: HK, US, CN (SH/SZ), SG, Crypto. Triggers on `longbridge` imports, stock symbols (TSLA.US, 700.HK), API key setup, order placement, WebSocket subscriptions, or any Longbridge platform capability question."
---

# Longbridge Developers Platform

Full-stack financial data and trading platform: CLI, Python/Rust SDK, MCP, and LLM integration.

**Official docs:** https://open.longbridge.com
**llms.txt:** https://open.longbridge.com/llms.txt

## Choose the Right Tool

```
User wants to...                         → Use
─────────────────────────────────────────────────────────────────
Quick quote / one-off data lookup        CLI
Interactive terminal workflows           CLI
Script market data, save to file         CLI + jq  (or Python SDK)
Loops, conditions, transformations       Python SDK (sync)
Async pipelines, concurrent fetches      Python SDK (async)
Production service, high throughput      Rust SDK
Real-time WebSocket subscription loop    SDK (Python or Rust)
Programmatic order strategy              SDK
Talk to AI about stocks (no code)        MCP (hosted or self-hosted)
Use Cursor/Claude for trading analysis   MCP
Add Longbridge API docs to IDE/RAG       LLMs.txt / Markdown API
```

## Symbol Format

`<CODE>.<MARKET>` — applies to all tools.

| Market | Suffix | Examples |
|--------|--------|---------|
| Hong Kong | `HK` | `700.HK`, `9988.HK`, `2318.HK` |
| United States | `US` | `TSLA.US`, `AAPL.US`, `NVDA.US` |
| China Shanghai | `SH` | `600519.SH`, `000001.SH` |
| China Shenzhen | `SZ` | `000568.SZ`, `300750.SZ` |
| Singapore | `SG` | `D05.SG`, `U11.SG` |
| Crypto | `HAS` | `BTCUSD.HAS`, `ETHUSD.HAS` |

## Authentication Overview

| Method | Credential | Best for |
|--------|-----------|---------|
| OAuth 2.0 ⭐ | `client_id` only, no secret | CLI, SDK scripts, MCP |
| API Key | `APP_KEY` + `APP_SECRET` + `ACCESS_TOKEN` | Legacy / server-side |

**OAuth token cache:** `~/.longbridge/openapi/tokens/<client_id>`
**Register OAuth client:** POST `https://openapi.longbridge.com/oauth2/register`

## Rate Limits

- REST API: max **10 calls/second**
- SDK auto-refreshes OAuth tokens
- WebSocket subscriptions: subject to quote package limits

## Reference Files

### CLI (Terminal)
- **Overview** — install, auth, output formats, AI integration: [references/cli/overview.md](references/cli/overview.md)
- **Quote commands** — quotes, depth, kline, options, warrants, market data: [references/cli/quote.md](references/cli/quote.md)
- **Trade commands** — orders, buy/sell, positions, balance, executions: [references/cli/trade.md](references/cli/trade.md)
- **Content commands** — news, filings, earnings, community topics: [references/cli/content.md](references/cli/content.md)
- **Watchlist commands** — manage watchlist groups: [references/cli/watchlist.md](references/cli/watchlist.md)

### Python SDK
- **Overview** — install, Config, auth, HttpClient: [references/python-sdk/overview.md](references/python-sdk/overview.md)
- **QuoteContext** — all quote methods + subscriptions: [references/python-sdk/quote-context.md](references/python-sdk/quote-context.md)
- **TradeContext** — orders, account, executions: [references/python-sdk/trade-context.md](references/python-sdk/trade-context.md)
- **Types & Enums** — Period, OrderType, SubType, push types: [references/python-sdk/types.md](references/python-sdk/types.md)

### Rust SDK
- **Overview** — Cargo.toml, Config, auth, error handling: [references/rust-sdk/overview.md](references/rust-sdk/overview.md)
- **QuoteContext** — all methods, SubFlags, PushEvent: [references/rust-sdk/quote-context.md](references/rust-sdk/quote-context.md)
- **TradeContext** — orders, SubmitOrderOptions builder, account: [references/rust-sdk/trade-context.md](references/rust-sdk/trade-context.md)
- **Content** — news, filings, topics (ContentContext + Python fallback): [references/rust-sdk/content.md](references/rust-sdk/content.md)
- **Types & Enums** — all Rust enums and structs: [references/rust-sdk/types.md](references/rust-sdk/types.md)

### AI Integration
- **MCP** — hosted service + self-hosted server + all 28 tools: [references/mcp.md](references/mcp.md)
- **LLMs & Markdown** — llms.txt, `open.longbridge.com` doc Markdown, `longbridge.com` live news/quote pages (`.md` suffix + Accept header), Cursor/IDE integration: [references/llm.md](references/llm.md)

Load specific reference files on demand — do not load all at once.
