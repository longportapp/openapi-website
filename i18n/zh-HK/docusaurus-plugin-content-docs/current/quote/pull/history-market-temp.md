---
title: 獲取歷史市場溫度
slug: hist_market_temp 
sidebar_position: 22
---

該接口用於獲取歷史市場溫度。

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
| market   | string | YES      | 市場，目前支持 US、HK、SG、CN        |
| start_date |string|YES|開始日期，最小到 2016年，比如：20240101|
| end_date |string|YES|結束日期，比如：20250101|

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
| 400    | 參數錯誤    | None                                        |

<aside className="success">
</aside>

## Schemas

### hist_market_temp_response

<a id="hist_market_temp_rsp"></a>

| Name         | Type     | Required| Description                                                |
| ------------ | -------- | --------| ---------------------------------------------------------- |
| temp_list    | object[]   | true  | 歷史溫度列表                                                 |
| ∟timestamp  | integer    | true   | 時間戳                                                      |
| ∟value      | integer    | true   | 值                                                         |
| ∟type       | string   | true | 數據顆粒度 <br />day: 日;week: 周;month: 月                   |
| pe_list      | object[]   | true  | 歷史估值列表                                                 |
| ∟timestamp  | integer    | true   | 時間戳                                                      |
| ∟value      | integer    | true   | 值                                                         |
| ∟type       | string   | true | 數據顆粒度 <br />day: 日;week: 周;month: 月                   |
| up_list      | object[]  | true   | 市場情緒列表                                                 |
| ∟timestamp  | integer   | true    | 時間戳                                                      |
| ∟value      | integer    | true    | 值                                                         |
| ∟type       | string   | true | 數據顆粒度 <br />day: 日;week: 周;month: 月                   |



## 錯誤碼

| 業務錯誤碼 | 描述           | 排查建議                 |
| ---------- | -------------- | ------------------------ |
| 2601500     | 服務端內部錯誤 | 請重試或聯繫技術人員處理 |
