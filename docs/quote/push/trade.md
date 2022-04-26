---
id: push_trade
title: 实时成交明细推送
slug: trade
sidebar_position: 4
---

订阅的标的的实时逐笔成交明细推送。

:::info

协议指令：`104`

:::

## 数据格式

### Properties

| 名称           | 类型                                    | 描述                                                                                                                                                                       |
| -------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string                                  | 标的代码，例如：`AAPL.US`                                                                                                                                                  |
| sequence       | int64                                   | 序列号                                                                                                                                                                     |
| trades         | object[]                                | 逐笔明细数据                                                                                                                                                               |
| ∟price         | string                                  | 价格                                                                                                                                                                       |
| ∟volume        | int64                                   | 成交量                                                                                                                                                                     |
| ∟timestamp     | int64                                   | 成交时间                                                                                                                                                                   |
| ∟trade_type    | string                                  | 交易类型<br/><br/>`*` - 场外交易<br/>`D` - 碎股交易<br/>`M` - 非自动对盘<br/>`P` - 开市前成交盘<br/>`U` - 竞价交易<br/>`X` - 同一券商非自动对盘<br/>`Y` - 同一券商自动对盘 |
| ∟direction     | int32                                   | 交易方向<br/><br/>`0` - nature<br/>`1` - down 2-up                                                                                                                         |
| ∟trade_session | [TradeSession](../objects#tradesession) | 交易时段                                                                                                                                                                   |

### Protobuf

```protobuf
message PushTrade {
  string symbol = 1;
  int64 sequence = 2;
  repeated Trade trade = 3;
}
```
