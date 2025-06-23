---
slug: history_orders
title: 獲取歷史訂單
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

該接口用於獲取歷史訂單。

<SDKLinks module="trade" klass="TradeContext" method="history_orders" />

##

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/trade/order/history </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name     | Type     | Required | Description                                                                                                   |
| -------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| symbol   | string   | NO       | 股票代碼，使用 `ticker.region` 格式，例如：`AAPL.US`                                                          |
| status   | string[] | NO       | [訂單狀態](../trade-definition#orderstatus)<br/><br/>例如：`status=FilledStatus&status=NewStatus`             |
| side     | string   | NO       | 買賣方向<br/><br/> **可選值：**<br/> `Buy` - 買入<br/> `Sell` - 賣出                                          |
| market   | string   | NO       | 市場<br/><br/> **可選值：**<br/> `US` - 美股<br/> `HK` - 港股                                                 |
| start_at | string   | NO       | 開始時間，格式為時間戳 (秒)，例如：`1650410999`。<br/><br/>開始時間為空時，默認為結束時間或當前時間前九十天。 |
| end_at   | string   | NO       | 結束時間，格式為時間戳 (秒)，例如：`1650410999`。<br/><br/>結束時間為空時，默認為開始時間後九十天或當前時間。 |

### Request Example

```python
from datetime import datetime
from longport.openapi import TradeContext, Config, OrderStatus, OrderSide, Market

config = Config.from_env()
ctx = TradeContext(config)

resp = ctx.history_orders(
    symbol = "700.HK",
    status = [OrderStatus.Filled, OrderStatus.New],
    side = OrderSide.Buy,
    market = Market.HK,
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
    "orders": [
      {
        "currency": "HKD",
        "executed_price": "0.000",
        "executed_quantity": "0",
        "expire_date": "",
        "last_done": "",
        "limit_offset": "",
        "msg": "",
        "order_id": "706388312699592704",
        "order_type": "ELO",
        "outside_rth": "UnknownOutsideRth",
        "price": "11.900",
        "quantity": "200",
        "side": "Buy",
        "status": "RejectedStatus",
        "stock_name": "東亞銀行",
        "submitted_at": "1651644897",
        "symbol": "23.HK",
        "tag": "Normal",
        "time_in_force": "Day",
        "trailing_amount": "",
        "trailing_percent": "",
        "trigger_at": "0",
        "trigger_price": "",
        "trigger_status": "NOT_USED",
        "updated_at": "1651644898",
        "remark": ""
      }
    ]
  }
}
```

### Response Status

| Status | Description              | Schema                                          |
| ------ | ------------------------ | ----------------------------------------------- |
| 200    | 歷史訂單查詢成功         | [history_orders_rsp](#schemahistory_orders_rsp) |
| 400    | 查詢失敗，請求參數錯誤。 | None                                            |

<aside className="success">
</aside>

## Schemas

### history_orders_rsp

<a id="schemahistory_orders_rsp"></a>
<a id="schemahistory_orders_rsp"></a>

| Name                | Type     | Required | Description                                                                                                                                                                         |
| ------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| has_more            | boolean  | true     | 是否還有更多數據。<br/><br/>每次查詢最大訂單數量為 1000，如果查詢結果數量超過 1000，那麽 has_more 就會為 true                                                                       |
| orders              | object[] | false    | 訂單信息                                                                                                                                                                            |
| ∟ order_id          | string   | true     | 訂單 ID                                                                                                                                                                             |
| ∟ status            | string   | true     | [訂單狀態](../trade-definition#orderstatus)                                                                                                                                         |
| ∟ stock_name        | string   | true     | 股票名稱                                                                                                                                                                            |
| ∟ quantity          | string   | true     | 下單數量                                                                                                                                                                            |
| ∟ executed_quantity | string   | true     | 成交數量。<br/><br/>當訂單未成交時為 0                                                                                                                                              |
| ∟ price             | string   | true     | 下單價格。<br/><br/>當市價條件單未觸發時為空字符串                                                                                                                                  |
| ∟ executed_price    | string   | true     | 成交價。<br/><br/>當訂單未成交時為 0                                                                                                                                                |
| ∟ submitted_at      | string   | true     | 下單時間                                                                                                                                                                            |
| ∟ side              | string   | true     | 買賣方向<br/><br/> **可選值：**<br/> `Buy` - 買入<br/> `Sell` - 賣出                                                                                                                |
| ∟ symbol            | string   | true     | 股票代碼，使用 `ticker.region` 格式，例如：`AAPL.US`                                                                                                                                |
| ∟ order_type        | string   | true     | [訂單類型](../trade-definition#ordertype)                                                                                                                                           |
| ∟ last_done         | string   | true     | 最近成交價格。<br/><br/>當訂單未成交時為空字符串                                                                                                                                    |
| ∟ trigger_price     | string   | true     | `LIT` / `MIT` 訂單觸發價格。<br/><br/>當訂單不是 `LIT` / `MIT` 訂單為空字符串                                                                                                       |
| ∟ msg               | string   | true     | 拒絕信息或備註，默認為空字符串。                                                                                                                                                    |
| ∟ tag               | string   | true     | 訂單標記<br/><br/> **可選值：**<br/> `Normal` - 普通訂單<br/> `GTC` - 長期單<br/> `Grey` - 暗盤單                                                                                   |
| ∟ time_in_force     | string   | true     | 訂單有效期類型<br/><br/> **可選值：**<br/> `Day` - 當日有效<br/> `GTC` - 撤單前有效<br/> `GTD` - 到期前有效                                                                         |
| ∟ expire_date       | string   | true     | 長期單過期時間，格式為 `YYYY-MM-DD`, 例如：`2022-12-05。<br/><br/>不是長期單時，默認為空字符串。`                                                                                   |
| ∟ updated_at        | string   | true     | 最近更新時間，格式為時間戳 (秒)，默認為 0。                                                                                                                                         |
| ∟ trigger_at        | string   | true     | 條件單觸發時間，格式為時間戳 (秒)，默認為 0。                                                                                                                                       |
| ∟ trailing_amount   | string   | true     | `TSLPAMT` 訂單跟蹤金額。<br/><br/>當訂單不是 `TSLPAMT` 訂單時為空字符串。                                                                                                           |
| ∟ trailing_percent  | string   | true     | `TSLPPCT` 訂單跟蹤漲跌幅。<br/><br/>當訂單不是 `TSLPPCT` 訂單時為空字符串。                                                                                                         |
| ∟ limit_offset      | string   | true     | `TSLPAMT` / `TSLPPCT` 訂單指定價差。<br/><br/>當訂單不是 `TSLPAMT` / `TSLPPCT` 訂單時為空字符串。                                                                                   |
| ∟ trigger_status    | string   | true     | 條件單觸發狀態<br/> 當訂單不是條件單或條件單未觸發時，觸發狀態為 NOT_USED<br/><br/> **可選值：**<br/> `NOT_USED` - 未激活 `DEACTIVE` - 已失效 `ACTIVE` - 已激活 `RELEASED` - 已觸發 |
| ∟ currency          | string   | true     | 結算貨幣                                                                                                                                                                            |
| ∟ outside_rth       | string   | true     | 是否允許盤前盤後<br/> 當訂單不是美股時，默認為 UnknownOutsideRth<br/><br/> **可選值：**<br/> `RTH_ONLY` - 不允許盤前盤後<br/> `ANY_TIME` - 允許盤前盤後<br/> `OVERNIGHT` - 夜盤     |
| ∟ remark            | string   | true     | 備註                                                                                                                                                                                |
