---
title: 订单 v1
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<h1 id="-">订单 v1</h1>

| 基本信息        |                                                            |
|-------------|------------------------------------------------------------|
| HTTP URL    | https://openapi.longbridge.sg/v1/trade/order/HistoryOrders |
| HTTP Method | GET                                                        |
| 权限要求        | 交易权限                                                       |

订单接口介111绍

Base URLs:

* <a href="//openapi.longbridge.sg/api/v1">//openapi.longbridge.sg/api/v1</a>

<h1 id="---">订单</h1>

订单接口介绍

<a href="http://open.longbridgeapp.com/docs/order_detail">需要时添加这部分内容</a>

## post__trade_orders_submit

`POST /trade/orders/submit`

*下单概述*

港美股，窝轮，期权委托下单

> Body parameter

```json
{
  "type": "object",
  "properties": {
    "quantity": {
      "type": "integer",
      "format": "int32"
    },
    "price": {
      "type": "integer",
      "format": "float",
      "default": 100.92
    }
  }
}
```

<h3 id="post__trade_orders_submit-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateOrder](#schemacreateorder)|true|create order|

<h3 id="post__trade_orders_submit-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|订单已委托|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|下单被拒绝，资金不足。|None|

<aside class="success">
This operation does not require authentication
</aside>

## orderID

<a id="opIdorderID"></a>

`POST /trade/orders/replace`

*修改订单的价格和数量等*

修改订单的价格和数量等,[权限](https://open.longbridgeapp.com/docs/auth)

> Body parameter

```json
{
  "type": "object",
  "properties": {
    "quantity": {
      "type": "integer",
      "format": "int32"
    },
    "price": {
      "type": "integer",
      "format": "float",
      "default": 100.92
    },
    "id": {
      "type": "integer",
      "format": "float",
      "default": 1
    }
  }
}
```

<h3 id="orderid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ReplaceOrder](#schemareplaceorder)|true|replace order|

<h3 id="orderid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|订单已委托|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|下单被拒绝，资金不足。|None|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_ReplaceOrder">ReplaceOrder</h2>

<a id="schemareplaceorder"></a>
<a id="schema_ReplaceOrder"></a>
<a id="tocSreplaceorder"></a>
<a id="tocsreplaceorder"></a>

```json
{
  "type": "object",
  "properties": {
    "quantity": {
      "type": "integer",
      "format": "int32"
    },
    "price": {
      "type": "integer",
      "format": "float",
      "default": 100.92
    },
    "id": {
      "type": "integer",
      "format": "float",
      "default": 1
    }
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|quantity|integer(int32)|false|none|none|
|price|integer(float)|false|none|none|
|id|integer(float)|false|none|none|

<h2 id="tocS_CreateOrder">CreateOrder</h2>

<a id="schemacreateorder"></a>
<a id="schema_CreateOrder"></a>
<a id="tocScreateorder"></a>
<a id="tocscreateorder"></a>

```json
{
  "type": "object",
  "properties": {
    "quantity": {
      "type": "integer",
      "format": "int32"
    },
    "price": {
      "type": "integer",
      "format": "float",
      "default": 100.92
    }
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|quantity|integer(int32)|false|none|none|
|price|integer(float)|false|none|none|

undefined

