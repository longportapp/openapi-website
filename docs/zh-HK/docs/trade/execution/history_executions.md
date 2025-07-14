---
slug: history_executions
title: 獲取歷史成交明細
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

該接口用於獲取歷史訂單的成交明細，包括買入和賣出的成交記錄，不支持當日成交明細查詢。

<SDKLinks module="trade" klass="TradeContext" method="history_executions" />

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
| symbol   | string | NO       | 股票代碼，使用 `ticker.region` 格式，例如：`AAPL.US`                                                          |
| start_at | string | NO       | 開始時間，格式為時間戳 (秒)，例如：`1650410999`。<br/><br/>開始時間為空時，默認為結束時間或當前時間前九十天。 |
| end_at   | string | NO       | 結束時間，格式為時間戳 (秒)，例如：`1650410999`。<br/><br/>結束時間為空時，默認為開始時間後九十天或當前時間。 |

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
| 200    | 查詢成功                 | [history_executions_rsp](#schemahistory_executions_rsp) |
| 400    | 查詢失敗，請求參數錯誤。 | None                                                    |

<aside className="success">
</aside>

## Schemas

### history_executions_rsp

<a id="schemahistory_executions_rsp"></a>
<a id="schemahistory_executions_rsp"></a>

| Name            | Type     | Required | Description                                                                                                   |
| --------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| has_more        | boolean  | true     | 是否還有更多數據。<br/><br/>每次查詢最大訂單數量為 1000，如果查詢結果數量超過 1000，那麽 has_more 就會為 true |
| trades          | object[] | false    | 成交明細信息                                                                                                  |
| ∟ order_id      | string   | true     | 訂單 ID                                                                                                       |
| ∟ trade_id      | string   | true     | 成交 ID                                                                                                       |
| ∟ symbol        | string   | true     | 股票代碼，使用 `ticker.region` 格式，例如：`AAPL.US`                                                          |
| ∟ trade_done_at | string   | true     | 成交時間，格式為時間戳 (秒)                                                                                   |
| ∟ quantity      | string   | true     | 成交數量                                                                                                      |
| ∟ price         | string   | true     | 成交價格                                                                                                      |
