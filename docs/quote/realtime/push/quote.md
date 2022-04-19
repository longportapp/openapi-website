---
id: push_quote
title: 实时价格推送
slug: push_quote
---

### 介绍：
    订阅的标的的实时价格推送。只有有变化的字段才会填充数据。
### 协议指令：
    101
### 数据格式
* 参数

| 名称 | 类型   | 描述  | 
|-------|-------|-----|
|symbol|string|标的代码|
|sequence|int64|序列号|
|last_done|string|最新价|
|open|string|开盘价|
|high|string|最高价|
|low|string|最低价|
|timestamp|int64|最新成交的时间戳|
|volume|int64|成交量|
|turnover|string|成交额|
|trade_status|TradeStatus|交易状态|
|trade_session|TradeSession|交易时段|

* proto
```
  string symbol = 1;
  int64 sequence = 2;
  string last_done = 3;
  string open = 4;
  string high = 5;
  string low = 6;
  int64 timestamp = 7;
  int64 volume = 8;
  string turnover = 9;
  int32 trade_status = 10;
  TradeSession trade_session = 11;
```