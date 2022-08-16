---
id: push_broker
title: 实时经纪队列推送
slug: broker
sidebar_position: 3
---

已订阅标的的实时经纪队列数据推送。

:::info

[业务指令](../../socket/protocol/push)：`103`

:::

## 数据格式

### Properties

| Name         | Type     | Description                       |
|--------------|----------|-----------------------------------|
| symbol       | string   | 标的代码，例如：`AAPL.US`           |
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

### Example

```python
# 实时经纪队列推送
# https://open.longbridgeapp.com/docs/quote/push/push-brokers
# 订阅行情数据请检查“开发者中心” - “行情权限”是否正确
# https://open.longbridgeapp.com/account
#
# - 港股 - BMP 基础报价，无实时行情推送，无法用 WebSocket 订阅
# - 美股 - LV1 纳斯达克最优报价 (只限 Open API）
#
# 运行前请访问“开发者中心”确保账户有正确的行情权限。
# 如没有开通行情权限，可以通过“长桥”手机客户端，并进入“我的 - 我的行情 - 行情商城”购买开通行情权限。
from time import sleep
from longbridge.openapi import QuoteContext, Config, SubType, PushQuote

def on_brokers(symbol: str, event: PushBrokers):
    print(symbol, event)

config = Config.from_env()
ctx = QuoteContext(config)
ctx.set_on_brokers(on_brokers)

ctx.subscribe(["700.HK", "AAPL.US"], [SubType.Brokers], is_first_push=True)
sleep(30)
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
