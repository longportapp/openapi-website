---
title: API 介面目錄
id: api-endpoints-catalog
slug: /api-endpoints
sidebar_position: 1
---

按介面逐條列出所有 HTTP API，方便快速檢索與跳轉。

## ASSET

| Method | Path | API | Try-It |
| --- | --- | --- | --- |
| `GET` | `/v1/asset/account` | [獲取賬戶資金](../trade/asset/account) | [Try](../trade/asset/account?mode=try-it) |
| `GET` | `/v1/asset/cashflow` | [獲取資金流水](../trade/asset/cashflow) | [Try](../trade/asset/cashflow?mode=try-it) |
| `GET` | `/v1/asset/fund` | [獲取基金持倉](../trade/asset/fund) | [Try](../trade/asset/fund?mode=try-it) |
| `GET` | `/v1/asset/stock` | [獲取股票持倉](../trade/asset/stock) | [Try](../trade/asset/stock?mode=try-it) |

## QUOTE

| Method | Path | API | Try-It |
| --- | --- | --- | --- |
| `GET` | `/v1/quote/get_security_list` | [獲取標的列表](../quote/security/security) | [Try](../quote/security/security?mode=try-it) |
| `GET` | `/v1/quote/history_market_temperature` | [歷史市場溫度](../quote/pull/history-market-temp) | [Try](../quote/pull/history-market-temp?mode=try-it) |
| `GET` | `/v1/quote/market_temperature` | [當前市場溫度](../quote/pull/market-temp) | [Try](../quote/pull/market-temp?mode=try-it) |

## RISK

| Method | Path | API | Try-It |
| --- | --- | --- | --- |
| `GET` | `/v1/risk/margin-ratio` | [獲取保證金比例](../trade/asset/margin_ratio) | [Try](../trade/asset/margin_ratio?mode=try-it) |

## TRADE

| Method | Path | API | Try-It |
| --- | --- | --- | --- |
| `GET` | `/v1/trade/estimate/buy_limit` | [預估最大購買數量](../trade/order/estimate_available_buy_limit) | [Try](../trade/order/estimate_available_buy_limit?mode=try-it) |
| `GET` | `/v1/trade/execution/history` | [獲取歷史成交明細](../trade/execution/history_executions) | [Try](../trade/execution/history_executions?mode=try-it) |
| `GET` | `/v1/trade/execution/today` | [獲取當日成交明細](../trade/execution/today_executions) | [Try](../trade/execution/today_executions?mode=try-it) |
| `DELETE` | `/v1/trade/order` | [撤銷訂單](../trade/order/withdraw) | [Try](../trade/order/withdraw?mode=try-it) |
| `GET` | `/v1/trade/order` | [訂單詳情](../trade/order/order_detail) | [Try](../trade/order/order_detail?mode=try-it) |
| `POST` | `/v1/trade/order` | [委托下單](../trade/order/submit) | [Try](../trade/order/submit?mode=try-it) |
| `PUT` | `/v1/trade/order` | [修改訂單](../trade/order/replace) | [Try](../trade/order/replace?mode=try-it) |
| `GET` | `/v1/trade/order/history` | [獲取歷史訂單](../trade/order/history_orders) | [Try](../trade/order/history_orders?mode=try-it) |
| `GET` | `/v1/trade/order/today` | [獲取當日訂單](../trade/order/today_orders) | [Try](../trade/order/today_orders?mode=try-it) |

## WATCHLIST

| Method | Path | API | Try-It |
| --- | --- | --- | --- |
| `DELETE` | `/v1/watchlist/groups` | [刪除自選股分組](../quote/individual/watchlist_delete_group) | [Try](../quote/individual/watchlist_delete_group?mode=try-it) |
| `GET` | `/v1/watchlist/groups` | [獲取關注分組](../quote/individual/watchlist_groups) | [Try](../quote/individual/watchlist_groups?mode=try-it) |
| `POST` | `/v1/watchlist/groups` | [創建自選股分組](../quote/individual/watchlist_create_group) | [Try](../quote/individual/watchlist_create_group?mode=try-it) |
| `PUT` | `/v1/watchlist/groups` | [更新自選股分組](../quote/individual/watchlist_update_group) | [Try](../quote/individual/watchlist_update_group?mode=try-it) |

