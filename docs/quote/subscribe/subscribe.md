---
id: quote_subscribe
title: 订阅行情数据
slug: subscribe
sidebar_position: 2
---

订阅行情数据

:::info

协议指令：`6`

:::

## Request

### Parameters

| 名称          | 类型                            | 必须 | 描述                                           | 示例        |
| ------------- | ------------------------------- | ---- | ---------------------------------------------- | ----------- |
| symbol        | string[]                        | 是   | 订阅的标的代码                                 | `00700.HK ` |
| sub_type      | [SubType](../objects#subtype)[] | 是   | 订阅的数据类型                                 | `1,2`       |
| is_first_push | bool                            | 是   | 订阅后是否立刻进行一次数据推送。(trade 不支持) | `true`      |

### Protobuf

```protobuf
message SubscribeRequest {
  repeated string symbol = 1;
  repeated SubType sub_type = 2;
  bool is_first_push = 3;
}
```

## Response

### Response Properties

返回本次请求订阅成功的标的和类型。

| 名称      | 类型                            | 描述           |
| --------- | ------------------------------- | -------------- |
| sub_list  | object[]                        | 订阅的数据     |
| ∟symbol   | string                          | 标的代码       |
| ∟sub_type | [SubType](../objects#subtype)[] | 订阅的数据类型 |

### Protobuf

```protobuf
message SubscriptionResponse {
  repeated SubTypeList sub_list = 1;
}

message SubTypeList {
  string symbol = 1;
  repeated SubType sub_type = 2;
}
```

## 接口限制

:::caution

- 每秒平均请求次数 10，瞬时并发次数 5。
- 每个用户同时订阅标的数量最多为 100。
- 港股 BMP 行情不支持行情数据推送。

:::

## 错误码

| 协议错误码 | 业务错误码 | 描述             | 排查建议               |
| ---------- | ---------- | ---------------- | ---------------------- |
| 3          | 301600     | 无效的请求       | 请求参数有误或解包失败 |
| 3          | 301606     | 限流             | 降低请求频次           |
| 7          | 301602     | 服务端内部错误   |                        |
| 7          | 301605     | 订阅数量超出限制 |                        |
| 7          | 301600     | 请求参数有误     | 检查请求的 `sub_type`  |
