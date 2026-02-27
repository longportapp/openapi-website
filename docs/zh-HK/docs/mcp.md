---
sidebar_position: 7
slug: /mcp
sidebar_label: MCP
sidebarCollapsed: true
id: mcp
---

# MCP

Longport MCP 是基於 Longbridge OpenAPI SDK 實作的 MCP 服務。

它可讓 Cursor、Cherry Studio、Claude Desktop 等支援 MCP 的 AI 客戶端，透過標準協議存取 Longbridge 的行情與交易能力。

- 開源地址：[longportapp/openapi/tree/main/mcp](https://github.com/longportapp/openapi/tree/main/mcp)
- 協議標準：[Model Context Protocol](https://modelcontextprotocol.io/)

## 前置條件

開始前請確認：

- 你已完成 Longbridge 開戶並啟用 OpenAPI 授權。
- 你已取得以下憑證：
  - `LONGPORT_APP_KEY`
  - `LONGPORT_APP_SECRET`
  - `LONGPORT_ACCESS_TOKEN`
- （可選）如在中國大陸使用，建議設定：
  - `LONGPORT_REGION=cn`

> 安全提示：`LONGPORT_ACCESS_TOKEN` 等同 API 存取權限，請勿外洩。

## 安裝

### macOS / Linux

執行：

```bash
curl -sSL https://raw.githubusercontent.com/longportapp/openapi/refs/heads/main/mcp/install | bash
```

安裝後驗證：

```bash
longport-mcp -h
```

### Windows

從以下地址下載 `longport-mcp-x86_64-pc-windows-msvc.zip`：

- [https://github.com/longportapp/openapi/releases](https://github.com/longportapp/openapi/releases)

解壓取得 `longport-mcp.exe`，建議放在固定路徑（例如 `C:\\longport-mcp.exe`）。

## 3 分鐘快速開始

1. 安裝 `longport-mcp`。
2. 在你的 AI 客戶端中設定 MCP。
3. 啟動後先用行情/帳戶類提問驗證連線。

`mcp.json` 範例：

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

Windows 範例：

```json
{
  "mcpServers": {
    "longport-mcp": {
      "command": "C:\\longport-mcp.exe",
      "env": {
        "LONGPORT_APP_KEY": "your-app-key",
        "LONGPORT_APP_SECRET": "your-app-secret",
        "LONGPORT_ACCESS_TOKEN": "your-access-token"
      }
    }
  }
}
```

如在中國大陸，可增加：

```json
{
  "LONGPORT_REGION": "cn"
}
```

## 能力分類

依帳戶權限不同，MCP 可提供以下能力：

- **Quote（行情）**：快照、即時行情、K 線、歷史資料
- **Market（市場）**：主要指數與市場概覽
- **Account（帳戶）**：資金與帳戶摘要
- **Position（持倉）**：持倉與組合檢視
- **Trade（交易）**：下單、查單、撤單（需權限）

> 實際可用工具會因地區與帳戶權限而異。

## 範例提問

連接 MCP 後可這樣詢問：

- 「AAPL 和 TSLA 現價是多少？」
- 「TSLA 最近一個月表現如何？」
- 「給我目前帳戶摘要和持倉情況。」
- 「比較 TSLA、AAPL、NVDA 過去 3 個月表現。」
- 「生成我的組合表現表格與圓餅圖（只回傳結果，不要程式碼）。」

## Cursor 設定

1. 打開命令面板（`Command + Shift + P`）
2. 進入 **Cursor Settings**
3. 選擇 **MCP Servers**
4. 點擊 **Add new global MCP server**
5. 在 `mcp.json` 填入你的憑證

## Cherry Studio 設定

建議使用 **STDIO 模式**，並確保系統可找到 `longport-mcp` 命令（或使用絕對路徑）。

中國大陸使用者建議增加：

```bash
LONGPORT_REGION=cn
```

## 安全與風控建議

- AI 生成的交易指令必須人工覆核。
- 建議先從只讀能力開始（行情/帳戶/持倉）。
- 如啟用交易指令，建議加入硬性限制，例如：
  - 單筆金額上限
  - 僅允許指定標的
  - 下單前強制確認
- 初次使用建議先小額驗證。

## 常見問題排查

### Authentication failed / invalid token

- 檢查 3 個憑證是否正確。
- 確認 token 未過期、未被撤銷。

### MCP 已啟動但看不到工具

- 確認客戶端讀取的是正確的 `mcp.json`。
- 修改設定後重啟 AI 客戶端。

### Windows 找不到可執行檔

- 請使用絕對路徑，例如 `C:\\longport-mcp.exe`。

### 中國大陸網路不穩定

- 增加 `LONGPORT_REGION=cn`。
