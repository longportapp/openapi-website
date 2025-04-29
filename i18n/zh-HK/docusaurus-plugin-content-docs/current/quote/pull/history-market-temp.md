---
title: 歷史市場溫度
slug: history_market_temperature
sidebar_position: 22
---

該接口用於獲取歷史市場溫度。

<SDKLinks module="quote" klass="QuoteContext" method="history_market_temperature" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/quote/history_market_temperature</td></tr>
</tbody>
</table>

### Parameters

| Name       | Type   | Required | Description                              |
| ---------- | ------ | -------- | ---------------------------------------- |
| market     | string | YES      | 市場，目前支持 US、HK、SG、CN            |
| start_date | string | YES      | 開始日期，最小到 2016 年，比如：20240101 |
| end_date   | string | YES      | 結束日期，比如：20250101                 |

### Request Example

```python
from longport.openapi import QuoteContext, Config, Market

config = Config.from_env()
ctx = QuoteContext(config)
resp = ctx.history_market_temperature(Market.US, "20240101", "20250101")
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
    "temperatures": [
      {
        "timestamp": 1580486400,
        "value": 36,
        "type": "month"
      },
      {
        "timestamp": 1582992000,
        "value": 46,
        "type": "month"
      }
    ],
    "valuations": [
      {
        "timestamp": 1580486400,
        "value": 36,
        "type": "month"
      },
      {
        "timestamp": 1582992000,
        "value": 46,
        "type": "month"
      }
    ],
    "sentiments": [
      {
        "timestamp": 1580486400,
        "value": 36,
        "type": "month"
      },
      {
        "timestamp": 1582992000,
        "value": 46,
        "type": "month"
      }
    ]
  }
}
```

#### Response Status

| Status | Description | Schema                                                                   |
| ------ | ----------- | ------------------------------------------------------------------------ |
| 200    | 返回成功    | [HistoryMarketTemperatureResponse](#history_market_temperature_response) |
| 400    | 參數錯誤    | None                                                                     |

<aside className="success">
</aside>

## Schemas

### HistoryMarketTemperatureResponse

<a id="history_market_temperature_response"></a>

| Name         | Type     | Required | Description                                 |
| ------------ | -------- | -------- | ------------------------------------------- |
| temperatures | object[] | true     | 歷史溫度列表                                |
| ∟timestamp   | integer  | true     | 時間戳                                      |
| ∟value       | integer  | true     | 值                                          |
| ∟type        | string   | true     | 數據顆粒度 <br />day: 日;week: 周;month: 月 |
| valuations   | object[] | true     | 歷史估值列表                                |
| ∟timestamp   | integer  | true     | 時間戳                                      |
| ∟value       | integer  | true     | 值                                          |
| ∟type        | string   | true     | 數據顆粒度 <br />day: 日;week: 周;month: 月 |
| sentiments   | object[] | true     | 市場情緒列表                                |
| ∟timestamp   | integer  | true     | 時間戳                                      |
| ∟value       | integer  | true     | 值                                          |
| ∟type        | string   | true     | 數據顆粒度 <br />day: 日;week: 周;month: 月 |

## 錯誤碼

| 業務錯誤碼 | 描述           | 排查建議                 |
| ---------- | -------------- | ------------------------ |
| 2601500    | 服務端內部錯誤 | 請重試或聯繫技術人員處理 |
