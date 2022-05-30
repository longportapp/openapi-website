---
id: quote_warrant_quote
title: 获取轮证实时行情
slug: warrant-quote
sidebar_position: 4
---

该接口用于获取港股轮证标的的实时行情，包括轮证的特有数据。

:::info

[业务指令](../../socket/protocol/request)：`13`

:::

## Request

### Parameters

| Name   | Type     | Required | Description                                                                                                                           |
| ------ | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| symbol | string[] | 是       | 标的代码列表，使用 `ticker.region` 格式，例如：`[13447.HK]` <br /><br />**校验规则：**<br />每次请求支持传入的标的数量上限是 `500` 个 |

### Protobuf

```protobuf
message MultiSecurityRequest {
  repeated string symbol = 1;
}
```

### Request Example

```python
# 获取轮证实时行情
# https://open.longbridgeapp.com/docs/quote/pull/warrant-quote
# 运行前请访问 “开发者中心“ 确保账户有正确的行情权限。
# 如没有开通行情权限，可以通过 "长桥" 手机客户端，并进入 “我的 - 我的行情 - 行情商城“ 购买开通行情权限。
from longbridge.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.warrant_quote(["21125.HK"])
print(resp)
```

## Response

### Response Properties

| Name                  | Type     | Description                                                                                                                                 |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| secu_quote            | object[] | 期权标的行情数据列表                                                                                                                        |
| ∟ symbol              | string   | 标的代码                                                                                                                                    |
| ∟ last_done           | string   | 最新价                                                                                                                                      |
| ∟ prev_close          | string   | 昨收价                                                                                                                                      |
| ∟ open                | string   | 开盘价                                                                                                                                      |
| ∟ high                | string   | 最高价                                                                                                                                      |
| ∟ low                 | string   | 最低价                                                                                                                                      |
| ∟ timestamp           | int64    | 最新成交的时间戳                                                                                                                            |
| ∟ volume              | int64    | 成交量                                                                                                                                      |
| ∟ turnover            | string   | 成交额                                                                                                                                      |
| ∟ trade_status        | int32    | 标的交易状态，详见[TradeStatus](../objects#tradestatus---交易状态)                                                                          |
| ∟ warrant_extend      | object   | 轮证扩展行情                                                                                                                                |
| ∟∟ implied_volatility | string   | 引申波幅                                                                                                                                    |
| ∟∟ expiry_date        | string   | 到期日，使用：`YYMMDD` 格式                                                                                                                 |
| ∟∟ last_trade_date    | string   | 最后交易日，使用：`YYMMDD` 格式                                                                                                             |
| ∟∟ outstanding_ratio  | string   | 街货比                                                                                                                                      |
| ∟∟ outstanding_qty    | int64    | 街货量                                                                                                                                      |
| ∟∟ conversion_ratio   | string   | 换股比率                                                                                                                                    |
| ∟∟ category           | string   | 轮证类型 <br /><br />**可选值：**<br />`Call` - 认购证 <br />`Put` - 认沽证 <br />`Bull` - 牛证 <br />`Bear` - 熊证 <br />`Inline` - 界内证 |
| ∟∟ strike_price       | string   | 行权价                                                                                                                                      |
| ∟∟ upper_strike_price | string   | 上限价                                                                                                                                      |
| ∟∟ lower_strike_price | string   | 下限价                                                                                                                                      |
| ∟∟ call_price         | string   | 收回价                                                                                                                                      |
| ∟∟ underlying_symbol  | string   | 对应的正股标的代码                                                                                                                          |

### Protobuf

```protobuf
message WarrantQuoteResponse {
  repeated WarrantQuote secu_quote = 2;
}

message WarrantQuote {
  string symbol = 1;
  string last_done = 2;
  string prev_close = 3;
  string open = 4;
  string high = 5;
  string low = 6;
  int64 timestamp = 7;
  int64 volume = 8;
  string turnover = 9;
  TradeStatus trade_status = 10;
  WarrantExtend warrant_extend = 11;
}

message WarrantExtend {
  string implied_volatility = 1;
  string expiry_date = 2;
  string last_trade_date = 3;
  string outstanding_ratio = 4;
  int64  outstanding_qty = 5;
  string conversion_ratio = 6;
  string category = 7;
  string strike_price = 8;
  string upper_strike_price = 9;
  string lower_strike_price = 10;
  string call_price = 11;
  string underlying_symbol = 12;
}
```

### Response JSON Example

```json
{
  "secu_quote": [
    {
      "symbol": "66642.HK",
      "last_done": "0.345",
      "prev_close": "0.365",
      "open": "0.345",
      "high": "0.345",
      "low": "0.345",
      "timestamp": 1651130421,
      "volume": 200000,
      "turnover": "69000.000",
      "warrant_extend": {
        "implied_volatility": "0.319",
        "expiry_date": "20220830",
        "last_trade_date": "20220829",
        "outstanding_ratio": "0.0001",
        "outstanding_qty": 20000,
        "conversion_ratio": "10000",
        "category": "Bear",
        "strike_price": "23200.000",
        "upper_strike_price": "0.000",
        "lower_strike_price": "0.000",
        "call_price": "23100.000",
        "underlying_symbol": "HSI.HK"
      }
    },
    {
      "symbol": "14993.HK",
      "last_done": "0.073",
      "prev_close": "0.066",
      "open": "0.069",
      "high": "0.076",
      "low": "0.069",
      "timestamp": 1651130930,
      "volume": 320825000,
      "turnover": "23401125.000",
      "warrant_extend": {
        "implied_volatility": "0.404",
        "expiry_date": "20220927",
        "last_trade_date": "20220921",
        "outstanding_ratio": "0.0247",
        "outstanding_qty": 2465000,
        "conversion_ratio": "10",
        "category": "Call",
        "strike_price": "70.050",
        "upper_strike_price": "0.000",
        "lower_strike_price": "0.000",
        "call_price": "0.000",
        "underlying_symbol": "2318.HK"
      }
    }
  ]
}
```

## 接口限制

:::caution

- 港股 BMP 行情，超过 20 支的港股标的将响应延迟行情。

:::

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                                   |
| ---------- | ---------- | -------------- | ------------------------------------------ |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败                     |
| 3          | 301606     | 限流           | 降低请求频次                               |
| 7          | 301602     | 服务端内部错误 | 请重试或联系技术人员处理                   |
| 7          | 301607     | 接口限制       | 请求的标的数量超限，请减少单次请求标的数量 |
