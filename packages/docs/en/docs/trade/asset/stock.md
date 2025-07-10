---
slug: stock
title: Get Stock Positions
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

The API is used to obtain stock position information including account, stock code, number of shares held,
number of available shares, average position price (calculated according to account settings), and currency.

<SDKLinks module="trade" klass="TradeContext" method="stock_positions" />

## Request

<table className="http-basic">
<tbody>
<tr><td className="http-basic-key">HTTP Method</td><td>GET</td></tr>
<tr><td className="http-basic-key">HTTP URL</td><td>/v1/asset/stock </td></tr>
</tbody>
</table>

### Parameters

> Content-Type: application/json; charset=utf-8

| Name   | Type     | Required | Description                                           |
| ------ | -------- | -------- | ----------------------------------------------------- |
| symbol | string[] | NO       | Stock code, use `ticker.region` format, E.g:`AAPL.US` |

### Request Example

```python
# Get Stock Positions
# https://open.longportapp.com/docs/trade/asset/stock
from longport.openapi import TradeContext, Config

config = Config.from_env()
ctx = TradeContext(config)
resp = ctx.stock_positions()
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
        "account_channel": "lb",
        "stock_info": [
          {
            "symbol": "700.HK",
            "symbol_name": "TENCENT",
            "currency": "HKD",
            "quantity": "650",
            "market": "HK",
            "available_quantity": "-450",
            "cost_price": "457.53",
            "init_quantity": "214"
          },
          {
            "symbol": "9991.HK",
            "symbol_name": "BAOZUN-SW",
            "currency": "HKD",
            "market": "HK",
            "quantity": "200",
            "available_quantity": "0",
            "cost_price": "32.25",
            "init_quantity": "214"
          },
          {
            "symbol": "TCEHY.US",
            "symbol_name": "Tencent (ADR)",
            "currency": "USD",
            "market": "US",
            "quantity": "10",
            "available_quantity": "10",
            "init_quantity": "18"
          },
          {
            "symbol": "2628.HK",
            "symbol_name": "CHINA LIFE",
            "currency": "HKD",
            "market": "HK",
            "quantity": "9000",
            "available_quantity": "0",
            "init_quantity": "8000"
          },
          {
            "symbol": "5.HK",
            "symbol_name": "HSBC HOLDINGS",
            "currency": "HKD",
            "market": "HK",
            "quantity": "2400",
            "available_quantity": "2000",
            "init_quantity": "2000"
          },
          {
            "symbol": "BABA.US",
            "symbol_name": "Alibaba",
            "currency": "USD",
            "market": "US",
            "quantity": "2000209",
            "available_quantity": "2000209",
            "init_quantity": "214"
          },
          {
            "symbol": "2.HK",
            "symbol_name": "CLP HOLDINGS",
            "currency": "HKD",
            "market": "HK",
            "quantity": "2000",
            "available_quantity": "2000",
            "init_quantity": "2000"
          },
          {
            "symbol": "NOK.US",
            "symbol_name": "Nokia",
            "currency": "USD",
            "market": "US",
            "quantity": "1",
            "available_quantity": "0",
            "init_quantity": "1"
          }
        ]
      }
    ]
  }
}
```

### Response Status

| Status | Description    | Schema                        |
| ------ | -------------- | ----------------------------- |
| 200    | Success        | [stock_rsp](#schemastock_rsp) |
| 400    | Internal Error | None                          |

<aside className="success">
</aside>

## Schemas

### stock_rsp

<a id="schemastock_rsp"></a>
<a id="schemastock_rsp"></a>

| Name                  | Type     | Required | Description                                                                      |
| --------------------- | -------- | -------- | -------------------------------------------------------------------------------- |
| list                  | object[] | false    | Stock holding information                                                        |
| ∟ account_channel     | string   | true     | Account type                                                                     |
| ∟ stock_info          | object[] | false    | Stock list                                                                       |
| ∟∟ symbol             | string   | true     | Stock code                                                                       |
| ∟∟ symbol_name        | string   | true     | Stock name                                                                       |
| ∟∟ quantity           | string   | true     | The number of holdings                                                           |
| ∟∟ available_quantity | string   | false    | Available quantity                                                               |
| ∟∟ currency           | string   | true     | Currency                                                                         |
| ∟∟ market             | string   | true     | market                                                                           |
| ∟∟ cost_price         | string   | true     | Cost Price(According to the client's choice of average purchase or diluted cost) |
| ∟∟ init_quantity      | string   | false    | Initial position before market opening                                           |
