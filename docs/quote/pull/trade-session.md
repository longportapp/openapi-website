---
id: quote_trade_session
title: 获取各市场当日交易时段
slug: trade-session
sidebar_position: 15
---

该接口用于获取各市场当日交易时段。

:::info

[协议指令](../../socket/protocol/request)：`8`

:::

## Response

### Response Properties

| Name                 | Type     | Description                                                                                 |
| -------------------- | -------- | ------------------------------------------------------------------------------------------- |
| market_trade_session | object[] | 市场交易时段                                                                                |
| ∟ market             | string   | 市场<br/><br/>`US` - 美股市场<br/>`HK` - 港股市场<br/>`CN` - A 股市场<br/>`SG` - 新加坡市场 |
| ∟ trade_session      | object[] | 交易时段                                                                                    |
| ∟∟ beg_time          | string   | 交易开始时间，格式：`hhmm` 例如：`900`                                                      |
| ∟∟ end_time          | string   | 交易结束时间，格式：`hhmm` 例如：`1400`                                                     |
| ∟∟ trade_session     | int32    | 交易时段，详见 [TradeSession](../objects#tradesession---交易时段)                           |

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

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                 |
| ---------- | ---------- | -------------- | ------------------------ |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败   |
| 3          | 301606     | 限流           | 降低请求频次             |
| 7          | 301602     | 服务端内部错误 | 请重试或联系技术人员处理 |
