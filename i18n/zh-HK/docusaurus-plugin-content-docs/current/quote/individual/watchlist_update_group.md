---
slug: watchlist_update_group
title: 更新自選股分組 
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ""
headingLevel: 2

---

更新自選股分組

<SDKLinks module="quote" klass="QuoteContext" method="update_watchlist_group" />

## 

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>PUT</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/watchlist/groups 
</td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name | Type | Required | Description |
|---|---|---|---|
| id | integer | YES | 分組 ID，例如 `10086` |
| name | string | NO | 分組名稱，例如 `信息產業組`<br /> 如果不傳遞此參數，則分組名稱不會更新 |
| securities | string[] | NO | 股票列表，例如 `["BABA.US","AAPL.US"]`<br /> 配合下面的 `mode` 參數，可完成添加股票、移除股票、對關註列表進行排序等操作 |
| mode | string | NO | 操作方法 **可選值:**<br /> `add` - 添加<br /> `remove` - 移除<br /> `replace` - 更新<br /><br /> 選 `add` 時，將上面列表中的股票依序添加到此分組中<br /><br /> 選 `remove` 時，將上面列表中的股票從此分組中移除<br /><br /> 選 `replace` 時，將上面列表中的股票全量覆蓋此分組下的股票<br /> 假如原來分組中的股票為 `APPL.US, BABA.US, TSLA.US`，使用 `["BABA.US","AAPL.US","MSFT.US"]` 更新後變為 `["BABA.US","AAPL.US","MSFT.US"]`， 對比之前，移除了 `TSLA.US`，添加了 `MSFT.US`，`BABA.US,AAPL.US` 調整了順序 |

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
|---|---|---|
| 200 | 返回成功 | None |
| 500 | 內部錯誤 | None |

<aside className="success">
</aside>

