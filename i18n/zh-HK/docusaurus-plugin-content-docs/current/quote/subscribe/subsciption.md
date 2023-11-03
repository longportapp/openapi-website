---
id: quote_subscription
title: 獲取已訂閱標的行情
slug: subscription
sidebar_position: 1
---

該接口用於獲取當前連接已訂閱的標的行情。

:::info

[業務指令](../../socket/biz-command)：`5`

:::

## Request

### Protobuf

```protobuf
message SubscriptionRequest {
}
```

### Request Example

```python
# 獲取已訂閱標的行情
# https://open.longportapp.com/docs/quote/subscribe/subscription
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf 變量定義參見：https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, PushQuote, SubscribeRequest, SubscriptionResponse, SubType, SubscriptionRequest, UnsubscribeRequest, UnsubscribeResponse)

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
http = HttpClient(auth, Config(base_url="https://openapi.longportapp.com"))
ws = WsClient("wss://openapi-quote.longportapp.com", http, MyWsCallback())

# 訂閱行情數據請檢查“開發者中心“ - “行情權限”是否正確
# https://open.longportapp.com/account
#
# - 港股 - BMP 基礎報價，無實時行情推送，無法用 WebSocket 訂閱
# - 美股 - LV1 納斯達克最優報價 (只限 Open API）
#
# 運行前請訪問“開發者中心“確保賬戶有正確的行情權限。
# 如沒有開通行情權限，可以通過“LongPort”手機客戶端，並進入“我的 - 我的行情 - 行情商城”購買開通行情權限。

#訂閱標的
req = SubscribeRequest(symbol=["700.HK", "AAPL.US"], sub_type=[SubType.QUOTE], is_first_push=False)
result = ws.send_request(Command.Subscribe, req.SerializeToString())
resp = SubscriptionResponse()
resp.ParseFromString(result)

print(f"Subscribed symbol:\n\n {resp.sub_list}")

#取消訂閱
req = UnsubscribeRequest(symbol=["700.HK"], unsub_all=True)
result = ws.send_request(Command.Unsubscribe, req.SerializeToString())

#查詢已訂閱標的
req = SubscriptionRequest()
result = ws.send_request(Command.Subscription, req.SerializeToString())
resp = SubscriptionResponse()
resp.ParseFromString(result)

print("\n")
print(f"Subscribed symbol:\n\n {resp.sub_list}")

#取消訂閱
req = UnsubscribeRequest(unsub_all=True)
result = ws.send_request(Command.Unsubscribe, req.SerializeToString())

#查詢已訂閱標的
req = SubscriptionRequest()
result = ws.send_request(Command.Subscription, req.SerializeToString())
resp = SubscriptionResponse()
resp.ParseFromString(result)

print("\n")
print(f"Subscribed symbol:\n\n {resp.sub_list}")
```

## Response

### Response Properties

| Name       | Type     | Description                                                         |
| ---------- | -------- | ------------------------------------------------------------------- |
| sub_list   | object[] | 訂閱的數據                                                          |
| ∟ symbol   | string   | 標的代碼                                                            |
| ∟ sub_type | []int32  | 訂閱的數據類型，詳見 [SubType](../objects#subtype---訂閱數據的類型) |

### Protobuf

```protobuf
message SubscriptionResponse {
  repeated SubTypeList sub_list = 1;
}

message SubTypeList {
  string symbol = 1;
  repeated SubType sub_type = 2;
}
```

### Response JSON Example

```json
{
  "sub_list": [
    {
      "symbol": "700.HK",
      "sub_type": [1, 2, 3]
    },
    {
      "symbol": "AAPL.US",
      "sub_type": [2]
    }
  ]
}
```

## 錯誤碼

| 協議錯誤碼 | 業務錯誤碼 | 描述           | 排查建議                 |
| ---------- | ---------- | -------------- | ------------------------ |
| 3          | 301600     | 無效的請求     | 請求參數有誤或解包失敗   |
| 3          | 301606     | 限流           | 降低請求頻次             |
| 7          | 301602     | 服務端內部錯誤 | 請重試或聯繫技術人員處理 |
