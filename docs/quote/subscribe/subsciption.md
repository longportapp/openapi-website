---
id: quote_subscription
title: 获取已订阅标的行情
slug: quote-subscription
sidebar_position: 1
---

## get_subscription

### 介绍：
    获取已订阅标的行情
### 协议指令：
    5
### 请求

*proto
```
message SubscriptionRequest {
}
```

### 响应
* 参数

| 名称 | 类型   | 描述  | 
|-------|-------|-----|
|sub_list|object[]| 订阅的数据 |
|∟symbol|string| 标的代码 |
|∟sub_type|[SubType](../quote-object#SubType)[]| 订阅的数据类型 |

* proto
```
message SubscriptionResponse {
  repeated SubTypeList sub_list = 1;
}

message SubTypeList {
  string symbol = 1;
  repeated SubType sub_type = 2;
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


