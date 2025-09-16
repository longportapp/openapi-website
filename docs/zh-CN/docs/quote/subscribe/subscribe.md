---
id: quote_subscribe
title: 订阅行情数据
slug: subscribe
sidebar_position: 1
---

该接口用于订阅标的行情数据。

<SDKLinks module="quote" klass="QuoteContext" method="subscribe" />

:::info

[业务指令](../../socket/biz-command)：`6`

:::

## Request

### Parameters

| Name          | Type     | Required | Description                                                                                                                                            |
| ------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| symbol        | string[] | 是       | 订阅的标的代码，例如：`[700.HK]` <br /><br />**校验规则：**<br />每次请求支持传入的标的数量上限是 `500` 个 <br /> 每个用户同时订阅标的数量最多为 `500` |
| sub_type      | int32[]  | 是       | 订阅的数据类型，例如：`[1,2]`，详见 [SubType](../objects#subtype---订阅数据的类型)                                                                     |
| is_first_push | bool     | 是       | 订阅后是否立刻进行一次数据推送。( trade 不支持)                                                                                                        |

### Protobuf

```protobuf
message SubscribeRequest {
  repeated string symbol = 1;
  repeated SubType sub_type = 2;
  bool is_first_push = 3;
}
```

### Request Example

```python
# 订阅行情数据
#
# 订阅行情数据请检查“开发者中心” - “行情权限”是否正确
# https://open.longbridge.com/account
#
# - 港股 - BMP 基础报价，无实时行情推送，无法用 WebSocket 订阅
# - 美股 - LV1 纳斯达克最优报价 (只限 OpenAPI）
#
# 运行前请访问“开发者中心”确保账户有正确的行情权限。
# 如没有开通行情权限，可以通过“Longbridge”手机客户端，并进入“我的 - 我的行情 - 行情商城”购买开通行情权限。
from time import sleep
from longport.openapi import QuoteContext, Config, SubType, PushQuote

def on_quote(symbol: str, event: PushQuote):
    print(symbol, event)

config = Config.from_env()
ctx = QuoteContext(config)
ctx.set_on_quote(on_quote)

ctx.subscribe(["700.HK", "AAPL.US"], [SubType.Quote], is_first_push=True)
sleep(30)
```

## Response

### Response Properties

返回本次请求订阅成功的标的和类型。

| Name       | Type     | Description                                                          |
| ---------- | -------- | -------------------------------------------------------------------- |
| sub_list   | object[] | 订阅的数据                                                           |
| ∟ symbol   | string   | 标的代码                                                             |
| ∟ sub_type | int32[]  | 订阅的数据类型，详见：[SubType](../objects#subtype---订阅数据的类型) |

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

## 接口限制

:::caution

- 港股 BMP 行情不支持行情数据推送。

:::

## 错误码

| 协议错误码 | 业务错误码 | 描述             | 排查建议                 |
| ---------- | ---------- | ---------------- | ------------------------ |
| 3          | 301600     | 无效的请求       | 请求参数有误或解包失败   |
| 3          | 301606     | 限流             | 降低请求频次             |
| 7          | 301602     | 服务端内部错误   | 请重试或联系技术人员处理 |
| 7          | 301605     | 订阅数量超出限制 | 取消部分订阅             |
| 7          | 301600     | 请求参数有误     | 检查请求的 `sub_type`    |
