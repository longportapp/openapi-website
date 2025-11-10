---
slug: cashflow
title: 獲取資金流水
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

該接口用於獲取資金流入/流出方向、資金類別、資金金額、發生時間、關聯股票代碼和資金流水說明信息。

<SDKLinks module="trade" klass="TradeContext" method="cash_flow" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/asset/cashflow </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name          | Type   | Required | Description                                                                               |
| ------------- | ------ | -------- | ----------------------------------------------------------------------------------------- |
| start_time    | string | YES      | 开始时间，时间戳，以 `秒` 为单位，例如：`1650037563`                                      |
| end_time      | string | YES      | 结束时间，时间戳，以 `秒` 为单位，例如：`1650747581`                                      |
| business_type | string | NO       | 资金类型 <br/><br/> <b>可选值:</b> <br/>`1` - 现金 <br/>`2` - 股票<br/> `3` - 基金        |
| symbol        | string | NO       | 标的代码，例如：`AAPL.US`                                                                 |
| page          | string | NO       | 起始页 <br/><br/><b>默认值:</b> `1` <br/><b>数据校验规则:</b><br/> <b>取值范围:</b> `>=1` |
| size          | string | NO       | 每页大小 <br/><br/><b>默认值:</b> `50` <br/><b>数据校验规则:</b> `1~10000`                |

### Request Example

```python
# 獲取資金流水
# https://open.longbridge.com/docs/trade/asset/cashflow
from datetime import datetime
from longport.openapi import TradeContext, Config

config = Config.from_env()
ctx = TradeContext(config)
resp = ctx.cash_flow(
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
  "data": {
    "list": [
      {
        "transaction_flow_name": "股票買入成交",
        "direction": 1,
        "balance": "-248.60",
        "currency": "USD",
        "business_time": "1621507957",
        "symbol": "AAPL.US",
        "description": "AAPL"
      },
      {
        "transaction_flow_name": "股票買入成交",
        "direction": 1,
        "balance": "-125.16",
        "currency": "USD",
        "business_time": "1621504824",
        "symbol": "AAPL.US",
        "description": "AAPL"
      }
    ]
  }
}
```

### Response Status

| Status | Description | Schema                              |
| ------ | ----------- | ----------------------------------- |
| 200    | 返回成功    | [cashflow_rsp](#schemacashflow_rsp) |
| 400    | 內部錯誤    | None                                |

<aside className="success">
</aside>

## Schemas

### cashflow_rsp

<a id="schemacashflow_rsp"></a>
<a id="schemacashflow_rsp"></a>

| Name                    | Type     | Required | Description                                                                         |
| ----------------------- | -------- | -------- | ----------------------------------------------------------------------------------- |
| list                    | object[] | false    | 流水信息                                                                            |
| ∟ transaction_flow_name | string   | true     | 流水名稱                                                                            |
| ∟ direction             | string   | true     | 流出方向 <br/><br/><b>可選值:</b> <br/>`1` - 流出 <br/> `2` - 流入                  |
| ∟ business_type         | string   | true     | 资金类别 <br/><br/><b>可選值:</b> <br/>`1` - 現金 <br/> `2` - 股票 <br/> `3` - 基金 |
| ∟ balance               | string   | true     | 資金金額                                                                            |
| ∟ currency              | string   | true     | 資金幣種                                                                            |
| ∟ business_time         | string   | true     | 業務時間                                                                            |
| ∟ symbol                | string   | false    | 關聯股票代碼信息                                                                    |
| ∟ description           | string   | false    | 資金流水說明                                                                        |
