---
id: trade-order 
title: trade-order  
keywords:
  - order
  - trade
---

#      

<font color='gray' size='2'>最后更新于 2022-03-25</font>

支持港股，美股 (包括 窝轮牛熊证)，期权的下单

## 请求

| 基本信息        |                                              |
|-------------|----------------------------------------------|
| HTTP URL    | https://openapi.longbridge.sg/v1/trade/order |
| HTTP Method | POST                                         |
| 权限要求        | 交易权限                                         |

### 请求头

| 名称            | 类型     | 必须  | 描述                                        |
|---------------|--------|-----|-------------------------------------------|
| Authorization | string | 是   |                                           |
| Content-Type  | string | 是   | **固定值**："application/json; charset=utf-8" |

### 请求体

| 名称              | 类型     | 必须  | 描述                                                   | 默认值 | 示例      |
|-----------------|--------|-----|------------------------------------------------------|-----|---------|
| symbol          | string | 是   | 标的代码                                                 |     | AAPL.US |
| order_type      | string | 是   | 订单类型<br />**可选值：**<br />LO： 限价单<br />ELO: 增强限价单      |     | LO      |
| submitted_price | string | 是   | 下单价格                                                 |     | 174.071 |
| rth             | int    | 否   | 是否允许盘前盘后<br />**可选值：**<br />1: 不允许盘前盘后<br />2：允许盘前盘后 | 1   | 2       |

## 响应

### 响应体

| 名称                                      | 类型       | 描述           |
|-----------------------------------------|----------|--------------|
| code                                    | int      | 错误码，非 0 表示失败 |
| msg                                     | string   | 错误描述         |
| data                                    | object   |              |
| <font color="grey">∟</font>order_id     | int      | 创建的订单 id     |
| <font color="grey">∟</font> items       | object[] |              |
| <font color="grey">∟</font> id          | int      |              |
| <font color="grey">∟</font> description | 描述       |              |

### 响应体示例

```
{
    "code": 0,
    "msg": "",
    "data": {
        "order_id": 1001,
        "items": [
            {
                "id": 1,
                "description": "order1"
            },
            {
                "id": 2,
                "description": "order2"
            }
        ]
    }
}
```

### 错误码

| HTTP 状态码 | 错误码     | 描述                | 排查建议                                          |
|---------|---------|-------------------|-----------------------------------------------|
| 400     | 1470400 | bad request       | 一般可能是请求参数存在问题，导致请求失败，建议根据返回的具体错误进行排查          |
| 403     | 1470403 | request forbidden | 一般可能是因为操作者没有操作权限，导致被禁止操作。比如没有任务的编辑权限，却修改任务状态等 |

