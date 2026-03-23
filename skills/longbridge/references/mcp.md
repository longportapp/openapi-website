# MCP Server

Longbridge provides MCP (Model Context Protocol) support in two modes: a hosted cloud service and a self-hosted binary.

## Hosted MCP Service

**Endpoint:** `https://openapi.longbridge.com/mcp`

No API keys needed — uses OAuth 2.1. The AI client handles the browser authorization flow automatically.

### Client Configuration

Add to MCP config in any compatible client:

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longbridge.com/mcp"
    }
  }
}
```

**Per-client setup:**
- **Cursor**: Settings → MCP Servers → Add Remote MCP Server
- **Claude Code**: `claude mcp add longbridge https://openapi.longbridge.com/mcp`
- **ChatGPT**: Settings → Connectors
- **Zed**: `context_servers` in `settings.json`
- **Cherry Studio**: Settings → MCP Servers → Add (requires latest version for OAuth support)

### OAuth Authorization Flow

1. Add the config and call any tool — this triggers the OAuth flow
2. Client opens a browser tab to Longbridge login & consent page
3. Sign in with your Longbridge account and approve scopes
4. Credentials are stored by the client; tokens refresh automatically
5. To revoke: Longbridge account → Security Settings

### Security Recommendations

- Only approve scopes required for the task (least privilege)
- For order placement, instruct AI to always ask for confirmation before executing
- Periodically review and revoke unused authorizations

---

## Self-Hosted Binary (Advanced)

For server automation or environments where interactive OAuth login is not possible. Requires legacy API key credentials.

```bash
# Install
cargo install longbridge-mcp

# Run (stdio transport, uses LONGBRIDGE_APP_KEY/APP_SECRET/ACCESS_TOKEN env vars)
longbridge-mcp
```

```json
{
  "mcpServers": {
    "longbridge": {
      "command": "longbridge-mcp",
      "env": {
        "LONGBRIDGE_APP_KEY": "...",
        "LONGBRIDGE_APP_SECRET": "...",
        "LONGBRIDGE_ACCESS_TOKEN": "..."
      }
    }
  }
}
```

**Prefer the hosted service** (`https://openapi.longbridge.com/mcp`) for most use cases — it uses OAuth 2.1 and requires no credential management.

---

## Available MCP Tools (28 total)

### Utility
| Tool | Description |
|------|-------------|
| `now` | Get current UTC time (RFC3339) |

### Quote Tools
| Tool | Key Parameters |
|------|---------------|
| `static_info` | `symbols: Vec<String>` |
| `quote` | `symbols: Vec<String>` |
| `option_quote` | `symbols: Vec<String>` |
| `depth` | `symbol: String` |
| `trades` | `symbol: String`, `count: usize` (max 1000) |
| `candlesticks` | `symbol`, `period` (see below), `count` (max 1000), `forward_adjust: bool`, `trade_sessions: "intraday"\|"all"` |
| `trading_days` | `market: "HK"\|"US"\|"CN"\|"SG"`, `start_date: "yyyy-mm-dd"`, `end_date: "yyyy-mm-dd"` |
| `broker_queue` | `symbol: String` |
| `broker_info` | — (HK only) |
| `option_chain_list` | `symbol: String` — returns expiry dates |
| `option_chain_info` | `symbol: String`, `expiry_date: "yyyy-mm-dd"` |
| `capital_flow` | `symbol: String` |
| `capital_distribution` | `symbol: String` |
| `current_market_temperature` | `market: "HK"\|"US"\|"CN"\|"SG"` |
| `history_market_temperature` | `market`, `start: "yyyy-mm-dd"`, `end: "yyyy-mm-dd"` |

### Trade Tools
| Tool | Key Parameters |
|------|---------------|
| `account_balance` | — |
| `stock_positions` | — |
| `fund_positions` | — |
| `magin_ratio` | `symbol: String` |
| `submit_order` | See below |
| `cancel_order` | `order_id: String` |
| `order_detail` | `order_id: String` |
| `today_orders` | — |
| `history_orders` | `symbol?`, `start_at: RFC3339`, `end_at: RFC3339` |

### Content Tools
| Tool | Key Parameters |
|------|---------------|
| `news` | `symbol: String` |
| `topics` | `symbol: String` |
| `filings` | `symbol: String` |

---

## candlesticks Period Values

```
"1m"   "2m"   "3m"   "5m"   "10m"  "15m"  "20m"  "30m"  "45m"
"60m"  "120m" "180m" "240m"
"day"  "week" "month" "quarter" "year"
```

---

## submit_order Parameters

```
symbol:            String             (required) e.g. "700.HK"
order_type:        String             (required) "LO"|"ELO"|"MO"|"AO"|"ALO"|"ODD"|"LIT"|"MIT"|"TSLPAMT"|"TSLPPCT"|"SLO"
side:              String             (required) "Buy"|"Sell"
submitted_quantity: Decimal           (required)
time_in_force:     String             (required) "Day"|"GTC"|"GTD"
submitted_price:   Decimal?           (required for LO/ELO/ALO/ODD/LIT)
trigger_price:     Decimal?           (required for LIT/MIT)
limit_offset:      Decimal?           (required for TSLPAMT/TSLPPCT)
trailing_amount:   Decimal?           (for TSLPAMT)
trailing_percent:  Decimal?           (for TSLPPCT, value 0-1)
expire_date:       String?            ("yyyy-mm-dd", required for GTD)
outside_rth:       String?            "RTH_ONLY"|"ANY_TIME"|"OVERNIGHT" (US only)
limit_depth_level: i32?
trigger_count:     i32?
monitor_price:     Decimal?
```

---

## Example AI Prompts

```
# Market data
"What is the current price and PE ratio of TSLA.US?"

# Trade analysis
"Show my current HK stock positions and unrealized P&L"

# Order placement (always confirm first)
"I want to buy 100 shares of 700.HK at limit price 50 HKD.
 Please confirm the order details before placing it."

# Research
"Get the latest news and filings for AAPL.US"
```
