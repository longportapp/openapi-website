---
id: quote_optionchain_date
title: 获取标的的期权链到期日列表
slug: quote-optionchain-date
---

## get_optionchain_date_list

### 介绍：
    获取标的的期权链到期日列表
### 协议指令：
    20
### 请求
* 参数

| 名称 | 类型   | 必须  | 描述      |  默认值  |  示例   |
|-------|-------|-----|---------|-----|----|
| symbol | string   | 是  | 标的代码。ticker.region。  | | 00700.HK|

* proto
```
message SecurityRequest {
  string symbol = 1;
}
```
### 响应
* 参数

| 名称 | 类型   | 描述  | 
|-------|-------|-----|
|expiry_date|string[]| 标的对应的期权链到期日列表。 日期格式：YYMMDD|

* proto
```
message OptionChainDateListResponse {
  repeated string expiry_date = 1;
}
```
### 接口限制
每秒平均请求次数 10。瞬时并发次数 5。

### 错误码

| 协议错误码 | 业务错误码   | 描述  | 排查建议 |
|-------|-------|-----|----|
|3 | 301600| 无效的请求 | 请求参数有误或解包失败 |
|3 | 301606| 限流 | 降低请求频次 |
|7 | 301602| 服务端内部错误 ||
|7 | 301600| 请求标的不存在 | 检查请求的 symbol 是否正确 |

