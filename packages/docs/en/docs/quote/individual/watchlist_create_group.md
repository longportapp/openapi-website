---
slug: watchlist_create_group
title: Create Watchlist Group
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

Create watched group

<SDKLinks module="quote" klass="QuoteContext" method="create_watchlist_group" />

##

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>POST</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/watchlist/groups</td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name       | Type     | Required | Description                                                                                                                                                                            |
| ---------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name       | string   | YES      | Group name, for example `Information Technology Group`.                                                                                                                                |
| securities | string[] | NO       | Security list, for example `["BABA.US", "AAPL.US"]`. Display order of securities in the group, in the same order as this list. If this parameter is not passed, create an empty group. |

### Request Example

```python
from longport.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)
group_id = ctx.create_watchlist_group(name = "Watchlist1", securities = ["700.HK", "AAPL.US"])
print(group_id)
```

## Response

### Response Headers

- Content-Type: application/json

### Response Example

```json
{
  "code": 0,
  "data": {
    "id": 10086
  }
}
```

### Response Status

| Status | Description    | Schema                                                |
| ------ | -------------- | ----------------------------------------------------- |
| 200    | Success        | [create_group_response](#schemacreate_group_response) |
| 500    | Internal error | None                                                  |

<aside className="success">
</aside>

## Schemas

### create_group_response

<a id="schemacreate_group_response"></a>
<a id="schemacreate_group_response"></a>

| Name | Type    | Required | Description |
| ---- | ------- | -------- | ----------- |
| id   | integer | false    | Group ID    |
