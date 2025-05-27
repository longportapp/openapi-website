---
title: 历史市场温度
slug: history_market_temperature
sidebar_position: 22
---

该接口用于获取历史市场温度。

<SDKLinks module="quote" klass="QuoteContext" method="history_market_temperature" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/quote/history_market_temperature</td></tr>
</tbody>
</table>

### Parameters

| Name       | Type   | Required | Description                           |
|------------|--------|----------|---------------------------------------|
| market     | string | YES      | 市场，目前支持 US、HK、SG、CN             |
| start_date | string | YES      | 开始日期，最小到 2016 年，比如：20240101 |
| end_date   | string | YES      | 结束日期，比如：20250101                |

### Request Example

```python
import datetime
from longport.openapi import QuoteContext, Config, Market

config = Config.from_env()
ctx = QuoteContext(config)
resp = ctx.history_market_temperature(Market.US, datetime.date(2024, 1, 1), datetime.date(2025, 1, 1))
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
    "type": "month",
    "list": [
      {
        "timestamp": 1580486400,
        "temperature": 36,
        "valuation": 12,
        "sentiment": 46
      },
      {
        "timestamp": 1582992000,
        "temperature": 46,
        "valuation": 12,
        "sentiment": 46
      }
    ]
  }
}
```

#### Response Status

| Status | Description | Schema                                                                   |
|--------|-------------|--------------------------------------------------------------------------|
| 200    | 返回成功    | [HistoryMarketTemperatureResponse](#history_market_temperature_response) |
| 400    | 参数错误    | None                                                                     |

<aside className="success">
</aside>

## Schemas

### HistoryMarketTemperatureResponse

<a id="history_market_temperature_response"></a>

| Name         | Type     | Required | Description                                 |
|--------------|----------|----------|---------------------------------------------|
| list         | object[] | true     | 历史温度列表                                |
| ∟timestamp   | integer  | true     | 时间戳                                      |
| ∟temperature | integer  | true     | 温度值                                      |
| ∟valuation   | integer  | true     | 估值值                                      |
| ∟sentiment   | integer  | true     | 情绪值                                      |
| type         | string   | true     | 数据颗粒度 <br />day: 日;week: 周;month: 月 |
## 错误码

| 业务错误码 | 描述           | 排查建议                 |
|------------|--------------|----------------------|
| 2601500    | 服务端内部错误 | 请重试或联系技术人员处理 |
