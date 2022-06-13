---
id: quote_capital_distribution.md
title: 获取标的当日资金分布
slug: capital-distribution
sidebar_position: 18
---

该接口用于获取标的当日的资金分布。

:::info
[业务指令](../../socket/protocol/request)：`25`
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
# Get Security Capital Distribution
# https://open.longbridgeapp.com/docs/quote/pull/capital-distribution
# 运行前请访问“开发者中心”确保账户有正确的行情权限。
# 如没有开通行情权限，可以通过“长桥”手机客户端，并进入“我的 - 我的行情 - 行情商城”购买开通行情权限。
from longbridge.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

# resp = ctx.brokers("700.HK")
# print(resp)
```

## Response

### Response Properties

| Name        | Type     | Description    |
| ----------- | -------- | -------------- |
| symbol      | string   | 标的代码       |
| timestamp   | int64    | 数据更新时间戳 |
| capital_in  | object[] | 流入资金       |
| ∟ large     | string   | 大单           |
| ∟ medium    | string   | 中单           |
| ∟ small     | string   | 小单           |
| capital_out | object[] | 流出资金       |
| ∟ large     | string   | 大单           |
| ∟ medium    | string   | 中单           |
| ∟ small     | string   | 小单           |

### Protobuf

```protobuf
message CapitalDistributionResponse {
  message CapitalDistribution {
    string large = 1;
    string medium = 2;
    string small = 3;
  }
  string symbol = 1;
  int64 timestamp = 2;
  CapitalDistribution capital_in = 3;
  CapitalDistribution capital_out = 4;
}
```

### Response JSON Example

```json
{
  "symbol": "700.HK",
  "timestamp": "1655107800",
  "capital_in": {
    "large": "935389700.000",
    "medium": "2056032380.000",
    "small": "828715920.000"
  },
  "capital_out": {
    "large": "1175331560.000",
    "medium": "2271829740.000",
    "small": "751648940.000"
  }
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
