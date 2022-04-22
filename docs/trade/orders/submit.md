---
id: trade-order-submit
slug: trade-order-submit
title: 下单
---

#  下单

<font color='gray' size='2'>最后更新于 2022-04-21</font>

 - 港美股，窝轮，期权委托下单

## 请求

| 基本信息    |                                                     |
| ----------- | --------------------------------------------------- |
| HTTP URL    | https://openapi.longbridge.sg/v1/trade/order/Submit |
| HTTP Method | POST                                                |
| 权限要求    | 交易权限                                            |

### 请求头

| 名称          | 类型   | 必须 | 描述                                          |
| ------------- | ------ | ---- | --------------------------------------------- |
| Authorization | string | 是   |                                               |
| Content-Type  | string | 是   | **固定值**："application/json; charset=utf-8" |

### 请求体

| 名称               | 类型   | 必须                                  | 描述                                                         | 默认值 | 示例       |
| ------------------ | ------ | ------------------------------------- | ------------------------------------------------------------ | ------ | ---------- |
| symbol             | string | 是                                    | 股票代码，使用 ticker.region 格式                            |        | AAPL.US    |
| order_type         | string | 是                                    | [订单类型](../trade-definition#ordertype)                    |        | LO         |
| submitted_price    | string | LO / ELO /  ALO /  ODD / LIT 订单必填 | 下单价格                                                     |        | 388.5      |
| submitted_quantity | string | 是                                    | 下单数量                                                     |        | 100        |
| trigger_price      | string | LIT / MIT 订单必填                    | 触发价格                                                     |        | 345.2      |
| limit_offset       | string | TSLPAMT / TSLPPCT 订单必填            | 指定价差                                                     |        | 10.1       |
| trailing_amount    | string | TSLPAMT / TSMAMT 订单必填             | 跟踪金额                                                     |        | 5.9        |
| trailing_percent   | string | TSMPCT / TSLPPCT 订单必填             | 跟踪涨跌幅，如跟踪涨跌 10% 时，trailing_percent 为 10        |        | 10.3       |
| expire_date        | string | time_in_force 为 GTD 时必填           | 长期单过期时间，格式为 YYYY-MM-DD                            |        | 2022-12-05 |
| side               | string | 是                                    | 买卖方向<br/>Buy: 买入<br/>Sell: 卖出                        |        | Buy        |
| outside_rth        | string | 美股订单必填                          | 美股是否允许盘前盘后<br/>RTH_ONLY: 不允许盘前盘后<br/>ANY_TIME:允许盘前盘后 |        | RTH_ONLY   |
| time_in_force      | string | 是                                    | 订单有效期类型<br/>Day:当日有效<br/>GTC: 撤单前有效<br/>GTD: 到期前有效 |        | GTD        |
| remark             | string |                                       | 备注，不超过 64 字符                                         |        |            |


## 响应

### 响应体

| 名称                                | 类型   | 描述                  |
| ----------------------------------- | ------ | --------------------- |
| code                                | int    | 错误码，非 0 表示失败 |
| msg                                 | string | 错误描述              |
| data                                | object |                       |
| <font color="grey">∟</font>order_id | string | 订单 id               |




### 响应体示例

```json
{
        "order_id": 683615454870679552
}
```

### 错误码

| HTTP 状态码 | 错误码 | 描述              | 排查建议                                                     |
| ----------- | ------ | ----------------- | ------------------------------------------------------------ |
| 400         | 602001 | bad request       | 一般可能是请求参数存在问题，导致请求失败，建议根据返回的具体错误进行排查 |
| 400         | 602002 | request forbidden | 一般可能是因为操作者没有操作权限，导致被禁止操作。比如没有任务的编辑权限，却修改任务状态等 |
