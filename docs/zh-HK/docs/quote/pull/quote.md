---
id: quote_quote
title: 獲取標的實時行情
slug: quote
sidebar_position: 2
---

該接口用於獲取標的的實時行情 (支持所有類型標的）。

<SDKLinks module="quote" klass="QuoteContext" method="quote" />

:::info
[業務指令](../../socket/biz-command)：`11`
:::

## Request

### Parameters

| Name   | Type     | Required | Description                                                                                                                         |
| ------ | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| symbol | string[] | 是       | 標的代碼列表，使用 `ticker.region` 格式，例如：`[700.HK]` <br /><br />**校驗規則：**<br />每次請求支持傳入的標的數量上限是 `500` 個 |

### Protobuf

```protobuf
message MultiSecurityRequest {
  repeated string symbol = 1;
}
```

### Request Example

```python
# 獲取標的實時行情
# https://open.longportapp.com/docs/quote/pull/quote
# 運行前請訪問“開發者中心“確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過“LongPort”手機客戶端，並進入“我的 - 我的行情 - 行情商城”購買開通行情權限。
from longport.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.quote(["700.HK", "AAPL.US", "TSLA.US", "NFLX.US"])
print(resp)
```

## Response

### Response Properties

| Name                | Type     | Description                                                         |
| ------------------- | -------- | ------------------------------------------------------------------- |
| secu_quote          | object[] | 標的實時行情數據列表                                                |
| ∟ symbol            | string   | 標的代碼                                                            |
| ∟ last_done         | string   | 最新價                                                              |
| ∟ prev_close        | string   | 昨收價                                                              |
| ∟ open              | string   | 開盤價                                                              |
| ∟ high              | string   | 最高價                                                              |
| ∟ low               | string   | 最低價                                                              |
| ∟ timestamp         | int64    | 最新成交的時間戳                                                    |
| ∟ volume            | int64    | 成交量                                                              |
| ∟ turnover          | string   | 成交額                                                              |
| ∟ trade_status      | int32    | 標的交易狀態，詳見 [TradeStatus](../objects#tradestatus---交易狀態) |
| ∟ pre_market_quote  | object   | 美股盤前交易行情                                                    |
| ∟∟ last_done        | string   | 最新價                                                              |
| ∟∟ timestamp        | int64    | 最新成交的時間戳                                                    |
| ∟∟ volume           | int64    | 成交量                                                              |
| ∟∟ turnover         | string   | 成交額                                                              |
| ∟∟ high             | string   | 最高價                                                              |
| ∟∟ low              | string   | 最低價                                                              |
| ∟∟ prev_close       | string   | 上一個交易階段的收盤價                                              |
| ∟ post_market_quote | object   | 美股盤後交易行情                                                    |
| ∟∟ last_done        | string   | 最新價                                                              |
| ∟∟ timestamp        | int64    | 最新成交的時間戳                                                    |
| ∟∟ volume           | int64    | 成交量                                                              |
| ∟∟ turnover         | string   | 成交額                                                              |
| ∟∟ high             | string   | 最高價                                                              |
| ∟∟ low              | string   | 最低價                                                              |
| ∟∟ prev_close       | string   | 上一個交易階段的收盤價                                              |
| ∟ over_night_quote  | object   | 美股夜盤交易行情                                                    |
| ∟∟ last_done        | string   | 最新價                                                              |
| ∟∟ timestamp        | int64    | 最新成交的時間戳                                                    |
| ∟∟ volume           | int64    | 成交量                                                              |
| ∟∟ turnover         | string   | 成交額                                                              |
| ∟∟ high             | string   | 最高價                                                              |
| ∟∟ low              | string   | 最低價                                                              |
| ∟∟ prev_close       | string   | 上一個交易階段的收盤價                                              |

### Protobuf

```protobuf
message SecurityQuoteResponse {
  repeated SecurityQuote secu_quote = 1;
}

message SecurityQuote {
  string symbol = 1;
  string last_done = 2;
  string prev_close = 3;
  string open = 4;
  string high = 5;
  string low = 6;
  int64 timestamp = 7;
  int64 volume = 8;
  string turnover = 9;
  TradeStatus trade_status = 10;
  PrePostQuote pre_market_quote = 11;
  PrePostQuote post_market_quote = 12;
}

message PrePostQuote {
  string last_done = 1;
  int64 timestamp = 2;
  int64 volume = 3;
  string turnover = 4;
  string high = 5;
  string low = 6;
  string prev_close = 7;
}
```

### Response JSON Example

```json
{
  "secu_quote": [
    {
      "symbol": "700.HK",
      "last_done": "338.000",
      "prev_close": "334.800",
      "open": "340.600",
      "high": "340.600",
      "low": "333.000",
      "timestamp": 1651115955,
      "volume": 7310881,
      "turnover": "2461463161.000"
    },
    {
      "symbol": "AAPL.US",
      "last_done": "156.570",
      "prev_close": "156.800",
      "open": "155.910",
      "high": "159.790",
      "low": "155.380",
      "timestamp": 1651089600,
      "volume": 88063191,
      "turnover": "13865092584.000",
      "pre_market_quote": {
        "last_done": "155.880",
        "timestamp": 1651066201,
        "volume": 1575504,
        "turnover": "246653442.000",
        "high": "158.400",
        "low": "155.100",
        "prev_close": "156.800"
      },
      "post_market_quote": {
        "last_done": "158.770",
        "timestamp": 1651103995,
        "volume": 6188441,
        "turnover": "970874184.759",
        "high": "159.400",
        "low": "156.400",
        "prev_close": "156.570"
      }
    }
  ]
}
```

## 接口限制

:::caution

- 港股 BMP 行情，超過 20 支的港股標的將響應延遲行情。

:::

## 錯誤碼

| 協議錯誤碼 | 業務錯誤碼 | 描述           | 排查建議                                   |
| ---------- | ---------- | -------------- | ------------------------------------------ |
| 3          | 301600     | 無效的請求     | 請求參數有誤或解包失敗                     |
| 3          | 301606     | 限流           | 降低請求頻次                               |
| 7          | 301602     | 服務端內部錯誤 | 請重試或聯繫技術人員處理                   |
| 7          | 301607     | 接口限制       | 請求的標的數量超限，請減少單次請求標的數量 |
