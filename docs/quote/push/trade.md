---
id: push_trade
title: 实时成交明细推送
slug: trade
sidebar_position: 4
---

已订阅的标的的实时逐笔成交明细推送。

:::info

[业务指令](../../socket/protocol/push)：`104`

:::

## 数据格式

### Properties

| Name            | Type     | Description                                                           |
| --------------- | -------- | --------------------------------------------------------------------- |
| symbol          | string   | 标的代码，例如：`AAPL.US`                                             |
| sequence        | int64    | 序列号                                                                |
| trades          | object[] | 逐笔明细数据                                                          |
| ∟ price         | string   | 价格                                                                  |
| ∟ volume        | int64    | 成交量                                                                |
| ∟ timestamp     | int64    | 成交时间                                                              |
| ∟ trade_type    | string   | [交易类型说明](#交易类型)                                             |
| ∟ direction     | int32    | 交易方向 <br/><br />**可选值：**<br/>`0` - nature<br/>`1` - down 2-up |
| ∟ trade_session | int32    | 交易时段，详见 [TradeSession](../objects#tradesession---交易时段)     |

#### 交易类型

港股

- `*` - 场外交易
- `D` - 碎股交易
- `M` - 非自动对盘
- `P` - 开市前成交盘
- `U` - 竞价交易
- `X` - 同一券商非自动对盘
- `Y` - 同一券商自动对盘
- ` ` - 自动对盘

美股

- ` ` - 自动对盘
- `A` - 收购
- `B` - 批量交易
- `D` - 分配
- `F` - 跨市扫盘单
- `G` - 批量卖出
- `H` - 离价交易
- `I` - 碎股交易
- `K` - 第 155 条交易（纽交所规则）
- `M` - 交易所收盘价
- `P` - 前参考价
- `Q` - 交易所开盘价
- `S` - 拆单交易
- `V` - 附属交易
- `W` - 平均价成交
- `X` - 跨市场交易
- `1` - 停售股票（常规交易）

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

### Example

```python
# 实时成交明细推送
# https://open.longbridgeapp.com/docs/quote/push/push-trade
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf 变量定义参见：https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, PushTrade, SubscribeRequest, SubscriptionResponse, SubType)

class MyWsCallback(WsCallback):
    def on_push(self, command: int, body: bytes):
        if command == Command.PushTradeData:
            quote = PushTrade()
            quote.ParseFromString(body)
            print(f"quote-> {quote}")
        else:
            print(f"-> unknow: {command}")

    def on_state(self, state: ReadyState):
        print(f"-> state: {state}")

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.longbridgeapp.com"))
ws = WsClient("wss://openapi-quote.longbridgeapp.com", http, MyWsCallback())

# 订阅行情数据请检查 “开发者中心“ - “行情权限” 是否正确
# https://open.longbridgeapp.com/account
#
# - 港股 - BMP 基础报价，无实时行情推送，无法用 WebSocket 订阅
# - 美股 - LV1 纳斯达克最优报价 (只限 Open API）
#
# 运行前请访问 “开发者中心“ 确保账户有正确的行情权限。
# 如没有开通行情权限，可以通过 "长桥" 手机客户端，并进入 “我的 - 我的行情 - 行情商城“ 购买开通行情权限。
req = SubscribeRequest(symbol=["700.HK", "AAPL.US"], sub_type=[SubType.TRADE], is_first_push=True)
result = ws.send_request(Command.Subscribe, req.SerializeToString())
resp = SubscriptionResponse()
resp.ParseFromString(result)

print(f"Subscribed symbol:\n\n {resp.sub_list}")

print("\n\nWaiting for push...\nPress [Ctrl + c] to quit.")
while True:
    time.sleep(10)
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
