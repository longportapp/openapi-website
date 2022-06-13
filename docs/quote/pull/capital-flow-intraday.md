---
id: quote_capital_flow_intraday
title: 获取标的当日资金流向
slug: capital-flow-intraday
sidebar_position: 17
---

该接口用于获取标的当日的资金流向。

:::info
[业务指令](../../socket/protocol/request)：`24`
:::

## Request

### Parameters

| Name   | Type   | Required | Description                                          |
| ------ | ------ | -------- | ---------------------------------------------------- |
| symbol | string | 是       | 标的代码，使用 `ticker.region` 格式，例如： `700.HK` |

### Protobuf

```protobuf
message CapitalFlowIntradayRequest {
  string symbol = 1;
}
```

### Request Example

```python
# Get Security Capital Flow Intraday
# https://open.longbridgeapp.com/docs/quote/pull/capital-flow-intraday
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

| Name               | Type     | Description    |
| ------------------ | -------- | -------------- |
| symbol             | string   | 标的代码       |
| capital_flow_lines | object[] | 资金流向数据   |
| ∟ inflow           | string   | 净流入         |
| ∟ timestamp        | int64    | 分钟开始时间戳 |

### Protobuf

```protobuf
message CapitalFlowIntradayResponse {
  message CapitalFlowLine {
    string inflow = 1;
    int64 timestamp = 2;
  }
  string symbol = 1;
  repeated CapitalFlowLine capital_flow_lines = 2;
}
```

### Response JSON Example

```json
{
  "symbol": "700.HK",
  "capital_flow_lines": [
    { "inflow": "-310255860.000", "timestamp": "1655106960" },
    { "inflow": "-314011220.000", "timestamp": "1655107020" },
    { "inflow": "-314011220.000", "timestamp": "1655107080" },
    { "inflow": "-314011220.000", "timestamp": "1655107140" },
    { "inflow": "-314011220.000", "timestamp": "1655107200" }
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
