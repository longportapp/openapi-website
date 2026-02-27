---
title: HTTP API 端點索引
id: http-api-endpoints
slug: /http-api-endpoints
sidebar_position: 2
---

此頁基於目前文件中的 SDK 映射反向整理，目標是讓 **API Reference** 更容易檢索 HTTP API。

## 交易類 API

| 方法 | HTTP URL | SDK 方法 | 詳細文件 |
| --- | --- | --- | --- |
| GET | `/v1/trade/order/today` | `trade.today_orders` | [今日訂單](../trade/order/today_orders) |
| GET | `/v1/trade/estimate/buy_limit` | `trade.estimate_max_purchase_quantity` | [預估最大可買數量](../trade/order/estimate_available_buy_limit) |
| POST | `/v1/trade/order` | `trade.submit_order` | [提交訂單](../trade/order/submit) |
| PUT | `/v1/trade/order` | `trade.replace_order` | [修改訂單](../trade/order/replace) |
| DELETE | `/v1/trade/order` | `trade.cancel_order` | [撤銷訂單](../trade/order/withdraw) |
| GET | `/v1/trade/order` | `trade.order_detail` | [訂單詳情](../trade/order/order_detail) |
| GET | `/v1/trade/order/history` | `trade.history_orders` | [歷史訂單](../trade/order/history_orders) |
| GET | `/v1/trade/execution/today` | `trade.today_executions` | [今日成交](../trade/execution/today_executions) |
| GET | `/v1/trade/execution/history` | `trade.history_executions` | [歷史成交](../trade/execution/history_executions) |
| GET | `/v1/asset/account` | `trade.account_balance` | [帳戶餘額](../trade/asset/account) |
| GET | `/v1/asset/cashflow` | `trade.cash_flow` | [現金流水](../trade/asset/cashflow) |
| GET | `/v1/asset/fund` | `trade.fund_positions` | [基金持倉](../trade/asset/fund) |
| GET | `/v1/asset/stock` | `trade.stock_positions` | [股票持倉](../trade/asset/stock) |
| GET | `/v1/risk/margin-ratio` | `trade.margin_ratio` | [保證金比例](../trade/asset/margin_ratio) |

## 行情類 API

| 方法 | HTTP URL | SDK 方法 | 詳細文件 |
| --- | --- | --- | --- |
| GET | `/v1/quote/market_temperature` | `quote.market_temperature` | [市場溫度](../quote/pull/market-temp) |
| GET | `/v1/quote/history_market_temperature` | `quote.history_market_temperature` | [歷史市場溫度](../quote/pull/history-market-temp) |
| GET | `/v1/quote/get_security_list` | `quote.security_list` | [標的列表](../quote/security/security) |
| GET | `/v1/watchlist/groups` | `quote.watchlist` | [自選組列表](../quote/individual/watchlist_groups) |
| POST | `/v1/watchlist/groups` | `quote.create_watchlist_group` | [建立自選組](../quote/individual/watchlist_create_group) |
| PUT | `/v1/watchlist/groups` | `quote.update_watchlist_group` | [更新自選組](../quote/individual/watchlist_update_group) |
| DELETE | `/v1/watchlist/groups` | `quote.delete_watchlist_group` | [刪除自選組](../quote/individual/watchlist_delete_group) |

## 說明

- 鑑權、簽名與請求基礎規範請看 [總覽](./how-to-access-api)。
- 每個接口的參數與請求/回應範例，請點擊上方「詳細文件」。
- 下一步可繼續補齊：從 SDK/協議自動生成更完整的參數快照。
