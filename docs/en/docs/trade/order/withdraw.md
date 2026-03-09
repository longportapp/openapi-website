---
slug: withdraw
title: Withdraw Order
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

This API is used to withdraw an open order.

<SDKLinks module="trade" klass="TradeContext" method="cancel_order" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>DELETE</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/trade/order </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name     | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| order_id | string | YES      | Order ID    |

### Request Example

```python
from longbridge.openapi import TradeContext, Config, OAuthBuilder

oauth = OAuthBuilder("your-client-id").build(lambda url: print("Visit:", url))
config = Config.from_oauth(oauth)
ctx = TradeContext(config)

ctx.cancel_order("709043056541253632")
```

## Response

### Response Headers

- Content-Type: application/json

### Response Example

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

### Response Status

| Status | Description                                                      | Schema |
| ------ | ---------------------------------------------------------------- | ------ |
| 200    | The submission was successful and the order was commissioned.    | None   |
| 400    | The withdrawal was rejected with an incorrect request parameter. | None   |

<aside className="success">
</aside>
