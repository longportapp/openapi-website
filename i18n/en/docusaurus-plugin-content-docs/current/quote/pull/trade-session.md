---
id: quote_trade_session
title: Get Trading Session Of The Day
slug: trade-session
sidebar_position: 15
---

This API is used to obtain the daily trading hours of each market.

:::info

[Business Command](../../socket/biz-command): `8`

:::

## Request

### Request Example

```python
# Get Trading Session Of The Day
# https://open.longportapp.com/docs/quote/pull/trade-session
# Before running, please visit the "Developers to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "LongPort" mobile app.
from longbridge.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.trading_session()
print(resp)
```

## Response

### Response Properties

| Name                 | Type     | Description                                                                                     |
| -------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| market_trade_session | object[] | Trading session data                                                                            |
| ∟ market             | string   | Market<br/><br/>`US` - US market<br/>`HK` - HK market<br/>`CN` - CN market<br/>`SG` - SG market |
| ∟ trade_session      | object[] | Trading session                                                                                 |
| ∟∟ beg_time          | int32    | Being trading time, in `hhmm` format, for example: `900`                                        |
| ∟∟ end_time          | int32    | End trading time, in `hhmm` format, for example: `1400`                                         |
| ∟∟ trade_session     | int32    | Trading session, see [TradeSession](../objects#tradesession---trading-session)                  |

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

## Error Code

| Protocol Error Code | Business Error Code | Description        | Troubleshooting Suggestions                                   |
| ------------------- | ------------------- | ------------------ | ------------------------------------------------------------- |
| 3                   | 301600              | Invalid request    | Invalid request parameters or unpacking request failed        |
| 3                   | 301606              | Request rate limit | Reduce the frequency of requests                              |
| 7                   | 301602              | Server error       | Please try again or contact a technician to resolve the issue |
