---
title: 委托订单 v1
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

订单接口提供完整的下单、取消下单等功能。

## 提交订单

<div class="http-operation"><div class="http-verb">POST</div><div class="http-path">/trade/orders/submit</div></div>

<div class="operation-access">权限需求：登录 + 交易权限</div>

订单接口介绍描述信息

### Parameters 

> Content-Type: application/json; charset=utf-8  
   
|Name|Type|Required|Description| 
|---|---|---|---|
|quantity|integer|true|订单委托数量|
|price|float|true|委托单价|
|meta|[OrderMeta](#schemaordermeta)|false|订单信息|

#### Request Example

```json
{
  "quantity": 100,
  "price": 100.21
}
```

### Responses

#### Respones Headers

- Content-Type: application/json

#### Response Example

```json
{
  "code": 0,
  "data": {
    "title": "Hello world",
    "quantity": 100,
    "done": 99
  }
}
```

#### Response Status

|Status|Description|Schema|
|---|---|---|
|200|提交成功，订单已委托。|[CreateOrderResp](#schemacreateorderresp)|
|401|下单被拒绝，资金不足。|None|

<aside class="success">
</aside>

## 取消订单

<div class="http-operation"><div class="http-verb">POST</div><div class="http-path">/trade/orders/cancel</div><div class="http-operation-deprecated">Deprecated</div></div>

<div class="operation-access">权限需求：登录 + 交易权限</div>

### Parameters 

> Content-Type: application/json; charset=utf-8  
   
|Name|Type|Required|Description| 
|---|---|---|---|
|order_id|integer|true|订单编号|

#### Request Example

```json
{
  "order_id": 881001
}
```

### Responses

#### Respones Headers

- Content-Type: application/json

#### Response Example

```json
{
  "code": 0,
  "data": {
    "status": "cancelled"
  }
}
```

#### Response Status

|Status|Description|Schema|
|---|---|---|
|200|提交成功，订单已委托。|[CreateOrderResp](#schemacreateorderresp)|
|401|下单被拒绝，资金不足。|None|

<aside class="success">
</aside>

## Schemas

### OrderMeta

<a id="schemaOrderMeta"></a>
<a id="schemaordermeta"></a>

|Name|Type|Required|Description|
|---|---|---|---|
|allows_market_price|boolean|false| |
|slient|boolean|false| |

### CreateOrderResp

<a id="schemaCreateOrderResp"></a>
<a id="schemacreateorderresp"></a>

|Name|Type|Required|Description|
|---|---|---|---|
|title|string|false| |
|price|float|false| |

