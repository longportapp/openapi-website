---
sidebar_position: 2
slug: /mcp
sidebar_label: MCP
sidebarCollapsed: true
id: mcp
---

# Longbridge MCP

[Longbridge MCP](https://github.com/longbridge/openapi/tree/main/mcp) 是 [Longbridge OpenAPI](https://open.longbridge.com/) 的 [MCP](https://modelcontextprotocol.io/introduction) 服務實作，透過 Model Context Protocol 向 AI 助手（如 Cursor、Cherry Studio）提供即時行情、帳戶與持倉查詢以及交易等能力。

需使用 **App Key**、**App Secret** 和 **Access Token** 進行配置，均在 [https://open.longbridge.com/](https://open.longbridge.com/)（用戶中心 → 應用憑證）取得。

完整安裝與選項請參閱 [Longbridge MCP README](https://github.com/longbridge/openapi/blob/main/mcp/README.md)。

## 前置條件

- 已開通 Longbridge 帳戶並具備 [Open API](https://open.longbridge.com/) 權限
- 在 [https://open.longbridge.com/](https://open.longbridge.com/) 取得 **App Key** 與 **App Secret**
- **Access Token**（在 [https://open.longbridge.com/](https://open.longbridge.com/) 用戶中心 → 應用憑證處取得）

## 安裝

### macOS / Linux

```bash
curl -sSL https://raw.githubusercontent.com/longbridge/openapi/refs/heads/main/mcp/install | bash
```

### Windows

從 [Releases](https://github.com/longbridge/openapi/releases) 下載最新二進位（如 `longbridge-mcp-0.1.0`）。

## 配置

執行 MCP 服務時需設定以下環境變數：

| 變數 | 說明 |
| --- | --- |
| `LONGBRIDGE_APP_KEY` | Open API App Key |
| `LONGBRIDGE_APP_SECRET` | Open API App Secret |
| `LONGBRIDGE_ACCESS_TOKEN` | 在 [https://open.longbridge.com/](https://open.longbridge.com/)（用戶中心 → 應用憑證）取得的 Access Token |

取得方式見[快速開始 — 方式二：傳統 API Key](/docs/getting-started#方式二傳統-api-key相容)。

## 客戶端配置

### Cursor

1. 開啟 **Settings → Features → MCP Servers**
2. 新增 MCP Server，類型為 **command**
3. 命令（macOS/Linux）：

   ```bash
   env LONGBRIDGE_APP_KEY=your-app-key LONGBRIDGE_APP_SECRET=your-app-secret LONGBRIDGE_ACCESS_TOKEN=your-access-token longbridge-mcp
   ```

4. Windows 下使用：

   ```bash
   cmd /c "set LONGBRIDGE_APP_KEY=your-app-key && set LONGBRIDGE_APP_SECRET=your-app-secret && set LONGBRIDGE_ACCESS_TOKEN=your-access-token && longbridge-mcp"
   ```

或在 MCP 配置 JSON 中：

```json
{
  "mcpServers": {
    "longbridge-mcp": {
      "command": "/usr/local/bin/longbridge-mcp",
      "env": {
        "LONGBRIDGE_APP_KEY": "your-app-key",
        "LONGBRIDGE_APP_SECRET": "your-app-secret",
        "LONGBRIDGE_ACCESS_TOKEN": "your-access-token"
      }
    }
  }
}
```

### Cherry Studio

1. **設定 → MCP 伺服器 → 新增伺服器**
2. 類型：**STDIO**
3. 命令：同上 `env LONGBRIDGE_APP_KEY=... LONGBRIDGE_APP_SECRET=... LONGBRIDGE_ACCESS_TOKEN=... longbridge-mcp`（Windows 用對應變體）

## 可選：SSE 服務模式

以 SSE 服務方式執行（預設綁定 `127.0.0.1:8000`）：

```bash
env LONGBRIDGE_APP_KEY=your-app-key LONGBRIDGE_APP_SECRET=your-app-secret LONGBRIDGE_ACCESS_TOKEN=your-access-token longbridge-mcp --sse
```

透過 `--bind` 修改位址：

```bash
longbridge-mcp --sse --bind 127.0.0.1:3000
```

## 可選：唯讀與日誌

- **唯讀模式**（不提交訂單）：

  ```bash
  longbridge-mcp --readonly
  ```

- **日誌目錄**：

  ```bash
  longbridge-mcp --log-dir /path/to/log/dir
  ```

## 能力說明

| 類別 | 說明 |
| --- | --- |
| 行情資料 | 即時報價、K 線、歷史行情 |
| 帳戶 | 帳戶總覽、資產、持倉 |
| 交易 | 下單、改單、撤單（受帳戶與地區限制） |

## 安全建議

- 勿將 **App Secret** 與 **Access Token** 提交至程式碼倉庫。
- 僅需行情或帳戶資料時可使用 **--readonly**。
- 若憑證外洩，請於 [Longbridge 帳戶安全](https://longbridge.com) 中撤銷或更換。

## 參考

- [Longbridge MCP README](https://github.com/longbridge/openapi/blob/main/mcp/README.md) — 安裝、配置與使用說明
- [快速開始](/docs/getting-started) — 方式二（傳統 API Key）取得開發者中心的 App Key、Secret 與 Access Token
