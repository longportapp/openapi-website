---
slug: watchlist_update_group
title: 更新自选股分组
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

更新自选股分组

<SDKLinks module="quote" klass="QuoteContext" method="update_watchlist_group" />

##

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>PUT</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/watchlist/groups </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name       | Type     | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id         | integer  | YES      | 分组 ID，例如 `10086`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| name       | string   | NO       | 分组名称，例如 `信息产业组`<br /> 如果不传递此参数，则分组名称不会更新                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| securities | string[] | NO       | 股票列表，例如 `["BABA.US","AAPL.US"]`<br /> 配合下面的 `mode` 参数，可完成添加股票、移除股票、对关注列表进行排序等操作                                                                                                                                                                                                                                                                                                                                                                                                |
| mode       | string   | NO       | 操作方法<br /> **可选值：**<br /> `add` - 添加<br /> `remove` - 移除<br /> `replace` - 替换<br /><br /> 选 `add` 时，将上面列表中的股票依序添加到此分组中<br /><br /> 选 `remove` 时，将上面列表中的股票从此分组中移除<br /><br /> 选 `replace` 时，将上面列表中的股票全量覆盖此分组下的股票<br /> 假如原来分组中的股票为 `APPL.US, BABA.US, TSLA.US`，使用 `["BABA.US","AAPL.US","MSFT.US"]` 更新后变为 `["BABA.US","AAPL.US","MSFT.US"]`，对比之前，移除了 `TSLA.US`，添加了 `MSFT.US`，`BABA.US,AAPL.US` 调整了顺序 |

### Request Example

```python
from longport.openapi import QuoteContext, Config, SecuritiesUpdateMode

config = Config.from_env()
ctx = QuoteContext(config)
ctx.update_watchlist_group(10086, name = "WatchList2", securities = ["700.HK", "AAPL.US"], SecuritiesUpdateMode.Replace)
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
