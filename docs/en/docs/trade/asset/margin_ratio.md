---
slug: margin_ratio
title: Get margin ratio
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

This API is used to obtain the initial margin ratio, maintain the margin ratio and strengthen the
margin ratio of stocks.

<SDKLinks module="trade" klass="TradeContext" method="margin_ratio" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/risk/margin-ratio </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name   | Type   | Required | Description                                                            |
| ------ | ------ | -------- | ---------------------------------------------------------------------- |
| symbol | string | YES      | Stock symbol, using the format `ticker.region`, for example: `AAPL.US` |

### Request Example

```python
from datetime import datetime
from longport.openapi import TradeContext, Config

config = Config.from_env()
ctx = TradeContext(config)
resp = ctx.margin_ratio("700.HK")
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
    "im_factor": "0.1",
    "mm_factor": "0.1",
    "fm_factor": "0.1"
  }
}
```

### Response Status

| Status | Description    | Schema                                      |
| ------ | -------------- | ------------------------------------------- |
| 200    | Success        | [margin_ratio_rsp](#schemamargin_ratio_rsp) |
| 400    | Internal Error | None                                        |

<aside className="success">
</aside>

## Schemas

### margin_ratio_rsp

<a id="schemamargin_ratio_rsp"></a>
<a id="schemamargin_ratio_rsp"></a>

| Name      | Type   | Required | Description                       |
| --------- | ------ | -------- | --------------------------------- |
| im_factor | string | true     | Initial margin ratio              |
| mm_factor | string | true     | Maintain the initial margin ratio |
| fm_factor | string | true     | Forced close-out margin ratio     |
