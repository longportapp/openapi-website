---
id: push_trade
title: Push Real-time Trades
slug: trade
sidebar_position: 4
---

Real-time trades data push of the subscribed security.

:::info

[Business Command](../../socket/protocol/push): `104`

:::

## Data Format

### Properties

| Name            | Type     | Description                                                                                                                                                                                                                                                                             |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol          | string   | Security code, for example: `AAPL.US`                                                                                                                                                                                                                                                   |
| sequence        | int64    | Sequence number                                                                                                                                                                                                                                                                         |
| trades          | object[] | Trades data                                                                                                                                                                                                                                                                             |
| ∟ price         | string   | Price                                                                                                                                                                                                                                                                                   |
| ∟ volume        | int64    | Volume                                                                                                                                                                                                                                                                                  |
| ∟ timestamp     | int64    | Time of trading                                                                                                                                                                                                                                                                         |
| ∟ trade_type    | string   | Trade type <br /><br />**Optional value:**<br />`*` - Overseas trade<br />`D` - Odd-lot trade<br />`M` - Non-direct off-exchange trade<br />`P` - Late trade (Off-exchange previous day)<br />`U` - Auction trade<br />`X` - Direct off-exchange trade<br />`Y` - Automtch internalized |
| ∟ direction     | int32    | Trade direction <br /><br />**Optional value:**<br />`0` - nature<br />`1` - down<br />`2` - up                                                                                                                                                                                         |
| ∟ trade_session | int32    | Trade session, see [TradeSession](../objects#tradesession---trading-session)                                                                                                                                                                                                            |

### Protobuf

```protobuf
message PushTrade {
  string symbol = 1;
  int64 sequence = 2;
  repeated Trade trade = 3;
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

### JSON Example

```json
{
  "symbol": "700.HK",
  "sequence": 160808750000000,
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
