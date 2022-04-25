---
id: quote_option_quote
title: 获取期权实时行情
slug: option-quote
sidebar_position: 3
---

获取美股期权标的的实时行情，包括期权的特有数据

## 协议指令

```
12
```

## 请求

### 参数

| 名称   | 类型     | 必须 | 描述                                            | 默认值 | 示例                   |
| ------ | -------- | ---- | ----------------------------------------------- | ------ | ---------------------- |
| symbol | string[] | 是   | 标的列表。通过期权链接口获取期权标的的 symbol。 |        | `BABA230120C160000.US` |

### proto

```protobuf
message MultiSecurityRequest {
  repeated string symbol = 1;
}
```

## 响应

### 参数

| 名称                    | 类型                                 | 描述                                    |
| ----------------------- | ------------------------------------ | --------------------------------------- |
| secu_quote              | object[]                             | 期权标的行情数据列表                    |
| ∟symbol                 | string                               | 标的代码                                |
| ∟last_done              | string                               | 最新价                                  |
| ∟prev_close             | string                               | 昨收价                                  |
| ∟open                   | string                               | 开盘价                                  |
| ∟high                   | string                               | 最高价                                  |
| ∟low                    | string                               | 最低价                                  |
| ∟timestamp              | int64                                | 最新成交的交时间戳                      |
| ∟volume                 | int64                                | 成交量                                  |
| ∟turnover               | string                               | 成交额                                  |
| ∟trade_status           | [TradeStatus](../object#tradestatus) | 标的交易状态                            |
| ∟option_extend          | object                               | 期权扩展行情                            |
| ∟∟implied_volatility    | string                               | 隐含波动率                              |
| ∟∟open_interest         | int64                                | 未平仓数                                |
| ∟∟expiry_date           | string                               | 到期日 YYMMDD                           |
| ∟∟strike_price          | string                               | 行权价                                  |
| ∟∟contract_multiplier   | string                               | 合约乘数                                |
| ∟∟contract_type         | string                               | 期权类型                                |
| ∟∟contract_size         | string                               | 合约规模                                |
| ∟∟direction             | string                               | 方向: P 或 C 。 P 标识 put，C 标识 call |
| ∟∟historical_volatility | string                               | 历史波动率                              |
| ∟∟underlying_symbol     | string                               | 对应的正股标的代码                      |

### proto

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

## 接口限制

- 每秒平均请求次数 10。瞬时并发次数 5。
- 每次请求，接口参数 标的列表 支持传入的标的数量上限是 300 个。

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                                   |
| ---------- | ---------- | -------------- | ------------------------------------------ |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败                     |
| 3          | 301606     | 限流           | 降低请求频次                               |
| 7          | 301602     | 服务端内部错误 |                                            |
| 7          | 301607     | 接口限制       | 请求的标的数量超限，请减少单次请求标的数量 |
