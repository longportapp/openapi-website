---
id: quote_quote
title: 获取标的实时行情
slug: quote
sidebar_position: 2
---

获取标的的实时行情 (支持所有类型标的)

## 协议指令

```
11
```

## 请求

### 参数

| 名称   | 类型     | 必须 | 描述                         | 默认值 | 示例       |
| ------ | -------- | ---- | ---------------------------- | ------ | ---------- |
| symbol | string[] | 是   | 标的列表 - `ticker.region`。 |        | `00700.HK` |

### proto

```protobuf
message MultiSecurityRequest {
  repeated string symbol = 1;
}
```

## 响应

### 参数

| 名称               | 类型                                 | 描述                   |
| ------------------ | ------------------------------------ | ---------------------- |
| secu_quote         | object[]                             | 标的实时行情数据列表   |
| ∟symbol            | string                               | 标的代码               |
| ∟last_done         | string                               | 最新价                 |
| ∟prev_close        | string                               | 昨收价                 |
| ∟open              | string                               | 开盘价                 |
| ∟high              | string                               | 最高价                 |
| ∟low               | string                               | 最低价                 |
| ∟timestamp         | int64                                | 最新成交的交时间戳     |
| ∟volume            | int64                                | 成交量                 |
| ∟turnover          | string                               | 成交额                 |
| ∟trade_status      | [TradeStatus](../object#tradestatus) | 标的交易状态           |
| ∟pre_market_quote  | object                               | 美股盘前交易行情       |
| ∟∟last_done        | string                               | 最新价                 |
| ∟∟timestamp        | int64                                | 最新成交的交时间戳     |
| ∟∟volume           | int64                                | 成交量                 |
| ∟∟turnover         | string                               | 成交额                 |
| ∟∟high             | string                               | 最高价                 |
| ∟∟low              | string                               | 最低价                 |
| ∟∟prev_close       | string                               | 上一个交易阶段的收盘价 |
| ∟post_market_quote | object                               | 美股盘后交易行情       |
| ∟∟last_done        | string                               | 最新价                 |
| ∟∟timestamp        | int64                                | 最新成交的交时间戳     |
| ∟∟volume           | int64                                | 成交量                 |
| ∟∟turnover         | string                               | 成交额                 |
| ∟∟high             | string                               | 最高价                 |
| ∟∟low              | string                               | 最低价                 |
| ∟∟prev_close       | string                               | 上一个交易阶段的收盘价 |

### proto

```protobuf
message  SecurityQuoteResponse {
  repeated SecurityQuote secu_quote = 1;
}

message SecurityQuote {
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
  PrePostQuote pre_market_quote = 11;
  PrePostQuote post_market_quote = 12;
}

message PrePostQuote {
  string last_done = 1;
  int64 timestamp = 2;
  int64 volume = 3;
  string turnover = 4;
  string high = 5;
  string low = 6;
  string prev_close = 7;
}
```

## 接口限制

- 每秒平均请求次数 10。瞬时并发次数 5。
- 每次请求，接口参数 标的列表 支持传入的标的数量上限是 300 个。
- 港股 BMP 行情，超过 20 支的港股标的将响应延迟行情。

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                                   |
| ---------- | ---------- | -------------- | ------------------------------------------ |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败                     |
| 3          | 301606     | 限流           | 降低请求频次                               |
| 7          | 301602     | 服务端内部错误 |                                            |
| 7          | 301607     | 接口限制       | 请求的标的数量超限，请减少单次请求标的数量 |
