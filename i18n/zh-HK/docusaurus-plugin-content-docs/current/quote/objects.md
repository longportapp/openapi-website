---
sidebar_position: 2
id: quote_object
title: 行情命名詞典
slug: objects
---

### TradeStatus - 交易狀態

交易狀態

| ID  | 描述            |
| --- | --------------- |
| 0   | 正常交易        |
| 1   | 停牌            |
| 2   | 退市            |
| 3   | 熔斷            |
| 4   | 新股待上市      |
| 5   | 代碼變更        |
| 6   | 待開盤          |
| 7   | 拆合股暫停交易  |
| 8   | 已到期 (衍生品) |
| 9   | 輪證待上市      |
| 10  | 終止交易        |

#### Protobuf

```protobuf
enum TradeStatus {
  NORMAL = 0;
  HALTED = 1;
  DELISTED = 2;
  FUSE = 3;
  PREPARE_LIST = 4;
  CODE_MOVED = 5;
  TO_BE_OPENED = 6;
  SPLIT_STOCK_HALTS = 7;
  EXPIRED = 8;
  WARRANT_PREPARE_LIST = 9;
  SUSPEND_TRADE = 10;
}
```

### TradeSession - 交易時段

交易時段

| ID  | 描述     |
| --- | -------- |
| 0   | 盤中交易 |
| 1   | 盤前交易 |
| 2   | 盤後交易 |

#### Protobuf

```protobuf
enum TradeSession {
  NORMAL_TRADE = 0;
  PRE_TRADE = 1;
  POST_TRADE = 2;
}
```

### Period - K 線週期

| ID   | 描述          |
| ---- | ------------- |
| 1    | 一分鐘 k 線   |
| 5    | 五分鐘 k 線   |
| 15   | 十五分鐘 k 線 |
| 30   | 三十分鐘 k 線 |
| 60   | 六十分鐘 k 線 |
| 1000 | 日 k 線       |
| 2000 | 週 k 線       |
| 3000 | 月 k 線       |
| 4000 | 年 k 線       |

#### Protobuf

```protobuf
enum Period {
  UNKNOWN_PERIOD = 0;
  ONE_MINUTE = 1;
  FIVE_MINUTE = 5;
  FIFTEEN_MINUTE = 15;
  THIRTY_MINUTE = 30;
  SIXTY_MINUTE = 60;
  DAY = 1000;
  WEEK = 2000;
  MONTH = 3000;
  YEAR = 4000;
}
```

### AdjustType - K 線復權類型

| ID  | 描述   |
| --- | ------ |
| 0   | 除權   |
| 1   | 前復權 |

#### Protobuf

```protobuf
enum AdjustType {
  NO_ADJUST = 0;
  FORWARD_ADJUST = 1;
}
```

### SubType - 訂閱數據的類型

| ID  | 描述     |
| --- | -------- |
| 1   | 價格     |
| 2   | 買賣盤口 |
| 3   | 經紀隊列 |
| 4   | 逐筆明細 |

#### Protobuf

```protobuf
enum SubType {
  UNKNOWN_TYPE = 0;
  QUOTE = 1;
  DEPTH = 2;
  BROKERS = 3;
  TRADE = 4;
}
```
