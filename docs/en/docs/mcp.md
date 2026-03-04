---
sidebar_position: 2
slug: /mcp
sidebar_label: MCP Service
sidebarCollapsed: true
id: mcp
---

# Longbridge MCP Service

With the Longbridge MCP Service, you can give natural-language instructions to AI tools such as Claude and Cursor to query market data, analyze positions, and execute trades — no code required, no manual API calls.

Longbridge MCP is built on the [Model Context Protocol](https://modelcontextprotocol.io/) open standard and uses OAuth 2.1 for authorization. No API keys to manage; once configured, you are ready to go.

**MCP endpoints**

| Region | URL |
| --- | --- |
| Global | `https://openapi.longportapp.com/mcp` |
| Mainland China | `https://openapi.longportapp.cn/mcp` |

**OAuth discovery**: `https://openapi.longportapp.com/.well-known/oauth-authorization-server`

## What you can do

After connecting Longbridge MCP, you can accomplish the following directly in an AI conversation:

**Query market data**
- "What are the current prices of Apple and NVIDIA?"
- "Show me Tencent's price chart for the past three months"
- "Pull the Tesla options chain — focus on contracts expiring this month"

**Analyze your account**
- "Which of my positions are down more than 5%?"
- "Summarize my cash transactions for this month"
- "How much buying power do I have available?"

**Execute trades**
- "Buy 100 shares of Apple at market price"
- "Cancel all my Tesla stop-loss orders"
- "Show me today's unfilled orders"

:::caution Trading safety
Trading operations have real financial impact. It is strongly recommended that you instruct the AI in your prompt to show you the order details for confirmation before submitting. See [Security and usage guidance](#security-and-usage-guidance).
:::

## Available tools

After authorization, AI tools can invoke the following capabilities. Actual availability varies by account region, permission level, and granted OAuth scope.

| Category | Tool | Description |
| --- | --- | --- |
| Market data | Real-time quotes | Retrieve current price and change for stocks, ETFs, options, and warrants |
| Market data | Order book depth | View bid/ask prices and quantities at each level |
| Market data | Tick-by-tick trades | Fetch the latest trade-by-trade records |
| Historical data | Candlesticks | Retrieve daily, minute-level, and other interval candles |
| Historical data | Historical trades | Query historical trade records and market session status |
| Security info | Stock details | Look up fundamentals, sector classification, and financial data |
| Security info | Option chains | Browse option contracts for a given underlying |
| Security info | Warrant screening | Filter warrants by custom criteria |
| Account | Account overview | View total assets, market value, and cash summary |
| Account | Positions | List all current holdings with P&L details |
| Assets | Cash flow | Query deposits, withdrawals, dividends, fees, and other cash movements |
| Assets | Margin details | Check margin balance and interest information |
| Trading | Place order | Submit buy or sell orders for stocks, options, and more |
| Trading | Cancel / modify order | Cancel or amend pending orders |
| Trading | Order history | Query today's and historical orders |

:::info Trading permissions
Trading tools require the corresponding trading permissions on your account. Some markets or product types (options, warrants) require additional trading eligibility.
:::

## Quick start

The following example uses Cursor to demonstrate the minimum steps to get connected. Other clients follow a similar flow.

### Step 1: Add the MCP server configuration

Open **Cursor Settings → MCP Servers**, click **Add new global MCP server**, and add the following to the config file:

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

### Step 2: Complete OAuth authorization

After saving, Cursor automatically opens a browser window and redirects you to the Longbridge authorization page. Sign in with your Longbridge account, review the requested permission scopes, and approve.

### Step 3: Start using

Return to Cursor and confirm that `longbridge` appears as connected in the MCP Servers list. Once the tool list is populated, you can start issuing queries in the chat.

**Verification**: Type "What is the current price of Apple stock?" in the Cursor chat. If you receive a quote, the connection is working correctly.

## Client-specific setup

:::tip
MCP configuration interfaces may change across client versions. The steps below cover the key connection points for each client; refer to each client's official documentation for the most up-to-date instructions.
:::

### Cursor

Open **Cursor Settings → MCP Servers** and add a remote MCP server:

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

Complete OAuth authorization and verify that `longbridge` tools appear in the tool list.

### Claude Code

Run the following command in Claude Code to add the remote MCP server:

```bash
claude mcp add --transport http longbridge https://openapi.longportapp.com/mcp
```

Alternatively, edit the MCP config file manually:

```json
{
  "mcpServers": {
    "longbridge": {
      "type": "http",
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

Complete OAuth authorization in the browser, then return to Claude Code to start invoking tools.

### Claude Desktop

Edit the Claude Desktop config file (`claude_desktop_config.json`) and add:

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

Restart Claude Desktop and complete OAuth authorization.

### ChatGPT

In ChatGPT, open **Settings → Connectors** (or the MCP entry in your workspace settings) and add a remote MCP server with the following URL:

```
https://openapi.longportapp.com/mcp
```

Follow the on-screen instructions to complete OAuth authorization.

### Zed

Open `settings.json` and add:

```json
{
  "context_servers": {
    "longbridge": {
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

Save the file and complete OAuth authorization.

### Cherry Studio

In Cherry Studio's **MCP Servers** settings, add a new server with type **SSE** and set the server URL to:

```
https://openapi.longportapp.com/mcp
```

:::caution Version requirement
Older versions of Cherry Studio may not fully implement the MCP OAuth 2.1 flow and may fail to complete authorization. Upgrade to v1.5.6 or later.
:::

## How OAuth authorization works

Longbridge MCP uses the standard OAuth 2.1 flow so clients never need access to your raw API secrets. The authorization flow only needs to be completed once; the AI tool will automatically use the saved credentials thereafter.

1. **Initiate connection**: Add the Longbridge MCP server URL in your MCP client and save
2. **Redirect to authorization**: The client opens a browser and redirects to the Longbridge sign-in and consent page
3. **Sign in and approve**: Sign in with your Longbridge account, review the requested scopes, and grant access
4. **Session established**: The client receives OAuth credentials and the MCP session becomes available
5. **Credential lifecycle**: Credentials refresh automatically per OAuth policy; revoke access at any time from your Longbridge account security settings

## Security and usage guidance

**Permission control**

- Apply the principle of least privilege: only grant the scopes required for your current use case
- Start with read-only permissions (market data, account queries) and add trading permissions only after validating expected behavior

**Trading safety**

- For operations involving order placement or cancellation, instruct the AI in your prompt to always confirm with you before executing — for example: "Before submitting any order, show me the order details and wait for my confirmation"
- Set explicit guardrails in prompts: maximum order size, symbol allowlist, prohibition on market orders, etc.
- Validate the AI's decision logic in a simulated scenario before enabling live trading

**Credential security**

- OAuth credentials are managed by the client; do not log them or share them with third parties
- Periodically review authorized MCP applications and revoke access for any you no longer use

## Troubleshooting

### OAuth sign-in fails or browser redirect does not complete

- Confirm your Longbridge account is in good standing and not subject to any restrictions
- Confirm your client version supports MCP OAuth 2.1 (see version notes for each client above)
- Retry authorization from the client
- Check whether the requested scopes are supported for your account type and region

### Connected but some tools are missing

- Your account type or region may not support the capabilities behind those tools
- If your authorized scopes have changed, re-complete the OAuth authorization flow

### Permission denied on trading operations

- Verify that your account has trading permissions for the relevant market
- Confirm that the current MCP session's OAuth scope includes trading-related permissions
- Some markets or product types (options, warrants) require additional trading eligibility

### Slow connection from mainland China

Replace the server URL in your configuration with the mainland China endpoint:

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.cn/mcp"
    }
  }
}
```
