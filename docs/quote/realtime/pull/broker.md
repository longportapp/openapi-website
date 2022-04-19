---
id: quote_brokers
title: 获取标的经纪队列
slug: quote-brokers
---

## get_security_brokers

### 介绍：
    获取标的的经纪队列
### 协议指令：
    15
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
|symbol|string|标的代码|
|ask_brokers|object[]|卖盘经纪队列|
|∟position|int32|档位|
|∟broker_ids|int32[]|券商席位Id|
|bid_brokers|object[]|买盘经纪队列|
|∟position|int32|档位|
|∟broker_ids|int32[]|券商席位Id|

* proto
```
message SecurityBrokersResponse {
  string symbol = 1;
  repeated Brokers ask_brokers = 2;
  repeated Brokers bid_brokers = 3;
}

message Brokers {
  int32 position = 1;
  repeated int32 broker_ids = 2;
}
```
### 接口限制
每秒平均请求次数10。瞬时并发次数5。
仅港股标的存在经纪队列数据。

### 错误码

| 协议错误码 | 业务错误码   | 描述  | 排查建议|
|-------|-------|-----|----|
|3 | 301600| 无效的请求|请求参数有误或解包失败|
|3 | 301606| 限流|降低请求频次|
|7 | 301602| 服务端内部错误||
|7 | 301600| 请求标的不存在|检查请求的symbol是否正确|
|7 | 301603| 标的无行情|标的没有请求的行情数据|
|7 | 301604| 无权限|没有获取标的行情的权限|


