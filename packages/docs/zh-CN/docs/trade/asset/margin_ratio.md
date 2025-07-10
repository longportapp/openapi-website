---
slug: margin_ratio
title: 获取保证金比例
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

该接口用于获取股票初始保证金比例、维持保证金比例、强平保证金比例。

<SDKLinks module="trade" klass="TradeContext" method="margin_ratio" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/risk/margin-ratio </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name   | Type   | Required | Description                                          |
| ------ | ------ | -------- | ---------------------------------------------------- |
| symbol | string | YES      | 股票代码，使用 `ticker.region` 格式，例如：`AAPL.US` |

### Request Example

```python
from datetime import datetime
from longport.openapi import TradeContext, Config

config = Config.from_env()
ctx = TradeContext(config)
resp = ctx.margin_ratio("700.HK")
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
    "im_factor": "0.1",
    "mm_factor": "0.1",
    "fm_factor": "0.1"
  }
}
```

### Response Status

| Status | Description | Schema                                      |
| ------ | ----------- | ------------------------------------------- |
| 200    | 返回成功    | [margin_ratio_rsp](#schemamargin_ratio_rsp) |
| 400    | 内部错误    | None                                        |

<aside className="success">
</aside>

## Schemas

### margin_ratio_rsp

<a id="schemamargin_ratio_rsp"></a>
<a id="schemamargin_ratio_rsp"></a>

| Name      | Type   | Required | Description    |
| --------- | ------ | -------- | -------------- |
| im_factor | string | true     | 初始保证金比例 |
| mm_factor | string | true     | 维持保证金比例 |
| fm_factor | string | true     | 强平保证金比例 |
