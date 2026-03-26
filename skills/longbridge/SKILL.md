---
name: longbridge
description: 'Longbridge platform expert for BOTH investment analysis AND developer tasks. TRIGGER on ANY of: (1) stock/market analysis in any language — "分析 ARM 表现", "持仓建议", "昨天股价", portfolio advice, buy/sell decisions; (2) stock names without suffix — ARM, Tesla, NVDA, AAPL, 腾讯, 阿里 etc.; (3) stock symbols with suffix — TSLA.US, 700.HK, 600519.SH; (4) "我的持仓" / "持仓" / positions / portfolio; (5) querying market data via CLI (`longbridge` command); (6) writing Python/Rust with `longbridge` SDK; (7) configuring Longbridge MCP server; (8) integrating Longbridge docs into LLM/RAG. Covers HK, US, CN (SH/SZ), SG, Crypto markets.'
---

# Longbridge Developers Platform

Full-stack financial data and trading platform: CLI, Python/Rust SDK, MCP, and LLM integration.

**Official docs:** https://open.longbridge.com
**llms.txt:** https://open.longbridge.com/llms.txt

## First-Time Setup

Before using any Longbridge feature, check which tools are available:

**CLI** — run `longbridge --version` to check. If not installed:

```bash
# macOS
brew install --cask longbridge/tap/longbridge-terminal

# Any platform
curl -sSL https://github.com/longbridge/longbridge-terminal/raw/main/install | sh
```

Then authenticate:

```bash
longbridge login
```

**MCP (for AI tools)** — if the user wants to query data or trade directly inside the AI chat (without writing code), add the hosted MCP server:

```bash
# Claude Code
claude mcp add longbridge https://openapi.longbridge.com/mcp
```

First tool call triggers an OAuth browser flow. See [references/mcp.md](references/mcp.md) for other clients (Cursor, ChatGPT, Zed).

---

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

| Market         | Suffix | Examples                        |
| -------------- | ------ | ------------------------------- |
| Hong Kong      | `HK`   | `700.HK`, `9988.HK`, `2318.HK`  |
| United States  | `US`   | `TSLA.US`, `AAPL.US`, `NVDA.US` |
| China Shanghai | `SH`   | `600519.SH`, `000001.SH`        |
| China Shenzhen | `SZ`   | `000568.SZ`, `300750.SZ`        |
| Singapore      | `SG`   | `D05.SG`, `U11.SG`              |
| Crypto         | `HAS`  | `BTCUSD.HAS`, `ETHUSD.HAS`      |

## Authentication Overview

| Method       | Credential                                | Best for              |
| ------------ | ----------------------------------------- | --------------------- |
| OAuth 2.0 ⭐ | `client_id` only, no secret               | CLI, SDK scripts, MCP |
| API Key      | `APP_KEY` + `APP_SECRET` + `ACCESS_TOKEN` | Legacy / server-side  |

**OAuth token cache:** `~/.longbridge/openapi/tokens/<client_id>`
**Register OAuth client:** POST `https://openapi.longbridge.com/oauth2/register`

## Rate Limits

- REST API: max **10 calls/second**
- SDK auto-refreshes OAuth tokens
- WebSocket subscriptions: subject to quote package limits

## Reference Files

### CLI (Terminal)

- **Overview** — install, auth, output formats, patterns: [references/cli/overview.md](references/cli/overview.md)

**Always use `longbridge --help` to list available commands, and `longbridge <command> --help` for specific options and flags.** Do not rely on hardcoded documentation — the CLI's built-in help is always up-to-date.

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

- **MCP** — hosted service, self-hosted server, setup & auth: [references/mcp.md](references/mcp.md)
- **LLMs & Markdown** — llms.txt, `open.longbridge.com` doc Markdown, `longbridge.com` live news/quote pages (`.md` suffix + Accept header), Cursor/IDE integration: [references/llm.md](references/llm.md)

Load specific reference files on demand — do not load all at once.
