---
id: push_quote
title: 实时价格推送
slug: quote
sidebar_position: 1
---

已订阅标的的实时价格推送，推送的数据结构中，只有有变化的字段才会填充数据。

:::info

[协议指令](../../socket/protocol/push)：`101`

:::

## 数据格式

### Properties

| Name          | Type   | Description                                                       |
| ------------- | ------ | ----------------------------------------------------------------- |
| symbol        | string | 标的代码，例如：`AAPL.US`                                         |
| sequence      | int64  | 序列号                                                            |
| last_done     | string | 最新价                                                            |
| open          | string | 开盘价                                                            |
| high          | string | 最高价                                                            |
| low           | string | 最低价                                                            |
| timestamp     | int64  | 最新成交的时间戳                                                  |
| volume        | int64  | 成交量                                                            |
| turnover      | string | 成交额                                                            |
| trade_status  | int32  | 交易状态，详见 [TradeStatus](../objects#tradestatus---交易状态)   |
| trade_session | int32  | 交易时段，详见 [TradeSession](../objects#tradesession---交易时段) |

### Protobuf

```protobuf
message PushQuote {
  string symbol = 1;
  int64 sequence = 2;
  string last_done = 3;
  string open = 4;
  string high = 5;
  string low = 6;
  int64 timestamp = 7;
  int64 volume = 8;
  string turnover = 9;
  TradeStatus trade_status = 10;
  TradeSession trade_session = 11;
}
```

### JSON Example

```json
{
  "symbol": "AAPL.US",
  "sequence": 160808750000000,
  "last_done": "156.570",
  "open": "155.910",
  "high": "159.790",
  "low": "155.380",
  "timestamp": 1651089600,
  "volume": 88063191,
  "turnover": "13865092584.000",
  "trade_status": 0,
  "trade_session": 0
}
```
