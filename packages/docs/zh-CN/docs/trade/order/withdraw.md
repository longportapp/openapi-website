---
slug: withdraw
title: 撤销订单
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

该接口用于订单撤销。

<SDKLinks module="trade" klass="TradeContext" method="cancel_order" />

##

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
| order_id | string | YES      | 订单 ID     |

### Request Example

```python
from longport.openapi import TradeContext, Config

config = Config.from_env()
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

| Status | Description                | Schema |
| ------ | -------------------------- | ------ |
| 200    | 提交成功，订单已委托。     | None   |
| 400    | 撤单被拒绝，请求参数错误。 | None   |

<aside className="success">
</aside>
