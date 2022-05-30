---
id: quote_option_quote
title: 获取期权实时行情
slug: option-quote
sidebar_position: 3
---

该接口用于获取美股期权标的的实时行情，包括期权的特有数据。

:::info
[业务指令](../../socket/protocol/request)：`12`
:::

## Request

### Parameters

| Name   | Type     | Required | Description                                                                                                                                                                                  |
| ------ | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol | string[] | 是       | 标的代码列表，通过[期权链接口](./optionchain-date-strike.md)获取期权标的的 symbol， 例如：`[BABA230120C160000.US]` <br /><br />**校验规则：**<br />每次请求支持传入的标的数量上限是 `500` 个 |

### Protobuf

```protobuf
message MultiSecurityRequest {
  repeated string symbol = 1;
}
```

### Request Example

```python
# 获取期权实时行情
# https://open.longbridgeapp.com/docs/quote/pull/option-quote
# 运行前请访问 “开发者中心“ 确保账户有正确的行情权限。
# 如没有开通行情权限，可以通过 "长桥" 手机客户端，并进入 “我的 - 我的行情 - 行情商城“ 购买开通行情权限。
from longbridge.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.option_quote(["AAPL230317P160000.US"])
print(resp)
```

## Response

### Response Properties

| Name                     | Type     | Description                                                         |
| ------------------------ | -------- | ------------------------------------------------------------------- |
| secu_quote               | object[] | 期权标的行情数据列表                                                |
| ∟ symbol                 | string   | 标的代码                                                            |
| ∟ last_done              | string   | 最新价                                                              |
| ∟ prev_close             | string   | 昨收价                                                              |
| ∟ open                   | string   | 开盘价                                                              |
| ∟ high                   | string   | 最高价                                                              |
| ∟ low                    | string   | 最低价                                                              |
| ∟ timestamp              | int64    | 最新成交的时间戳                                                    |
| ∟ volume                 | int64    | 成交量                                                              |
| ∟ turnover               | string   | 成交额                                                              |
| ∟ trade_status           | int32    | 标的交易状态，详见 [TradeStatus](../objects#tradestatus---交易状态) |
| ∟ option_extend          | object   | 期权扩展行情                                                        |
| ∟∟ implied_volatility    | string   | 隐含波动率                                                          |
| ∟∟ open_interest         | int64    | 未平仓数                                                            |
| ∟∟ expiry_date           | string   | 到期日，使用：`YYMMDD` 格式                                         |
| ∟∟ strike_price          | string   | 行权价                                                              |
| ∟∟ contract_multiplier   | string   | 合约乘数                                                            |
| ∟∟ contract_type         | string   | 期权类型 <br /><br />**可选值：**<br />`A` - 美式 <br />`U` - 欧式  |
| ∟∟ contract_size         | string   | 合约规模                                                            |
| ∟∟ direction             | string   | 方向 <br /><br />**可选值：**<br />`P` - put <br />`C` - call       |
| ∟∟ historical_volatility | string   | 对应正股的历史波动率                                                |
| ∟∟ underlying_symbol     | string   | 对应的正股标的代码                                                  |

### Protobuf

```protobuf
message OptionQuoteResponse {
  repeated OptionQuote secu_quote = 1;
}

message OptionQuote {
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
  OptionExtend option_extend = 11;
}

message OptionExtend {
  string implied_volatility = 1;
  int64 open_interest = 2;
  string expiry_date = 3;
  string strike_price = 4;
  string contract_multiplier = 5;
  string contract_type = 6;
  string contract_size = 7;
  string direction = 8;
  string historical_volatility = 9;
  string underlying_symbol = 10;
}
```

### Response JSON Example

```json
{
  "secu_quote": [
    {
      "symbol": "AAPL220429P162500.US",
      "last_done": "7.78",
      "prev_close": "4.13",
      "open": "4.43",
      "high": "7.80",
      "low": "4.43",
      "timestamp": 1651003200,
      "volume": 3082,
      "turnover": "1813434.00",
      "option_extend": {
        "implied_volatility": "0.592",
        "open_interest": 11463,
        "expiry_date": "20220429",
        "strike_price": "162.50",
        "contract_multiplier": "100",
        "contract_type": "A",
        "contract_size": "100",
        "direction": "P",
        "historical_volatility": "0.2750",
        "underlying_symbol": "AAPL.US"
      }
    },
    {
      "symbol": "AAPL220429C150000.US",
      "last_done": "9.25",
      "prev_close": "13.87",
      "open": "13.80",
      "high": "13.80",
      "low": "9.15",
      "timestamp": 1651003200,
      "volume": 413,
      "turnover": "436835.00",
      "option_extend": {
        "implied_volatility": "0.702",
        "open_interest": 800,
        "expiry_date": "20220429",
        "strike_price": "150.00",
        "contract_multiplier": "100",
        "contract_type": "A",
        "contract_size": "100",
        "direction": "C",
        "historical_volatility": "0.2750",
        "underlying_symbol": "AAPL.US"
      }
    }
  ]
}
```

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                                   |
| ---------- | ---------- | -------------- | ------------------------------------------ |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败                     |
| 3          | 301606     | 限流           | 降低请求频次                               |
| 7          | 301602     | 服务端内部错误 | 请重试或联系技术人员处理                   |
| 7          | 301607     | 接口限制       | 请求的标的数量超限，请减少单次请求标的数量 |
