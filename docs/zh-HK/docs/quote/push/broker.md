---
id: push_broker
title: 實時經紀隊列推送
slug: broker
sidebar_position: 3
---

已訂閱標的的實時經紀隊列數據推送。

<SDKLinks module="quote" klass="QuoteContext" method="set_on_brokers" go="OnBrokers" />

:::info

[業務指令](../../socket/protocol/push)：`103`

:::

## 數據格式

### Properties

| Name         | Type     | Description                       |
|--------------|----------|-----------------------------------|
| symbol       | string   | 標的代碼，例如：`AAPL.US`           |
| sequence     | int64    | 序列號                            |
| ask_brokers  | object[] | 賣槃經紀隊列                      |
| ∟ position   | int32    | 檔位                              |
| ∟ broker_ids | int32[]  | [券商席位 Id](../pull/broker-ids) |
| bid_brokers  | object[] | 買槃經紀隊列                      |
| ∟ position   | int32    | 檔位                              |
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
# 實時經紀隊列推送
# https://open.longportapp.com/docs/quote/push/push-brokers
# 訂閱行情數據請檢查“開發者中心“ - “行情權限”是否正確
# https://open.longportapp.com/account
#
# - 港股 - BMP 基礎報價，無實時行情推送，無法用 WebSocket 訂閱
# - 美股 - LV1 納斯達克最優報價 (只限 OpenAPI）
#
# 運行前請訪問“開發者中心“確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過“LongPort”手機客戶端，並進入“我的 - 我的行情 - 行情商城”購買開通行情權限。
from time import sleep
from longport.openapi import QuoteContext, Config, SubType, PushBrokers

def on_brokers(symbol: str, event: PushBrokers):
    print(symbol, event)

config = Config.from_env()
ctx = QuoteContext(config)
ctx.set_on_brokers(on_brokers)

ctx.subscribe(["700.HK", "AAPL.US"], [SubType.Brokers])
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
