---
slug: today_executions
title: Get Today Executions
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

This API is used to get today executions.

<SDKLinks module="trade" klass="TradeContext" method="today_executions" />

##

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/trade/execution/today </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name     | Type   | Required | Description                                                  |
| -------- | ------ | -------- | ------------------------------------------------------------ |
| symbol   | string | NO       | Stock symbol, use `ticker.region` format, example: `AAPL.US` |
| order_id | string | NO       | Order ID, example: `701276261045858304`                      |

### Request Example

```python
from longport.openapi import TradeContext, Config

config = Config.from_env()
ctx = TradeContext(config)

resp = ctx.today_executions(symbol = "700.HK")
print(resp)
```

## Response

### Response Headers

- Content-Type: application/json

### Response Example

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "trades": [
      {
        "order_id": "693664675163312128",
        "price": "388",
        "quantity": "100",
        "symbol": "700.HK",
        "trade_done_at": "1648611351",
        "trade_id": "693664675163312128-1648611351433741210"
      }
    ]
  }
}
```

### Response Status

| Status | Description                                              | Schema |
| ------ | -------------------------------------------------------- | ------ |
| 200    | Get Today Executions Success                             | None   |
| 400    | The query failed with an error in the request parameter. | None   |

### Response Schema

<aside className="success">
</aside>

## Schemas

### today_executions_rsp

<a id="schematoday_executions_rsp"></a>
<a id="schematoday_executions_rsp"></a>

| Name            | Type     | Required | Description                                                  |
| --------------- | -------- | -------- | ------------------------------------------------------------ |
| trades          | object[] | false    | Execution Detail                                             |
| ∟ order_id      | string   | true     | Order ID                                                     |
| ∟ trade_id      | string   | true     | Execution ID                                                 |
| ∟ symbol        | string   | true     | Stock symbol, use `ticker.region` format, example: `AAPL.US` |
| ∟ trade_done_at | string   | true     | Trade done time, formatted as a timestamp (second)           |
| ∟ quantity      | string   | true     | Executed quantity                                            |
| ∟ price         | string   | true     | Executed price                                               |
