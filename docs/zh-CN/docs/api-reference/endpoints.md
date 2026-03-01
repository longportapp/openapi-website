---
title: API 接口目录
id: api-endpoints-catalog
slug: /api-endpoints
sidebar_position: 1
---

按接口逐条列出所有 HTTP API，便于快速检索与跳转。

## ASSET

| Method | Path | API | Try-It |
| --- | --- | --- | --- |
| `GET` | `/v1/asset/account` | [获取账户资金](../trade/asset/account) | [Try](../trade/asset/account?mode=try-it) |
| `GET` | `/v1/asset/cashflow` | [获取资金流水](../trade/asset/cashflow) | [Try](../trade/asset/cashflow?mode=try-it) |
| `GET` | `/v1/asset/fund` | [获取基金持仓](../trade/asset/fund) | [Try](../trade/asset/fund?mode=try-it) |
| `GET` | `/v1/asset/stock` | [获取股票持仓](../trade/asset/stock) | [Try](../trade/asset/stock?mode=try-it) |

## CONTENT

| Method | Path | API | Try-It |
| --- | --- | --- | --- |
| `GET` | `/v1/content/{symbol}/news` | [股票资讯](../content/security_news) | [Try](../content/security_news?mode=try-it) |

## QUOTE

| Method | Path | API | Try-It |
| --- | --- | --- | --- |
| `GET` | `/v1/quote/get_security_list` | [获取标的列表](../quote/security/security) | [Try](../quote/security/security?mode=try-it) |
| `GET` | `/v1/quote/history_market_temperature` | [历史市场温度](../quote/pull/history-market-temp) | [Try](../quote/pull/history-market-temp?mode=try-it) |
| `GET` | `/v1/quote/market_temperature` | [当前市场温度](../quote/pull/market-temp) | [Try](../quote/pull/market-temp?mode=try-it) |

## RISK

| Method | Path | API | Try-It |
| --- | --- | --- | --- |
| `GET` | `/v1/risk/margin-ratio` | [获取保证金比例](../trade/asset/margin_ratio) | [Try](../trade/asset/margin_ratio?mode=try-it) |

## TRADE

| Method | Path | API | Try-It |
| --- | --- | --- | --- |
| `GET` | `/v1/trade/estimate/buy_limit` | [预估最大购买数量](../trade/order/estimate_available_buy_limit) | [Try](../trade/order/estimate_available_buy_limit?mode=try-it) |
| `GET` | `/v1/trade/execution/history` | [获取历史成交明细](../trade/execution/history_executions) | [Try](../trade/execution/history_executions?mode=try-it) |
| `GET` | `/v1/trade/execution/today` | [获取当日成交明细](../trade/execution/today_executions) | [Try](../trade/execution/today_executions?mode=try-it) |
| `DELETE` | `/v1/trade/order` | [撤销订单](../trade/order/withdraw) | [Try](../trade/order/withdraw?mode=try-it) |
| `GET` | `/v1/trade/order` | [订单详情](../trade/order/order_detail) | [Try](../trade/order/order_detail?mode=try-it) |
| `POST` | `/v1/trade/order` | [委托下单](../trade/order/submit) | [Try](../trade/order/submit?mode=try-it) |
| `PUT` | `/v1/trade/order` | [修改订单](../trade/order/replace) | [Try](../trade/order/replace?mode=try-it) |
| `GET` | `/v1/trade/order/history` | [获取历史订单](../trade/order/history_orders) | [Try](../trade/order/history_orders?mode=try-it) |
| `GET` | `/v1/trade/order/today` | [获取当日订单](../trade/order/today_orders) | [Try](../trade/order/today_orders?mode=try-it) |

## WATCHLIST

| Method | Path | API | Try-It |
| --- | --- | --- | --- |
| `DELETE` | `/v1/watchlist/groups` | [删除自选股分组](../quote/individual/watchlist_delete_group) | [Try](../quote/individual/watchlist_delete_group?mode=try-it) |
| `GET` | `/v1/watchlist/groups` | [获取自选股分组](../quote/individual/watchlist_groups) | [Try](../quote/individual/watchlist_groups?mode=try-it) |
| `POST` | `/v1/watchlist/groups` | [创建自选股分组](../quote/individual/watchlist_create_group) | [Try](../quote/individual/watchlist_create_group?mode=try-it) |
| `PUT` | `/v1/watchlist/groups` | [更新自选股分组](../quote/individual/watchlist_update_group) | [Try](../quote/individual/watchlist_update_group?mode=try-it) |

