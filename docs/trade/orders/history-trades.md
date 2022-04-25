---
id: trade-order-history-trades
slug: trade-order-history-trades
title: 历史成交
---

#  历史成交

<font color='gray' size='2'>最后更新于 2022-04-21</font>

 - 历史成交查询

## 请求

| 基本信息        |                                                            |
|-------------|------------------------------------------------------------|
| HTTP URL    | https://openapi.longbridge.sg/v1/trade/order/HistoryTrades |
| HTTP Method | GET                                                        |
| 权限要求        | 交易权限                                                       |

### 请求头

| 名称            | 类型     | 必须  | 描述                                        |
|---------------|--------|-----|-------------------------------------------|
| Authorization | string | 是   |                                           |
| Content-Type  | string | 是   | **固定值**："application/json; charset=utf-8" |

### 请求参数

| 名称     | 类型   | 必须 | 描述                              | 默认值 | 示例               |
| -------- | ------ | ---- | --------------------------------- | ------ | ------------------ |
| symbol   | string |      | 股票代码，使用 ticker.region 格式 |        | 700.HK             |
| start_at | string |      | 开始时间，格式为时间戳 (秒)        |        | 1650410999         |
| end_at   | string |      | 结束时间，格式为时间戳 (秒)        |        | 1650510999         |
| order_id | string |      | 订单 ID，用于指定订单 ID 查询     |        | 701276261045858304 |

start_at 和 end_at 的组合如下

| Start 类型 | End 类型 | 说明                             |
| :--------- | :------- | :------------------------------- |
| string     | string   | start 和 end 分别为指定的时间    |
| None       | string   | start 为 end 往前 90 天          |
| string     | None     | end 为 start 往后 90 天          |
| None       | None     | start 为往前 90 天，end 当前日期 |

## 响应

### 响应体

| 名称                                                         | 类型     | 描述                                                      |
| ------------------------------------------------------------ | -------- | --------------------------------------------------------- |
| code                                                         | int      | 错误码，非 0 表示失败                                     |
| msg                                                          | string   | 错误描述                                                  |
| data                                                         | object   |                                                           |
| <font color="grey">∟</font>has_more                          | bool     | 是否还有数据，如果为 true，则需要通过最后的时间再次请求。 |
| <font color="grey">∟</font>trades                            | []object |                                                           |
| <font color="grey">∟</font><font color="grey">∟</font>trade_id | string   | 成交 ID                                                   |
| <font color="grey">∟</font><font color="grey">∟</font>order_id | string   | 订单 ID                                                   |
| <font color="grey">∟</font><font color="grey">∟</font>symbol | string   | 股票代码，使用 ticker.region 格式                         |
| <font color="grey">∟</font><font color="grey">∟</font>trade_done_at | string   | 成交时间                                                  |
| <font color="grey">∟</font><font color="grey">∟</font>price  | string   | 成交价格                                                  |
| <font color="grey">∟</font><font color="grey">∟</font>quantity | string   | 成交数量                                                  |




### 响应体示例

```json
{
  "has_more": false,
  "trades": [
    {
      "order_id": "693664675163312128",
      "price": "388",
      "quantity": "100",
      "symbol": "700.HK",
      "trade_done_at": "1648611351",
      "trade_id": "693664675163312128-1648611351433741210"
    }
  ]
}
```

### 错误码

| HTTP Status | 错误码    | 描述                | 排查建议                                          |
|----------|--------|-------------------|-----------------------------------------------|
| 400      | 602001 | bad request       | 一般可能是请求参数存在问题，导致请求失败，建议根据返回的具体错误进行排查          |
| 400      | 602002 | request forbidden | 一般可能是因为操作者没有操作权限，导致被禁止操作。比如没有任务的编辑权限，却修改任务状态等 |
