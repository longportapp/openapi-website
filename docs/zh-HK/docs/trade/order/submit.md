---
slug: submit
title: 委托下單
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

該接口用於港美股，窩輪，期權的委托下單。

<SDKLinks module="trade" klass="TradeContext" method="submit_order" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>POST</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/trade/order </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name               | Type   | Required | Description                                                                                                                               |
| ------------------ | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| symbol             | string | YES      | 股票代碼，使用 `ticker.region` 格式，例如：`AAPL.US`                                                                                      |
| order_type         | string | YES      | [訂單類型](../trade-definition#ordertype)                                                                                                 |
| submitted_price    | string | NO       | 下單價格，例如：`388.5`<br/><br/> `LO` / `ELO` / `ALO` / `ODD` / `LIT` 訂單必填                                                           |
| submitted_quantity | string | YES      | 下單數量，例如：`100`                                                                                                                     |
| trigger_price      | string | NO       | 觸發價格，例如：`388.5`<br/><br/> `LIT` / `MIT` 訂單必填                                                                                  |
| limit_offset       | string | NO       | 指定價差<br/><br/> `TSLPAMT` / `TSLPPCT` 訂單在 `limit_depth_level` 為 0 時必填                                                          |
| trailing_amount    | string | NO       | 跟蹤金額<br/><br/> `TSLPAMT` 訂單必填                                                                                                     |
| trailing_percent   | string | NO       | 跟蹤漲跌幅<br/><br/> `TSLPPCT` 訂單必填                                                                                                   |
| expire_date        | string | NO       | 長期單過期時間，格式為 `YYYY-MM-DD`, 例如：`2022-12-05`<br/><br/> time_in_force 為 `GTD` 時必填                                           |
| side               | string | YES      | 買賣方向<br/><br/> **可選值：**<br/> `Buy` - 買入<br/> `Sell` - 賣出                                                                      |
| outside_rth        | string | NO       | 是否允許盤前盤後，美股必填<br/><br/> **可選值：**<br/> `RTH_ONLY` - 不允許盤前盤後<br/> `ANY_TIME` - 允許盤前盤後<br/> `OVERNIGHT` - 夜盤 |
| time_in_force      | string | YES      | 訂單有效期類型<br/><br/> **可選值：**<br/> `Day` - 當日有效<br/> `GTC` - 撤單前有效<br/> `GTD` - 到期前有效                               |
| remark             | string | NO       | 備註 (最大 64 字符)                                                                                                                       |
| limit_depth_level  | int32  | NO       | 指定買賣檔位，取值範圍為 -5 ～ 0 ～ 5，負數代表買盤檔位（例如 -1 表示買一），<br/>正數代表賣盤檔位（例如 1 表示賣一），當為 0 時 limit_offset 參數生效<br/>`TSLPAMT` / `TSLPPCT` 訂單有效 |
| monitor_price      | string |  NO      | 監控價格，需要達到該價格才會開始監控，更新參考價<br/>`TSLPAMT` / `TSLPPCT` 訂單有效 |
| trigger_count      | int32  |  NO      | 觸發次數，取值範圍 0 ~ 3，表示在 1 分鐘內觸發多次才會觸發訂單，<br/>`LIT` / `MIT` / `TSLPAMT` / `TSLPPCT` 訂單有效 |

### Request Example

```python
from decimal import Decimal
from longport.openapi import TradeContext, Config, OrderType, OrderSide, TimeInForceType

# Load configuration from environment variables
config = Config.from_env()

# Create a context for trade APIs
ctx = TradeContext(config)

# Submit order
resp = ctx.submit_order("700.HK", OrderType.LO, OrderSide.Buy, Decimal(500), TimeInForceType.Day, submitted_price=Decimal(50), remark="Hello from Python SDK")
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
    "order_id": 683615454870679600
  }
}
```

### Response Status

| Status | Description                | Schema |
| ------ | -------------------------- | ------ |
| 200    | 提交成功，訂單已委托。     | None   |
| 400    | 下單被拒絕，請求參數錯誤。 | None   |

<aside className="success">
</aside>
