---
id: push_quote
title: 實時價格推送
slug: quote
sidebar_position: 1
---

已訂閱標的的實時價格推送，推送的數據結構中，只有有變化的字段才會填充數據。

:::info

[業務指令](../../socket/protocol/push)：`101`

:::

## 數據格式

### Properties

| Name          | Type   | Description                                                       |
| ------------- | ------ | ----------------------------------------------------------------- |
| symbol        | string | 標的代碼，例如：`AAPL.US`                                         |
| sequence      | int64  | 序列號                                                            |
| last_done     | string | 最新價                                                            |
| open          | string | 開盤價                                                            |
| high          | string | 最高價                                                            |
| low           | string | 最低價                                                            |
| timestamp     | int64  | 最新成交的時間戳                                                  |
| volume        | int64  | 成交量                                                            |
| turnover      | string | 成交額                                                            |
| trade_status  | int32  | 交易狀態，詳見 [TradeStatus](../objects#tradestatus---交易狀態)   |
| trade_session | int32  | 交易時段，詳見 [TradeSession](../objects#tradesession---交易時段) |

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
# 實時價格推送
# https://open.longbridgeapp.com/docs/quote/push/push-quote
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf 變量定義參見：https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
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
