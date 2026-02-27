---
sidebar_position: 7
slug: /mcp
sidebar_label: MCP
sidebarCollapsed: true
id: mcp
---

# MCP

Longbridge provides an online MCP service so AI tools can securely access market and account capabilities through the Model Context Protocol.

- MCP endpoint: `https://openapi.longbridge.com/mcp`
- OAuth discovery: `https://openapi.longbridge.com/.well-known/oauth-authorization-server`

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

## Security notes

- OAuth credentials are sensitive and should be stored securely by your client.
- Use least-privilege scopes whenever possible.
- For trading-related prompts, always require human confirmation before order placement.

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
