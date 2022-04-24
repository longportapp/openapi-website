---
id: push_broker
title: 实时经纪队列推送
slug: push-broker
sidebar_position: 3
---

##on_receive_brokers

### 介绍：
    订阅的标的的实时经纪队列推送。
### 协议指令：
    103
### 数据格式
* 参数

| 名称 | 类型   | 描述  | 
|-------|-------|-----|
|symbol|string| 标的代码 |
|sequence|int64| 序列号 |
|ask_brokers|object[]| 卖盘经纪队列 |
|∟position|int32| 档位 |
|∟broker_ids|int32[]| [券商席位 Id](../pull/quote-broker-ids)|
|bid_brokers|object[]| 买盘经纪队列 |
|∟position|int32| 档位 |
|∟broker_ids|int32[]| [券商席位 Id](../pull/quote-broker-ids)|

* proto
```
message PushBrokers {
  string symbol = 1;
  int64 sequence = 2;
  repeated Brokers ask_brokers = 3;
  repeated Brokers bid_brokers = 4;
}

message Brokers {
  int32 position = 1;
  repeated int32 broker_ids = 2;
}
```