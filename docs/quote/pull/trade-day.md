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

| Name    | Type   | Required | Description                                                                                                                                              |
| ------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| market  | string | 是       | 市场 <br /><br />**可选值：**<br/>`US` - 美股市场<br/>`HK` - 港股市场<br/>`CN` - A 股市场<br/>`SG` - 新加坡市场                                          |
| beg_day | string | 是       | 开始时间，使用 `YYMMDD` 格式，例如：`20220401`                                                                                                           |
| end_day | string | 是       | 结束时间，使用 `YYMMDD` 格式，例如：`20220420` <br/><br/>**校验规则：**<br/> `开始时间` 和 `结束时间`，间隔不能大于一个月 <br/> 仅支持查询最近一年的数据 |

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

| Name           | Type     | Description                |
| -------------- | -------- | -------------------------- |
| trade_day      | string[] | 交易日，使用 `YYMMDD` 格式 |
| half_trade_day | string[] | 半日市，使用 `YYMMDD` 格式 |

### Protobuf

```protobuf
message MarketTradeDayResponse {
  repeated string trade_day = 1;
  repeated string half_trade_day = 2;
}
```

### Response JSON Example

```json
{
  "trade_day": [
    "20220120",
    "20220121",
    "20220124",
    "20220125",
    "20220126",
    "20220127",
    "20220128",
    "20220204",
    "20220207",
    "20220208",
    "20220209",
    "20220210"
  ],
  "half_trade_day": ["20220131"]
}
```

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                             |
| ---------- | ---------- | -------------- | ------------------------------------ |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败               |
| 3          | 301606     | 限流           | 降低请求频次                         |
| 7          | 301602     | 服务端内部错误 | 请重试或联系技术人员处理             |
| 7          | 301600     | 请求数据非法   | 检查请求的市场，日期是否在正确范围内 |
