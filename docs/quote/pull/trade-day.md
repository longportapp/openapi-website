---
id: quote_trade_day
title: 获取市场交易日
slug: trade-day
sidebar_position: 16
---

获取市场交易日

:::info

协议指令：`9`

:::

## Request

### Parameters

| 名称    | 类型   | 必须 | 描述                                                                                                | 示例       |
| ------- | ------ | ---- | --------------------------------------------------------------------------------------------------- | ---------- |
| market  | string | 是   | 市场，可选：<br/><br/>`US` - 美股市场<br/>`HK` - 港股市场<br/>`CN` - A 股市场<br/>`SG` - 新加坡市场 | `US`       |
| beg_day | string | 是   | 开始时间，格式：`YYMMDD`                                                                            | `20220501` |
| end_day | string | 是   | 结束时间，格式：`YYMMDD`                                                                            | `20220510` |

### Protobuf

```protobuf
message MarketTradeDayRequest {
  string market = 1;
  string beg_day = 2;
  string end_day = 3;
}
```

## Response

### Response Properties

| 名称           | 类型     | 描述                   |
| -------------- | -------- | ---------------------- |
| trade_day      | string[] | 交易日，格式：`YYMMDD` |
| half_trade_day | string[] | 半日市，格式：`YYMMDD` |

### Protobuf

```protobuf
message MarketTradeDayResponse {
  repeated string trade_day = 1;
  repeated string half_trade_day = 2;
}
```

## 接口限制

:::caution

- 每秒平均请求数 10 次，瞬时并发数 5 次。
- 每次请求间隔时间不能超过一个月。

:::

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                             |
| ---------- | ---------- | -------------- | ------------------------------------ |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败               |
| 3          | 301606     | 限流           | 降低请求频次                         |
| 7          | 301602     | 服务端内部错误 |                                      |
| 7          | 301600     | 请求数据非法   | 检查请求的市场，日期是否在正确范围内 |
