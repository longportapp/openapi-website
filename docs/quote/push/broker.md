---
id: push_broker
title: 实时经纪队列推送
slug: broker
sidebar_position: 3
---

订阅的标的的实时经纪队列推送。

:::info

协议指令：`103`

:::

## 数据格式

### Properties

| Name         | Type     | Description                       |
| ------------ | -------- | --------------------------------- |
| symbol       | string   | 标的代码，例如：`AAPL.US`         |
| sequence     | int64    | 序列号                            |
| ask_brokers  | object[] | 卖盘经纪队列                      |
| ∟ position   | int32    | 档位                              |
| ∟ broker_ids | int32[]  | [券商席位 Id](../pull/broker-ids) |
| bid_brokers  | object[] | 买盘经纪队列                      |
| ∟ position   | int32    | 档位                              |
| ∟ broker_ids | int32[]  | [券商席位 Id](../pull/broker-ids) |

### Protobuf

```protobuf
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

### JSON Example

```json
{
  "symbol": "700.HK",
  "sequence": 160808750000000,
  "ask_brokers": [
    {
      "position": 1,
      "broker_ids": [7358, 9057, 9028, 7364]
    },
    {
      "position": 2,
      "broker_ids": [6968, 3448, 3348, 1049, 4973, 6997, 3448, 5465, 6997]
    }
  ],
  "bid_brokers": [
    {
      "position": 1,
      "broker_ids": [6996, 5465, 8026, 8304, 4978]
    },
    {
      "position": 2,
      "broker_ids": [7358, 9057, 9028, 7364]
    }
  ]
}
```
