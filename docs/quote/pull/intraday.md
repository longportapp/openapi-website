---
id: quote_intraday
title: 获取标的当日分时
slug: intraday
sidebar_position: 9
---

获取标的的当日分时。

### 协议指令

```
18
```

## 请求

### 参数

| 名称   | 类型   | 必须 | 描述                        | 默认值 | 示例       |
| ------ | ------ | ---- | --------------------------- | ------ | ---------- |
| symbol | string | 是   | 标的代码，`ticker.region`。 |        | `00700.HK` |

### proto

```protobuf
message SecurityIntradayRequest {
  string symbol = 1;
}
```

## 响应

### 参数

| 名称       | 类型     | 描述               |
| ---------- | -------- | ------------------ |
| symbol     | string   | 标的代码           |
| lines      | object[] | 分时数据           |
| ∟price     | string   | 当前分钟的收盘价格 |
| ∟timestamp | int64    | 当前分钟的开始时间 |
| ∟volume    | int64    | 成交量             |
| ∟turnover  | string   | 成交额             |
| ∟avg_price | string   | 均价               |

### proto

```
message SecurityIntradayResponse{
  string symbol = 1;
  repeated Line lines = 2;
}

message Line {
  string price = 1;
  int64 timestamp = 2;
  int64 volume = 3;
  string turnover = 4;
  string avg_price = 5;
}
```

## 接口限制

- 每秒平均请求次数 10。
- 瞬时并发次数 5。

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                     |
| ---------- | ---------- | -------------- | ---------------------------- |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败       |
| 3          | 301606     | 限流           | 降低请求频次                 |
| 7          | 301602     | 服务端内部错误 |                              |
| 7          | 301600     | 请求标的不存在 | 检查请求的 `symbol` 是否正确 |
| 7          | 301603     | 标的无行情     | 标的没有请求的行情数据       |
| 7          | 301604     | 无权限         | 没有获取标的行情的权限       |
