---
id: trade_push
title: 交易推送
slug: trade-push
sidebar_position: 5
---

客戶端可以通過交易長連接網關獲取到交易和資產的變更通知

## 訂閱

:::info
指令：`16`
:::

protobuf 定義如下：

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
  repeated string success = 1; // 訂閱成功
  repeated Fail fail = 2; // 訂閱失敗
  repeated string current = 3;  // 當前訂閱
}

```

目前支持的 topic：

- private - 交易和資產類的私有通知

## 取消訂閱

:::info
指令：`17`
:::

取消訂閱用於取消訂閱信息。

protobuf 定義如下：

```protobuf
// Unsub is Unsub command content, command is 17
message Unsub {
  repeated string topics = 1;
}

// UnsubResponse is response of Unsub request
message UnsubResponse {
  repeated string current = 3; // 當前訂閱
}
```

## 通知推送

:::info
指令：`18`
:::

當客戶端訂閱通知成功後，相應 `topic` 的消息達到服務端後，服務端會將通知推送給客戶端。

protobuf 定義如下：

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

## 業務數據

交易推送業務數據爲 `JSON` 格式，`Notification`.`ContentType` 爲 `CONTENT_JSON`

### 訂單通知

查看[交易命名詞典](./definition.md#websocket-推送通知)

### `Protobuf`

可以從我們的 [`Github` 倉庫](https://github.com/longbridgeapp/openapi-protobufs/tree/main/trade) 獲取最新交易相關 `Protobuf` 定義
