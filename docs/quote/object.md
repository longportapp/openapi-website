---
id: quote_object
title: 行情对象
slug: quote-object
---

### TradeStatus
* 说明: 交易状态

| id | 描述  | 
|---- |-----|    
|0|正常交易|
|1|停牌|
|2|退市|
|3|熔断|
|4|新股待上市|
|5|代码变更|
|6|待开盘|
|7|拆合股暂停交易|
|8|已到期(衍生品)|
|9|轮证待上市|
|10|终止交易|


* proto
```
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

### TradeSession
* 说明：交易时段

| id | 描述  | 
|---- |-----|    
|0|盘中交易|
|1|盘前交易|
|2|盘后交易|


* proto
```
enum TradeSession {
  NORMAL_TRADE = 0;
  PRE_TRADE = 1;
  POST_TRADE = 2;
}
```

### Period
* 说明：k线周期

| id | 描述  | 
|---- |-----|
|1|一分钟k线|
|5|五分钟k线|
|15|十五分钟k线|
|30|三十分钟k线|
|60|六十分钟k线|
|1000|日k线|
|2000|周k线|
|3000|月k线|
|4000|年k线|

* proto
```
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

### AdjustType
* 说明：k线复权类型

| id | 描述  | 
|---- |-----|    
|0|除权|
|1|前复权|


* proto
```
enum AdjustType {
  NO_ADJUST = 0;
  FORWARD_ADJUST = 1;
}
```