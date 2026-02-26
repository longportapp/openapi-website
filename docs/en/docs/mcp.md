---
sidebar_position: 5
slug: /mcp
sidebar_label: MCP Server
id: mcp
---

# Longbridge MCP Server

We provide a comprehensive [MCP](https://modelcontextprotocol.io/) implementation for Longbridge OpenAPI, allowing you to easily access financial data, real-time market data, and even enable AI to place orders directly from any AI assistant that supports MCP.

<video src="https://pub.lbkrs.com/files/202503/SGozJNWBfYpta73i/longport-mcp.mp4" width="100%" autoplay loop controls  />

## What is MCP?

The Model Context Protocol (MCP) is an open protocol that standardizes how applications provide context to Large Language Models (LLMs). With MCP, AI assistants can securely connect to various data sources and tools, enabling them to access real-time information and perform actions on your behalf.

## Longbridge MCP Server

Our MCP server provides AI assistants with direct access to:

- **Real-time Market Data**: Stock prices, quotes, and market indices
- **Historical Data**: Historical stock prices and performance metrics
- **Portfolio Information**: Your current holdings and positions
- **Trading Capabilities**: Place orders, check account status
- **Market Analysis**: Technical indicators and market insights

### Server Endpoint

**Global:**

```
https://openapi.longportapp.com/mcp
```

**China Mainland (Faster):**

```
https://openapi.longportapp.cn/mcp
```

> If you're located in China mainland, we recommend using the `.cn` endpoint for better performance and faster response times.

## Configuration

### Using in Claude Desktop

Add the following configuration to your Claude Desktop MCP settings:

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

When you first connect, Claude Desktop will guide you through the OAuth 2 authorization flow to grant access to your Longbridge account.

### Using in Cursor

Open the command palette (`Command + Shift + P`), select **Cursor Settings**, navigate to **MCP Servers**, and click **Add new global MCP server**.

In the `mcp.json` file, add:

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

Follow the OAuth 2 authorization flow in your browser when prompted.

## Example Prompts

Once configured, you can interact with AI using natural language:

**Market Data Queries:**

- "What's the current price of AAPL and TSLA stock?"
- "Show me the current values of major market indices"
- "How has Tesla performed over the past month?"

**Historical Analysis:**

- "What's the stock price history for TSLA and AAPL over the last year?"
- "Compare the performance of TSLA, AAPL, and NVDA over the past 3 months"

**Portfolio Management:**

- "Generate a portfolio performance chart for my holding stocks"
- "Show me my current positions and their P&L"
- "What's my portfolio allocation?"

**Trading Actions:**

- "Check the price of the stocks I hold today, and if they fall by more than 3%, sell 1/3 at market price"
- "Place a limit order to buy 100 shares of AAPL at $150"

## Available Tools

The Longbridge MCP server provides the following capabilities:

### Quote Tools

- Get real-time quotes for stocks
- Fetch historical price data
- Access market indices and sector performance
- Query trading volume and market depth

### Account Tools

- View account balance and buying power
- Check current positions and holdings
- Review order history
- Monitor portfolio performance

### Trading Tools

- Place market and limit orders
- Modify or cancel pending orders
- Set up conditional orders
- Execute multi-leg strategies

### Analysis Tools

- Calculate technical indicators
- Generate performance reports
- Compare multiple securities
- Create custom visualizations

## Security

The Longbridge MCP server uses OAuth 2 for secure authentication:

- **No credential storage**: Your credentials are never stored in configuration files
- **Secure token exchange**: OAuth 2 tokens are securely managed by your MCP client
- **HTTPS encryption**: All communications are encrypted via HTTPS
- **Token refresh**: Access tokens are automatically refreshed when needed

You'll be prompted to authorize access through your browser during the initial setup. After authorization, the MCP client securely manages your session tokens.

## Rate Limits

The MCP server is subject to the same rate limits as the standard Longbridge OpenAPI. See our [Rate Limits](/docs/rate-limits) documentation for details.

## Support

If you encounter any issues or have questions:

- Check our [Documentation](/docs/getting-started)
- Visit our [GitHub Repository](https://github.com/longportapp/openapi)
- Contact our support team

## Next Steps

- Explore our [API Documentation](/docs/quote/pull/static) for available data
- Learn about [Trading API](/docs/trade/order/submit) capabilities
- Join our developer community for tips and best practices
