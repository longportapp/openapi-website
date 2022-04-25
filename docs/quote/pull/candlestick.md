---
id: quote_candlestick
title: 获取标的 k 线
slug: candlestick
sidebar_position: 10
---

获取标的的 k 线数据

## 协议指令

```
19
```

## 请求

### 参数

| 名称        | 类型                               | 必须 | 描述                        | 默认值 | 示例       |
| ----------- | ---------------------------------- | ---- | --------------------------- | ------ | ---------- |
| symbol      | string                             | 是   | 标的代码，`ticker.region`。 |        | `00700.HK` |
| period      | [Period](../object#period)         | 是   | k 线周期                    |        | 1000       |
| count       | int32                              | 是   | 数据数量                    |        | 100        |
| adjust_type | [AdjustType](../object#adjusttype) | 是   | 复权类型                    |        | 0          |

### proto

```protobuf
message SecurityCandlestickRequest {
  string symbol = 1;
  Period period = 2;
  int32 count = 3;
  AdjustType adjust_type = 4;
}
```

## 响应

### 参数

| 名称         | 类型     | 描述             |
| ------------ | -------- | ---------------- |
| symbol       | string   | 标的代码         |
| candlesticks | object[] | k 线数据         |
| ∟close       | string   | 当前周期收盘价   |
| ∟open        | string   | 当前周期开盘价   |
| ∟low         | string   | 当前周期最低价   |
| ∟high        | string   | 当前周期最高价   |
| ∟volume      | int64    | 当前周期成交量   |
| ∟turnover    | string   | 当前周期成交额   |
| ∟timestamp   | int64    | 当前周期的时间戳 |

### proto

```protobuf
message SecurityCandlestickResponse {
  string symbol = 1;
  repeated Candlestick candlesticks = 2;
}

message Candlestick {
  string close = 1;
  string open = 2;
  string low = 3;
  string high = 4;
  int64 volume = 5;
  string turnover = 6;
  int64 timestamp = 7;
}
```

## 接口限制

- 每秒平均请求次数 10。瞬时并发次数 5。
- 请求 k 线数量最大为 1000。

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                                                                 |
| ---------- | ---------- | -------------- | ------------------------------------------------------------------------ |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败                                                   |
| 3          | 301606     | 限流           | 降低请求频次                                                             |
| 7          | 301602     | 服务端内部错误 |                                                                          |
| 7          | 301600     | 请求数据非法   | 检查请求的 `symbol`，`count`，`adjust_type`, `period` 数据是否在正确范围 |
| 7          | 301603     | 标的无行情     | 标的没有请求的行情数据                                                   |
| 7          | 301604     | 无权限         | 没有获取标的行情的权限                                                   |
| 7          | 301607     | 接口限制       | 请求的数据数量超限，减少数据数量                                         |
