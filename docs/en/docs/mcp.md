---
sidebar_position: 7
slug: /mcp
sidebar_label: MCP
sidebarCollapsed: true
id: mcp
---

# MCP

Longport MCP is an MCP server based on Longbridge OpenAPI SDK.

It allows AI clients (such as Cursor, Cherry Studio, Claude Desktop, etc.) to access Longbridge market data and trading capabilities through a standardized protocol.

- Source code: [longportapp/openapi/tree/main/mcp](https://github.com/longportapp/openapi/tree/main/mcp)
- Protocol: [Model Context Protocol](https://modelcontextprotocol.io/)

## Prerequisites

Before using MCP, please make sure:

- You have completed Longbridge account opening and OpenAPI authorization.
- You have obtained these credentials:
  - `LONGPORT_APP_KEY`
  - `LONGPORT_APP_SECRET`
  - `LONGPORT_ACCESS_TOKEN`
- (Optional) If you are in mainland China, set:
  - `LONGPORT_REGION=cn`

> Security note: `LONGPORT_ACCESS_TOKEN` grants API access. Never share it publicly.

## Installation

### macOS or Linux

Run the following command:

```bash
curl -sSL https://raw.githubusercontent.com/longportapp/openapi/refs/heads/main/mcp/install | bash
```

After installation, verify:

```bash
longport-mcp -h
```

### Windows

Download `longport-mcp-x86_64-pc-windows-msvc.zip` from:

- [https://github.com/longportapp/openapi/releases](https://github.com/longportapp/openapi/releases)

Extract `longport-mcp.exe` and place it in a fixed location (for example `C:\\longport-mcp.exe`).

## Quick Start (3 minutes)

1. Install `longport-mcp`.
2. Configure your MCP client.
3. Start your AI client and test with quote/account prompts.

Example `mcp.json`:

```json
{
  "mcpServers": {
    "longport-mcp": {
      "command": "/usr/local/bin/longport-mcp",
      "env": {
        "LONGPORT_APP_KEY": "your-app-key",
        "LONGPORT_APP_SECRET": "your-app-secret",
        "LONGPORT_ACCESS_TOKEN": "your-access-token"
      }
    }
  }
}
```

For Windows:

```json
{
  "mcpServers": {
    "longport-mcp": {
      "command": "C:\\longport-mcp.exe",
      "env": {
        "LONGPORT_APP_KEY": "your-app-key",
        "LONGPORT_APP_SECRET": "your-app-secret",
        "LONGPORT_ACCESS_TOKEN": "your-access-token"
      }
    }
  }
}
```

If needed (mainland China):

```json
{
  "LONGPORT_REGION": "cn"
}
```

## Capability Categories

Depending on your account and permissions, MCP tools can cover:

- **Quote**: snapshot, real-time quote, candlesticks, history
- **Market**: major indexes and market overview
- **Account**: balances and account summary
- **Position**: holdings and portfolio views
- **Trade**: submit/query/cancel orders (if enabled)

> Actual available tools may vary by region and account permission.

## Example Prompts

After MCP is connected, try:

- "What's the current price of AAPL and TSLA?"
- "How did TSLA perform in the last month?"
- "Show my current account summary and holdings."
- "Compare TSLA, AAPL, and NVDA in the past 3 months."
- "Generate a portfolio summary table and pie chart (return result only, no code)."

## Cursor Configuration

1. Open command palette (`Command + Shift + P`).
2. Enter **Cursor Settings**.
3. Open **MCP Servers**.
4. Click **Add new global MCP server**.
5. Edit `mcp.json` with your credentials.

## Cherry Studio Configuration

Use **STDIO mode** and ensure `longport-mcp` is available on your system path (or use absolute executable path).

If you are in mainland China, add:

```bash
LONGPORT_REGION=cn
```

## Safety & Risk Control

- Always review AI-generated trading instructions before execution.
- Start with read-only tasks first (quote/account/position).
- If you enable trading prompts, add constraints, for example:
  - max order amount
  - allowed symbols only
  - confirmation required before order placement
- For first-time usage, prefer small-size orders.

## Troubleshooting

### Authentication failed / invalid token

- Re-check all 3 credentials.
- Ensure token is not expired or revoked.

### MCP server starts but no tools shown

- Confirm your client loaded the correct `mcp.json`.
- Restart the AI client after config changes.

### Windows cannot find executable

- Use absolute path, such as `C:\\longport-mcp.exe`.

### Connection unstable in mainland China

- Add `LONGPORT_REGION=cn`.
