---
title: 當前市場溫度
slug: market_temperature
sidebar_position: 21
---

獲取當前市場溫度

<SDKLinks module="quote" klass="QuoteContext" method="market_temperature" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/quote/get_market_temperature</td></tr>
</tbody>
</table>

### Parameters

| Name   | Type   | Required | Description                   |
| ------ | ------ | -------- | ----------------------------- |
| market | string | YES      | 市場，目前支援 US、HK、SG、CN |

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
    "description": "溫度適宜，保持平穩",
    "valuation": 23,
    "sentiment": 78,
    "updated_at": 1744616612
  }
}
```

#### Response Status

| Status | Description | Schema                                                    |
| ------ | ----------- | --------------------------------------------------------- |
| 200    | 返回成功    | [MarketTemperatureResponse](#market_temperature_response) |
| 400    | 參數錯誤    | None                                                      |

<aside className="success">
</aside>

## Schemas

### MarketTemperatureResponse

<a id="market_temperature_response"></a>

| Name        | Type    | Required | Description |
| ----------- | ------- | -------- | ----------- |
| temperature | integer | true     | 溫度值      |
| description | string  | true     | 溫度描述    |
| valuation   | integer | true     | 市場估值    |
| sentiment   | integer | true     | 市場情緒    |
| updated_at  | integer | true     | 更新時間    |

## 錯誤碼

| 業務錯誤碼 | 描述           | 排查建議                 |
| ---------- | -------------- | ------------------------ |
| 2601500    | 服務端內部錯誤 | 請重試或聯繫技術人員處理 |
