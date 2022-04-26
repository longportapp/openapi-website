---
id: quote_warrant_quote
title: 获取轮证实时行情
slug: warrant-quote
sidebar_position: 4
---

获取港股轮证标的的实时行情，包括轮证的特有数据。

:::info

协议指令：`13`

:::

## Request

### Parameters

| 名称   | 类型     | 必须 | 描述     | 默认值 | 示例       |
| ------ | -------- | ---- | -------- | ------ | ---------- |
| symbol | string[] | 是   | 标的列表 |        | `13447.HK` |

### Protobuf

```protobuf
message MultiSecurityRequest {
  repeated string symbol = 1;
}
```

## Response

### Response Properties

| 名称                 | 类型                                  | 描述                               |
| -------------------- | ------------------------------------- | ---------------------------------- |
| secu_quote           | object[]                              | 期权标的行情数据列表               |
| ∟symbol              | string                                | 标的代码                           |
| ∟last_done           | string                                | 最新价                             |
| ∟prev_close          | string                                | 昨收价                             |
| ∟open                | string                                | 开盘价                             |
| ∟high                | string                                | 最高价                             |
| ∟low                 | string                                | 最低价                             |
| ∟timestamp           | int64                                 | 最新成交的交时间戳                 |
| ∟volume              | int64                                 | 成交量                             |
| ∟turnover            | string                                | 成交额                             |
| ∟trade_status        | [TradeStatus](../objects#tradestatus) | 标的交易状态                       |
| ∟warrant_extend      | object                                | 轮证扩展行情                       |
| ∟∟implied_volatility | string                                | 引申波幅                           |
| ∟∟expiry_date        | string                                | 到期日 `YYMMDD`                    |
| ∟∟last_trade_date    | string                                | 最后交易日 `YYMMDD`                |
| ∟∟outstanding_ratio  | string                                | 街货比                             |
| ∟∟outstanding_qty    | int64                                 | 街货量                             |
| ∟∟conversion_ratio   | string                                | 换股比率                           |
| ∟∟category           | string                                | 轮证类型 Call/Put/Bull/Bear/Inline |
| ∟∟strike_price       | string                                | 行权价                             |
| ∟∟upper_strike_price | string                                | 上限价                             |
| ∟∟lower_strike_price | string                                | 下限价                             |
| ∟∟call_price         | string                                | 收回价                             |
| ∟∟underlying_symbol  | string                                | 对应的正股标的代码                 |

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

## 接口限制

:::caution

- 每秒平均请求次数 10，瞬时并发次数 5。
- 每次请求，接口参数**标的列表**支持传入的标的数量上限是 300 个。
- 港股 BMP 行情，超过 20 支的港股标的将响应延迟行情。

:::

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                                   |
| ---------- | ---------- | -------------- | ------------------------------------------ |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败                     |
| 3          | 301606     | 限流           | 降低请求频次                               |
| 7          | 301602     | 服务端内部错误 |                                            |
| 7          | 301607     | 接口限制       | 请求的标的数量超限，请减少单次请求标的数量 |
