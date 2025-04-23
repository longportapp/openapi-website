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

OpenAPI 文档遵循 [LLMs 文本](https://llmstxt.org/) 提供 [llms.txt](https://open.longportapp.com/llms.txt) 以及每个文档的 Markdown 文件，基于这个 LLMs 文本，你可以为 AI 提供 LongPort OpenAPI 完整的文档字典作为 AI 辅助生成开发的参考信息，这样 AI 能生成出来的代码可以更准确。

- [https://open.longportapp.com/llms.txt](https://open.longportapp.com/llms.txt) - 大约 2104 个 token。

我们的每个文档也都提供 Markdown 格式，当您访问它们时，只需在 URL 后添加 `.md` 后缀。

例如：

- https://open.longportapp.com/docs/getting-started.md
- https://open.longportapp.com/docs/quote/pull/static.md

### 演示

<video src="https://assets.lbctrl.com/uploads/ba6e849f-543d-4cb2-a6de-b0405124acb5/92fcb37035f4cc6fea390f63d18da7b5.mp4" width="100%" autoplay loop controls  />

### Cursor 内使用

打开 Cursor，打开命令面板（`Command + Shift + P`）搜索并选择 **Add New Custom Docs**，并在出来的对话框中输入 LongPort OpenAPI 的 LLMs Text 地址：

```
https://open.longportapp.com/llms.txt
```

添加成功后，Cursor Settings 里面会是这样：

<img src="https://assets.lbctrl.com/uploads/5d5d037f-d8fb-42ed-aa5e-6c59bd65d066/scr-20250423-qrgl.png" />

接下来你可以在 AI 的会话中，**@Add Context** 的 `docs` 菜单下选择刚才添加的 Docs，这样接下来与 AI 的会话中，AI 将会使用这些文档作为上下文。

<img src="https://assets.lbctrl.com/uploads/4c3c37d5-ead7-4854-8c8d-e8e77cdcd967/scr-20250423-qoxl.png" />

## MCP

我们正在为 LongPort OpenAPI 构建 [MCP](https://modelcontextprotocol.io/) 实现（基于我们的 SDK），您可以在支持 [MCP](https://modelcontextprotocol.io/) 的每个平台上使用它。

并且在我们的 GitHub 组织中也是开源的。

[https://github.com/longportapp/openapi](https://github.com/longportapp/openapi/tree/main/mcp)

### 安装

开始之前阅读 [快速开始](/docs/getting-started) 并获得您的 `LONGPORT_APP_KEY`、`LONGPORT_APP_SECRET` 和 `LONGPORT_ACCESS_TOKEN`。

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

请访问 [https://github.com/longportapp/openapi/releases](https://github.com/longportapp/openapi/releases) 下载 `longport-mcp-x86_64-pc-windows-msvc.zip` 并解压获得 `longport-mcp.exe`。

### 示例提示

完成服务器设置并连接后，您可以与 AI 进行以下对话：

- AAPL 和 TSLA 股票的当前价格是多少？
- 特斯拉在过去一个月的表现如何？
- 查一下港股、美股主要指数的最新行情数据。
- 查一下 TSLA 和 AAPL 在过去一年的股票价格历史。
- 比较 TSLA、AAPL 和 NVDA 在过去 3 个月的表现。
- 为我持有的股票生成投资组合表现图表，并返回数据表和饼图（直接返回结果，不要生成代码）。
- 检查我持有股票的最新价格，如果下跌/上涨超过 3%，以市场价格卖出（如果下跌）或买入（如果上涨）三分之一。

### Cursor 内使用

打开命令面板（`Command + Shift + P`），选择 **Cursor Settings** 进入 Cursor Settings 界面，并选择 **MCP Servers** 点击 **Add new global MCP server** 按钮。

在打开的 `mcp.json` 文件中增加下面的内容，请替换 `your-app-key`、`your-app-secret` 和 `your-access-token` 为您的实际值：

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

效果演示:

<img src="https://assets.lbctrl.com/uploads/415db9a3-a5e7-4610-87d7-75cf7146c706/scr-20250423-menf.png" />

### Cherry Studio 配置

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
