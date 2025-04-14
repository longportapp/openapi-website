---
title: 获取历史市场温度
slug: hist_market_temp 
sidebar_position: 22
---

该接口用于获取历史市场温度。

<SDKLinks module="quote" klass="QuoteContext" method="hist_market_temp" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/quote/hist_market_temp</td></tr>
</tbody>
</table>

### Parameters

| Name     | Type   | Required | Description                      |
| -------- | ------ | -------- | -------------------------------- |
| market   | string | YES      | 市场，目前支持 US、HK、SG、CN        |
| start_date |string|YES|开始日期，最小到 2016年，比如：20240101|
| end_date |string|YES|结束日期，比如：20250101|

### Request Example

```python
from longport.openapi import QuoteContext, Config, Market

config = Config.from_env()
ctx = QuoteContext(config)
resp = ctx.hist_market_temp(Market.US, "20240101", "20250101")
print(resp)
```

## Response

### Response Headers

- Content-Type: application/json

### Response Example

```json
{
  "code": 0,
  "data": {
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
}
```

#### Response Status

| Status | Description | Schema                                      |
| ------ | ----------- | ------------------------------------------- |
| 200    | 返回成功    | [hist_market_temp_response](#hist_market_temp_rsp) |
| 400    | 参数错误    | None                                        |

<aside className="success">
</aside>

## Schemas

### hist_market_temp_response

<a id="hist_market_temp_rsp"></a>

| Name         | Type     | Required| Description                                                |
| ------------ | -------- | --------| ---------------------------------------------------------- |
| temp_list    | object[]   | true  | 历史温度列表                                                 |
| ∟timestamp  | integer    | true   | 时间戳                                                      |
| ∟value      | integer    | true   | 值                                                         |
| ∟type       | string   | true | 数据颗粒度 <br />day: 日;week: 周;month: 月                   |
| pe_list      | object[]   | true  | 历史估值列表                                                 |
| ∟timestamp  | integer    | true   | 时间戳                                                      |
| ∟value      | integer    | true   | 值                                                         |
| ∟type       | string   | true | 数据颗粒度 <br />day: 日;week: 周;month: 月                   |
| up_list      | object[]  | true   | 市场情绪列表                                                 |
| ∟timestamp  | integer   | true    | 时间戳                                                      |
| ∟value      | integer   | true    | 值                                                         |
| ∟type       | string   | true | 数据颗粒度 <br />day: 日;week: 周;month: 月                   |



## 错误码

| 业务错误码 | 描述           | 排查建议                 |
| ---------- | -------------- | ------------------------ |
| 2601500     | 服务端内部错误 | 请重试或联系技术人员处理 |
