---
id: quote_unsubscribe
title: 取消订阅行情数据
slug: quote-unsubscribe
sidebar_position: 3
---

### 介绍：

    取消订阅行情数据

### 协议指令：

    7

### 请求

- 参数

| 名称      | 类型                           | 必须 | 描述                                                                                           | 默认值 | 示例     |
| --------- | ------------------------------ | ---- | ---------------------------------------------------------------------------------------------- | ------ | -------- |
| symbol    | string[]                       | 是   | 取消订阅的标的代码                                                                             |        | 00700.HK |
| sub_type  | [SubType](../object#subtype)[] | 是   | 取消订阅的数据类型                                                                             |        | 1,2      |
| unsub_all | bool                           | 是   | 是否全部取消。symbol 为空时，取消所有标的的订阅。symbol 不为空时，取消这些标的的所有类型订阅。 |        | true     |

\*proto

```
message SubscribeRequest {
  repeated string symbol = 1;
  repeated SubType sub_type = 2;
  bool unsub_all = 3;
}
```

### 响应

- proto

```
message UnsubscribeResponse{
}
```

### 接口限制

每秒平均请求次数 10。瞬时并发次数 5。

### 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议               |
| ---------- | ---------- | -------------- | ---------------------- |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败 |
| 3          | 301606     | 限流           | 降低请求频次           |
| 7          | 301602     | 服务端内部错误 |                        |
| 7          | 301600     | 请求参数有误   | 检查请求的 subtype     |
