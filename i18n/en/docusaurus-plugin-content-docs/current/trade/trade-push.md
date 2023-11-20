---
id: trade_push
title: Trade Push
slug: trade-push
sidebar_position: 5
---

Client can get real-time trade updates from trade gateway.

## Subscribe

:::info
Cmd: `16`
:::

Protobuf definition:

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
  repeated string success = 1; // success topics
  repeated Fail fail = 2; // failed topics
  repeated string current = 3;  // curent subscriptions after subscribe
}

```

Current support topics:

- private - private notification for trade

## Cancel Subscribe

:::info
Cmd: `17`
:::

Protobuf defination:

```protobuf
// Unsub is Unsub command content, command is 17
message Unsub {
  repeated string topics = 1;
}

// UnsubResponse is response of Unsub request
message UnsubResponse {
  repeated string current = 3; // current subscriptions after cancel subscribe
}
```

## Push Notification

:::info
Cmd: `18`
:::

After client subscribe success, subscribed `topic` notification wiil be pushed to client.

Protobuf defination:

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

## Data Format

Trade push data in `JSON` format, so `Notification.ContentType` is `CONTENT_JSON`

### Order Notification

Order Notification Content is defined [here](./trade-definition#websocket-notification)

### `Protobuf`

Our data protobuf defination is opensourced in [`Github`](https://github.com/longportapp/openapi-protobufs/tree/main/trade).
