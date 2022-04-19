---
id: trade-asset-account
slug: trade-asset-account
title: 账户资金信息
---

#  查询账户资金信息


<font color='gray' size='2'>最后更新于 2022-04-19</font>

 - 返回每个币种可用、可取、冻结、待结算金额、在途资金（基金申购赎回、打新认购等场景）

## 请求

| 基本信息        |                                              |
|-------------|----------------------------------------------|
| HTTP URL    | https://openapi.longbridge.sg/v1/trade/asset/GetAccountCashInfo |
| HTTP Method | GET                                         |
| 权限要求        | 资产查看权限                                         |

### 请求头

| 名称            | 类型     | 必须  | 描述                                        |
|---------------|--------|-----|-------------------------------------------|
| Authorization | string | 是   |                                           |
| Content-Type  | string | 是   | **固定值**："application/json; charset=utf-8" |

### 请求体

| 名称              | 类型     | 必须  | 描述                                                   | 默认值 | 示例      |
|-----------------|--------|-----|------------------------------------------------------|-----|---------|


## 响应

### 响应体

| 名称                                      | 类型       | 描述           |
|-----------------------------------------|----------|--------------|
| code                                    | int      | 错误码，非 0 表示失败 |
| msg                                     | string   | 错误描述         |
| data                                    | object   |              |
| <font color="grey">+</font>list      | object[]      | 账户资金信息信息     |
| <font color="grey">++</font> total_cash       | string |      现金总额        |
| <font color="grey">++</font> max_finance_amount          | int      |   最大融资金额            |
| <font color="grey">++</font> remaining_finance_amount | int       |    剩余融资金额          |
| <font color="grey">++</font> risk_level | string       | 风控等级             |
| <font color="grey">++</font> margin_call | string       |  追缴保证金            |
| <font color="grey">++</font> currency | int       |  币种            |
| <font color="grey">++</font> cashInfos | object[]       |    现金详情          |
| <font color="grey">+++</font> withdraw_cash | string       |   可提现金           |
| <font color="grey">+++</font> available_cash | string       |   可用现金          |
| <font color="grey">+++</font> frozen_cash | string       |   冻结现金           |
| <font color="grey">+++</font> settling_cash | string       |   待结算现金           |
| <font color="grey">+++</font> currency | string       |   币种           |




### 响应体示例

```

{
        "list": [{
                "total_cash": "1759070010.72",
                "max_finance_amount": "977582000",
                "remaining_finance_amount": "0",
                "risk_level": "1",
                "margin_call": "2598051051.50",
                "currency": "HKD",
                "cashInfos": [{
                        "withdraw_cash": "97592.30",
                        "available_cash": "195902464.37",
                        "frozen_cash": "11579339.13",
                        "settling_cash": "207288537.81",
                        "currency": "HKD"
                }, {
                        "withdraw_cash": "199893416.74",
                        "available_cash": "199893416.74",
                        "frozen_cash": "28723.76",
                        "settling_cash": "-276806.51",
                        "currency": "USD"
                }]
        }]
}
```

### 错误码

| HTTP 状态码 | 错误码     | 描述                | 排查建议                                          |
|---------|---------|-------------------|-----------------------------------------------|
| 400     | 1470400 | bad request       | 一般可能是请求参数存在问题，导致请求失败，建议根据返回的具体错误进行排查          |
| 403     | 1470403 | request forbidden | 一般可能是因为操作者没有操作权限，导致被禁止操作。比如没有任务的编辑权限，却修改任务状态等 |