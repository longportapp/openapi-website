---
id: quote_capital_distribution.md
title: 獲取標的當日資金分佈
slug: capital-distribution
sidebar_position: 18
---

該接口用於獲取標的當日的資金分佈。

:::info
[業務指令](../../socket/protocol/request)：`25`
:::

## Request

### Parameters

| Name   | Type   | Required | Description                                          |
| ------ | ------ | -------- | ---------------------------------------------------- |
| symbol | string | 是       | 標的代碼，使用 `ticker.region` 格式，例如： `700.HK` |

### Protobuf

```protobuf
message SecurityRequest {
  string symbol = 1;
}
```

### Request Example

```python
# Get Security Capital Distribution
# https://open.longbridgeapp.com/docs/quote/pull/capital-distribution
# 運行前請訪問“開發者中心”確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過“長橋”手機客戶端，並進入“我的 - 我的行情 - 行情商城”購買開通行情權限。
```

## Response

### Response Properties

| Name        | Type     | Description    |
| ----------- | -------- | -------------- |
| symbol      | string   | 標的代碼       |
| timestamp   | int64    | 數據更新時間戳 |
| capital_in  | object[] | 流入資金       |
| ∟ large     | string   | 大單           |
| ∟ medium    | string   | 中單           |
| ∟ small     | string   | 小單           |
| capital_out | object[] | 流出資金       |
| ∟ large     | string   | 大單           |
| ∟ medium    | string   | 中單           |
| ∟ small     | string   | 小單           |

### Protobuf

```protobuf
message CapitalDistributionResponse {
  message CapitalDistribution {
    string large = 1;
    string medium = 2;
    string small = 3;
  }
  string symbol = 1;
  int64 timestamp = 2;
  CapitalDistribution capital_in = 3;
  CapitalDistribution capital_out = 4;
}
```

### Response JSON Example

```json
{
  "symbol": "700.HK",
  "timestamp": "1655107800",
  "capital_in": {
    "large": "935389700.000",
    "medium": "2056032380.000",
    "small": "828715920.000"
  },
  "capital_out": {
    "large": "1175331560.000",
    "medium": "2271829740.000",
    "small": "751648940.000"
  }
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
