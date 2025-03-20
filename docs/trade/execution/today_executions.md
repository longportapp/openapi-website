---
slug: today_executions
title: 获取当日成交明细 
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ""
headingLevel: 2

---

该接口用于获取当日订单的成交明细。

<SDKLinks module="trade" klass="TradeContext" method="today_executions" />

## 

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/trade/execution/today 
</td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name | Type | Required | Description |
|---|---|---|---|
| symbol | string | NO | 股票代码，使用 `ticker.region` 格式，例如：`AAPL.US` |
| order_id | string | NO | 订单 ID，用于指定订单 ID 查询，例如：`701276261045858304` |

### Request Example

```python
from longport.openapi import TradeContext, Config

config = Config.from_env()
ctx = TradeContext(config)

resp = ctx.today_executions(symbol = "700.HK")
print(resp)
```

## Response

### Response Headers

- Content-Type: application/json

### Response Example

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "trades": [
      {
        "order_id": "693664675163312128",
        "price": "388",
        "quantity": "100",
        "symbol": "700.HK",
        "trade_done_at": "1648611351",
        "trade_id": "693664675163312128-1648611351433741210"
      }
    ]
  }
}
```

### Response Status

| Status | Description | Schema |
|---|---|---|
| 200 | 查询成功 | None |
| 400 | 查询失败，请求参数错误。 | None |

### Response Schema

<aside className="success">
</aside>

## Schemas

### today_executions_rsp

<a id="schematoday_executions_rsp"></a>
<a id="schematoday_executions_rsp"></a>

|Name|Type|Required|Description|
|---|---|---|---|
|trades|object[]|false|成交明细信息|
|∟ order_id|string|true|订单 ID|
|∟ trade_id|string|true|成交 ID|
|∟ symbol|string|true|股票代码，使用 `ticker.region` 格式，例如：`AAPL.US`|
|∟ trade_done_at|string|true|成交时间，格式为时间戳 (秒)|
|∟ quantity|string|true|成交数量|
|∟ price|string|true|成交价格|

