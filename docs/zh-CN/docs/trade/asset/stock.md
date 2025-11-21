---
slug: stock
title: 获取股票持仓
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: ''
headingLevel: 2
---

该接口用于获取包括账户、股票代码、持仓股数、可用股数、持仓均价（按账户设置计算均价方式）、币种在内的股票持仓信息。

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

| Name   | Type     | Required | Description                                          |
| ------ | -------- | -------- | ---------------------------------------------------- |
| symbol | string[] | NO       | 股票代码，使用 `ticker.region` 格式，例如：`AAPL.US` |

### Request Example

```python
# 获取股票持仓
# https://open.longbridge.com/docs/trade/asset/stock
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
            "symbol_name": "腾讯控股",
            "currency": "HKD",
            "quantity": "650",
            "market": "HK",
            "available_quantity": "-450",
            "cost_price": "457.53",
            "init_quantity": "214"
          },
          {
            "symbol": "9991.HK",
            "symbol_name": "宝尊电商-SW",
            "currency": "HKD",
            "market": "HK",
            "quantity": "200",
            "available_quantity": "0",
            "cost_price": "32.25",
            "init_quantity": "214"
          },
          {
            "symbol": "TCEHY.US",
            "symbol_name": "腾讯控股 (ADR)",
            "currency": "USD",
            "market": "US",
            "quantity": "10",
            "available_quantity": "10",
            "init_quantity": "18"
          },
          {
            "symbol": "2628.HK",
            "symbol_name": "中国人寿",
            "currency": "HKD",
            "market": "HK",
            "quantity": "9000",
            "available_quantity": "0",
            "init_quantity": "8000"
          },
          {
            "symbol": "5.HK",
            "symbol_name": "汇丰控股",
            "currency": "HKD",
            "market": "HK",
            "quantity": "2400",
            "available_quantity": "2000",
            "init_quantity": "2000"
          },
          {
            "symbol": "BABA.US",
            "symbol_name": "阿里巴巴",
            "currency": "USD",
            "market": "US",
            "quantity": "2000209",
            "available_quantity": "2000209",
            "init_quantity": "214"
          },
          {
            "symbol": "2.HK",
            "symbol_name": "中电控股",
            "currency": "HKD",
            "market": "HK",
            "quantity": "2000",
            "available_quantity": "2000",
            "init_quantity": "2000"
          },
          {
            "symbol": "NOK.US",
            "symbol_name": "诺基亚",
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

| Status | Description | Schema                        |
| ------ | ----------- | ----------------------------- |
| 200    | 返回成功    | [stock_rsp](#schemastock_rsp) |
| 400    | 内部错误    | None                          |

<aside className="success">
</aside>

## Schemas

### stock_rsp

<a id="schemastock_rsp"></a>
<a id="schemastock_rsp"></a>

| Name                  | Type     | Required | Description                                       |
| --------------------- | -------- | -------- | ------------------------------------------------- |
| list                  | object[] | false    | 股票持仓信息                                      |
| ∟ account_channel     | string   | true     | 账户类型                                          |
| ∟ stock_info          | object[] | false    | 股票列表                                          |
| ∟∟ symbol             | string   | true     | 股票代码                                          |
| ∟∟ symbol_name        | string   | true     | 股票名称                                          |
| ∟∟ quantity           | string   | true     | 持仓股数                                          |
| ∟∟ available_quantity | string   | false    | 可用股数                                          |
| ∟∟ currency           | string   | true     | 币种                                              |
| ∟∟ market             | string   | true     | 市场                                              |
| ∟∟ cost_price         | string   | true     | 成本价格 (具体根据客户端选择平均买入还是摊薄成本) |
| ∟∟ init_quantity      | string   | false    | 开盘前初始持仓                                    |
