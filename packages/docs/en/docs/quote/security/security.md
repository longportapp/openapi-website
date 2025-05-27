---
slug: security_list
title: Retrieve the List of Securities
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

Retrieve the List of Securities

<SDKLinks module="quote" klass="QuoteContext" method="security_list" />

##

### Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/quote/get_security_list</td></tr>
</tbody>
</table>

#### Parameters

> Content-Type: application/json; charset=utf-8

| Name     | Type   | Required | Description                                 |
| -------- | ------ | -------- | ------------------------------------------- |
| market   | string | YES      | Market, currently only supports US          |
| category | string | YES      | Market subcategory, only supports Overnight |

#### Request Example

```python
from longport.openapi import QuoteContext, Config, Market, SecurityListCategory

config = Config.from_env()
ctx = QuoteContext(config)
resp = ctx.security_list(Market.US, SecurityListCategory.Overnight)
print(resp)
```

### Response

#### Response Headers

- Content-Type: application/json

#### Response Example

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "symbol": "BAC.US",
        "name_cn": "美国银行",
        "name_hk": "美國銀行",
        "name_en": "Bank of America"
      },
      {
        "symbol": "RDDT.US",
        "name_cn": "REDDIT INC",
        "name_hk": "REDDIT INC",
        "name_en": "REDDIT INC"
      },
      {
        "symbol": "GOOGL.US",
        "name_cn": "谷歌-A",
        "name_hk": "谷歌-A",
        "name_en": "Alphabet"
      }
    ]
  }
}
```

#### Response Status

| Status | Description       | Schema                                      |
| ------ | ----------------- | ------------------------------------------- |
| 200    | Successful return | [security_response](#get_security_list_rsp) |
| 400    | Parameter error   | None                                        |

<aside className="success">
</aside>

## Schemas

### security_response

<a id="get_security_list_rsp"></a>

| Name      | Type     | Required | Description              |
| --------- | -------- | -------- | ------------------------ |
| list      | object[] | false    | List                     |
| ∟ symbol  | integer  | true     | Security code            |
| ∟ name_cn | string   | true     | Chinese name             |
| ∟ name_hk | string   | true     | Traditional Chinese name |
| ∟ name_en | string   | true     | English name             |

## Error Code

| Business Error Code | Description           | Troubleshooting Suggestion                |
| ------------------- | --------------------- | ----------------------------------------- |
| 310010              | Invalid request       | Check the request parameters              |
| 310011              | Internal server error | Please retry or contact technical support |
