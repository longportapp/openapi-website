---
id: quote_optionchain_date_strike
title: 获取标的的期权链到期日期权标的列表
slug: optionchain-date-strike
sidebar_position: 12
---

该接口用于获取标的的期权链到期日期权标的列表。

:::info

[业务指令](../../socket/protocol/request)：`21`

:::

## Request

### Parameters

| Name        | Type   | Required | Description                                                                                         |
| ----------- | ------ | -------- | --------------------------------------------------------------------------------------------------- |
| symbol      | string | 是       | 标的代码，使用 `ticker.region` 格式，例如：`700.HK`                                                 |
| expiry_date | string | 是       | 期权到期日，使用 `YYMMDD` 格式，例如：`20220429`，通过 [期权到期日](./optionchain_date.md) 接口获取 |

### Protobuf

```protobuf
message OptionChainDateStrikeInfoRequest {
  string symbol = 1;
  string expiry_date = 2;
}
```

### Request Example

```python
# 获取标的的期权链到期日期权标的列表
# https://open.longportapp.com/docs/quote/pull/optionchain-date-strike
# 运行前请访问“开发者中心”确保账户有正确的行情权限。
# 如没有开通行情权限，可以通过“LongPort”手机客户端，并进入“我的 - 我的行情 - 行情商城”购买开通行情权限。
from datetime import date
from longbridge.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.option_chain_info_by_date("AAPL.US", date(2023, 1, 20))
print(resp)
```

## Response

### Response Properties

| Name              | Type     | Description        |
| ----------------- | -------- | ------------------ |
| strike_price_info | object[] | 到期日期权标的列表 |
| ∟ price           | string   | 行权价             |
| ∟ call_symbol     | string   | CALL 期权标的代码  |
| ∟ put_symbol      | string   | PUT 期权标的代码   |
| ∟ standard        | bool     | 是否标准期权       |

### Protobuf

```protobuf
message OptionChainDateStrikeInfoResponse {
  repeated StrikePriceInfo strike_price_info = 1;
}

message StrikePriceInfo {
  string price = 1;
  string call_symbol = 2;
  string put_symbol = 3;
  bool  standard = 4;
}
```

### Response JSON Example

```json
{
  "strike_price_info": [
    {
      "price": "100",
      "call_symbol": "AAPL220429C100000.US",
      "put_symbol": "AAPL220429P100000.US",
      "standard": true
    },
    {
      "price": "105",
      "call_symbol": "AAPL220429C105000.US",
      "put_symbol": "AAPL220429P105000.US",
      "standard": true
    },
    {
      "price": "110",
      "call_symbol": "AAPL220429C110000.US",
      "put_symbol": "AAPL220429P110000.US",
      "standard": true
    },
    {
      "price": "115",
      "call_symbol": "AAPL220429C115000.US",
      "put_symbol": "AAPL220429P115000.US",
      "standard": true
    }
  ]
}
```

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                                    |
| ---------- | ---------- | -------------- | ------------------------------------------- |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败                      |
| 3          | 301606     | 限流           | 降低请求频次                                |
| 7          | 301602     | 服务端内部错误 | 请重试或联系技术人员处理                    |
| 7          | 301600     | 请求数据非法   | 检查请求的 `symbol`，`expiry_date` 数据格式 |
