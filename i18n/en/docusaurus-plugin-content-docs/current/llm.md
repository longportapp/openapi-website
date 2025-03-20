---
sidebar_position: 6
slug: /llm
sidebar_label: LLM
sidebarCollapsed: true
id: llm
---

# LLM Components

We provide some components for LLM (Large language models), you can easily access and analyze financial data, real-time market data, even tell AI to submit orders.

<video src="https://pub.lbkrs.com/files/202503/SGozJNWBfYpta73i/longport-mcp.mp4" width="100%" autoplay loop controls  />

Yes, you can do it via LongPort OpenAPI with our LLM components, start today!

## LLMs Text

The OpenAPI Docs follow [LLMs Text](https://llmstxt.org/) to provide [llms.txt](https://open.longportapp.com/llms.txt) and Markdown files for each documents.

- [https://open.longportapp.com/llms.txt](https://open.longportapp.com/llms.txt) - About 2104 tokens.

Our each document is also available in Markdown format, when you visit them, just add `.md` suffix to the URL.

For example:

- https://open.longportapp.com/docs/getting-started.md
- https://open.longportapp.com/docs/quote/pull/static.md

## MCP

We in building the [MCP](https://modelcontextprotocol.io/) implementation for LongPort OpenAPI (Based on our SDK), you can use it in every AI platform that supported [MCP](https://modelcontextprotocol.io/).

And is also open source in our GitHub organization.

[https://github.com/longportapp/openapi](https://github.com/longportapp/openapi/tree/main/mcp)

### Installation

Visit [https://github.com/longportapp/openapi/releases](https://github.com/longportapp/openapi/releases) to download the latest release.

### Usage

When you installed successfully, you will have a `longport-mcp` command line tool.

> NOTE: You must follow [Getting Started](/docs/getting-started) to configure your environment.

The environment `LONGPORT_APP_KEY`, `LONGPORT_APP_SECRET` and `LONGPORT_ACCESS_TOKEN` must be set before you start the MCP server.

#### Configuration LongPort MCP in your AI Chat

This part we will show you how to configure LongPort MCP in your AI chat (The screenshot have used [Cherry Studio](https://cherry-studio.com/)).

**Use STDIO mode:**

Ensure you have already configured your environment variables and install the `longport-mcp` command line tool in your system.

![](https://pub.lbkrs.com/files/202503/QdJeE6WUP9VjFSL7/SCR-20250319-smit.png)

**Use SSE mode:**

You must to start SSE server first, you can use the following command:

```bash
longport-mcp --sse
```

And then configure your AI chat to use `http://localhost:8000`.

![](https://pub.lbkrs.com/files/202503/PhUVovCsMqD2w2rL/SCR-20250319-snro.png)
