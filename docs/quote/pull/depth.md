---
id: quote_depth
title: 获取标的盘口
slug: depth
sidebar_position: 5
---

该接口用于获取标的的盘口数据。

:::info

[业务指令](../../socket/protocol/request)：`14`

:::

## Request

### Parameters

| Name   | Type   | Required | Description                                         |
| ------ | ------ | -------- | --------------------------------------------------- |
| symbol | string | 是       | 标的代码，使用 `ticker.region` 格式，例如：`700.HK` |

### Protobuf

```protobuf
message SecurityRequest {
  string symbol = 1;
}
```

### Request Example

```python
# 获取标的盘口
# https://open.longbridgeapp.com/docs/quote/pull/depth
# 运行前请访问 “开发者中心“ 确保账户有正确的行情权限。
# 如没有开通行情权限，可以通过 "长桥" 手机客户端，并进入 “我的 - 我的行情 - 行情商城“ 购买开通行情权限。
from longbridge.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.depth("700.HK")
print(resp)
```

## Response

### Response Properties

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| symbol      | string   | 标的代码    |
| ask         | object[] | 卖盘        |
| ∟ position  | int32    | 档位        |
| ∟ price     | string   | 价格        |
| ∟ volume    | int64    | 挂单辆      |
| ∟ order_num | int64    | 订单数量    |
| bid         | object[] | 买盘        |
| ∟ position  | int32    | 档位        |
| ∟ price     | string   | 价格        |
| ∟ volume    | int64    | 挂单辆      |
| ∟ order_num | int64    | 订单数量    |

### Protobuf

```protobuf
message SecurityDepthResponse {
  string symbol = 1;
  repeated Depth ask = 2;
  repeated Depth bid = 3;
}

message Depth {
  int32 position = 1;
  string price = 2;
  int64 volume = 3;
  int64 order_num = 4;
}
```

### Response JSON Example

```json
{
  "symbol": "700.HK",
  "ask": [
    {
      "position": 1,
      "price": "335.000",
      "volume": 500,
      "order_num": 1
    },
    {
      "position": 2,
      "price": "335.200",
      "volume": 400,
      "order_num": 1
    },
    {
      "position": 3,
      "price": "335.400",
      "volume": 500,
      "order_num": 2
    },
    {
      "position": 4,
      "price": "335.600",
      "volume": 1200,
      "order_num": 3
    },
    {
      "position": 5,
      "price": "335.800",
      "volume": 14000,
      "order_num": 8
    }
  ],
  "bid": [
    {
      "position": 1,
      "price": "334.800",
      "volume": 69400,
      "order_num": 13
    },
    {
      "position": 2,
      "price": "334.600",
      "volume": 266600,
      "order_num": 27
    },
    {
      "position": 3,
      "price": "334.400",
      "volume": 61300,
      "order_num": 29
    },
    {
      "position": 4,
      "price": "334.200",
      "volume": 125900,
      "order_num": 31
    },
    {
      "position": 5,
      "price": "334.000",
      "volume": 194600,
      "order_num": 94
    }
  ]
}
```

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                     |
| ---------- | ---------- | -------------- | ---------------------------- |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败       |
| 3          | 301606     | 限流           | 降低请求频次                 |
| 7          | 301602     | 服务端内部错误 | 请重试或联系技术人员处理     |
| 7          | 301600     | 请求标的不存在 | 检查请求的 `symbol` 是否正确 |
| 7          | 301603     | 标的无行情     | 标的没有请求的行情数据       |
| 7          | 301604     | 无权限         | 没有获取标的行情的权限       |
