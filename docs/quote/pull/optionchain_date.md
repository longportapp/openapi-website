---
id: quote_optionchain_date
title: 获取标的的期权链到期日列表
slug: optionchain-date
sidebar_position: 11
---

该接口用于获取标的的期权链到期日列表。

:::info

[业务指令](../../socket/protocol/request)：`20`

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
# 获取标的的期权链到期日列表
# https://open.longbridgeapp.com/docs/quote/pull/optionchain-date
# 运行前请访问 “开发者中心“ 确保账户有正确的行情权限。
# 如没有开通行情权限，可以通过 "长桥" 手机客户端，并进入 “我的 - 我的行情 - 行情商城“ 购买开通行情权限。
from longbridge.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.option_chain_expiry_date_list("AAPL.US")
print(resp)
```

## Response

### Response Properties

| Name        | Type     | Description                                    |
| ----------- | -------- | ---------------------------------------------- |
| expiry_date | string[] | 标的对应的期权链到期日列表，使用 `YYMMDD` 格式 |

### Protobuf

```protobuf
message OptionChainDateListResponse {
  repeated string expiry_date = 1;
}
```

### Response JSON Example

```json
{
  "expiry_date": [
    "20220422",
    "20220429",
    "20220506",
    "20220513",
    "20220520",
    "20220527",
    "20220603",
    "20220617",
    "20220715",
    "20220819",
    "20220916",
    "20221021",
    "20221118",
    "20230120",
    "20230317",
    "20230616",
    "20230915",
    "20240119",
    "20240621"
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
