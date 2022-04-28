---
id: trade_push
title: 交易推送
slug: trade-push
sidebar_position: 5
---

客户端可以通过交易长连接网关获取到交易和资产的变更通知

## 订阅

:::info
指令：`16`
:::

protobuf 定义如下：

```protobuf
// Sub is Sub command content, command is 16
message Sub {
  repeated string topics = 1;
}

// SubResponse is response of Sub Request
message SubResponse {
  message Fail {
    string topic = 1;
    string reason = 2;
  }
  repeated string success = 1; // 订阅成功
  repeated Fail fail = 2; // 订阅失败
  repeated string current = 3;  // 当前订阅
}

```

目前支持的 topic：

- private - 交易和资产类的私有通知

## 取消订阅

:::info
指令：`17`
:::

取消订阅用于取消订阅信息。

protobuf 定义如下：

```protobuf
// Unsub is Unsub command content, command is 17
message Unsub {
  repeated string topics = 1;
}

// UnsubResponse is response of Unsub request
message UnsubResponse {
  repeated string current = 3; // 当前订阅
}
```

## 通知推送

:::info
指令：`18`
:::

当客户端订阅通知成功后，相应 `topic` 的消息达到服务端后，服务端会将通知推送给客户端。

protobuf 定义如下：

```protobuf
// Dispatch type
enum DispatchType {
  DISPATCH_UNDEFINED = 0;
  DISPATCH_DIRECT = 1;
  DISPATCH_BROADCAST = 2;
}

enum ContentType {
  CONTENT_UNDEFINED = 0;
  CONTENT_JSON = 1;
  CONTENT_PROTO = 2;
}

// Notification is push message, command is 18
message Notification {
  string topic = 1;
  ContentType content_type = 2;
  DispatchType dispatch_type = 3;
  bytes data = 4;
}
```

## 业务数据

交易推送业务数据为 `JSON` 格式，`Notification`.`ContentType` 为 `CONTENT_JSON`

### 订单通知

查看[交易命名词典](./definition.md#websocket-推送通知)
