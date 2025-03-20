---
slug: order_detail
title: 訂單詳情 
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ""
headingLevel: 2

---

該接口用於訂單詳情查詢。

<SDKLinks module="trade" klass="TradeContext" method="order_detail" />

## 

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/trade/order 
</td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name | Type | Required | Description |
|---|---|---|---|
| order_id | string | YES | 訂單 ID，用於指定訂單 ID 查詢，例如：`701276261045858304` |

### Request Example

```python
from longport.openapi import TradeContext, Config

config = Config.from_env()
ctx = TradeContext(config)

resp = ctx.order_detail(
    order_id = "701276261045858304",
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
    "order_id": "828940451093708800",
    "status": "FilledStatus",
    "stock_name": "蘋果",
    "quantity": "10",
    "executed_quantity": "10",
    "price": "200.000",
    "executed_price": "164.660",
    "submitted_at": "1680863604",
    "side": "Buy",
    "symbol": "AAPL.US",
    "order_type": "LO",
    "last_done": "164.660",
    "trigger_price": "0.0000",
    "msg": "",
    "tag": "Normal",
    "time_in_force": "Day",
    "expire_date": "2023-04-10",
    "updated_at": "1681113000",
    "trigger_at": "0",
    "trailing_amount": "",
    "trailing_percent": "",
    "limit_offset": "",
    "trigger_status": "NOT_USED",
    "outside_rth": "ANY_TIME",
    "currency": "USD",
    "remark": "1680863603.927165",
    "free_status": "None",
    "free_amount": "",
    "free_currency": "",
    "deductions_status": "NONE",
    "deductions_amount": "",
    "deductions_currency": "",
    "platform_deducted_status": "NONE",
    "platform_deducted_amount": "",
    "platform_deducted_currency": "",
    "history": [
      {
        "price": "164.6600",
        "quantity": "10",
        "status": "FilledStatus",
        "msg": "Execution of 10",
        "time": "1681113000"
      },
      {
        "price": "200.0000",
        "quantity": "10",
        "status": "NewStatus",
        "msg": "",
        "time": "1681113000"
      }
    ],
    "charge_detail": {
      "items": [
        {
          "code": "BROKER_FEES",
          "name": "收費明細",
          "fees": []
        },
        {
          "code": "THIRD_FEES",
          "name": "第三方收費明細",
          "fees": []
        }
      ],
      "total_amount": "0",
      "currency": "USD"
    }
  }
}
```

### Response Status

| Status | Description | Schema |
|---|---|---|
| 200 | 訂單詳情查詢成功 | [order_detail_rsp](#schemaorder_detail_rsp) |
| 400 | 查詢失敗，請求參數錯誤。 | None |

<aside className="success">
</aside>

## Schemas

### order_detail_rsp

<a id="schemaorder_detail_rsp"></a>
<a id="schemaorder_detail_rsp"></a>

訂單信息

|Name|Type|Required|Description|
|---|---|---|---|
|order_id|string|true|訂單 ID|
|status|string|true|[訂單狀態](../trade-definition#orderstatus)|
|stock_name|string|true|股票名稱|
|quantity|string|true|下單數量|
|executed_quantity|string|true|成交數量。<br/><br/>當訂單未成交時為 0|
|price|string|true|下單價格。<br/><br/>當市價條件單未觸發時為空字符串|
|executed_price|string|true|成交價。<br/><br/>當訂單未成交時為 0|
|submitted_at|string|true|下單時間|
|side|string|true|買賣方向<br/><br/> **可選值：**<br/> `Buy` - 買入<br/> `Sell` - 賣出|
|symbol|string|true|股票代碼，使用 `ticker.region` 格式，例如：`AAPL.US`|
|order_type|string|true|[訂單類型](../trade-definition#ordertype)|
|last_done|string|true|最近成交價格。<br/><br/>當訂單未成交時為空字符串|
|trigger_price|string|true|`LIT` / `MIT` 訂單觸發價格。<br/><br/>當訂單不是 `LIT` / `MIT` 訂單為空字符串|
|msg|string|true|拒絕信息或備註，默認為空字符串。|
|tag|string|true|訂單標記<br/><br/> **可選值：**<br/> `Normal` - 普通訂單<br/> `GTC` - 長期單<br/> `Grey` - 暗盤單|
|time_in_force|string|true|訂單有效期類型<br/><br/> **可選值：**<br/> `Day` - 當日有效<br/> `GTC` - 撤單前有效<br/> `GTD` - 到期前有效|
|expire_date|string|true|長期單過期時間，格式為 `YYYY-MM-DD`, 例如：`2022-12-05。<br/><br/> 不是長期單時，默認為空字符串。|
|updated_at|string|true|最近更新時間，格式為時間戳 (秒)，默認為 0。|
|trigger_at|string|true|條件單觸發時間，格式為時間戳 (秒)，默認為 0。|
|trailing_amount|string|true|`TSLPAMT` 訂單跟蹤金額。<br/><br/>當訂單不是 `TSLPAMT` 訂單時為空字符串。|
|trailing_percent|string|true|`TSLPPCT` 訂單跟蹤漲跌幅。<br/><br/>當訂單不是 `TSLPPCT` 訂單時為空字符串。|
|limit_offset|string|true|`TSLPAMT` / `TSLPPCT` 訂單指定價差。<br/><br/>當訂單不是 `TSLPAMT` / `TSLPPCT` 訂單時為空字符串。|
|trigger_status|string|true|條件單觸發狀態<br/> 當訂單不是條件單或條件單未觸發時，觸發狀態為 NOT_USED<br/><br/> **可選值：**<br/> `NOT_USED` - 未激活<br/> `DEACTIVE` - 已失效<br/> `ACTIVE` - 已激活<br/> `RELEASED` - 已觸發|
|currency|string|true|結算貨幣|
|outside_rth|string|true|是否允許盤前盤後<br/> 當訂單不是美股時，默認為 UnknownOutsideRth<br/><br/> **可選值：**<br/> `RTH_ONLY` - 不允許盤前盤後<br/> `ANY_TIME` - 允許盤前盤後<br/> `OVERNIGHT` - 夜盤|
|remark|string|true|備註|
|free_status|string|true|免傭狀態，默認為 None<br/><br/> **可選值：**<br/> `None` - 無<br/> `Calculated` - 免傭額待計算<br/> `Pending` - 待免傭<br/> `Ready` - 已免傭|
|free_amount|string|true|免佣金額，默認為空字符串|
|free_currency|string|true|免傭貨幣，默認為空字符串|
|deductions_status|string|true|抵扣狀態/返現狀態，默認為 NONE<br/><br/> **可選值：**<br/> `NONE` - 待結算 <br/> `NO_DATA` - 已結算無數據<br/> `PENDING` - 已結算待發放<br/> `DONE` - 已結算已發放|
|deductions_amount|string|true|抵扣金額，默認為空字符串|
|deductions_currency|string|true|抵扣貨幣，默認為空字符串|
|platform_deducted_status|string|true|平臺費抵扣狀態/返現狀態，默認為 NONE<br/><br/> **可選值：**<br/> `NONE` - 待結算 <br/> `NO_DATA` - 已結算無數據<br/> `PENDING` - 已結算待發放<br/> `DONE` - 已結算已發放|
|platform_deducted_amount|string|true|平臺費抵扣金額，默認為空字符串|
|platform_deducted_currency|string|true|平臺費抵扣貨幣，默認為空字符串|
|history|object[]|true|訂單歷史明細|
|∟ price|string|true|成交展示成交價格，過期、撤單、拒絕等狀態展示提交價格|
|∟ quantity|string|true|成交展示成交數量，過期、撤單、拒絕等狀態展示剩餘數量|
|∟ status|string|true|訂單狀態|
|∟ msg|string|true|成交或錯誤信息|
|∟ time|string|true|發生時間|
|charge_detail|object|true|訂單費用|
|∟ total_amount|string|true|全部費用|
|∟ currency|string|true|結算貨幣|
|∟ items|object[]|true|訂單費用明細|
|∟∟ code|string|true|收費類別代碼<br/><br/> **可選值：**<br/> `UNKNOWN`<br/> `BROKER_FEES`<br/> `THIRD_FEES`|
|∟∟ name|string|true|收費類別名稱|
|∟∟ fees|object[]|true|收費明細|
|∟∟∟ code|string|true|收費代碼|
|∟∟∟ name|string|true|收費名稱|
|∟∟∟ amount|string|true|單項收費金額|
|∟∟∟ currency|string|true|收費貨幣|

