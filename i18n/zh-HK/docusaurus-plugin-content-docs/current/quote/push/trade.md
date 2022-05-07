---
id: push_trade
title: 實時成交明細推送
slug: trade
sidebar_position: 4
---

已訂閱的標的的實時逐筆成交明細推送。

:::info

[業務指令](../../socket/protocol/push)：`104`

:::

## 數據格式

### Properties

| Name            | Type     | Description                                                                                                                                                                                   |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol          | string   | 標的代碼，例如：`AAPL.US`                                                                                                                                                                     |
| sequence        | int64    | 序列號                                                                                                                                                                                        |
| trades          | object[] | 逐筆明細數據                                                                                                                                                                                  |
| ∟ price         | string   | 價格                                                                                                                                                                                          |
| ∟ volume        | int64    | 成交量                                                                                                                                                                                        |
| ∟ timestamp     | int64    | 成交時間                                                                                                                                                                                      |
| ∟ trade_type    | string   | 交易類型 <br/><br />**可選值：**<br/>`*` - 場外交易<br/>`D` - 碎股交易<br/>`M` - 非自動對盤<br/>`P` - 開市前成交盤<br/>`U` - 競價交易<br/>`X` - 同一券商非自動對盤<br/>`Y` - 同一券商自動對盤 |
| ∟ direction     | int32    | 交易方向 <br/><br />**可選值：**<br/>`0` - nature<br/>`1` - down 2-up                                                                                                                         |
| ∟ trade_session | int32    | 交易時段，詳見 [TradeSession](../objects#tradesession---交易時段)                                                                                                                             |

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
