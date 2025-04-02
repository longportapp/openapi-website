---
slug: watchlist_create_group
title: 創建自選股分組
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

創建自選股分組

<SDKLinks module="quote" klass="QuoteContext" method="create_watchlist_group" />

##

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>POST</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/watchlist/groups </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name       | Type     | Required | Description                                                                                                                    |
| ---------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| name       | string   | YES      | 分組名稱，例如 `信息產業組`                                                                                                    |
| securities | string[] | NO       | 股票列表，例如 `["BABA.US","AAPL.US"]`<br /> 分組下股票的展示順序，與此列表的順序壹致<br /> 如果不傳此參數，則創建壹個空的分組 |

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

| Status | Description | Schema                                                |
| ------ | ----------- | ----------------------------------------------------- |
| 200    | 返回成功    | [create_group_response](#schemacreate_group_response) |
| 500    | 內部錯誤    | None                                                  |

<aside className="success">
</aside>

## Schemas

### create_group_response

<a id="schemacreate_group_response"></a>
<a id="schemacreate_group_response"></a>

| Name | Type    | Required | Description |
| ---- | ------- | -------- | ----------- |
| id   | integer | false    | 分組 ID     |
