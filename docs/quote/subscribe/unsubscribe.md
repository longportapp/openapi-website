---
id: quote_unsubscribe
title: 取消订阅行情数据
slug: unsubscribe
sidebar_position: 3
---

该接口用于取消订阅标的行情数据。

:::info

[业务指令](../../socket/protocol/request)：`7`

:::

## Request

### Parameters

| Name      | Type     | Required | Description                                                                                                        |
| --------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| symbol    | string[] | 是       | 订阅的标的代码，例如：`[00700.HK]` <br /><br />**校验规则：**<br />每次请求支持传入的标的数量上限是 `500` 个       |
| sub_type  | int32[]  | 是       | 订阅的数据类型，例如：`[1,2]`，详见 [SubType](../objects#subtype---订阅数据的类型)                                 |
| unsub_all | bool     | 是       | 是否全部取消。<br />- `symbol` 为空时，取消所有标的的订阅。<br />- `symbol` 不为空时，取消这些标的的所有类型订阅。 |

### Protobuf

```protobuf
message SubscribeRequest {
  repeated string symbol = 1;
  repeated SubType sub_type = 2;
  bool unsub_all = 3;
}
```

### Request Example

```python
# 取消订阅行情数据
# https://open.longbridgeapp.com/docs/quote/subscribe/unsubscribe
import os
import time
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf 变量定义参见：https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
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

#订阅标的
req = SubscribeRequest(symbol=["700.HK", "AAPL.US"], sub_type=[SubType.QUOTE], is_first_push=False)
result = ws.send_request(Command.Subscribe, req.SerializeToString())
resp = SubscriptionResponse()
resp.ParseFromString(result)

print(f"Subscribed symbol:\n\n {resp.sub_list}")

#取消订阅
req = UnsubscribeRequest(unsub_all=True)
result = ws.send_request(Command.Unsubscribe, req.SerializeToString())

#查询已订阅标的
req = SubscriptionRequest()
result = ws.send_request(Command.Subscription, req.SerializeToString())
resp = SubscriptionResponse()
resp.ParseFromString(result)

print("\n")
print(f"After unsubscribing, subscribed symbol:\n\n {resp.sub_list}")
```

## Response

### Protobuf

```protobuf
message UnsubscribeResponse{
}
```

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                 |
| ---------- | ---------- | -------------- | ------------------------ |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败   |
| 3          | 301606     | 限流           | 降低请求频次             |
| 7          | 301602     | 服务端内部错误 | 请重试或联系技术人员处理 |
| 7          | 301600     | 请求参数有误   | 检查请求的 `sub_type`    |
