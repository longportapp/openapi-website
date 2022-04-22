---
id: trade-order-replace
slug: trade-order-replace
title: 改单
---

#  改单

<font color='gray' size='2'>最后更新于 2022-04-21</font>

 - 修改订单的价格和数量等

## 请求

| 基本信息    |                                                      |
| ----------- | ---------------------------------------------------- |
| HTTP URL    | https://openapi.longbridge.sg/v1/trade/order/Replace |
| HTTP Method | POST                                                 |
| 权限要求    | 交易权限                                             |

### 请求头

| 名称          | 类型   | 必须 | 描述                                          |
| ------------- | ------ | ---- | --------------------------------------------- |
| Authorization | string | 是   |                                               |
| Content-Type  | string | 是   | **固定值**："application/json; charset=utf-8" |

### 请求体

| 名称             | 类型   | 必须                                   | 描述                                                  | 默认值 | 示例               |
| ---------------- | ------ | -------------------------------------- | ----------------------------------------------------- | ------ | ------------------ |
| order_id         | string | 是                                     | 订单 id                                               |        | 683615454870679552 |
| quantity         | string | 是                                     | 改单数量                                              |        | 100                |
| price            | string | LO / ELO  /  ALO  / ODD / LIT 订单必填 | 改单价格                                              |        | 30.5               |
| trigger_price    | string | LIT / MIT 订单必填                     | 触发价格                                              |        | 30.3               |
| limit_offset     | string | TSLPAMT / TSLPPCT 订单必填             | 指定价差                                              |        | 10                 |
| trailing_amount  | string | TSLPAMT / TSMAMT 订单必填              | 跟踪金额                                              |        | 5                  |
| trailing_percent | string | TSMPCT / TSLPPCT 订单必填              | 跟踪涨跌幅，如跟踪涨跌 10% 时，trailing_percent 为 10 |        | 2                  |
| remark           | string |                                        | 备注，不超过 64 字符                                  |        |                    |


## 响应

### 响应体

| 名称                               | 类型   | 描述                           |
| ---------------------------------- | ------ | ------------------------------ |
| code                               | int    | 错误码，非 0 表示失败          |
| msg                                | string | 错误描述                       |
| data                               | object |                                |
| <font color="grey">∟</font>message | string | 改单请求提交成功则返回 Success |




### 响应体示例

```json
{
        "message": Success
}
```

### 错误码

| HTTP 状态码 | 错误码 | 描述              | 排查建议                                                     |
| ----------- | ------ | ----------------- | ------------------------------------------------------------ |
| 400         | 602001 | bad request       | 一般可能是请求参数存在问题，导致请求失败，建议根据返回的具体错误进行排查 |
| 400         | 602002 | request forbidden | 一般可能是因为操作者没有操作权限，导致被禁止操作。比如没有任务的编辑权限，却修改任务状态等 |
