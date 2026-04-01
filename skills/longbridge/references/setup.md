# Longbridge Setup & Authentication

## CLI Installation

```bash
# macOS (Homebrew)
brew install --cask longbridge/tap/longbridge-terminal

# macOS / Linux
curl -sSL https://github.com/longbridge/longbridge-terminal/raw/main/install | sh
```

Windows (Scoop or PowerShell):

```powershell
# Scoop
scoop install https://raw.githubusercontent.com/longbridge/longbridge-terminal/main/longbridge.json

# Or PowerShell install script
iwr https://github.com/longbridge/longbridge-terminal/raw/main/install.ps1 | iex
```

Authenticate:

```bash
longbridge login
```

## CLI Update

```bash
# Built-in updater
longbridge update

# Or re-run the install script
curl -sSL https://github.com/longbridge/longbridge-terminal/raw/main/install | sh
```

## MCP (for AI tools — no code)

```bash
# Claude Code
claude mcp add longbridge https://openapi.longbridge.com/mcp
```

First tool call triggers an OAuth browser flow. See [references/mcp.md](references/mcp.md) for Cursor, ChatGPT, Zed.

## Revoking Authorization

To revoke access, go to your Longbridge account → Security Settings → manage authorized apps.

## Authentication

All tools use **OAuth 2.0** — no manual token or API key management needed.

**Token cache:** `~/.longbridge/openapi/tokens/<client_id>`
**Register OAuth client:** POST `https://openapi.longbridge.com/oauth2/register`

## Rate Limits

- REST API: max **10 calls/second**
- SDK auto-refreshes OAuth tokens
- WebSocket subscriptions: subject to quote package limits
