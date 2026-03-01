---
title: API Endpoints
id: api-endpoints-catalog
slug: /api-endpoints
sidebar_position: 1
---

All HTTP APIs, listed one-by-one for quick lookup and navigation.

## ASSET

| Method | Path | API | Try-It |
| --- | --- | --- | --- |
| `GET` | `/v1/asset/account` | [Get Account Balance](../trade/asset/account) | [Try](../trade/asset/account?mode=try-it) |
| `GET` | `/v1/asset/cashflow` | [Get Cash Flow](../trade/asset/cashflow) | [Try](../trade/asset/cashflow?mode=try-it) |
| `GET` | `/v1/asset/fund` | [Get Fund Positions](../trade/asset/fund) | [Try](../trade/asset/fund?mode=try-it) |
| `GET` | `/v1/asset/stock` | [Get Stock Positions](../trade/asset/stock) | [Try](../trade/asset/stock?mode=try-it) |

## CONTENT

| Method | Path | API | Try-It |
| --- | --- | --- | --- |
| `GET` | `/v1/content/{symbol}/news` | [News](../content/security_news) | [Try](../content/security_news?mode=try-it) |

## QUOTE

| Method | Path | API | Try-It |
| --- | --- | --- | --- |
| `GET` | `/v1/quote/get_security_list` | [Retrieve the List of Securities](../quote/security/security) | [Try](../quote/security/security?mode=try-it) |
| `GET` | `/v1/quote/history_market_temperature` | [Historical Market Temperature](../quote/pull/history-market-temp) | [Try](../quote/pull/history-market-temp?mode=try-it) |
| `GET` | `/v1/quote/market_temperature` | [Current Market Temperature](../quote/pull/market-temp) | [Try](../quote/pull/market-temp?mode=try-it) |

## RISK

| Method | Path | API | Try-It |
| --- | --- | --- | --- |
| `GET` | `/v1/risk/margin-ratio` | [Get Margin Ratio](../trade/asset/margin_ratio) | [Try](../trade/asset/margin_ratio?mode=try-it) |

## TRADE

| Method | Path | API | Try-It |
| --- | --- | --- | --- |
| `GET` | `/v1/trade/estimate/buy_limit` | [Estimate Maximum Purchase Quantity](../trade/order/estimate_available_buy_limit) | [Try](../trade/order/estimate_available_buy_limit?mode=try-it) |
| `GET` | `/v1/trade/execution/history` | [Get History Executions](../trade/execution/history_executions) | [Try](../trade/execution/history_executions?mode=try-it) |
| `GET` | `/v1/trade/execution/today` | [Get Today Executions](../trade/execution/today_executions) | [Try](../trade/execution/today_executions?mode=try-it) |
| `DELETE` | `/v1/trade/order` | [Withdraw Order](../trade/order/withdraw) | [Try](../trade/order/withdraw?mode=try-it) |
| `GET` | `/v1/trade/order` | [Order Details](../trade/order/order_detail) | [Try](../trade/order/order_detail?mode=try-it) |
| `POST` | `/v1/trade/order` | [Submit Order](../trade/order/submit) | [Try](../trade/order/submit?mode=try-it) |
| `PUT` | `/v1/trade/order` | [Replace Order](../trade/order/replace) | [Try](../trade/order/replace?mode=try-it) |
| `GET` | `/v1/trade/order/history` | [Get History Order](../trade/order/history_orders) | [Try](../trade/order/history_orders?mode=try-it) |
| `GET` | `/v1/trade/order/today` | [Get Today Order](../trade/order/today_orders) | [Try](../trade/order/today_orders?mode=try-it) |

## WATCHLIST

| Method | Path | API | Try-It |
| --- | --- | --- | --- |
| `DELETE` | `/v1/watchlist/groups` | [Delete Watchlist Group](../quote/individual/watchlist_delete_group) | [Try](../quote/individual/watchlist_delete_group?mode=try-it) |
| `GET` | `/v1/watchlist/groups` | [Watchlist Group](../quote/individual/watchlist_groups) | [Try](../quote/individual/watchlist_groups?mode=try-it) |
| `POST` | `/v1/watchlist/groups` | [Create Watchlist Group](../quote/individual/watchlist_create_group) | [Try](../quote/individual/watchlist_create_group?mode=try-it) |
| `PUT` | `/v1/watchlist/groups` | [Update Watchlist Group](../quote/individual/watchlist_update_group) | [Try](../quote/individual/watchlist_update_group?mode=try-it) |

