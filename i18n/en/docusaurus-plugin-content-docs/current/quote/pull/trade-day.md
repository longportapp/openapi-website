---
id: quote_trade_day
title: Get Market Trading Days
slug: trade-day
sidebar_position: 16
---

This API is used to obtain the trading days of the market.

:::info

[Business Command](../../socket/biz-command): `9`

:::

## Request

### Parameters

| Name    | Type   | Required | Description                                                                                                                                                                                 |
|---------|--------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| market  | string | Yes      | Market <br /><br />**Optional value:**<br/>`US` - US market<br/>`HK` - HK market<br/>`CN` - CN market<br/>`SG` - SG market                                                                  |
| beg_day | string | Yes      | begin day, in `YYMMDD` format, for example: `20220401`                                                                                                                                      |
| end_day | string | Yes      | begin day, in `YYMMDD` format, for example: `20220420` <br/><br/>**Check rules:**<br/> The interval cannot be greater than one month <br/> Only supports query data of the most recent year |

### Protobuf

```protobuf
message MarketTradeDayRequest {
  string market = 1;
  string beg_day = 2;
  string end_day = 3;
}
```

### Request Example

```python
# Get Market Trading Days
# https://open.longportapp.com/docs/quote/pull/trade-day
# Before running, please visit the "Developers to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "LongPort" mobile app.
from datetime import date
from longport.openapi import QuoteContext, Config, Market

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.trading_days(Market.HK, date(2022, 1, 1), date(2022, 2, 1))
print(resp)
```

## Response

### Response Properties

| Name           | Type     | Description                           |
|----------------|----------|---------------------------------------|
| trade_day      | string[] | Trading days, in `YYMMDD` format      |
| half_trade_day | string[] | Half trading days, in `YYMMDD` format |

### Protobuf

```protobuf
message MarketTradeDayResponse {
  repeated string trade_day = 1;
  repeated string half_trade_day = 2;
}
```

### Response JSON Example

```json
{
  "trade_day": [
    "20220120",
    "20220121",
    "20220124",
    "20220125",
    "20220126",
    "20220127",
    "20220128",
    "20220204",
    "20220207",
    "20220208",
    "20220209",
    "20220210"
  ],
  "half_trade_day": ["20220131"]
}
```

## Error Code

| Protocol Error Code | Business Error Code | Description                | Troubleshooting Suggestions                                        |
|---------------------|---------------------|----------------------------|--------------------------------------------------------------------|
| 3                   | 301600              | Invalid request            | Invalid request parameters or unpacking request failed             |
| 3                   | 301606              | Request rate limit         | Reduce the frequency of requests                                   |
| 7                   | 301602              | Server error               | Please try again or contact a technician to resolve the issue      |
| 7                   | 301600              | Invalue request parameters | Please check the request parameter: `market`, `beg_day`, `end_day` |
