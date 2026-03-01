---
sidebar_position: 7
slug: /mcp
sidebar_label: MCP
sidebarCollapsed: true
id: mcp
---

# MCP

Longbridge 提供線上 MCP 服務，讓 AI 工具可透過 Model Context Protocol 安全存取行情與帳戶能力。

- MCP 服務地址：`https://openapi.longportapp.com/mcp`
- OAuth 發現地址：`https://openapi.longportapp.com/.well-known/oauth-authorization-server`

> 本頁僅說明 **Longbridge MCP 線上服務** 與其 **OAuth 驗證流程**。

## Longbridge MCP 線上服務能力

完成授權後，MCP 客戶端可使用 Longbridge 能力，例如：

- 行情快照與即時查詢
- K 線與歷史資料查詢
- 帳戶總覽與持倉查詢
- 交易相關操作（取決於帳戶權限與產品規則）

實際可用能力會因地區、帳戶等級與授權範圍而有所不同。

## OAuth 驗證流程

Longbridge MCP 採用 OAuth，使用者無需向客戶端提供原始 API 密鑰。

### 1）在客戶端發起 MCP 連線

於支援 MCP 的客戶端（例如 Cursor、Claude Desktop、Cherry Studio）中發起連線 Longbridge MCP。

### 2）跳轉至 Longbridge 授權頁面

客戶端會開啟瀏覽器，進入 Longbridge 登入與授權頁。

### 3）登入並同意授權

檢視請求權限（scope）後完成授權。

### 4）授權回調並建立會話

授權成功後，客戶端取得 OAuth 憑證，MCP 會話即可使用。

### 5）刷新與撤銷

- 憑證會依 OAuth 策略過期並刷新。
- 你可隨時在 Longbridge 安全/授權設定中撤銷存取。

## 客戶端相容性說明

部分未完整實作 MCP OAuth 2.1 流程的客戶端，可能無法接入 Longbridge MCP。

例如，部分較早版本的客戶端（如早期 Cherry Studio）可能無法完整完成 OAuth 流程。建議升級至最新版本。

## 安全建議

- OAuth 憑證屬敏感資訊，客戶端應妥善保存。
- 採用最小權限原則，只授與必要 scope。
- 涉及交易操作時，建議一律加入人工確認。

## 客戶端接入方式

### ChatGPT

在 ChatGPT 的 **Settings → Connectors / MCP**（或工作區 MCP 設定入口）新增 MCP 服務，填入：

- 服務地址：`https://openapi.longportapp.com/mcp`

參考設定（示意）：

```json
{
  "mcpServers": {
    "longbridge": {
      "type": "remote",
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

其後依指示完成 OAuth 授權。

### Claude Code

在 Claude Code 的 MCP 設定中新增遠端 MCP 服務：

- 服務地址：`https://openapi.longportapp.com/mcp`

參考設定：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

於瀏覽器完成 OAuth 後，回到 Claude Code 即可使用工具。

### Cursor

打開 **Cursor Settings → MCP Servers**，新增遠端 MCP 服務：

- 服務地址：`https://openapi.longportapp.com/mcp`

參考設定：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

完成 OAuth 後，確認工具列表已出現。

### Zed

在 Zed 的 MCP/Server Integration 設定中加入 Longbridge 遠端 MCP：

- 服務地址：`https://openapi.longportapp.com/mcp`

參考設定（示意）：

```json
{
  "context_servers": [
    {
      "name": "longbridge",
      "url": "https://openapi.longportapp.com/mcp"
    }
  ]
}
```

完成 OAuth 授權後即可使用。

### OpenClaw

在 OpenClaw 的 MCP/工具整合設定中加入 Longbridge 遠端 MCP：

- 服務地址：`https://openapi.longportapp.com/mcp`

參考設定：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

完成 OAuth 後，於會話中確認工具可用。

## 建議使用方式

1. 先從唯讀能力開始（行情/帳戶/持倉）。
2. 確認權限範圍與風控後，再開啟交易能力。
3. 在提示詞加入限制（金額上限、標的白名單、下單前確認）。

## 常見問題

### OAuth 登入失敗

- 確認 Longbridge 帳戶狀態正常。
- 在客戶端重新發起授權。
- 檢查帳戶是否支援所請求的 scope。

### 已連線但部分工具不可用

- 可能受帳戶/地區權限限制。
- 若 scope 有變更，請重新授權。

### 交易操作提示權限不足

- 檢查帳戶交易權限與市場可交易資格。
- 確認目前 MCP 會話已取得對應 OAuth scope。
