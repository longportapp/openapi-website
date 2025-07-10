---
slug: watchlist_groups
title: 獲取關注分組
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

獲取關注分組

<SDKLinks module="quote" klass="QuoteContext" method="watchlist" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/watchlist/groups </td></tr>
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
            "name": "騰訊控股",
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

| Status | Description | Schema                                    |
| ------ | ----------- | ----------------------------------------- |
| 200    | 返回成功    | [groups_response](#schemagroups_response) |
| 500    | 內部錯誤    | None                                      |

<aside className="success">
</aside>

## Schemas

### groups_response

<a id="schemagroups_response"></a>
<a id="schemagroups_response"></a>

| Name             | Type     | Required | Description  |
| ---------------- | -------- | -------- | ------------ |
| groups           | object[] | false    | 分組         |
| ∟ id             | integer  | true     | 分組 ID      |
| ∟ name           | string   | true     | 名稱         |
| ∟ securities     | object[] | true     | 股票         |
| ∟∟ symbol        | string   | true     | 代碼         |
| ∟∟ market        | string   | true     | 市場         |
| ∟∟ name          | string   | true     | 名稱         |
| ∟∟ watched_price | string   | true     | 關注時的價格 |
| ∟∟ watched_at    | integer  | true     | 關注時間     |
