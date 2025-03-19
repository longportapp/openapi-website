---
sidebar_position: -999
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

The OpenAPI Docs follow [LLMs Text](https://llmstxt.org/) to provide [llms.txt](/llms.txt) and Markdown files for each documents.

- [https://open.longportapp.com/llms.txt](https://open.longportapp.com/llms.txt) - About 2104 tokens.

Our each document is also available in Markdown format, when you visit them, just add `.md` suffix to the URL.

For example:

- https://open.longportapp.com/en/docs/getting-started.md
- https://open.longportapp.com/en/docs/quote/pull/static.md

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

Start MCP server (STDIO) in local:

```bash
longport-mcp
```

If you want to start as a SSE mode, you can use the following command:

```bash
longport-mcp --sse
```
