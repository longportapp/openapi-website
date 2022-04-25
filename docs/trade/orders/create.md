---
title: 委托订 单 v1
language_tabs: false
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

订单接口介绍描dd述信息

### 请求头信息

| 基本信息        |                                                            |
|-------------|------------------------------------------------------------|
| HTTP URL    | https://openapi.longbridge.sg/v1/trade/order/HistoryOrders |
| HTTP Method | GET                                                        |
| 权限要求        | 交易权限                                                       |

`POST /trade/orders/submit`

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

<h3 id="url-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateOrder](#schemacreateorder)|true|委托订单参数体. [url](https://baidu.com)|

<h3 id="url-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|订单已委托|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|下单被拒绝，资金不足。|None|

<aside class="success">
</aside>

# Schemas

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

