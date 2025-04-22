---
sidebar_position: 6
slug: /llm
sidebar_label: LLM
sidebarCollapsed: true
id: llm
---

# LLM 组件

我们提供了一些用于 LLM（大型语言模型）的组件，您可以轻松访问和分析金融数据、实时市场数据，甚至可以让 AI 提交订单。

<video src="https://pub.lbkrs.com/files/202503/SGozJNWBfYpta73i/longport-mcp.mp4" width="100%" autoplay loop controls  />

是的，您可以通过 LongPort OpenAPI 使用我们的 LLM 组件，今天就开始吧！

## LLMs 文本

OpenAPI 文档遵循 [LLMs 文本](https://llmstxt.org/) 提供 [llms.txt](https://open.longportapp.com/llms.txt) 以及每个文档的 Markdown 文件。

- [https://open.longportapp.com/llms.txt](https://open.longportapp.com/llms.txt) - 大约 2104 个 token。

我们的每个文档也都提供 Markdown 格式，当您访问它们时，只需在 URL 后添加 `.md` 后缀。

例如：

- https://open.longportapp.com/docs/getting-started.md
- https://open.longportapp.com/docs/quote/pull/static.md

## MCP

我们正在为 LongPort OpenAPI 构建 [MCP](https://modelcontextprotocol.io/) 实现（基于我们的 SDK），您可以在支持 [MCP](https://modelcontextprotocol.io/) 的每个平台上使用它。

并且在我们的 GitHub 组织中也是开源的。

[https://github.com/longportapp/openapi](https://github.com/longportapp/openapi/tree/main/mcp)

### 安装

#### macOS 或 Linux

你可以在“终端”下面运行下面的脚本来直接安装：

```bash
curl -sSL https://raw.githubusercontent.com/longportapp/openapi/refs/heads/main/mcp/install | bash
```

脚本执行完后，`longport-mcp` 将会安装到 `/usr/local/bin/` 目录下，运行下面的命令验证是否正确：

```bash
longport-mcp -h
```

#### Windows

请访问 [https://github.com/longportapp/openapi/releases](https://github.com/longportapp/openapi/releases) 下载“longport-mcp-x86_64-pc-windows-msvc.zip”并解压获得 `longport-mcp.exe`。

### 使用

成功安装后，您将拥有一个 `longport-mcp` 命令行工具。

> 注意：您必须按照 [快速开始](/docs/getting-started) 配置您的环境。

在启动 MCP 服务器之前，必须设置环境变量 `LONGPORT_APP_KEY`、`LONGPORT_APP_SECRET` 和 `LONGPORT_ACCESS_TOKEN`。

#### 在您的 AI 聊天中配置 LongPort MCP

在这一部分，我们将向您展示如何在您的 AI 聊天中配置 LongPort MCP（截图使用了 [Cherry Studio](https://cherry-ai.com/)）。

**使用 STDIO 模式：**

确保您已经配置了环境变量并在系统中安装了 `longport-mcp` 命令行工具。

![](https://pub.lbkrs.com/files/202503/QRuojGfGL1Lay7rs/SCR-20250331-jajy.png)

**使用 SSE 模式：**

您必须先启动 SSE 服务器，可以使用以下命令：

```bash
longport-mcp --sse
```

然后配置您的 AI 聊天使用 `http://localhost:8000`。

![](https://pub.lbkrs.com/files/202503/PhUVovCsMqD2w2rL/SCR-20250319-snro.png)
