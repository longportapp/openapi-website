---
id: quote_market_temp
title: 获取历史市场温度
slug: hist_market_temp 
sidebar_position: 22
---

该接口用于获取历史市场温度。

<SDKLinks module="quote" klass="QuoteContext" method="hist_market_temp" />

:::info
[业务指令](../../socket/biz-command)：`--`
:::

## Request

### Parameters

| Name   | Type   | Required | Description                                          |
| ------ | ------ | -------- | ---------------------------------------------------- |
| market | string | 是       | 市场代码，<br /><br />**可选值：**<br/>`US` - 美股市场<br/>`HK` - 港股市场<br/>`CN` - A 股市场<br/>`SG` - 新加坡市场  |
| start_date |string|是|开始日期|
| end_date |string|是|结束日期|

### Protobuf

```protobuf
message MarketTempReq {
  string market = 1;
  string start_date = 2;
  string end_date = 3;
}
```

### Request Example

```python
# Get Market Temperature History
# https://open.longportapp.com/docs/quote/pull/hist_market_temp
# 运行前请访问“开发者中心”确保账户有正确的行情权限。
# 如没有开通行情权限，可以通过“LongPort”手机客户端，并进入“我的 - 我的行情 - 行情商城”购买开通行情权限。
from longport.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)

resp = ctx.hist_market_temp("HK", "20240101", "20250101")
print(resp)
```

## Response

### Response Properties

| Name         | Type     | Description                                                |
| ------------ | -------- | ---------------------------------------------------------- |
| temp_list    | array    | 历史温度列表                                                 |
| pe_list      | array    | 历史估值列表                                                 |
| up_list      | array    | 市场情绪列表                                                 |
| ∟ timestamp  | int      | 时间戳                                                      |
| ∟ value      | int      | 值                                                         |
| ∟ type       | string   | 数据颗粒度 <br />day: 日;week: 周;month: 月                   |

### Protobuf

```protobuf
message MarketTempRsp {
  message Value {
    int64 timestamp = 1;
    int64 value = 2;
    string type = 3;
  }
  repeated Value temp_list = 1;
  repeated Value pe_list = 2;
  repeated Value up_list = 3;
}
```

### Response JSON Example

```json
{
  "temp_list": [
    {
        "timestamp": 1580486400,
        "value": 36,
        "type": "month"
    }, {
        "timestamp": 1582992000,
        "value": 46,
        "type": "month"
    }
  ],
  "pe_list": [
    {
        "timestamp": 1580486400,
        "value": 36,
        "type": "month"
    }, {
        "timestamp": 1582992000,
        "value": 46,
        "type": "month"
    }
  ],
  "up_list": [
    {
        "timestamp": 1580486400,
        "value": 36,
        "type": "month"
    }, {
        "timestamp": 1582992000,
        "value": 46,
        "type": "month"
    }
  ],     
}
```

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                     |
| ---------- | ---------- | -------------- | ---------------------------- |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败       |
| 3          | 301606     | 限流           | 降低请求频次                 |
| 7          | 2601500     | 服务端内部错误 | 请重试或联系技术人员处理     |
