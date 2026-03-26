# Longbridge Setup & Authentication

## CLI Installation

```bash
# macOS
brew install --cask longbridge/tap/longbridge-terminal

# Any platform
curl -sSL https://github.com/longbridge/longbridge-terminal/raw/main/install | sh
```

Authenticate:

```bash
longbridge login
```

## MCP (for AI tools — no code)

```bash
# Claude Code
claude mcp add longbridge https://openapi.longbridge.com/mcp
```

First tool call triggers an OAuth browser flow. See [references/mcp.md](references/mcp.md) for Cursor, ChatGPT, Zed.

## Authentication Methods

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
