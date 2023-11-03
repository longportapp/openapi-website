---
id: quote_trade_session
title: 獲取各市場當日交易時段
slug: trade-session
sidebar_position: 15
---

該接口用於獲取各市場當日交易時段。

:::info

[業務指令](../../socket/biz-command)：`8`

:::

## Request

### Request Example

```python
# 獲取各市場當日交易時段
# https://open.longportapp.com/docs/quote/pull/trade-session
# 運行前請訪問“開發者中心“確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過“LongPort”手機客戶端，並進入“我的 - 我的行情 - 行情商城”購買開通行情權限。
from longbridge.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.trading_session()
print(resp)
```

## Response

### Response Properties

| Name                 | Type     | Description                                                                                 |
| -------------------- | -------- | ------------------------------------------------------------------------------------------- |
| market_trade_session | object[] | 市場交易時段                                                                                |
| ∟ market             | string   | 市場<br/><br/>`US` - 美股市場<br/>`HK` - 港股市場<br/>`CN` - A 股市場<br/>`SG` - 新加坡市場 |
| ∟ trade_session      | object[] | 交易時段                                                                                    |
| ∟∟ beg_time          | int32    | 交易開始時間，格式：`hhmm` 例如：`900`                                                      |
| ∟∟ end_time          | int32    | 交易結束時間，格式：`hhmm` 例如：`1400`                                                     |
| ∟∟ trade_session     | int32    | 交易時段，詳見 [TradeSession](../objects#tradesession---交易時段)                           |

### Protobuf

```protobuf
message MarketTradePeriodResponse {
  repeated MarketTradePeriod market_trade_session = 1;
}

message MarketTradePeriod {
  string market = 1;
  repeated TradePeriod trade_session = 2;
}

message TradePeriod {
  int32 beg_time = 1;
  int32 end_time = 2;
  TradeSession trade_session = 3;
}
```

### Response JSON Example

```json
{
  "market_trade_session": [
    {
      "market": "US",
      "trade_session": [
        {
          "beg_time": 930,
          "end_time": 1600
        },
        {
          "beg_time": 400,
          "end_time": 930,
          "trade_session": 1
        },
        {
          "beg_time": 1600,
          "end_time": 2000,
          "trade_session": 2
        }
      ]
    },
    {
      "market": "HK",
      "trade_session": [
        {
          "beg_time": 930,
          "end_time": 1200
        },
        {
          "beg_time": 1300,
          "end_time": 1600
        }
      ]
    },
    {
      "market": "CN",
      "trade_session": [
        {
          "beg_time": 930,
          "end_time": 1130
        },
        {
          "beg_time": 1300,
          "end_time": 1457
        }
      ]
    },
    {
      "market": "SG",
      "trade_session": [
        {
          "beg_time": 900,
          "end_time": 1200
        },
        {
          "beg_time": 1300,
          "end_time": 1700
        }
      ]
    }
  ]
}
```

## 錯誤碼

| 協議錯誤碼 | 業務錯誤碼 | 描述           | 排查建議                 |
| ---------- | ---------- | -------------- | ------------------------ |
| 3          | 301600     | 無效的請求     | 請求參數有誤或解包失敗   |
| 3          | 301606     | 限流           | 降低請求頻次             |
| 7          | 301602     | 服務端內部錯誤 | 請重試或聯繫技術人員處理 |
