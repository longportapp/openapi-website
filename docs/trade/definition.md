---
id: trade_definition
title: 交易命名词典
slug: trade-definition
---

## OrderType

* 说明：订单类型

| 枚举值 | 描述  |
|---- |-----|
|LO| 限价单                      |
| ELO     | 增强限价单                  |
| MO      | 市价单                      |
| AO      | 竞价市价单                  |
| ALO     | 竞价限价单                  |
| ODD     | 碎股单挂单                  |
| LIT     | 触价限价单                  |
| MIT     | 触价市价单                  |
| TSLPAMT | 跟踪止损限价单 (跟踪金额)   |
| TSLPPCT | 跟踪止损限价单 (跟踪涨跌幅) |
| TSMAMT  | 跟踪止损市价单 (跟踪金额) |
| TSMPCT  | 跟踪止损市价单 (跟踪涨跌幅) |



## OrderStatus

* 说明：订单状态

| 枚举值               | 描述              |
| -------------------- | ----------------- |
| NotReported          | 待提交            |
| ReplacedNotReported  | 待提交 (改单成功) |
| ProtectedNotReported | 待提交 (保价订单) |
| VarietiesNotReported | 待提交 (条件单)   |
| FilledStatus         | 已成交            |
| WaitToNew            | 已提待报          |
| NewStatus            | 已委托            |
| WaitToReplace        | 修改待报          |
| PendingReplaceStatus | 待修改            |
| ReplacedStatus       | 已修改            |
| PartialFilledStatus  | 部分成交          |
| WaitToCancel         | 撤销待报          |
| PendingCancelStatus  | 待撤回            |
| RejectedStatus       | 已拒绝            |
| CanceledStatus       | 已撤单            |
| ExpiredStatus        | 已过期            |
| PartialWithdrawal    | 部分撤单          |

## Market

* 说明：市场

| 枚举值 | 描述 |
| ------ | ---- |
| HK     | 港股 |
| US     | 美股 |

