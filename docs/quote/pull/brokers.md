---
id: quote_brokers
title: 获取标的经纪队列
slug: brokers
sidebar_position: 6
---

该接口用于获取标的的实时经纪队列数据。

:::info
[业务指令](../../socket/protocol/request)：`15`
:::

## Request

### Parameters

| Name   | Type   | Required | Description                                          |
| ------ | ------ | -------- | ---------------------------------------------------- |
| symbol | string | 是       | 标的代码，使用 `ticker.region` 格式，例如： `700.HK` |

### Protobuf

```protobuf
message SecurityRequest {
  string symbol = 1;
}
```

### Request Example

```python
# Get Security Brokers
# https://open.longbridgeapp.com/docs/quote/pull/brokers
# 运行前请访问“开发者中心”确保账户有正确的行情权限。
# 如没有开通行情权限，可以通过“长桥”手机客户端，并进入“我的 - 我的行情 - 行情商城”购买开通行情权限。
from longbridge.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.brokers("700.HK")
print(resp)
```

## Response

### Response Properties

| Name         | Type     | Description                                               |
| ------------ | -------- | --------------------------------------------------------- |
| symbol       | string   | 标的代码                                                  |
| ask_brokers  | object[] | 卖盘经纪队列                                              |
| ∟ position   | int32    | 档位                                                      |
| ∟ broker_ids | int32[]  | 券商席位 ID，通过[获取券商席位 ID ](./broker-ids)接口获取 |
| bid_brokers  | object[] | 买盘经纪队列                                              |
| ∟ position   | int32    | 档位                                                      |
| ∟ broker_ids | int32[]  | 券商席位 ID，通过[获取券商席位 ID ](./broker-ids)接口获取 |

### Protobuf

```protobuf
message SecurityBrokersResponse {
  string symbol = 1;
  repeated Brokers ask_brokers = 2;
  repeated Brokers bid_brokers = 3;
}

message Brokers {
  int32 position = 1;
  repeated int32 broker_ids = 2;
}
```

### Response JSON Example

```json
{
  "symbol": "700.HK",
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
      "position": 2
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
