---
slug: watchlist_delete_group
title: Delete Watchlist Group
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

Delete watched group

<SDKLinks module="quote" klass="QuoteContext" method="delete_watchlist_group" />

##

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>DELETE</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/watchlist/groups </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name  | Type    | Required | Description                                                                                                                                                                                    |
| ----- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id    | integer | YES      | Group ID, for example `10086`.                                                                                                                                                                 |
| purge | boolean | YES      | Whether to clear the securities in the group. If set to `true`, the securities in the group will be unfollowed. If set to `false`, the securities in the group will remain in the `All` group. |

### Request Example

```python
from longport.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)
ctx.delete_watchlist_group(10086)
```

## Response

### Response Headers

- Content-Type: application/json

### Response Example

```json
{
  "code": 0
}
```

### Response Status

| Status | Description    | Schema |
| ------ | -------------- | ------ |
| 200    | Success        | None   |
| 500    | Internal error | None   |

<aside className="success">
</aside>
