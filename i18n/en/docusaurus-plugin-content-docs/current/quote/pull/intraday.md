---
id: quote_intraday
title: Get Security Intraday
slug: intraday
sidebar_position: 9
---

This API is used to obtain the intraday data of security.

<SDKLinks module="quote" klass="QuoteContext" method="intraday" />

:::info

[Business Command](../../socket/biz-command): `18`

:::

## Request

### Parameters

| Name   | Type   | Required | Description                                                    |
| ------ | ------ | -------- | -------------------------------------------------------------- |
| symbol | string | Yes      | Security code, in `ticker.region` format, for example:`700.HK` |

### Protobuf

```protobuf
message SecurityIntradayRequest {
  string symbol = 1;
}
```

### Request Example

```python
# Get Security Intraday
# https://open.longportapp.com/docs/quote/pull/intraday
# Before running, please visit the "Developers to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "LongPort" mobile app.
from longport.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.intraday("700.HK")
print(resp)
```

## Response

### Response Properties

| Name        | Type     | Description                           |
| ----------- | -------- | ------------------------------------- |
| symbol      | string   | Security code, for example: `AAPL.US` |
| lines       | object[] | Intraday line data                    |
| ∟ price     | string   | Close price of the minute             |
| ∟ timestamp | int64    | Start time stamp of the minute        |
| ∟ volume    | int64    | Volume                                |
| ∟ turnover  | string   | Turnover                              |
| ∟ avg_price | string   | Average price                         |

### Protobuf

```
message SecurityIntradayResponse{
  string symbol = 1;
  repeated Line lines = 2;
}

message Line {
  string price = 1;
  int64 timestamp = 2;
  int64 volume = 3;
  string turnover = 4;
  string avg_price = 5;
}
```

### Response JSON Example

```json
{
  "symbol": "700.HK",
  "lines": [
    {
      "price": "330.400",
      "timestamp": 1651023000,
      "volume": 375870,
      "turnover": "123949699.000",
      "avg_price": "329.767470"
    },
    {
      "price": "331.200",
      "timestamp": 1651023060,
      "volume": 233095,
      "turnover": "77269032.800",
      "avg_price": "330.427416"
    },
    {
      "price": "330.400",
      "timestamp": 1651023120,
      "volume": 192565,
      "turnover": "63711556.000",
      "avg_price": "330.530719"
    },
    {
      "price": "330.800",
      "timestamp": 1651023180,
      "volume": 143397,
      "turnover": "47471072.400",
      "avg_price": "330.608989"
    },
    {
      "price": "330.800",
      "timestamp": 1651023240,
      "volume": 141834,
      "turnover": "46890605.600",
      "avg_price": "330.608078"
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
| 7                   | 301600              | Symbol not found   | Check that the requested `symbol` is correct                  |
| 7                   | 301603              | No quotes          | Security no quote                                             |
| 7                   | 301604              | No access          | No access to security quote                                   |
