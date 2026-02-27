---
title: HTTP API 端点索引
id: http-api-endpoints
slug: /http-api-endpoints
sidebar_position: 2
---

这个页面基于当前文档里的 SDK 映射反向整理，目的是让 **API 附录** 中更容易检索 HTTP API。

## 交易类 API

| 方法 | HTTP URL | SDK 方法 | 详细文档 |
| --- | --- | --- | --- |
| GET | `/v1/trade/order/today` | `trade.today_orders` | [今日订单](../trade/order/today_orders) |
| GET | `/v1/trade/estimate/buy_limit` | `trade.estimate_max_purchase_quantity` | [预估最大可买数量](../trade/order/estimate_available_buy_limit) |
| POST | `/v1/trade/order` | `trade.submit_order` | [提交订单](../trade/order/submit) |
| PUT | `/v1/trade/order` | `trade.replace_order` | [修改订单](../trade/order/replace) |
| DELETE | `/v1/trade/order` | `trade.cancel_order` | [撤销订单](../trade/order/withdraw) |
| GET | `/v1/trade/order` | `trade.order_detail` | [订单详情](../trade/order/order_detail) |
| GET | `/v1/trade/order/history` | `trade.history_orders` | [历史订单](../trade/order/history_orders) |
| GET | `/v1/trade/execution/today` | `trade.today_executions` | [今日成交](../trade/execution/today_executions) |
| GET | `/v1/trade/execution/history` | `trade.history_executions` | [历史成交](../trade/execution/history_executions) |
| GET | `/v1/asset/account` | `trade.account_balance` | [账户余额](../trade/asset/account) |
| GET | `/v1/asset/cashflow` | `trade.cash_flow` | [现金流水](../trade/asset/cashflow) |
| GET | `/v1/asset/fund` | `trade.fund_positions` | [基金持仓](../trade/asset/fund) |
| GET | `/v1/asset/stock` | `trade.stock_positions` | [股票持仓](../trade/asset/stock) |
| GET | `/v1/risk/margin-ratio` | `trade.margin_ratio` | [保证金比例](../trade/asset/margin_ratio) |

## 行情类 API

| 方法 | HTTP URL | SDK 方法 | 详细文档 |
| --- | --- | --- | --- |
| GET | `/v1/quote/market_temperature` | `quote.market_temperature` | [市场温度](../quote/pull/market-temp) |
| GET | `/v1/quote/history_market_temperature` | `quote.history_market_temperature` | [历史市场温度](../quote/pull/history-market-temp) |
| GET | `/v1/quote/get_security_list` | `quote.security_list` | [标的列表](../quote/security/security) |
| GET | `/v1/watchlist/groups` | `quote.watchlist` | [自选组列表](../quote/individual/watchlist_groups) |
| POST | `/v1/watchlist/groups` | `quote.create_watchlist_group` | [创建自选组](../quote/individual/watchlist_create_group) |
| PUT | `/v1/watchlist/groups` | `quote.update_watchlist_group` | [更新自选组](../quote/individual/watchlist_update_group) |
| DELETE | `/v1/watchlist/groups` | `quote.delete_watchlist_group` | [删除自选组](../quote/individual/watchlist_delete_group) |

## 说明

- 鉴权、签名、请求基础规范请看 [总览](./how-to-access-api)。
- 每个接口的参数与请求/响应示例，请点击上面的“详细文档”。
- 下一步可继续补齐：从 SDK/协议自动生成更完整的参数快照。
