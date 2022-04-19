---
id: trade-asset-cashflow
slug: trade-asset-cashflow
title: 资金流水信息
---

#  查询资金流水信息

<font color='gray' size='2'>最后更新于 2022-04-19</font>

- 提供资金流入/流出方向、资金类别、资金金额、发生时间（日期 + 时间）、关联股票代码、资金流水说明

## 请求

| 基本信息        |                                              |
|-------------|----------------------------------------------|
| HTTP URL    | https://openapi.longbridge.sg/v1/trade/asset/GetCashFlowHistory |
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
| start_time          | int | 是   | 开始时间                                                 |     | 1650037563 |
| end_time          | int | 是   | 终止时间                                                 |     | 1650337563 |
| business_type          | int | 否   | 资金类型; 1:现金 2:股票 3:基金                                           |     | AAPL.US |
| symbol          | string | 否   | 标的代码                                                 |     | 1 |
| page          | int | 是   | 分页                                                 |     | 10 |
| size      | string | 是   | 每页大小      |     | LO      |

## 响应

### 响应体

| 名称                                      | 类型       | 描述           |
|-----------------------------------------|----------|--------------|
| code                                    | int      | 错误码，非 0 表示失败 |
| msg                                     | string   | 错误描述         |
| data                                    | object   |              |
| <font color="grey">+</font>list      | object[]      | 流水信息     |
| <font color="grey">++</font> transaction_flow_name       | string |      流水名称        |
| <font color="grey">++</font> direction          | int      |  流出方向；1:流出 2:流入            |
| <font color="grey">++</font> business_type | int       |    资金类别' 1:现金，2:股票，3:基金          |
| <font color="grey">++</font> balance | string       | 资金金额             |
| <font color="grey">++</font> currency | string       |  资金币种            |
| <font color="grey">++</font> business_time | int       |  业务时间            |
| <font color="grey">++</font> symbol | string       |    关联股票代码信息，不一定所有的都有          |
| <font color="grey">++</font> description | string       |   资金流水说明           |




### 响应体示例

```
{
        "list": [{
                "transaction_flow_name": "股票买入成交",
                "direction": 1,
                "balance": "-248.60",
                "currency": "USD",
                "business_time": 1621507957,
                "symbol": "AAPL.US",
                "description": "AAPL"
        }, {
                "transaction_flow_name": "股票买入成交",
                "direction": 1,
                "balance": "-125.16",
                "currency": "USD",
                "business_time": 1621504824,
                "symbol": "AAPL.US",
                "description": "AAPL"
        }]
}
```

### 错误码

| HTTP 状态码 | 错误码     | 描述                | 排查建议                                          |
|---------|---------|-------------------|-----------------------------------------------|
| 400     | 1470400 | bad request       | 一般可能是请求参数存在问题，导致请求失败，建议根据返回的具体错误进行排查          |
| 403     | 1470403 | request forbidden | 一般可能是因为操作者没有操作权限，导致被禁止操作。比如没有任务的编辑权限，却修改任务状态等 |