---
slug: history_executions
title: 获取历史成交明细
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

该接口用于获取历史订单的成交明细，包括买入和卖出的成交记录。

<SDKLinks module="trade" klass="TradeContext" method="history_executions" />

##

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/trade/execution/history </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name     | Type   | Required | Description                                                                                                   |
| -------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------- |
| symbol   | string | NO       | 股票代码，使用 `ticker.region` 格式，例如：`AAPL.US`                                                          |
| start_at | string | NO       | 开始时间，格式为时间戳 (秒)，例如：`1650410999`。<br/><br/>开始时间为空时，默认为结束时间或当前时间前九十天。 |
| end_at   | string | NO       | 结束时间，格式为时间戳 (秒)，例如：`1650410999`。<br/><br/>结束时间为空时，默认为开始时间后九十天或当前时间。 |

### Request Example

```python
from datetime import datetime
from longport.openapi import TradeContext, Config

config = Config.from_env()
ctx = TradeContext(config)

resp = ctx.history_executions(
    symbol = "700.HK",
    start_at = datetime(2022, 5, 9),
    end_at = datetime(2022, 5, 12),
)
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
    "has_more": false,
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

| Status | Description              | Schema                                                  |
| ------ | ------------------------ | ------------------------------------------------------- |
| 200    | 查询成功                 | [history_executions_rsp](#schemahistory_executions_rsp) |
| 400    | 查询失败，请求参数错误。 | None                                                    |

<aside className="success">
</aside>

## Schemas

### history_executions_rsp

<a id="schemahistory_executions_rsp"></a>
<a id="schemahistory_executions_rsp"></a>

| Name            | Type     | Required | Description                                                                                                   |
| --------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| has_more        | boolean  | true     | 是否还有更多数据。<br/><br/>每次查询最大订单数量为 1000，如果查询结果数量超过 1000，那么 has_more 就会为 true |
| trades          | object[] | false    | 成交明细信息                                                                                                  |
| ∟ order_id      | string   | true     | 订单 ID                                                                                                       |
| ∟ trade_id      | string   | true     | 成交 ID                                                                                                       |
| ∟ symbol        | string   | true     | 股票代码，使用 `ticker.region` 格式，例如：`AAPL.US`                                                          |
| ∟ trade_done_at | string   | true     | 成交时间，格式为时间戳 (秒)                                                                                   |
| ∟ quantity      | string   | true     | 成交数量                                                                                                      |
| ∟ price         | string   | true     | 成交价格                                                                                                      |
