---
id: push_quote
title: 实时价格推送
slug: quote
sidebar_position: 1
---

已订阅标的的实时价格推送，推送的数据结构中，只有有变化的字段才会填充数据。

:::info

[业务指令](../../socket/protocol/push)：`101`

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

### Example

```python
# 实时价格推送
# https://open.longbridgeapp.com/docs/quote/push/push-quote
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf 变量定义参见：https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, PushQuote, SubscribeRequest, SubscriptionResponse, SubType)

class MyWsCallback(WsCallback):
    def on_push(self, command: int, body: bytes):
        if command == Command.PushQuoteData:
            quote = PushQuote()
            quote.ParseFromString(body)
            print(f"quote-> {quote}")
        else:
            print(f"-> unknow: {command}")

    def on_state(self, state: ReadyState):
        print(f"-> state: {state}")

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.lbkrs.com"))
ws = WsClient("wss://openapi-quote.longbridge.global", http, MyWsCallback())

# 订阅行情数据请检查 “开发者中心“ - “行情权限” 是否正确
# https://open.longbridgeapp.com/account
#
# - 港股 - BMP 基础报价，无实时行情推送，无法用 WebSocket 订阅
# - 美股 - LV1 纳斯达克最优报价 (只限 Open API）
#
# 运行前请访问 “开发者中心“ 确保账户有正确的行情权限。
# 如没有开通行情权限，可以通过 "长桥" 手机客户端，并进入 “我的 - 我的行情 - 行情商城“ 购买开通行情权限。
req = SubscribeRequest(symbol=["700.HK", "AAPL.US"], sub_type=[SubType.QUOTE], is_first_push=True)
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
