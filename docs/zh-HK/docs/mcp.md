---
sidebar_position: 5
slug: /mcp
sidebar_label: MCP 伺服器
id: mcp
---

# Longbridge MCP 伺服器

我們為 Longbridge OpenAPI 提供了全面的 [MCP](https://modelcontextprotocol.io/) 實現，讓您可以從任何支援 MCP 的 AI 助手中輕鬆訪問金融數據、實時市場數據，甚至讓 AI 直接下單。

<video src="https://pub.lbkrs.com/files/202503/SGozJNWBfYpta73i/longport-mcp.mp4" width="100%" autoplay loop controls  />

## 什麼是 MCP？

Model Context Protocol（模型上下文協議）是一個開放協議，它標準化了應用程式如何為大型語言模型（LLM）提供上下文。透過 MCP，AI 助手可以安全地連接到各種數據源和工具，使它們能夠訪問實時信息並代表您執行操作。

> **重要提示：** 之前的 `longport-mcp` CLI 工具已經廢棄，不再建議使用。請使用我們的線上 MCP 伺服器，它提供更好的性能、自動更新和 OAuth 2 安全認證。本文件介紹的是推薦的線上 MCP 伺服器方式。

## Longbridge MCP 伺服器

我們的 MCP 伺服器為 AI 助手提供直接訪問：

- **實時市場數據**：股票價格、報價和市場指數
- **歷史數據**：歷史股票價格和表現指標
- **投資組合資訊**：您當前的持倉和頭寸
- **交易功能**：下單、查看帳戶狀態
- **市場分析**：技術指標和市場洞察

### 伺服器端點

**全球：**

```
https://openapi.longportapp.com/mcp
```

**中國大陸（加速）：**

```
https://openapi.longportapp.cn/mcp
```

> 如果您位於中國大陸，我們建議使用 `.cn` 端點以獲得更好的性能和更快的響應時間。

## 配置

### 在 Claude Desktop 中使用

在您的 Claude Desktop MCP 設定中添加以下配置：

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

首次連接時，Claude Desktop 將引導您完成 OAuth 2 授權流程以授予對您 Longbridge 帳戶的訪問權限。

### 在 Cursor 中使用

打開命令面板（`Command + Shift + P`），選擇 **Cursor Settings**，導航到 **MCP Servers**，然後點擊 **Add new global MCP server**。

在 `mcp.json` 文件中添加：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

在提示時按照瀏覽器中的 OAuth 2 授權流程操作。

### 在 Claude Code（CLI）中使用

[Claude Code](https://github.com/anthropics/claude-code) 是 Anthropic 的官方命令行介面。

將伺服器添加到您的 `~/.claude/settings.json`：

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

當您啟動 Claude Code 並與 Longbridge 伺服器互動時，它會自動處理 OAuth 2 授權流程。

### 在 Windsurf 中使用

[Windsurf](https://codeium.com/windsurf) 是 Codeium 的 AI 驅動程式碼編輯器。

1. 打開 Windsurf 設定
2. 導航到 **Extensions** → **MCP Servers**
3. 點擊 **Add Server**
4. 配置伺服器：

```json
{
  "name": "longbridge",
  "url": "https://openapi.longportapp.com/mcp",
  "type": "http"
}
```

### 在 Cline（VS Code 擴展）中使用

[Cline](https://github.com/cline/cline) 是一個流行的支援 MCP 的 VS Code 擴展。

1. 從 VS Code 市場安裝 Cline 擴展
2. 打開 VS Code 設定（`Cmd/Ctrl + ,`）
3. 搜索 "Cline MCP"
4. 添加 Longbridge MCP 伺服器：

```json
{
  "cline.mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.com/mcp",
      "type": "http"
    }
  }
}
```

### 在 Continue.dev 中使用

[Continue](https://continue.dev/) 是一個開源 AI 程式碼助手。

添加到您的 `~/.continue/config.json`：

```json
{
  "mcpServers": [
    {
      "name": "longbridge",
      "url": "https://openapi.longportapp.com/mcp",
      "type": "http"
    }
  ]
}
```

### 在 Zed 中使用

[Zed](https://zed.dev/) 是一個原生支援 MCP 的高性能程式碼編輯器。

1. 打開 Zed 設定（`Cmd + ,`）
2. 導航到 **AI** 部分
3. 添加 MCP 伺服器配置：

```json
{
  "assistant": {
    "mcp_servers": {
      "longbridge": {
        "url": "https://openapi.longportapp.com/mcp",
        "type": "http"
      }
    }
  }
}
```

### 在 ChatGPT Desktop 中使用

如果您使用支援 MCP 的 ChatGPT Desktop：

1. 打開 ChatGPT 設定
2. 導航到 **Integrations** → **MCP Servers**
3. 點擊 **Add Server** 並輸入：
   - 名稱：`Longbridge`
   - URL：`https://openapi.longportapp.com/mcp`
   - 類型：`HTTP with OAuth 2`

### 地區配置

**中國大陸用戶：**

如果您在中國大陸，請將伺服器 URL 替換為加速端點以獲得更好的性能：

```
https://openapi.longportapp.cn/mcp
```

只需在配置文件中將 `url` 欄位更新為使用 `.cn` 域名即可。

## 示例提示

配置完成後，您可以使用自然語言與 AI 互動：

**市場數據查詢：**

- "AAPL 和 TSLA 股票的當前價格是多少？"
- "顯示主要市場指數的當前值"
- "特斯拉在過去一個月的表現如何？"

**歷史分析：**

- "TSLA 和 AAPL 在過去一年的股票價格歷史是什麼？"
- "比較 TSLA、AAPL 和 NVDA 在過去 3 個月的表現"

**投資組合管理：**

- "為我持有的股票生成投資組合表現圖表"
- "顯示我當前的頭寸及其盈虧"
- "我的投資組合配置是怎樣的？"

**交易操作：**

- "檢查我今天持有的股票價格，如果下跌超過 3%，以市場價賣出 1/3"
- "下一個限價單，以 150 美元買入 100 股 AAPL"

## 可用工具

Longbridge MCP 伺服器提供以下功能：

### 報價工具

- 獲取股票實時報價
- 獲取歷史價格數據
- 訪問市場指數和板塊表現
- 查詢交易量和市場深度

### 帳戶工具

- 查看帳戶餘額和購買力
- 檢查當前頭寸和持倉
- 查看訂單歷史
- 監控投資組合表現

### 交易工具

- 下市價單和限價單
- 修改或取消待處理訂單
- 設置條件訂單
- 執行多腿策略

### 分析工具

- 計算技術指標
- 生成表現報告
- 比較多個證券
- 創建自定義視覺化

## 安全性

Longbridge MCP 伺服器使用 OAuth 2 進行安全認證：

- **無憑證儲存**：您的憑證永遠不會儲存在配置文件中
- **安全令牌交換**：OAuth 2 令牌由您的 MCP 客戶端安全管理
- **HTTPS 加密**：所有通訊都透過 HTTPS 加密
- **令牌刷新**：訪問令牌在需要時自動刷新

您將在初始設定期間透過瀏覽器授權訪問。授權後，MCP 客戶端會安全地管理您的會話令牌。

## 速率限制

MCP 伺服器受到與標準 Longbridge OpenAPI 相同的速率限制。有關詳細資訊，請參閱我們的[速率限制](/docs/rate-limits)文件。

## 支援

如果您遇到任何問題或有疑問：

- 查看我們的[文件](/docs/getting-started)
- 訪問我們的 [GitHub 倉庫](https://github.com/longportapp/openapi)
- 聯繫我們的支援團隊

## 下一步

- 探索我們的 [API 文件](/docs/quote/pull/static)以了解可用數據
- 了解[交易 API](/docs/trade/order/submit) 功能
- 加入我們的開發者社群獲取提示和最佳實踐
