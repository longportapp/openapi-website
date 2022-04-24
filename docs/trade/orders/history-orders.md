---
id: trade-order-history-orders
slug: trade-order-history-orders
title: 历史订单
---

> Last Updated: 2022-04-24

## 历史订单查询

### Request

| 基本信息        |                                                            |
|-------------|------------------------------------------------------------|
| HTTP URL    | /v1/trade/order/HistoryOrders |
| HTTP Method | GET                                                        |
| Permissions        | 交易权限                                                       |

### Headers

| Name            | Type     | Required  | Description                                        |
|---------------|--------|-----|-------------------------------------------|
| Authorization | string | 是   |                                           |
| Content-Type  | string | 是   | application/json; charset=utf-8 |

### Parameters

| Name     | Type     | Required | Description                                        | Description                                 |
| -------- | -------- | ---- | ------------------------------------------- | --------------------------------------- |
| symbol   | string   |      | 股票代码，使用 ticker.region 格式           | 700.HK                                  |
| status   | []string |      | [订单状态](../trade-definition#orderstatus) | ["FilledStatus", "PartialFilledStatus"] |
| side     | string   |      | 买卖方向<br/>Buy: 买入<br/>Sell: 卖出       | Buy                                     |
| market   | string   |      | [市场](../trade-definition#market)          | US                                      |
| start_at | string   |      | 开始时间，格式为时间戳 (秒)                 | 1650410999                              |
| end_at   | string   |      | 结束时间，格式为时间戳 (秒)                 | 1650510999                              |

`start_at` 和 `end_at` 的组合如下

| Start 类型 | End 类型 | 说明                             |
| :--------- | :------- | :------------------------------- |
| string     | string   | start 和 end 分别为指定的时间    |
| None       | string   | start 为 end 往前 90 天          |
| string     | None     | end 为 start 往后 90 天          |
| None       | None     | start 为往前 90 天，end 当前日期 |

### Response

#### response.body

| Name                                                         | Type     | Description                                                         |
| ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| code                                                         | int      | 错误码，非 0 表示失败                                        |
| msg                                                          | string   | 错误描述                                                     |
| data                                                         | object   |                                                              |
| <font color="grey">∟</font>has_more                          | bool     | 是否还有数据，如果为 true，则需要通过最后的时间再次请求。    |
| <font color="grey">∟</font>orders                            | []object | 订单详情列表                                                 |
| <font color="grey">∟</font><font color="grey">∟</font>order_id | string   | 订单 id                                                      |
| <font color="grey">∟</font><font color="grey">∟</font>status | string   | 订单状态                                                     |
| <font color="grey">∟</font><font color="grey">∟</font>stock_name | string   | 股票名称                                                     |
| <font color="grey">∟</font><font color="grey">∟</font>quantity | string   | 下单数量                                                     |
| <font color="grey">∟</font><font color="grey">∟</font>executed_qty | string   | 成交数量                                                     |
| <font color="grey">∟</font><font color="grey">∟</font>price  | string   | 下单价格                                                     |
| <font color="grey">∟</font><font color="grey">∟</font>executed_price | string   | 成交价格                                                     |
| <font color="grey">∟</font><font color="grey">∟</font>submitted_at | string   | 下单时间                                                     |
| <font color="grey">∟</font><font color="grey">∟</font>side   | string   | 买卖方向<br />Buy: 买入<br />Sell: 卖出                      |
| <font color="grey">∟</font><font color="grey">∟</font>symbol | string   | 股票代码，使用 ticker.region 格式                            |
| <font color="grey">∟</font><font color="grey">∟</font>order_type | string   | 订单类型                                                     |
| <font color="grey">∟</font><font color="grey">∟</font>last_done | string   | 最近成交价格                                                 |
| <font color="grey">∟</font><font color="grey">∟</font>trigger_price | string   | LIT / MIT 订单触发价格                                       |
| <font color="grey">∟</font><font color="grey">∟</font>msg    | string   | 拒绝信息或备注                                               |
| <font color="grey">∟</font><font color="grey">∟</font>tag    | string   | 订单标记<br />Normal 普通订单<br />GTC 长期单<br />Grey 暗盘单 |
| <font color="grey">∟</font><font color="grey">∟</font>time_in_force | string   | 订单有效期类型<br />Day 当日有效<br />GTC 撤单前有效<br />GTD 到期前有效 |
| <font color="grey">∟</font><font color="grey">∟</font>expire_date | string   | 长期单的有效时间 格式: 2020-01-01                            |
| <font color="grey">∟</font><font color="grey">∟</font>updated_at | string   | 最近更新时间                                                 |
| <font color="grey">∟</font><font color="grey">∟</font>trigger_at | string   | 条件单触发时间                                               |
| <font color="grey">∟</font><font color="grey">∟</font>trailing_amount | string   | 条件单跟踪金额                                               |
| <font color="grey">∟</font><font color="grey">∟</font>trailing_percent | string   | 条件单跟踪涨跌幅                                             |
| <font color="grey">∟</font><font color="grey">∟</font>limit_offset | string   | 指定价差                                                     |
| <font color="grey">∟</font><font color="grey">∟</font>trigger_status | string   | 条件单触发状态<br />NOT_ACTIVE 未激活 <br />DEACTIVE 已失效<br />ACTIVE 已激活 <br />RELEASED 已触发 |
| <font color="grey">∟</font><font color="grey">∟</font>currency | string   | 结算货币                                                     |
| <font color="grey">∟</font><font color="grey">∟</font>outside_rth | string   | 美股是否允许盘前盘后<br /> RTH_ONLY 不允许盘前盘后<br />ANY_TIME 允许盘前盘后 |



### Response 示例

```json
{
  "has_more": true,
  "orders": [
    {
      "currency": "HKD",
      "executed_price": "0",
      "executed_quantity": "0",
      "expire_date": "",
      "last_done": "",
      "limit_offset": "",
      "msg": "",
      "order_id": "701276261045858304",
      "order_type": 1,
      "outside_rth": 0,
      "price": "388",
      "quantity": "100",
      "side": 1,
      "status": 16,
      "stock_name": "腾讯控股",
      "submitted_at": "1650426089",
      "symbol": "700.HK",
      "tag": 1,
      "time_in_force": 0,
      "trailing_amount": "",
      "trailing_percent": "",
      "trigger_at": "0",
      "trigger_price": "",
      "trigger_status": 0,
      "updated_at": "1650442225"
    }
  ]
}
```

### Error Code

| Status | Code    | 描述                | 排查建议                                          |
|----------|--------|-------------------|-----------------------------------------------|
| 400      | 602001 | bad request       | 一般可能是请求参数存在问题，导致请求失败，建议根据返回的具体错误进行排查          |
| 400      | 602002 | request forbidden | 一般可能是因为操作者没有操作权限，导致被禁止操作。比如没有任务的编辑权限，却修改任务状态等 |
