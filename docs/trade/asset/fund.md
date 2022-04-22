---
id: trade-asset-fund
slug: trade-asset-fund
title: 基金持仓
---

#  查询基金持仓信息


<font color='gray' size='2'>最后更新于 2022-04-22</font>

- 提供包括账户、基金代码、持有份额、成本净值、当前净值、币种在内的基金持仓信息

## 请求

| 基本信息        |                                              |
|-------------|----------------------------------------------|
| HTTP URL    | https://openapi.longbridge.xyz/v1/trade/asset/fund |
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
| symbols          | []string | 否   | 基金代码数组                                                |     | ["21","3212","434"] |


## 响应

### 响应体

| 名称                                      | 类型       | 描述           |
|-----------------------------------------|----------|--------------|
| code                                    | int      | 错误码，非 0 表示失败 |
| msg                                     | string   | 错误描述         |
| data                                    | object   |              |
| <font color="grey">+</font>list      | object[]      | 流水信息     |
| <font color="grey">++</font> account_channel       | string |      账户类型        |
| <font color="grey">++</font> fund_info          | object[]      |  基金详情            |
| <font color="grey">+++</font> symbol | string       |    基金 isin 代码        |
| <font color="grey">+++</font> current_net_asset_value | string       | 当前净值             |
| <font color="grey">+++</font> net_asset_value_day | string       |  当前净值时间 (⚠️实际类型为int)            |
| <font color="grey">+++</font> symbol_name | string       |  基金名称            |
| <font color="grey">+++</font> currency | string       |    币种          |
| <font color="grey">++</font> cost_net_asset_value | string       |   成本净值           |




### 响应体示例

```
{
        "list": [{
                "account_channel": "lb",
                "fund_info": [{
                        "symbol": "HK0000447943",
                        "symbol_name": "GAOTENG EMERGING MARKETS PLUS  LONG/SHORT FIXED INCOME ALPHA FUND",
                        "currency": "USD",
                        "holding_units": "5.000",
                        "current_net_asset_value": "0",
                        "cost_net_asset_value": "0.00",
                        "net_asset_value_day": 1649865600
                }]
        }]
}
```

### 错误码

| HTTP 状态码 | 错误码     | 描述                | 排查建议                                          |
|---------|---------|-------------------|-----------------------------------------------|
| 500     | 202001 | internal err      | 一般可能是系统内部发生错误导致，建议根据返回的具体错误进行排查          |
| 500     | 202201 | get userinfo error      | 获取到的账号信息错误,一般是绑定的账号有问题，建议根据返回的具体错误进行排查          |
| 500     | 202202 | request param error | 一般可能是由于参数错误致，建议根据返回的具体错误进行排查  |
| 500     | 202203 | call inner interface err | 一般可能是由于内部系统接口调用错误，建议根据返回的具体错误进行排查  |
