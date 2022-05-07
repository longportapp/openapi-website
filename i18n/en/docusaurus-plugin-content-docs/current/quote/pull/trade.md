---
id: quote_trade
title: Get Security Trades
slug: trade
sidebar_position: 8
---

This API is used to obtain the trades data of security.

:::info

[Business Command](../../socket/protocol/request): `17`

:::

## Request

### Parameters

| Name   | Type   | Required | Description                                                                                              |
| ------ | ------ | -------- | -------------------------------------------------------------------------------------------------------- |
| symbol | string | Yes      | Security code, in `ticker.region` format, for example:`700.HK`                                           |
| count  | int32  | Yes      | Count of trades <br /><br />**Check rules:**<br />The maximum number of trades in each request is `1000` |

### Protobuf

```protobuf
message SecurityTradeRequest {
  string symbol = 1;
  int32 count = 2;
}
```

## Response

### Response Properties

| Name            | Type     | Description                                                                                                                                                                                                                                                                             |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol          | string   | Security code                                                                                                                                                                                                                                                                           |
| trades          | object[] | Trades data                                                                                                                                                                                                                                                                             |
| ∟ price         | string   | Price                                                                                                                                                                                                                                                                                   |
| ∟ volume        | int64    | Volume                                                                                                                                                                                                                                                                                  |
| ∟ timestamp     | int64    | Time of trading                                                                                                                                                                                                                                                                         |
| ∟ trade_type    | string   | Trade type <br /><br />**Optional value:**<br />`*` - Overseas trade<br />`D` - Odd-lot trade<br />`M` - Non-direct off-exchange trade<br />`P` - Late trade (Off-exchange previous day)<br />`U` - Auction trade<br />`X` - Direct off-exchange trade<br />`Y` - Automtch internalized |
| ∟ direction     | int32    | Trade direction <br /><br />**Optional value:**<br />`0` - nature<br />`1` - down<br />`2` - up                                                                                                                                                                                         |
| ∟ trade_session | int32    | Trade session, see [TradeSession](../objects#tradesession---trading-session)                                                                                                                                                                                                            |

### Protobuf

```protobuf
message SecurityTradeResponse {
  string symbol = 1;
  repeated Trade trades = 2;
}

message Trade {
  string price = 1;
  int64 volume = 2;
  int64 timestamp = 3;
  string trade_type = 4;
  int32 direction = 5;
  TradeSession trade_session = 6;
}
```

### Response JSON Example

```json
{
  "symbol": "AAPL.US",
  "trades": [
    {
      "price": "158.760",
      "volume": 1,
      "timestamp": 1651103979,
      "trade_type": "I",
      "trade_session": 2
    },
    {
      "price": "158.745",
      "volume": 1,
      "timestamp": 1651103985,
      "trade_type": "I",
      "trade_session": 2
    },
    {
      "price": "158.800",
      "volume": 1,
      "timestamp": 1651103995,
      "trade_type": "I",
      "trade_session": 2
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
| 7                   | 301600              | Symbol not found         | Check that the requested `symbol` is correct                  |
| 7                   | 301603              | No quotes                | Security no quote                                             |
| 7                   | 301604              | No access                | No access to security quote                                   |
| 7                   | 301607              | Too many trades requeted | Reduce the amount of trades in each request                   |
