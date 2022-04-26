---
id: push_depth
title: 实时盘口推送
slug: depth
sidebar_position: 2
---

订阅的标的的实时盘口推送。

:::info

协议指令：`102`

:::

## 数据格式

### Properties

| 名称       | 类型     | 描述                      |
| ---------- | -------- | ------------------------- |
| symbol     | string   | 标的代码，例如：`AAPL.US` |
| sequence   | int64    | 序列号                    |
| ask        | object[] | 卖盘                      |
| ∟position  | int32    | 档位                      |
| ∟price     | string   | 价格                      |
| ∟volume    | int64    | 挂单辆                    |
| ∟order_num | int64    | 订单数量                  |
| bid        | object[] | 买盘                      |
| ∟position  | int32    | 档位                      |
| ∟price     | string   | 价格                      |
| ∟volume    | int64    | 挂单辆                    |
| ∟order_num | int64    | 订单数量                  |

### Protobuf

```protobuf
message PushDepth {
  string symbol = 1;
  int64 sequence = 2;
  repeated Depth ask = 3;
  repeated Depth bid = 4;
}

message Depth {
  int32 position = 1;
  string price = 2;
  int64 volume = 3;
  int64 order_num = 4;
}
```
