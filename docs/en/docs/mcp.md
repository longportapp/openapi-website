---
sidebar_position: 7
slug: /mcp
sidebar_label: MCP
sidebarCollapsed: true
id: mcp
---

# MCP

Longbridge provides an online MCP service so AI tools can securely access market and account capabilities through the Model Context Protocol.

- MCP endpoint: `https://openapi.longbridgeapp.com/mcp`
- OAuth discovery: `https://openapi.longbridgeapp.com/.well-known/oauth-authorization-server`

> This page describes the **hosted Longbridge MCP service** and its **OAuth authentication flow**.

## What the Longbridge MCP service can do

After authorization, MCP clients can use Longbridge capabilities such as:

- Market quotes and snapshots
- Candlesticks and historical data queries
- Account overview and position queries
- Trading actions (subject to account permissions and product rules)

Actual tool availability may vary by region, account level, and permission scope.

## OAuth authentication flow

Longbridge MCP uses OAuth so users can authorize clients without sharing raw API secrets.

### 1) Start MCP connection from your client

In your MCP-capable client (for example Cursor, Claude Desktop, or Cherry Studio), choose to connect to the Longbridge MCP server.

### 2) Redirect to Longbridge authorization page

The client opens a browser page for Longbridge sign-in and consent.

### 3) Sign in and grant permissions

Review requested scopes and approve access.

### 4) Receive authorization and establish session

After approval, the client receives OAuth credentials and the MCP session becomes available.

### 5) Refresh and revoke

- Access may expire and be refreshed according to OAuth policy.
- You can revoke access from your Longbridge security/authorization settings at any time.

## Client compatibility note

Some clients that do not fully implement the MCP OAuth 2.1 flow may fail to connect to Longbridge MCP.

For example, older versions of certain clients (such as early Cherry Studio releases) may not complete OAuth correctly. Please upgrade to the latest version of your client.

## Security notes

- OAuth credentials are sensitive and should be stored securely by your client.
- Use least-privilege scopes whenever possible.
- For trading-related prompts, always require human confirmation before order placement.

## Client setup

### ChatGPT

In ChatGPT, open **Settings → Connectors / MCP** (or the MCP entry in your workspace settings), add a new MCP server, and use:

- Server URL: `https://openapi.longbridgeapp.com/mcp`

Then complete the OAuth sign-in flow and grant scopes.

### Claude Code

In Claude Code MCP settings, add a remote MCP server with:

- Server URL: `https://openapi.longbridgeapp.com/mcp`

Finish OAuth in browser, then return to Claude Code to start using tools.

### Cursor

Open **Cursor Settings → MCP Servers**, add a remote MCP server endpoint:

- Server URL: `https://openapi.longbridgeapp.com/mcp`

Complete OAuth authorization and verify tools are listed.

### Zed

In Zed MCP/server integrations, add Longbridge as a remote MCP endpoint:

- Server URL: `https://openapi.longbridgeapp.com/mcp`

Authorize via OAuth and return to Zed for usage.

### OpenClaw

In OpenClaw MCP/tool integration settings, add Longbridge remote MCP endpoint:

- Server URL: `https://openapi.longbridgeapp.com/mcp`

Complete OAuth and confirm the MCP tools are available in your session.

## Recommended usage pattern

1. Start with read-only tasks (quote/account/position).
2. Add trading actions only after confirming permission scopes and risk controls.
3. Set guardrails in prompts (max amount, symbol allowlist, confirmation required).

## Troubleshooting

### OAuth sign-in failed

- Confirm your Longbridge account is in good standing.
- Retry authorization from the MCP client.
- Check whether the requested scopes are supported for your account.

### Connected but some tools are missing

- Your account/region may not have those permissions.
- Re-authorize if scope has changed.

### Permission denied on trading actions

- Verify trading permissions and market eligibility on your account.
- Ensure the MCP session has the required OAuth scopes.
