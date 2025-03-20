---
slug: watchlist_groups
title: Get watched groups 
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ""
headingLevel: 2

---

Get watched groups

<SDKLinks module="quote" klass="QuoteContext" method="watchlist" />

## 

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/watchlist/groups 
</td></tr>
</tbody>
</table>

### Request Example

```python
from longport.openapi import QuoteContext, Config

config = Config.from_env()
ctx = QuoteContext(config)
resp = ctx.watchlist()
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
    "groups": [
      {
        "id": 28020,
        "name": "all",
        "securities": [
          {
            "symbol": "700.HK",
            "market": "HK",
            "name": "Tencent",
            "watched_price": "364.4",
            "watched_at": 1652855022
          }
        ]
      }
    ]
  }
}
```

### Response Status

| Status | Description | Schema |
|---|---|---|
| 200 | Success | [groups_response](#schemagroups_response) |
| 500 | Internal error | None |

<aside className="success">
</aside>

## Schemas

### groups_response

<a id="schemagroups_response"></a>
<a id="schemagroups_response"></a>

|Name|Type|Required|Description|
|---|---|---|---|
|groups|object[]|false|Groups|
|∟ id|integer|true|Group ID|
|∟ name|string|true|Name|
|∟ securities|object[]|true|Security|
|∟∟ symbol|string|true|Symbol|
|∟∟ market|string|true|Market|
|∟∟ name|string|true|Name|
|∟∟ watched_price|string|true|Watched price|
|∟∟ watched_at|integer|true|Watched time|

