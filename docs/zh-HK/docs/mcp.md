---
sidebar_position: 2
slug: /mcp
sidebar_label: MCP 服務
sidebarCollapsed: true
id: mcp
---

# Longbridge MCP 服務

透過 Longbridge MCP 服務，你可以用自然語言向 Claude、Cursor 等 AI 工具發出指令，直接查詢行情、分析持倉、執行交易，而無需編寫程式碼或手動呼叫 API。

Longbridge MCP 基於 [Model Context Protocol](https://modelcontextprotocol.io/) 開放標準構建，採用 OAuth 2.1 授權，無需管理 API 密鑰，設定完成後即可使用。

**MCP 服務地址**

| 節點 | 地址 |
| --- | --- |
| 全球 | `https://openapi.longportapp.com/mcp` |
| 中國大陸 | `https://openapi.longportapp.cn/mcp` |

**OAuth 發現地址**：`https://openapi.longportapp.com/.well-known/oauth-authorization-server`

## 能做什麼

接入 Longbridge MCP 後，你可以直接在 AI 對話中完成以下操作：

**查詢行情**
- "幫我查一下蘋果和輝達現在的股價"
- "給我看騰訊最近三個月的 K 線走勢"
- "查一下特斯拉的期權鏈，重點看本月到期的"

**分析帳戶**
- "我現在持倉裡哪些股票虧損超過 5%"
- "幫我彙總一下本月的現金流水"
- "我的帳戶裡有多少可用資金"

**執行交易**
- "以市價買入 100 股蘋果"
- "把我的特斯拉持倉止損單全部撤掉"
- "幫我查一下今天的未成交訂單"

:::caution 交易安全提示
交易操作具有實際資金影響，建議在提示詞中明確要求 AI 在執行前向你確認訂單詳情。詳見[安全與使用建議](#安全與使用建議)。
:::

## 可用工具

授權後，AI 工具可以調用以下能力。實際可用工具因帳戶地區、權限等級與授權範圍而有所不同。

| 類別 | 工具 | 說明 |
| --- | --- | --- |
| 行情 | 即時報價 | 查詢股票、ETF、期權、權證的即時價格和漲跌幅 |
| 行情 | 盤口深度 | 查看買賣盤口的掛單價格和數量 |
| 行情 | 逐筆成交 | 取得最新成交記錄 |
| 歷史資料 | K 線資料 | 取得日線、分鐘線等不同週期的歷史行情 |
| 歷史資料 | 歷史成交 | 查詢歷史成交記錄和市場狀態 |
| 標的資訊 | 股票資料 | 查詢股票基本資訊、所屬板塊、財務數據等 |
| 標的資訊 | 期權鏈 | 瀏覽指定正股的期權合約列表 |
| 標的資訊 | 權證篩選 | 依條件篩選認股權證 |
| 帳戶 | 帳戶總覽 | 查看總資產、市值、現金等帳戶摘要 |
| 帳戶 | 持倉查詢 | 列出目前持有的所有標的及盈虧情況 |
| 資金 | 現金流水 | 查詢出入金、股息、費用等資金變動記錄 |
| 資金 | 融資情況 | 查看融資餘額和利息資訊 |
| 交易 | 下單 | 提交股票、期權等買賣訂單 |
| 交易 | 撤單 / 改單 | 撤銷或修改待成交訂單 |
| 交易 | 訂單查詢 | 查詢當日訂單和歷史訂單 |

:::info 交易權限
交易類工具需要帳戶具備相應的交易權限。部分市場或產品類型（如期權、權證）還需要額外的交易資格。
:::

## 快速開始

以下以 Cursor 為例示範最簡接入流程，其他客戶端步驟類似。

### 第一步：新增 MCP 服務設定

打開 **Cursor Settings → MCP Servers**，點擊 **Add new global MCP server**，在設定檔中新增：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

### 第二步：完成 OAuth 授權

儲存設定後，Cursor 會自動開啟瀏覽器跳轉至 Longbridge 授權頁面。使用 Longbridge 帳戶登入，查看請求的權限範圍並確認授權。

### 第三步：開始使用

授權成功後回到 Cursor，在 MCP Servers 列表中確認 `longbridge` 處於已連線狀態，工具列表出現後即可在對話中使用。

**驗證示例**：在 Cursor 對話框中輸入「幫我查一下蘋果股票的當前價格」，如果收到報價資料，說明接入成功。

## 各客戶端設定說明

:::tip
各客戶端的 MCP 設定介面可能隨版本更新有所變化，以下提供各客戶端的接入要點，具體操作以客戶端官方文件為準。
:::

### Cursor

打開 **Cursor Settings → MCP Servers**，新增遠端 MCP 服務：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

完成 OAuth 授權後，確認工具列表中出現 `longbridge` 相關工具。

### Claude Code

在 Claude Code 中執行以下命令新增遠端 MCP 服務：

```bash
claude mcp add --transport http longbridge https://openapi.longportapp.com/mcp
```

或編輯 MCP 設定檔手動新增：

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

在瀏覽器完成 OAuth 授權後，回到 Claude Code 即可調用工具。

### Claude Desktop

編輯 Claude Desktop 設定檔（`claude_desktop_config.json`），新增：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

重新啟動 Claude Desktop 後完成 OAuth 授權。

### ChatGPT

在 ChatGPT 的 **Settings → Connectors**（或工作區 MCP 設定入口）中新增遠端 MCP 服務，填入以下服務地址：

```
https://openapi.longportapp.com/mcp
```

依頁面指示完成 OAuth 授權。

### Zed

打開 `settings.json`，新增：

```json
{
  "context_servers": {
    "longbridge": {
      "url": "https://openapi.longportapp.com/mcp"
    }
  }
}
```

儲存後完成 OAuth 授權即可使用。

### Cherry Studio

在 Cherry Studio 的 **MCP 伺服器** 設定中新增服務，類型選擇 **SSE**，服務地址填入：

```
https://openapi.longportapp.com/mcp
```

:::caution 版本要求
部分較早版本的 Cherry Studio 未完整實作 MCP OAuth 2.1 流程，可能無法完成授權。建議升級至 v1.5.6 或更高版本。
:::

## OAuth 授權流程說明

Longbridge MCP 服務採用標準 OAuth 2.1 授權流程，無需向客戶端揭露 API 密鑰。整個流程只需完成一次，後續 AI 工具會自動使用已儲存的憑證。

1. **發起連線**：在 MCP 客戶端中設定 Longbridge MCP 服務地址並儲存
2. **跳轉授權頁**：客戶端自動開啟瀏覽器，跳轉至 Longbridge 登入與授權頁面
3. **登入並確認**：使用 Longbridge 帳戶登入，查看請求的權限範圍 (scope)，確認授權
4. **建立會話**：授權成功後客戶端取得 OAuth 憑證，MCP 會話可用
5. **憑證管理**：憑證依 OAuth 策略自動刷新；隨時可在 Longbridge 帳戶安全設定中撤銷授權

## 安全與使用建議

**權限控制**

- 遵循最小權限原則，僅授予目前情境所需的 scope
- 初次使用建議僅開啟唯讀權限（行情、帳戶查詢），確認行為符合預期後再開啟交易權限

**交易安全**

- 涉及下單、撤單等交易操作時，建議在提示詞中明確要求 AI 在執行前向使用者確認，例如：「在提交任何訂單前，先列出訂單詳情讓我確認」
- 可在提示詞中設定限制：單筆金額上限、可操作標的白名單、禁止市價單等
- 務必在實際交易前透過模擬情境驗證 AI 的行為邏輯

**憑證安全**

- OAuth 憑證由客戶端負責安全儲存，不要將其記錄至日誌或分享給第三方
- 定期檢查已授權的 MCP 應用，撤銷不再使用的授權

## 常見問題

### OAuth 授權失敗或無法完成跳轉

- 確認 Longbridge 帳戶狀態正常，未處於凍結或風險限制狀態
- 確認客戶端版本支援 MCP OAuth 2.1（參見上方各客戶端版本要求）
- 在客戶端重新發起授權流程
- 檢查目前帳戶是否支援所請求的權限範圍

### 已連線但部分工具不可用

- 帳戶權限或所在地區可能不支援該工具對應的功能
- 若授權範圍（scope）已變更，需重新完成 OAuth 授權流程

### 交易操作回傳權限不足

- 檢查帳戶是否已開通對應市場的交易權限
- 確認目前 MCP 會話的 OAuth scope 包含交易相關權限
- 部分市場或產品類型（如期權、權證）需要額外的交易資格

### 中國大陸訪問速度慢

將設定中的服務地址替換為大陸節點：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longportapp.cn/mcp"
    }
  }
}
```
