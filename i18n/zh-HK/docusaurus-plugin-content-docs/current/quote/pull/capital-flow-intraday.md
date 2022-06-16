---
id: quote_capital_flow_intraday
title: 獲取標的當日資金流向
slug: capital-flow-intraday
sidebar_position: 17
---

該接口用於獲取標的當日的資金流向。

:::info
[業務指令](../../socket/protocol/request)：`24`
:::

## Request

### Parameters

| Name   | Type   | Required | Description                                          |
| ------ | ------ | -------- | ---------------------------------------------------- |
| symbol | string | 是       | 標的代碼，使用 `ticker.region` 格式，例如： `700.HK` |

### Protobuf

```protobuf
message CapitalFlowIntradayRequest {
  string symbol = 1;
}
```

### Request Example

```python
# Get Security Capital Flow Intraday
# https://open.longbridgeapp.com/docs/quote/pull/capital-flow-intraday
# 運行前請訪問“開發者中心”確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過“長橋”手機客戶端，並進入“我的 - 我的行情 - 行情商城”購買開通行情權限。
```

## Response

### Response Properties

| Name               | Type     | Description    |
| ------------------ | -------- | -------------- |
| symbol             | string   | 標的代碼       |
| capital_flow_lines | object[] | 資金流向數據   |
| ∟ inflow           | string   | 淨流入         |
| ∟ timestamp        | int64    | 分鐘開始時間戳 |

### Protobuf

```protobuf
message CapitalFlowIntradayResponse {
  message CapitalFlowLine {
    string inflow = 1;
    int64 timestamp = 2;
  }
  string symbol = 1;
  repeated CapitalFlowLine capital_flow_lines = 2;
}
```

### Response JSON Example

```json
{
  "symbol": "700.HK",
  "capital_flow_lines": [
    { "inflow": "-310255860.000", "timestamp": "1655106960" },
    { "inflow": "-314011220.000", "timestamp": "1655107020" },
    { "inflow": "-314011220.000", "timestamp": "1655107080" },
    { "inflow": "-314011220.000", "timestamp": "1655107140" },
    { "inflow": "-314011220.000", "timestamp": "1655107200" }
  ]
}
```

## 錯誤碼

| 協議錯誤碼 | 業務錯誤碼 | 描述           | 排查建議                     |
| ---------- | ---------- | -------------- | ---------------------------- |
| 3          | 301600     | 無效的請求     | 請求參數有誤或解包失敗       |
| 3          | 301606     | 限流           | 降低請求頻次                 |
| 7          | 301602     | 服務端內部錯誤 | 請重試或聯繫技術人員處理     |
| 7          | 301600     | 請求標的不存在 | 檢查請求的 `symbol` 是否正確 |
| 7          | 301603     | 標的無行情     | 標的沒有請求的行情數據       |
| 7          | 301604     | 無權限         | 沒有獲取標的行情的權限       |
