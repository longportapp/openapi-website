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

Yes, you can use our LLM components through the LongPort OpenAPI. Start today!

## LLMs Text

The OpenAPI documentation follows the [LLMs Text](https://llmstxt.org/) standard, providing [llms.txt](https://open.longportapp.com/llms.txt) and Markdown files for each document. Based on this LLMs Text, you can provide AI with a complete dictionary of LongPort OpenAPI documentation as a reference for AI-assisted development, enabling AI to generate more accurate code.

- [https://open.longportapp.com/llms.txt](https://open.longportapp.com/llms.txt) - Approximately 2104 tokens.

Each of our documents is also available in Markdown format. When accessing them, simply add the `.md` suffix to the URL.

For example:

- https://open.longportapp.com/docs/getting-started.md
- https://open.longportapp.com/docs/quote/pull/static.md

### Demo

<video src="https://assets.lbctrl.com/uploads/ba6e849f-543d-4cb2-a6de-b0405124acb5/92fcb37035f4cc6fea390f63d18da7b5.mp4" width="100%" autoplay loop controls  />

### Using in Cursor

Open Cursor, open the command palette (`Command + Shift + P`), search for and select **Add New Custom Docs** and enter the LongPort OpenAPI LLMs Text address in the dialog box:

```
https://open.longportapp.com/llms.txt
```

Once added successfully, the Cursor Settings will look like this:

<img src="https://assets.lbctrl.com/uploads/5d5d037f-d8fb-42ed-aa5e-6c59bd65d066/scr-20250423-qrgl.png" />

Next, in an AI conversation, you can select the Docs you just added under the `docs` menu of **@Add Context**. This allows the AI to use these documents as context in subsequent conversations.

<img src="https://assets.lbctrl.com/uploads/4c3c37d5-ead7-4854-8c8d-e8e77cdcd967/scr-20250423-qoxl.png" />

## MCP

We are building an [MCP](https://modelcontextprotocol.io/) implementation for LongPort OpenAPI (based on our SDK), which you can use on any platform that supports [MCP](https://modelcontextprotocol.io/).

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

<img src="https://assets.lbctrl.com/uploads/415db9a3-a5e7-4610-87d7-75cf7146c706/scr-20250423-menf.png" />

### Cherry Studio Configuration

In this section, we will show you how to configure LongPort MCP in your AI chat (screenshots use [Cherry Studio](https://cherry-ai.com/)).

**Using STDIO Mode:**

Ensure you have configured the environment variables and installed the `longport-mcp` command-line tool on your system.

![](https://pub.lbkrs.com/files/202503/QRuojGfGL1Lay7rs/SCR-20250331-jajy.png)

**Using SSE Mode:**

You must first start the SSE server. You can use the following command:

```bash
longport-mcp --sse
```

Then configure your AI chat to use `http://localhost:8000`.

![](https://pub.lbkrs.com/files/202503/PhUVovCsMqD2w2rL/SCR-20250319-snro.png)
