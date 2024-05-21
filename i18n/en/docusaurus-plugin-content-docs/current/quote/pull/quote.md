---
id: quote_quote
title: Get Real-time Quotes Of Securities
slug: quote
sidebar_position: 2
---

This API is used to obtain the real-time quotes of securities, and supports all types of securities.

<SDKLinks module="quote" klass="QuoteContext" method="quote" />

:::info
[Business Command](../../socket/biz-command): `11`
:::

## Request

### Parameters

| Name   | Type     | Required | Description                                                                                                                                                     |
| ------ | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol | string[] | Yes      | Security code list, in `ticker.region` format, for example: `[700.HK]` <br /><br />**Check rules:**<br />The maximum number of symbols in each request is `500` |

### Protobuf

```protobuf
message MultiSecurityRequest {
  repeated string symbol = 1;
}
```

### Request Example

```python
# Get Real-time Quotes Of Securities
# https://open.longportapp.com/docs/quote/pull/quote
# Before running, please visit the "Developers to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "LongPort" mobile app.
from longport.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.quote(["700.HK", "AAPL.US", "TSLA.US", "NFLX.US"])
print(resp)
```

## Response

### Response Properties

| Name                | Type     | Description                                                                          |
| ------------------- | -------- | ------------------------------------------------------------------------------------ |
| secu_quote          | object[] | Securities quote                                                                     |
| ∟ symbol            | string   | Security code                                                                        |
| ∟ last_done         | string   | Latest price                                                                         |
| ∟ prev_close        | string   | Yesterday's close                                                                    |
| ∟ open              | string   | Open                                                                                 |
| ∟ high              | string   | High                                                                                 |
| ∟ low               | string   | Low                                                                                  |
| ∟ timestamp         | int64    | Time of latest price                                                                 |
| ∟ volume            | int64    | Volume                                                                               |
| ∟ turnover          | string   | Turnover                                                                             |
| ∟ trade_status      | int32    | Security trading status, see [TradeStatus](../objects#tradestatus---security-status) |
| ∟ pre_market_quote  | object   | Quote of US pre market                                                               |
| ∟∟ last_done        | string   | Latest price                                                                         |
| ∟∟ timestamp        | int64    | Time of latest price                                                                 |
| ∟∟ volume           | int64    | Volume                                                                               |
| ∟∟ turnover         | string   | Turnover                                                                             |
| ∟∟ high             | string   | High                                                                                 |
| ∟∟ low              | string   | Low                                                                                  |
| ∟∟ prev_close       | string   | Close of the last trade session                                                      |
| ∟ post_market_quote | object   | Quote of US post market                                                              |
| ∟∟ last_done        | string   | Latest price                                                                         |
| ∟∟ timestamp        | int64    | Time of latest price                                                                 |
| ∟∟ volume           | int64    | Volume                                                                               |
| ∟∟ turnover         | string   | Turnover                                                                             |
| ∟∟ high             | string   | High                                                                                 |
| ∟∟ low              | string   | Low                                                                                  |
| ∟∟ prev_close       | string   | Close of the last trade session                                                      |
| ∟ over_night_quote  | object   | Quote of US overnight market                                                         |
| ∟∟ last_done        | string   | Latest price                                                                         |
| ∟∟ timestamp        | int64    | Time of latest price                                                                 |
| ∟∟ volume           | int64    | Volume                                                                               |
| ∟∟ turnover         | string   | Turnover                                                                             |
| ∟∟ high             | string   | High                                                                                 |
| ∟∟ low              | string   | Low                                                                                  |
| ∟∟ prev_close       | string   | Close of the last trade session                                                      |

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

## API Restrictions

:::caution

- The HK stocks quotation beyond the 20th will be delayed if the quote level is BMP.

:::

## Error Code

| Protocol Error Code | Business Error Code | Description              | Troubleshooting Suggestions                                   |
| ------------------- | ------------------- | ------------------------ | ------------------------------------------------------------- |
| 3                   | 301600              | Invalid request          | Invalid request parameters or unpacking request failed        |
| 3                   | 301606              | Request rate limit       | Reduce the frequency of requests                              |
| 7                   | 301602              | Server error             | Please try again or contact a technician to resolve the issue |
| 7                   | 301607              | Too many request symbols | Reduce the number of symbols in a request                     |
