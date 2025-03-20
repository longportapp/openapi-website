---
sidebar_position: 6
slug: /llm
sidebar_label: LLM
sidebarCollapsed: true
id: llm
---

# LLM 組件

我們提供了一些用於 LLM（大型語言模型）的組件，您可以輕鬆訪問和分析金融數據、實時市場數據，甚至可以讓 AI 提交訂單。

<video src="https://pub.lbkrs.com/files/202503/SGozJNWBfYpta73i/longport-mcp.mp4" width="100%" autoplay loop controls  />

是的，您可以通過 LongPort OpenAPI 使用我們的 LLM 組件，今天就開始吧！

## LLMs 文本

OpenAPI 文檔遵循 [LLMs 文本](https://llmstxt.org/) 提供 [llms.txt](https://open.longportapp.com/llms.txt) 以及每個文檔的 Markdown 文件。

- [https://open.longportapp.com/llms.txt](https://open.longportapp.com/llms.txt) - 大約 2104 個 token。

我們的每個文檔也都提供 Markdown 格式，當您訪問它們時，只需在 URL 後添加 `.md` 後綴。

例如：

- https://open.longportapp.com/docs/getting-started.md
- https://open.longportapp.com/docs/quote/pull/static.md

## MCP

我們正在為 LongPort OpenAPI 構建 [MCP](https://modelcontextprotocol.io/) 實現（基於我們的 SDK），您可以在支持 [MCP](https://modelcontextprotocol.io/) 的每個平台上使用它。

並且在我們的 GitHub 組織中也是開源的。

[https://github.com/longportapp/openapi](https://github.com/longportapp/openapi/tree/main/mcp)

### 安裝

訪問 [https://github.com/longportapp/openapi/releases](https://github.com/longportapp/openapi/releases) 下載最新版本。

### 使用

成功安裝後，您將擁有一個 `longport-mcp` 命令行工具。

> 注意：您必須按照 [快速開始](/docs/getting-started) 配置您的環境。

在啟動 MCP 服務器之前，必須設置環境變量 `LONGPORT_APP_KEY`、`LONGPORT_APP_SECRET` 和 `LONGPORT_ACCESS_TOKEN`。

#### 在您的 AI 聊天中配置 LongPort MCP

在這一部分，我們將向您展示如何在您的 AI 聊天中配置 LongPort MCP（截圖使用了 [Cherry Studio](https://cherry-studio.com/)）。

**使用 STDIO 模式：**

確保您已經配置了環境變量並在系統中安裝了 `longport-mcp` 命令行工具。

![](https://pub.lbkrs.com/files/202503/QdJeE6WUP9VjFSL7/SCR-20250319-smit.png)

**使用 SSE 模式：**

您必須先啟動 SSE 服務器，可以使用以下命令：

```bash
longport-mcp --sse
```

然後配置您的 AI 聊天使用 `http://localhost:8000`。

![](https://pub.lbkrs.com/files/202503/PhUVovCsMqD2w2rL/SCR-20250319-snro.png)
