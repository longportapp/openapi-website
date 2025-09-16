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

是的，您可以通過 Longbridge OpenAPI 使用我們的 LLM 組件，今天就開始吧！

## LLMs 文本

OpenAPI 文件遵循 [LLMs 文本](https://llmstxt.org/) 提供 [llms.txt](https://open.longbridge.com/llms.txt) 以及每個文件的 Markdown 文件，基於這個 LLMs 文本，你可以為 AI 提供 Longbridge OpenAPI 完整的文件字典作為 AI 輔助生成開發的參考信息，這樣 AI 能生成出來的代碼可以更準確。

- [https://open.longbridge.com/llms.txt](https://open.longbridge.com/llms.txt) - 大約 2104 個 token。

我們的每個文件也都提供 Markdown 格式，當您訪問它們時，只需在 URL 後添加 `.md` 後綴。

例如：

- https://open.longbridge.com/docs/getting-started.md
- https://open.longbridge.com/docs/quote/pull/static.md

### 演示

<video src="https://assets.lbkrs.com/uploads/030b2d42-c693-4290-aff1-9cfa6d819644/92fcb37035f4cc6fea390f63d18da7b5.mp4" width="100%" autoplay loop controls  />

### Cursor 內使用

打開 Cursor，打開命令面板（`Command + Shift + P`）搜索並選擇 **Add New Custom Docs**，並在出來的對話框中輸入 Longbridge OpenAPI 的 LLMs Text 地址：

```
https://open.longbridge.com/llms.txt
```

添加成功後，Cursor Settings 裡面會是這樣：

<img src="https://assets.lbkrs.com/uploads/5d5d037f-d8fb-42ed-aa5e-6c59bd65d066/scr-20250423-qrgl.png" />

接下來你可以在 AI 的會話中，**@Add Context** 的 `docs` 菜單下選擇剛才添加的 Docs，這樣接下來與 AI 的會話中，AI 將會使用這些文件作為上下文。

<img src="https://assets.lbkrs.com/uploads/4c3c37d5-ead7-4854-8c8d-e8e77cdcd967/scr-20250423-qoxl.png" />

## MCP

我們正在為 Longbridge OpenAPI 構建 [MCP](https://modelcontextprotocol.io/) 實現（基於我們的 SDK），您可以在支持 [MCP](https://modelcontextprotocol.io/) 的每個平台上使用它。

並且在我們的 GitHub 組織中也是開源的。

[https://github.com/longportapp/openapi](https://github.com/longportapp/openapi/tree/main/mcp)

### 安裝

開始之前閱讀 [快速開始](/docs/getting-started) 並獲得您的 `LONGPORT_APP_KEY`、`LONGPORT_APP_SECRET` 和 `LONGPORT_ACCESS_TOKEN`。

#### macOS 或 Linux

你可以在“終端”下面運行下面的腳本來直接安裝：

```bash
curl -sSL https://raw.githubusercontent.com/longportapp/openapi/refs/heads/main/mcp/install | bash
```

腳本執行完後，`longport-mcp` 將會安裝到 `/usr/local/bin/` 目錄下，運行下面的命令驗證是否正確：

```bash
longport-mcp -h
```

#### Windows

請訪問 [https://github.com/longportapp/openapi/releases](https://github.com/longportapp/openapi/releases) 下載 `longport-mcp-x86_64-pc-windows-msvc.zip` 並解壓獲得 `longport-mcp.exe`。

### 示例提示

完成伺服器設置並連接後，您可以與 AI 進行以下對話：

- AAPL 和 TSLA 股票的當前價格是多少？
- 特斯拉在過去一個月的表現如何？
- 查一下港股、美股主要指數的最新行情數據。
- 查一下 TSLA 和 AAPL 在過去一年的股票價格歷史。
- 比較 TSLA、AAPL 和 NVDA 在過去 3 個月的表現。
- 為我持有的股票生成投資組合表現圖表，並返回數據表和餅圖（直接返回結果，不要生成代碼）。
- 檢查我持有股票的最新價格，如果下跌/上漲超過 3%，以市場價格賣出（如果下跌）或買入（如果上漲）三分之一。

### Cursor 內使用

打開命令面板（`Command + Shift + P`），選擇 **Cursor Settings** 進入 Cursor Settings 界面，並選擇 **MCP Servers** 點擊 **Add new global MCP server** 按鈕。

在打開的 `mcp.json` 文件中增加下面的內容，請替換 `your-app-key`、`your-app-secret` 和 `your-access-token` 為您的實際值：

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

效果演示：

<img src="https://assets.lbkrs.com/uploads/415db9a3-a5e7-4610-87d7-75cf7146c706/scr-20250423-menf.png" />

### Cherry Studio 配置

在這一部分，我們將向您展示如何在您的 AI 聊天中配置 Longbridge MCP（截圖使用了 [Cherry Studio](https://cherry-ai.com/)）。

> NOTE: 請注意更新 Cherry Studio 到最新的版本，本文截圖的時候使用的是 v1.5.6。

**使用 STDIO 模式：**

確保您已經配置了環境變量並在系統中安裝了 `longport-mcp` 命令行工具。

![](https://pub.lbkrs.com/files/202503/QRuojGfGL1Lay7rs/SCR-20250331-jajy.png)

如果你是 Windows，可以參考下面圖的設定方式，你可以把 `E:\` 換成 `longport-mcp.exe` 所在的具體路徑。
為了避免一些其他影響，建議你放在 `C:\longport-mcp.exe` 先嘗試一下，成功以後，然後再放到其他位置。

![](https://assets.lbctrl.com/uploads/4ff72c40-b651-438d-a98d-71dd76d78014/scr-20250814-nfrg.png)

如果你在中國大陸，你可能還需要往環境變數配置裡面額外增加 `LONGPORT_REGION=cn`，這會讓你走我們中國大陸的 CDN 伺服器連接，已獲得更好的穩定性。

```
LONGPORT_REGION=cn
```
