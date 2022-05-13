---
id: push_trade
title: 實時成交明細推送
slug: trade
sidebar_position: 4
---

已訂閱的標的的實時逐筆成交明細推送。

:::info

[業務指令](../../socket/protocol/push)：`104`

:::

## 數據格式

### Properties

| Name            | Type     | Description                                                                                                                                                                                   |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol          | string   | 標的代碼，例如：`AAPL.US`                                                                                                                                                                     |
| sequence        | int64    | 序列號                                                                                                                                                                                        |
| trades          | object[] | 逐筆明細數據                                                                                                                                                                                  |
| ∟ price         | string   | 價格                                                                                                                                                                                          |
| ∟ volume        | int64    | 成交量                                                                                                                                                                                        |
| ∟ timestamp     | int64    | 成交時間                                                                                                                                                                                      |
| ∟ trade_type    | string   | 交易類型 <br/><br />**可選值：**<br/>`*` - 場外交易<br/>`D` - 碎股交易<br/>`M` - 非自動對盤<br/>`P` - 開市前成交盤<br/>`U` - 競價交易<br/>`X` - 同一券商非自動對盤<br/>`Y` - 同一券商自動對盤 |
| ∟ direction     | int32    | 交易方向 <br/><br />**可選值：**<br/>`0` - nature<br/>`1` - down 2-up                                                                                                                         |
| ∟ trade_session | int32    | 交易時段，詳見 [TradeSession](../objects#tradesession---交易時段)                                                                                                                             |

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
# 實時成交明細推送
# https://open.longbridgeapp.com/docs/quote/push/push-trade
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf 變量定義參見：https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
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

# 訂閱行情數據請檢查 “開發者中心“ - “行情權限” 是否正確
# https://open.longbridgeapp.com/account
#
# - 港股 - BMP 基礎報價，無實時行情推送，無法用 WebSocket 訂閱
# - 美股 - LV1 納斯達克最優報價 (只限 Open API）
#
# 運行前請訪問 “開發者中心“ 確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過 "長橋" 手機客戶端，並進入 “我的 - 我的行情 - 行情商城“ 購買開通行情權限。
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
