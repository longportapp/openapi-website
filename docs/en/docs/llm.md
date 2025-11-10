---
sidebar_position: 6
slug: /llm
sidebar_label: LLM
sidebarCollapsed: true
id: llm
---

# LLM Components

We provide several components for LLMs (Large Language Models) that allow you to easily access and analyze financial data, real-time market data, and even enable AI to place orders.

<video src="https://pub.lbkrs.com/files/202503/SGozJNWBfYpta73i/longport-mcp.mp4" width="100%" autoplay loop controls  />

Yes, you can use our LLM components through the Longbridge OpenAPI. Start today!

## LLMs Text

The OpenAPI documentation follows the [LLMs Text](https://llmstxt.org/) standard, providing [llms.txt](https://open.longbridge.com/llms.txt) and Markdown files for each document. Based on this LLMs Text, you can provide AI with a complete dictionary of Longbridge OpenAPI documentation as a reference for AI-assisted development, enabling AI to generate more accurate code.

- [https://open.longbridge.com/llms.txt](https://open.longbridge.com/llms.txt) - Approximately 2104 tokens.

Each of our documents is also available in Markdown format. When accessing them, simply add the `.md` suffix to the URL.

For example:

- https://open.longbridge.com/docs/getting-started.md
- https://open.longbridge.com/docs/quote/pull/static.md

### Demo

<video src="https://assets.lbkrs.com/uploads/030b2d42-c693-4290-aff1-9cfa6d819644/92fcb37035f4cc6fea390f63d18da7b5.mp4" width="100%" autoplay loop controls  />

### Using in Cursor

Open Cursor, open the command palette (`Command + Shift + P`), search for and select **Add New Custom Docs** and enter the Longbridge OpenAPI LLMs Text address in the dialog box:

```
https://open.longbridge.com/llms.txt
```

Once added successfully, the Cursor Settings will look like this:

<img src="https://assets.lbkrs.com/uploads/5d5d037f-d8fb-42ed-aa5e-6c59bd65d066/scr-20250423-qrgl.png" />

Next, in an AI conversation, you can select the Docs you just added under the `docs` menu of **@Add Context**. This allows the AI to use these documents as context in subsequent conversations.

<img src="https://assets.lbkrs.com/uploads/4c3c37d5-ead7-4854-8c8d-e8e77cdcd967/scr-20250423-qoxl.png" />

## MCP

We are building an [MCP](https://modelcontextprotocol.io/) implementation for Longbridge OpenAPI (based on our SDK), which you can use on any platform that supports [MCP](https://modelcontextprotocol.io/).

It is also open-sourced in our GitHub organization.

[https://github.com/longportapp/openapi](https://github.com/longportapp/openapi/tree/main/mcp)

### Installation

Before starting, read the [Getting Started](/docs/getting-started) guide and obtain your `LONGPORT_APP_KEY`, `LONGPORT_APP_SECRET`, and `LONGPORT_ACCESS_TOKEN`.

#### macOS or Linux

You can run the following script in the terminal to install directly:

```bash
curl -sSL https://raw.githubusercontent.com/longportapp/openapi/refs/heads/main/mcp/install | bash
```

After the script finishes, `longport-mcp` will be installed in the `/usr/local/bin/` directory. Run the following command to verify the installation:

```bash
longport-mcp -h
```

#### Windows

Visit [https://github.com/longportapp/openapi/releases](https://github.com/longportapp/openapi/releases) to download `longport-mcp-x86_64-pc-windows-msvc.zip` and extract `longport-mcp.exe`.

### Example Prompts

Once you done server setup, and connected, you can talk with AI:

- What's the current price of AAPL and TSLA stock?
- How has Tesla performed over the past month?
- Show me the current values of major market indices.
- What's the stock price history for TSLA, AAPL over the last year?
- Compare the performance of TSLA, AAPL and NVDA over the past 3 months.
- Generate a portfolio performance chart for my holding stocks, and return me with data table and pie chart (Just return result no code).
- Check the price of the stocks I hold today, and if they fall/rise by more than 3%, sell(If fall, buy if rise) 1/3 at the market price.

### Using in Cursor

Open the command palette (`Command + Shift + P`), select **Cursor Settings** to enter the Cursor Settings interface, and select **MCP Servers**. Click the **Add new global MCP server** button.

In the opened `mcp.json` file, add the following content, replacing `your-app-key`, `your-app-secret`, and `your-access-token` with your actual values:

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

Demo:

<img src="https://assets.lbkrs.com/uploads/415db9a3-a5e7-4610-87d7-75cf7146c706/scr-20250423-menf.png" />

### Cherry Studio Configuration

In this section, we will show you how to configure Longbridge MCP in your AI chat (screenshots use [Cherry Studio](https://cherry-ai.com/)).

> NOTE: Please make sure your update the Cherry Studio to newest version.

**Using STDIO Mode:**

Ensure you have configured the environment variables and installed the `longport-mcp` command-line tool on your system.

![](https://pub.lbkrs.com/files/202503/QRuojGfGL1Lay7rs/SCR-20250331-jajy.png)

For Windows, you can configure like this:

![](https://assets.lbctrl.com/uploads/4ff72c40-b651-438d-a98d-71dd76d78014/scr-20250814-nfrg.png)

If your in China, you may need to add `LONGPORT_REGION=cn` into your environment config.

```
LONGPORT_REGION=cn
```
