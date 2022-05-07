---
id: push_quote
title: 實時價格推送
slug: quote
sidebar_position: 1
---

已訂閱標的的實時價格推送，推送的數據結構中，只有有變化的字段才會填充數據。

:::info

[業務指令](../../socket/protocol/push)：`101`

:::

## 數據格式

### Properties

| Name          | Type   | Description                                                       |
| ------------- | ------ | ----------------------------------------------------------------- |
| symbol        | string | 標的代碼，例如：`AAPL.US`                                         |
| sequence      | int64  | 序列號                                                            |
| last_done     | string | 最新價                                                            |
| open          | string | 開盤價                                                            |
| high          | string | 最高價                                                            |
| low           | string | 最低價                                                            |
| timestamp     | int64  | 最新成交的時間戳                                                  |
| volume        | int64  | 成交量                                                            |
| turnover      | string | 成交額                                                            |
| trade_status  | int32  | 交易狀態，詳見 [TradeStatus](../objects#tradestatus---交易狀態)   |
| trade_session | int32  | 交易時段，詳見 [TradeSession](../objects#tradesession---交易時段) |

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
