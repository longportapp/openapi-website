---
slug: watchlist_delete_group
title: 刪除自選股分組 
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ""
headingLevel: 2

---

刪除自選股分組

<SDKLinks module="quote" klass="QuoteContext" method="delete_watchlist_group" />

## 

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>DELETE</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/watchlist/groups 
</td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name | Type | Required | Description |
|---|---|---|---|
| id | integer | YES | 分組 ID，例如 `10086` |
| purge | boolean | YES | 是否清除分組下的股票<br /> 為 `true`，則此分組下的股票將被取消關註<br /> 為 `false`，則此分組下的股票會保留在`全部`分組中 |

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

| Status | Description | Schema |
|---|---|---|
| 200 | 返回成功 | None |
| 500 | 內部錯誤 | None |

<aside className="success">
</aside>

