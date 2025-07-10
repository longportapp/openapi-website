---
slug: watchlist_delete_group
title: 删除自选股分组
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

删除自选股分组

<SDKLinks module="quote" klass="QuoteContext" method="delete_watchlist_group" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>DELETE</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/watchlist/groups </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name  | Type    | Required | Description                                                                                                               |
| ----- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| id    | integer | YES      | 分组 ID，例如 `10086`                                                                                                     |
| purge | boolean | YES      | 是否清除分组下的股票<br /> 为 `true`，则此分组下的股票将被取消关注<br /> 为 `false`，则此分组下的股票会保留在`全部`分组中 |

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
| ------ | ----------- | ------ |
| 200    | 返回成功    | None   |
| 500    | 内部错误    | None   |

<aside className="success">
</aside>
