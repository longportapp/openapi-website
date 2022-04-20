---
id: push_trade
title: 实时成交明细推送
slug: push_trade
---

### 介绍：
    订阅的标的的实时逐笔成交明细推送。
### 协议指令：
    104
### 数据格式
* 参数

| 名称 | 类型   | 描述  | 
|-------|-------|-----|
|symbol|string| 标的代码 |
|sequence|int64| 序列号 |
|trades|object[]| 逐笔明细数据 |
|∟price|string| 价格 |
|∟volume|int64| 成交量 |
|∟timestamp|int64| 成交时间 |
|∟trade_type|string| 交易类型。*-场外交易 D-碎股交易 M-非自动对盘 P-开市前成交盘 U-竞价交易 X-同一券商非自动对盘 Y-同一券商自动对盘 |
|∟direction|int32| 交易方向。0-nature 1-down 2-up|
|∟trade_session|TradeSession| 交易时段 |

* proto
```
message PushTrade {
  string symbol = 1;
  int64 sequence = 2;
  repeated Trade trade = 3;
}
```