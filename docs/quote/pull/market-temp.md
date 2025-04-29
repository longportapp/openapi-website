---
title: 获取当前市场温度
slug: market_temperature 
sidebar_position: 21
---

获取当前市场温度

<SDKLinks module="quote" klass="QuoteContext" method="market_temperature" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/quote/market_temperature</td></tr>
</tbody>
</table>

### Parameters

| Name     | Type   | Required | Description                      |
| -------- | ------ | -------- | -------------------------------- |
| market   | string | YES      | 市场，目前支持 US、HK、SG、CN        |

### Request Example

```python
from longport.openapi import QuoteContext, Config, Market

config = Config.from_env()
ctx = QuoteContext(config)
resp = ctx.market_temperature(Market.US)
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
    "temperature": 50,
    "description": "温度适宜，保持平稳",
    "valuation": 23,
    "sentiment": 78,
    "updated_at": 1744616612
  }
}
```

#### Response Status

| Status | Description | Schema                                      |
| ------ | ----------- | ------------------------------------------- |
| 200    | 返回成功    | [market_temperature_response](#get_market_temperature_rsp) |
| 400    | 参数错误    | None                                        |

<aside className="success">
</aside>

## Schemas

### market_temperature_response

<a id="get_market_temperature_rsp"></a>

| Name         | Type     | Required| Description                                                |
| ------------ | -------- | -------- | ---------------------------------------------------------- |
| temperature         | integer   | true         | 温度值                                                      |
| description   | string   | true     | 温度描述                                                    |
| valuation    | integer   | true        | 市场估值                                                    |
| sentiment    | integer   | true        | 市场情绪                                                    |
| updated_at   | integer    | true    | 更新时间                                                    |


## 错误码

| 业务错误码 | 描述           | 排查建议                 |
| ---------- | -------------- | ------------------------ |
| 2601500     | 服务端内部错误 | 请重试或联系技术人员处理 |
