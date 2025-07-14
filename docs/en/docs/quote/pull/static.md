---
id: quote_static
title: Basic Information of Securities
slug: static
sidebar_position: 1
---

This API is used to obtain the basic information of securities.

<SDKLinks module="quote" klass="QuoteContext" method="static_info" />

:::info
[Business Command](../../socket/biz-command): `10`
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
# Get Basic Information Of Securities
# https://open.longportapp.com/docs/quote/pull/static
# Before running, please visit the "Developers to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "LongPort" mobile app.
from longport.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.static_info(["700.HK", "AAPL.US", "TSLA.US", "NFLX.US"])
print(resp)
```

## Response

### Response Properties

| Name                 | Type     | Description                                                                                          |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| secu_static_info     | object[] | Securities Basic Information                                                                         |
| ∟ symbol             | string   | Security code                                                                                        |
| ∟ name_cn            | string   | Security name (zh-CN)                                                                                |
| ∟ name_en            | string   | Security name (en)                                                                                   |
| ∟ name_hk            | string   | Security name (zh-HK)                                                                                |
| ∟ exchange           | string   | Exchange which the security belongs to                                                               |
| ∟ currency           | string   | Trading currency <br /><br />**Optional value: **<br />`CNY` <br />`USD` <br />`SGD` <br />`HKD`     |
| ∟ lot_size           | int32    | Lot size                                                                                             |
| ∟ total_shares       | int64    | Total shares                                                                                         |
| ∟ circulating_shares | int64    | Circulating shares                                                                                   |
| ∟ hk_shares          | int64    | HK shares (only HK stocks)                                                                           |
| ∟ eps                | string   | Earnings per share                                                                                   |
| ∟ eps_ttm            | string   | Earnings per share (TTM)                                                                             |
| ∟ bps                | string   | Net assets per share                                                                                 |
| ∟ dividend_yield     | string   | Dividend yield                                                                                       |
| ∟ stock_derivatives  | int32[]  | Types of supported derivatives <br /><br />**Optional value:**<br />`1` - Option <br />`2` - Warrant |
| ∟ board              | string   | The board to whitch the security belongs, see [Board](../objects#board---security-board) for details |

### Protobuf

```protobuf
message SecurityStaticInfoResponse {
  repeated StaticInfo secu_static_info = 1;
}

message StaticInfo {
  string symbol = 1;
  string name_cn = 2;
  string name_en = 3;
  string name_hk = 4;
  string listing_date = 5;
  string exchange = 6;
  string currency = 7;
  int32 lot_size = 8;
  int64 total_shares = 9;
  int64 circulating_shares = 10;
  int64 hk_shares = 11;
  string eps = 12;
  string eps_ttm = 13;
  string bps = 14;
  string dividend_yield = 15;
  repeated int32 stock_derivatives = 16;
  string board = 17;
}
```

### Response JSON Example

```json
{
  "secu_static_info": [
    {
      "symbol": "700.HK",
      "name_cn": "腾讯控股",
      "name_en": "TENCENT",
      "name_hk": "騰訊控股",
      "exchange": "SEHK",
      "currency": "HKD",
      "lot_size": 100,
      "total_shares": 9612464038,
      "circulating_shares": 9612464038,
      "hk_shares": 9612464038,
      "eps": "28.4394",
      "eps_ttm": "28.4394",
      "bps": "103.40413",
      "dividend_yield": "1.6",
      "stock_derivatives": [2],
      "board": "HKEquity"
    },
    {
      "symbol": "AAPL.US",
      "name_cn": "苹果",
      "name_en": "Apple Inc.",
      "exchange": "NASD",
      "currency": "USD",
      "lot_size": 1,
      "total_shares": 1631944100,
      "circulating_shares": 16302661350,
      "eps": "5.669",
      "eps_ttm": "6.0771",
      "bps": "4.40197",
      "dividend_yield": "0.85",
      "stock_derivatives": [1],
      "board": "USMain"
    }
  ]
}
```

## Error Code

| Protocol Error Code | Business Error Code | Description              | Troubleshooting Suggestions                                   |
| ------------------- | ------------------- | ------------------------ | ------------------------------------------------------------- |
| 3                   | 301600              | Invalid request          | Invalid request parameters or unpacking request failed        |
| 3                   | 301606              | Request rate limit       | Reduce the frequency of requests                              |
| 7                   | 301602              | Server error             | Please try again or contact a technician to resolve the issue |
| 7                   | 301607              | Too many request symbols | Reduce the number of symbols in a request                     |
