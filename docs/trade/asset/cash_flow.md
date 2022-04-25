---
id: trade-asset-cashflow
slug: trade-asset-cashflow
title: 资金流水
---

#  查询资金流水信息

<font color='gray' size='2'>最后更新于 2022-04-22</font>

- 提供资金流入/流出方向、资金类别、资金金额、发生时间（日期 + 时间）、关联股票代码、资金流水说明

## 请求

| 基本信息        |                                              |
|-------------|----------------------------------------------|
| HTTP URL    | https://openapi.longbridge.xyz/v1/trade/asset/cashflow |
| HTTP Method | GET                                         |
| 权限要求        | 接口权限                                         |

### 请求头

| 名称            | 类型     | 必须  | 描述                                        |
|---------------|--------|-----|-------------------------------------------|
| Authorization | string | 是   |                                           |
| Content-Type  | string | 是   | **固定值**："application/json; charset=utf-8" |

### 请求体

| 名称              | 类型     | 必须  | 描述                                                   | 默认值 | 示例      |
|-----------------|--------|-----|------------------------------------------------------|-----|---------|
| start_time          | string | 否   | 开始时间     (⚠️实际类型为 int)                                           |     | 1650037563 |
| end_time          | string | 否   | 终止时间      (⚠️实际类型为 int)                                           |     | 1650337563 |
| business_type          | string | 否   | 资金类型; 1:现金 2:股票 3:基金 (⚠️实际类型为 int)                                         |    | 2 |
| symbol          | string | 否   | 标的代码                                                 |     | AAPL.US |
| page          | string | 否   | 分页 (⚠️实际类型为 int)                                                 |     | 1 |
| size      | string | 是   | 每页大小 (⚠️实际类型为 int)      |     | 50      |

## 响应

### 响应体

| 名称                                      | 类型       | 描述           |
|-----------------------------------------|----------|--------------|
| code                                    | int      | 错误码，非 0 表示失败 |
| msg                                     | string   | 错误描述         |
| data                                    | object   |              |
| <font color="grey">+</font>list      | object[]      | 流水信息     |
| <font color="grey">++</font> transaction_flow_name       | string |      流水名称        |
| <font color="grey">++</font> direction          | string      |  流出方向；1:流出 2:流入  (⚠️实际类型为 int)           |
| <font color="grey">++</font> business_type | string       |    资金类别 1:现金，2:股票，3:基金  (⚠️实际类型为 int)         |
| <font color="grey">++</font> balance | string       | 资金金额             |
| <font color="grey">++</font> currency | string       |  资金币种            |
| <font color="grey">++</font> business_time | string       |  业务时间   (⚠️实际类型为 int)          |
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

| HTTP Status | 错误码     | 描述                | 排查建议                                          |
|---------|---------|-------------------|-----------------------------------------------|
| 500     | 202001 | internal err      | 一般可能是系统内部发生错误导致，建议根据返回的具体错误进行排查          |
| 500     | 202201 | get userinfo error      | 获取到的账号信息错误，一般是绑定的账号有问题，建议根据返回的具体错误进行排查          |
| 500     | 202202 | request param error | 一般可能是由于参数错误致，建议根据返回的具体错误进行排查  |
| 500     | 202203 | call inner interface err | 一般可能是由于内部系统接口调用错误，建议根据返回的具体错误进行排查  |
