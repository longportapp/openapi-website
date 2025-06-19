---
slug: history_executions
title: Get History Executions
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

This API is used to get history executions, including the sell and buy records, and does not support querying today's execution details.

<SDKLinks module="trade" klass="TradeContext" method="history_executions" />

##

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/trade/execution/history </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name     | Type   | Required | Description                                                                                                                                                                                         |
| -------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol   | string | NO       | Stock symbol, use `ticker.region` format, example: `AAPL.US`                                                                                                                                        |
| start_at | string | NO       | Start time, formatted as a timestamp (second), example: `1650410999`.<br/><br/> If the start time is null, the default is the 90 days before of the end time or 90 days before of the current time. |
| end_at   | string | NO       | End time, formatted as a timestamp (second), example: `1650410999`. <br/><br/> If the end time is null, the default is the current time or 90 days after of the start time.                         |

### Request Example

```python
from datetime import datetime
from longport.openapi import TradeContext, Config

config = Config.from_env()
ctx = TradeContext(config)

resp = ctx.history_executions(
    symbol = "700.HK",
    start_at = datetime(2022, 5, 9),
    end_at = datetime(2022, 5, 12),
)
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
    "has_more": false,
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

| Status | Description                                              | Schema                                                  |
| ------ | -------------------------------------------------------- | ------------------------------------------------------- |
| 200    | Get History Executions Success                           | [history_executions_rsp](#schemahistory_executions_rsp) |
| 400    | The query failed with an error in the request parameter. | None                                                    |

<aside className="success">
</aside>

## Schemas

### history_executions_rsp

<a id="schemahistory_executions_rsp"></a>
<a id="schemahistory_executions_rsp"></a>

| Name            | Type     | Required | Description                                                                                                                                        |
| --------------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| has_more        | boolean  | true     | has more orders record.<br/><br/>The maximum number of orders per query is 1000, if the number of results exceeds 1000, then has_more will be true |
| trades          | object[] | false    | Execution Detail                                                                                                                                   |
| ∟ order_id      | string   | true     | Order ID                                                                                                                                           |
| ∟ trade_id      | string   | true     | Execution ID                                                                                                                                       |
| ∟ symbol        | string   | true     | Stock symbol, use `ticker.region` format,example: `AAPL.US`                                                                                        |
| ∟ trade_done_at | string   | true     | Trade done time, formatted as a timestamp (second)                                                                                                 |
| ∟ quantity      | string   | true     | Executed quantity                                                                                                                                  |
| ∟ price         | string   | true     | Executed price                                                                                                                                     |
