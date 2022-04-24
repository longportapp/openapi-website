---
id: quote_depth
title: 获取标的盘口
slug: quote-depth
sidebar_position: 5
---

### 介绍：
    获取标的的盘口
### 协议指令：
    14
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
|symbol|string| 标的代码 |
|ask|object[]| 卖盘 |
|∟position|int32| 档位 |
|∟price|string| 价格 |
|∟volume|int64| 挂单辆 |
|∟order_num|int64| 订单数量 |
|bid|object[]| 买盘 |
|∟position|int32| 档位 |
|∟price|string| 价格 |
|∟volume|int64| 挂单辆 |
|∟order_num|int64| 订单数量 |

* proto
```
message SecurityDepthResponse {
  string symbol = 1;
  repeated Depth ask = 2;
  repeated Depth bid = 3;
}

message Depth {
  int32 position = 1;
  string price = 2;
  int64 volume = 3;
  int64 order_num = 4;
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
|7 | 301603| 标的无行情 | 标的没有请求的行情数据 |
|7 | 301604| 无权限 | 没有获取标的行情的权限 |


