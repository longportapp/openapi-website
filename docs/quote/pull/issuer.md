---
id: quote_issuer
title: 获取轮证发行商 ID
slug: issuer
sidebar_position: 13
---

该接口用于获取轮证发行商 ID 数据 (可每天同步一次)。

:::info

[业务指令](../../socket/protocol/request)：`22`

:::

## Request

### Request Example

```python
# 获取轮证发行商 id
# https://open.longbridgeapp.com/docs/quote/pull/issuer
import os
import time
from google.protobuf import text_format
from longbridge.http import Auth, Config, HttpClient
from longbridge.ws import ReadyState, WsCallback, WsClient
# Protobuf 变量定义参见：https://github.com/longbridgeapp/openapi-protobufs/blob/main/quote/api.proto
from longbridge.proto.quote_pb2 import (Command, IssuerInfoResponse)

class MyWsCallback(WsCallback):
    def on_state(self, state: ReadyState):
        print(f"-> state: {state}")

auth = Auth(os.getenv("LONGBRIDGE_APP_KEY"), os.getenv("LONGBRIDGE_APP_SECRET"), access_token=os.getenv("LONGBRIDGE_ACCESS_TOKEN"))
http = HttpClient(auth, Config(base_url="https://openapi.lbkrs.com"))
ws = WsClient("wss://openapi-quote.longbridge.global", http, MyWsCallback())

# 运行前请访问 “开发者中心“ 确保账户有正确的行情权限。
# 如没有开通行情权限，可以通过 "长桥" 手机客户端，并进入 “我的 - 我的行情 - 行情商城“ 购买开通行情权限。
result = ws.send_request(Command.QueryWarrantIssuerInfo, "")
resp = IssuerInfoResponse()
resp.ParseFromString(result)

print(f"issuer info:\n\n")
for issuer in resp.issuer_info:
    print(f"{text_format.MessageToString(issuer, as_utf8=True)}")
```

## Response

### Parameters

| Name        | Type     | Description   |
| ----------- | -------- | ------------- |
| issuer_info | object[] | 发行机构信息  |
| ∟ id        | int32    | 机构 ID       |
| ∟ name_cn   | string   | 机构名称 (简) |
| ∟ name_en   | string   | 机构名称 (英) |
| ∟ name_hk   | string   | 机构名称 (繁) |

### Protobuf

```protobuf
message IssuerInfoResponse {
  repeated IssuerInfo issuer_info = 1;
}

message IssuerInfo {
  int32 id = 1;
  string name_cn = 2;
  string name_en = 3;
  string name_hk = 4;
}
```

### Response JSON Example

```json
{
  "issuer_info": [
    {
      "id": 15,
      "name_cn": "瑞银",
      "name_en": "UB",
      "name_hk": "瑞銀"
    },
    {
      "id": 14,
      "name_cn": "汇丰",
      "name_en": "HS",
      "name_hk": "滙豐"
    },
    {
      "id": 12,
      "name_cn": "花旗",
      "name_en": "CT",
      "name_hk": "花旗"
    }
  ]
}
```

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                 |
| ---------- | ---------- | -------------- | ------------------------ |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败   |
| 3          | 301606     | 限流           | 降低请求频次             |
| 7          | 301602     | 服务端内部错误 | 请重试或联系技术人员处理 |
