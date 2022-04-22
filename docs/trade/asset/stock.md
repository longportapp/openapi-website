---
id: trade-asset-stock
slug: trade-asset-stock
title: 股票持仓
---

#  查询股票持仓信息


<font color='gray' size='2'>最后更新于 2022-04-22</font>

- 提供包括账户、股票代码、持仓股数、可用股数、持仓均价（按账户设置计算均价方式）、币种在内的持仓信息

## 请求

| 基本信息        |                                              |
|-------------|----------------------------------------------|
| HTTP URL    | https://openapi.longbridge.xyz/v1/trade/asset/stock |
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
| symbols          | []string | 否   | 股票标的数组                                                 |     | ["1088.HK","9991.HK","2628.HK"] |

## 响应

### 响应体

| 名称                                      | 类型       | 描述           |
|-----------------------------------------|----------|--------------|
| code                                    | int      | 错误码，非 0 表示失败 |
| msg                                     | string   | 错误描述         |
| data                                    | object   |              |
| <font color="grey">+</font>list      | object[]      | 股票持仓信息     |
| <font color="grey">++</font> account_channel       | string |      渠道信息        |
| <font color="grey">++</font> stock_info          | object[]      |  股票列表            |
| <font color="grey">++</font> symbol | string       | 股票代码             |
| <font color="grey">++</font> symbol_name | string       |  股票名称            |
| <font color="grey">++</font> currency | string       |  币种            |
| <font color="grey">++</font> quality | string       |    持仓股数          |
| <font color="grey">++</font> available_quality | string       |   可用股数           |
| <font color="grey">++</font> cost_price | string       |   成本价格 (具体根据客户端选择平均买入还是摊薄成本)           |




### 响应体示例

```
{
        "list": [{
                "account_channel": "lb",
                "stock_info": [{
                        "symbol": "700.HK",
                        "symbol_name": "腾讯控股",
                        "currency": "HK",
                        "quality": "650",
                        "available_quality": "-450",
                        "cost_price": "457.53"
                }, {
                        "symbol": "9991.HK",
                        "symbol_name": "宝尊电商-SW",
                        "currency": "HK",
                        "quality": "200",
                        "available_quality": "0",
                        "cost_price": "32.25"
                }, {
                        "symbol": "TCEHY.US",
                        "symbol_name": "腾讯控股 (ADR)",
                        "currency": "US",
                        "quality": "10",
                        "available_quality": "10"
                }, {
                        "symbol": "2628.HK",
                        "symbol_name": "中国人寿",
                        "currency": "HK",
                        "quality": "9000",
                        "available_quality": "0"
                }, {
                        "symbol": "5.HK",
                        "symbol_name": "汇丰控股",
                        "currency": "HK",
                        "quality": "2400",
                        "available_quality": "2000"
                }, {
                        "symbol": "BABA.US",
                        "symbol_name": "阿里巴巴",
                        "currency": "US",
                        "quality": "2000209",
                        "available_quality": "2000209"
                }, {
                        "symbol": "2.HK",
                        "symbol_name": "中电控股",
                        "currency": "HK",
                        "quality": "2000",
                        "available_quality": "2000"
                },{
                        "symbol": "NOK.US",
                        "symbol_name": "诺基亚",
                        "currency": "US",
                        "quality": "1",
                        "available_quality": "0"
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
