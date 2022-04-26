---
id: quote_warrant_filter
title: 获取轮证筛选列表
slug: warrant-filter
sidebar_position: 14
---

获取轮证筛选列表

:::info

协议指令：`23`

:::

## Request

### Parameters

| 名称          | 类型    | 必须 | 描述                                                                                                                 | 示例       |
| ------------- | ------- | ---- | -------------------------------------------------------------------------------------------------------------------- | ---------- |
| symbol        | string  | 是   | 标的代码，`ticker.region`。                                                                                          | `00700.HK` |
| filter_config | object  | 是   | 筛选条件                                                                                                             |            |
| ∟sort_by      | int32   | 是   | 根据哪一项数据进行排序，序号见响应数据 “排序序号” 字段。                                                             | `1`        |
| ∟sort_order   | int32   | 是   | 升降顺序<br /><br />`0` - 升序<br />`1` - 降序                                                                       | `0`        |
| ∟sort_offset  | int32   | 是   | 分页的第一条数据偏移量。                                                                                             | `0`        |
| ∟sort_count   | int32   | 是   | 分页的每一页数量                                                                                                     | `20`       |
| ∟type         | int32[] | 否   | 筛选轮证类型<br /><br />`0` - 认购<br />`1` - 认沽<br />`2` - 牛证<br />`3` - 熊证<br />`4` - 界内证                 |            |
| ∟issuer       | int32[] | 否   | [筛选发行商](./issuer)，发行商 ID 通过接口获取。                                                                     |            |
| ∟expiry_date  | int32[] | 否   | 筛选轮证过期时间。<br /><br />`1` - 低于 3 个月<br />`2` - 3 - 6 个月<br />`3` - 6 - 12 个月<br />`4` - 大于 12 个月 |            |
| ∟price_type   | int32[] | 否   | 筛选价内 / 价外<br /><br />`1` - 价内<br />`2` - 价外                                                                |            |
| ∟status       | int32[] | 否   | 筛选状态<br /><br />`2 `- 终止交易<br />`3` - 等待上市<br />`4` - 正常                                               |            |
| language      | int32   | 是   | 响应的语言<br /><br />`0` - 简体<br />`1` - English<br />`2`-繁体                                                    | `0`        |

### Protobuf

```protobuf
message WarrantFilterListRequest {
  string symbol = 1;
  FilterConfig filter_config = 2;
  int32 language = 3;
}

message FilterConfig {
  int32 sort_by = 1;
  int32 sort_order = 2;
  int32 sort_offset = 3;
  int32 sort_count = 4;
  repeated int32 type = 5;
  repeated int32 issuer = 6;
  repeated int32 expiry_date = 7;
  repeated int32 price_type = 8;
  repeated int32 status = 9;
}
```

## Response

### Response Properties

| 名称                | 类型     | 描述                             | 排序序号 |
| ------------------- | -------- | -------------------------------- | -------- |
| warrant_list        | object[] | 标的代码                         |          |
| ∟symbol             | string   | 标的代码                         |          |
| ∟name               | string   | 标的名称                         |          |
| ∟last_done          | string   | 最新价                           | 0        |
| ∟change_rate        | string   | 涨跌幅                           | 1        |
| ∟change_val         | string   | 涨跌额                           | 2        |
| ∟volume             | int64    | 成交量                           | 3        |
| ∟turnover           | string   | 成交额                           | 4        |
| ∟expiry_date        | string   | 到期日。YYMMDD                   | 5        |
| ∟strike_price       | string   | 行权价                           | 6        |
| ∟upper_strike_price | string   | 上限价                           | 7        |
| ∟lower_strike_price | string   | 下限价                           | 8        |
| ∟outstanding_qty    | string   | 街货量                           | 9        |
| ∟outstanding_ratio  | string   | 街货比                           | 10       |
| ∟premium            | string   | 溢价率                           | 11       |
| ∟itm_otm            | string   | 价内/价外                        | 12       |
| ∟implied_volatility | string   | 引伸波幅                         | 13       |
| ∟delta              | string   | 对冲值                           | 14       |
| ∟call_price         | string   | 收回价                           | 15       |
| ∟to_call_price      | string   | 据收回价                         | 16       |
| ∟effective_leverage | string   | 有效杠杆                         | 17       |
| ∟leverage_ratio     | string   | 杠杆比率                         | 18       |
| ∟conversion_ratio   | string   | 换股比率                         | 19       |
| ∟balance_point      | string   | 打和点                           | 20       |
| ∟state              | string   | 状态。正常交易/等待上市/终止交易 | 21       |
| total_count         | int32    | 符合条件的轮证总数量             |          |

### Protobuf

```protobuf
message WarrantFilterListResponse {
  repeated FilterWarrant warrant_list = 1;
  int32 total_count = 2;
}

message FilterWarrant {
  string symbol = 1;
  string name = 2;
  string last_done = 3;
  string change_rate = 4;
  string change_val = 5;
  int64 volume = 6;
  string turnover = 7;
  string expiry_date = 8;
  string strike_price = 9;
  string upper_strike_price = 10;
  string lower_strike_price = 11;
  string outstanding_qty = 12;
  string outstanding_ratio = 13;
  string premium = 14;
  string itm_otm = 15;
  string implied_volatility = 16;
  string delta = 17;
  string call_price = 18;
  string to_call_price = 19;
  string effective_leverage = 20;
  string leverage_ratio = 21;
  string conversion_ratio = 22;
  string balance_point = 23;
  string state = 24;
}
```

## 接口限制

:::caution

- 每秒平均请求次数 10，瞬时并发次数 5。
- 每页数据数量最大为 100。

:::

## 错误码

| 协议错误码 | 业务错误码 | 描述           | 排查建议                     |
| ---------- | ---------- | -------------- | ---------------------------- |
| 3          | 301600     | 无效的请求     | 请求参数有误或解包失败       |
| 3          | 301606     | 限流           | 降低请求频次                 |
| 7          | 301602     | 服务端内部错误 |                              |
| 7          | 301600     | 请求标的不存在 | 检查请求的 `symbol` 是否正确 |
| 7          | 301603     | 标的无行情     | 标的没有请求的行情数据       |
| 7          | 301604     | 无权限         | 没有获取标的行情的权限       |
| 7          | 301607     | 接口限制       | 减少每页数据数量             |
