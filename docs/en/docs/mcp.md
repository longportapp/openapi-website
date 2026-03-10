---
sidebar_position: 2
slug: /mcp
sidebar_label: MCP
sidebarCollapsed: true
id: mcp
---

# Longbridge MCP

[Longbridge MCP](https://github.com/longbridge/openapi/tree/main/mcp) is an [MCP](https://modelcontextprotocol.io/introduction) server for [Longbridge OpenAPI](https://open.longbridge.com/). It exposes real-time market data, account and position queries, and trading capabilities to AI assistants (e.g. Cursor, Cherry Studio) via the Model Context Protocol.

Configure MCP with **App Key**, **App Secret**, and **Access Token**, all obtained at [https://open.longbridge.com/](https://open.longbridge.com/) (User Center → application credential).

For full installation and options, see the [Longbridge MCP README](https://github.com/longbridge/openapi/blob/main/mcp/README.md).

## Prerequisites

- Longbridge account with [Open API](https://open.longbridge.com/) access
- **App Key** and **App Secret** from [https://open.longbridge.com/](https://open.longbridge.com/)
- **Access Token** (from [https://open.longbridge.com/](https://open.longbridge.com/) User Center → application credential)

## Installation

### macOS or Linux

```bash
curl -sSL https://raw.githubusercontent.com/longbridge/openapi/refs/heads/main/mcp/install | bash
```

### Windows

Download the latest binary from [Releases](https://github.com/longbridge/openapi/releases) (e.g. `longbridge-mcp-0.1.0`).

## Configuration

Set these environment variables when running the MCP server:

| Variable | Description |
| --- | --- |
| `LONGBRIDGE_APP_KEY` | Your Open API App Key |
| `LONGBRIDGE_APP_SECRET` | Your Open API App Secret |
| `LONGBRIDGE_ACCESS_TOKEN` | Access Token from [https://open.longbridge.com/](https://open.longbridge.com/) (User Center → application credential) |

See [Getting started — Method 2: Legacy API Key](/docs/getting-started#method-2-legacy-api-key-compatible) for how to obtain these credentials.

## Client setup

### Cursor

1. Open **Settings → Features → MCP Servers**
2. Add new MCP Server → **command** type
3. Command (macOS/Linux):

   ```bash
   env LONGBRIDGE_APP_KEY=your-app-key LONGBRIDGE_APP_SECRET=your-app-secret LONGBRIDGE_ACCESS_TOKEN=your-access-token longbridge-mcp
   ```

4. On Windows, use:

   ```bash
   cmd /c "set LONGBRIDGE_APP_KEY=your-app-key && set LONGBRIDGE_APP_SECRET=your-app-secret && set LONGBRIDGE_ACCESS_TOKEN=your-access-token && longbridge-mcp"
   ```

Or in MCP config JSON:

```json
{
  "mcpServers": {
    "longbridge-mcp": {
      "command": "/usr/local/bin/longbridge-mcp",
      "env": {
        "LONGBRIDGE_APP_KEY": "your-app-key",
        "LONGBRIDGE_APP_SECRET": "your-app-secret",
        "LONGBRIDGE_ACCESS_TOKEN": "your-access-token"
      }
    }
  }
}
```

### Cherry Studio

1. **Settings → MCP Servers → Add Server**
2. Type: **STDIO**
3. Command: same `env LONGBRIDGE_APP_KEY=... LONGBRIDGE_APP_SECRET=... LONGBRIDGE_ACCESS_TOKEN=... longbridge-mcp` (or Windows variant above)

## Optional: SSE server mode

Run as an SSE server (default bind `127.0.0.1:8000`):

```bash
env LONGBRIDGE_APP_KEY=your-app-key LONGBRIDGE_APP_SECRET=your-app-secret LONGBRIDGE_ACCESS_TOKEN=your-access-token longbridge-mcp --sse
```

Change bind address with `--bind`:

```bash
longbridge-mcp --sse --bind 127.0.0.1:3000
```

## Optional: Read-only and logging

- **Read-only mode** (no order submission):

  ```bash
  longbridge-mcp --readonly
  ```

- **Logging** to a directory:

  ```bash
  longbridge-mcp --log-dir /path/to/log/dir
  ```

## Capabilities

| Category | Description |
| --- | --- |
| Market data | Real-time quotes, candlesticks, historical data |
| Account | Account overview, assets, positions |
| Trading | Place, modify, cancel orders (subject to account and region) |

## Security

- Keep **App Secret** and **Access Token** private; do not commit them to version control.
- Use **read-only** mode when you only need market or account data.
- Rotate or revoke tokens in [Longbridge account security](https://longbridge.com) if compromised.

## Reference

- [Longbridge MCP README](https://github.com/longbridge/openapi/blob/main/mcp/README.md) — install, config, and usage details
- [Getting started](/docs/getting-started) — Method 2 (Legacy API Key) for App Key, Secret, and Access Token from developer center
