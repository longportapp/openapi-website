---
sidebar_position: 2
id: quote_object
title: Quote Naming Dictionary
slug: objects
---

### TradeStatus - Secrity Status

Security Status

| ID  | Description         |
| --- | ------------------- |
| 0   | Normal              |
| 1   | Suspension          |
| 2   | Delisted            |
| 3   | Fuse                |
| 4   | Papare List         |
| 5   | Code Moved          |
| 6   | To Be Opened        |
| 7   | Split Stock Halts   |
| 8   | Expired             |
| 9   | Warrant To BeListed |
| 10  | Suspend             |

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

### TradeSession - Trading Session

Trading Session

| ID  | Description   |
| --- | ------------- |
| 0   | Trading       |
| 1   | Pre-Tradeing  |
| 2   | Post-Tradeing |

#### Protobuf

```protobuf
enum TradeSession {
  NORMAL_TRADE = 0;
  PRE_TRADE = 1;
  POST_TRADE = 2;
}
```

### Period - Candlestick Period

| ID   | Description     |
| ---- | --------------- |
| 1    | One Minute      |
| 5    | Five Minutes    |
| 15   | Fifteen Minutes |
| 30   | Thirty Minutes  |
| 60   | Sixty Minutes   |
| 1000 | One Days        |
| 2000 | One Week        |
| 3000 | One Month       |
| 4000 | One Year        |

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

### AdjustType - Candlestick Adjustment Type

| ID  | Description    |
| --- | -------------- |
| 0   | Actual         |
| 1   | Adjust forward |

#### Protobuf

```protobuf
enum AdjustType {
  NO_ADJUST = 0;
  FORWARD_ADJUST = 1;
}
```

### SubType - Quote Type Of Subscription

| ID  | Description |
| --- | ----------- |
| 1   | Quote       |
| 2   | Depth       |
| 3   | Broker      |
| 4   | Trade       |

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
