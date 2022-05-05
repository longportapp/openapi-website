---
id: quote_candlestick
title: 获取标的 K 线
slug: candlestick
sidebar_position: 10
---

该接口用于获取标的的 K 线数据。

:::info

[协议指令](../../socket/protocol/request)：`19`

:::

## Request

### Parameters

| Name        | Type   | Required | Description                                                                  |
| ----------- | ------ | -------- | ---------------------------------------------------------------------------- |
| symbol      | string | 是       | 标的代码，使用 `ticker.region` 格式，例如：`700.HK`                          |
| period      | int32  | 是       | k 线周期，例如：`1000`，详见 [Period](../objects#period---k-线周期)          |
| count       | int32  | 是       | 数据数量，例如：`100`<br /><br />**校验规则：** <br />请求数量最大为 `1000`  |
| adjust_type | int32  | 是       | 复权类型，例如：`0`，详见 [AdjustType](../objects#adjusttype---k-线复权类型) |

### Protobuf

```protobuf
message SecurityCandlestickRequest {
  string symbol = 1;
  Period period = 2;
  int32 count = 3;
  AdjustType adjust_type = 4;
}
```

## Response

### Response Properties

| Name         | Type     | Description               |
| ------------ | -------- | ------------------------- |
| symbol       | string   | 标的代码，例如：`AAPL.US` |
| candlesticks | object[] | K 线数据                  |
| ∟ close      | string   | 当前周期收盘价            |
| ∟ open       | string   | 当前周期开盘价            |
| ∟ low        | string   | 当前周期最低价            |
| ∟ high       | string   | 当前周期最高价            |
| ∟ volume     | int64    | 当前周期成交量            |
| ∟ turnover   | string   | 当前周期成交额            |
| ∟ timestamp  | int64    | 当前周期的时间戳          |

### Protobuf

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

### Response JSON Example

```json
{
  "symbol": "700.HK",
  "candlesticks": [
    {
      "close": "362.000",
      "open": "364.600",
      "low": "361.600",
      "high": "368.800",
      "volume": 10853604,
      "turnover": "3954556819.000",
      "timestamp": 1650384000
    },
    {
      "close": "348.000",
      "open": "352.000",
      "low": "343.000",
      "high": "356.200",
      "volume": 25738562,
      "turnover": "8981529950.000",
      "timestamp": 1650470400
    },
    {
      "close": "340.600",
      "open": "334.800",
      "low": "334.200",
      "high": "343.000",
      "volume": 28031299,
      "turnover": "9492674293.000",
      "timestamp": 1650556800
    },
    {
      "close": "327.400",
      "open": "332.200",
      "low": "325.200",
      "high": "338.600",
      "volume": 25788422,
      "turnover": "8541441823.000",
      "timestamp": 1650816000
    },
    {
      "close": "335.800",
      "open": "332.200",
      "low": "330.600",
      "high": "341.600",
      "volume": 27288328,
      "turnover": "9166022626.000",
      "timestamp": 1650902400
    }
  ]
}
```

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                                                                 |
| ---------- | ---------- | -------------- | ------------------------------------------------------------------------ |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败                                                   |
| 3          | 301606     | 限流           | 降低请求频次                                                             |
| 7          | 301602     | 服务端内部错误 | 请重试或联系技术人员处理                                                 |
| 7          | 301600     | 请求数据非法   | 检查请求的 `symbol`，`count`，`adjust_type`, `period` 数据是否在正确范围 |
| 7          | 301603     | 标的无行情     | 标的没有请求的行情数据                                                   |
| 7          | 301604     | 无权限         | 没有获取标的行情的权限                                                   |
| 7          | 301607     | 接口限制       | 请求的数据数量超限，减少数据数量                                         |
