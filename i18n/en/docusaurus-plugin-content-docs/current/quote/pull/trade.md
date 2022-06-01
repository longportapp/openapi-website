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

### Request Example

```python
# Get Security Trades
# https://open.longbridgeapp.com/docs/quote/pull/trade
# Before running, please visit the "Developers to ensure that the account has the correct quotes authority.
# If you do not have the quotes authority, you can enter "Me - My Quotes - Store" to purchase the authority through the "Longbridge" mobile client.
from longbridge.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.trades("700.HK", 10)
print(resp)
```

## Response

### Response Properties

| Name            | Type     | Description                                                                                     |
| --------------- | -------- | ----------------------------------------------------------------------------------------------- |
| symbol          | string   | Security code                                                                                   |
| trades          | object[] | Trades data                                                                                     |
| ∟ price         | string   | Price                                                                                           |
| ∟ volume        | int64    | Volume                                                                                          |
| ∟ timestamp     | int64    | Time of trading                                                                                 |
| ∟ trade_type    | string   | [Trade type](#trade-type)                                                                       |
| ∟ direction     | int32    | Trade direction <br /><br />**Optional value:**<br />`0` - neutral<br />`1` - down<br />`2` - up |
| ∟ trade_session | int32    | Trade session, see [TradeSession](../objects#tradesession---trading-session)                    |

#### Trade Type

HK

- `*` - Overseas trade
- `D` - Odd-lot trade
- `M` - Non-direct off-exchange trade
- `P` - Late trade (Off-exchange previous day)
- `U` - Auction trade
- `X` - Direct off-exchange trade
- `Y` - Automatch internalized
- ` ` - Automatch normal

US

- ` ` - Regular sale
- `A` - Acquisition
- `B` - Bunched trade
- `D` - Distribution
- `F` - Intermarket sweep
- `G` - Bunched sold trades
- `H` - Price variation trade
- `I` - Odd lot trade
- `K` - Rule 155 trde(NYSE MKT)
- `M` - Market center close price
- `P` - Prior reference price
- `Q` - Market center open price
- `S` - Split trade
- `V` - Contingent trade
- `W` - Average price trade
- `X` - Cross trade
- `1` - Stopped stock(Regular trade)

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
      "direction": 0,
      "trade_session": 2
    },
    {
      "price": "158.745",
      "volume": 1,
      "timestamp": 1651103985,
      "trade_type": "I",
      "direction": 0,
      "trade_session": 2
    },
    {
      "price": "158.800",
      "volume": 1,
      "timestamp": 1651103995,
      "trade_type": "I",
      "direction": 0,
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
