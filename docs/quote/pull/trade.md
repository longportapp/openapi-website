---
id: quote_trade
title: 获取标的成交明细
slug: trade
sidebar_position: 8
---

获取标的的成交明细

:::info

协议指令：`17`

:::

## Request

### Parameters

| 名称   | 类型   | 必须 | 描述                      | 默认值 | 示例     |
| ------ | ------ | ---- | ------------------------- | ------ | -------- |
| symbol | string | 是   | 标的代码。ticker.region。 |        | 00700.HK |
| count  | int32  | 是   | 请求的逐笔明细数量        |        | 100      |

### Protobuf

```protobuf
message SecurityTradeRequest {
  string symbol = 1;
  int32 count = 2;
}
```

## Response

### Response Properties

| 名称           | 类型                                   | 描述                                                                                                                                                                                 |
| -------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| symbol         | string                                 | 标的代码                                                                                                                                                                             |
| trades         | object[]                               | 逐笔明细数据                                                                                                                                                                         |
| ∟price         | string                                 | 价格                                                                                                                                                                                 |
| ∟volume        | int64                                  | 成交量                                                                                                                                                                               |
| ∟timestamp     | int64                                  | 成交时间                                                                                                                                                                             |
| ∟trade_type    | string                                 | 交易类型：<br /><br />`*` - 场外交易<br />`D` - 碎股交易<br />`M` - 非自动对盘<br />`P` - 开市前成交盘<br />`U` - 竞价交易<br />`X` - 同一券商非自动对盘<br />`Y` - 同一券商自动对盘 |
| ∟direction     | int32                                  | 交易方向：<br /><br />`0` - nature<br />`1` - down<br />`2` - up                                                                                                                     |
| ∟trade_session | [TradeSession](../object#tradesession) | 交易时段                                                                                                                                                                             |

### Protobuf

```protobuf
message SecurityTradeResponse {
  string symbol = 1;
  repeated Trade trades = 2;
}

message Trade {
  string price = 1;
  int64 volume = 2;
  int64 timestamp = 3;
  string trade_type = 4;
  int32 direction = 5;
  TradeSession trade_session = 6;
}
```

## 接口限制

:::caution

- 每秒平均请求次数 10，瞬时并发次数 5。
- 请求明细数量最大为 1000。

:::

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                         |
| ---------- | ---------- | -------------- | -------------------------------- |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败           |
| 3          | 301606     | 限流           | 降低请求频次                     |
| 7          | 301602     | 服务端内部错误 |                                  |
| 7          | 301600     | 请求标的不存在 | 检查请求的 `symbol` 是否正确     |
| 7          | 301603     | 标的无行情     | 标的没有请求的行情数据           |
| 7          | 301604     | 无权限         | 没有获取标的行情的权限           |
| 7          | 301607     | 接口限制       | 请求的数据数量超限，减少数据数量 |
