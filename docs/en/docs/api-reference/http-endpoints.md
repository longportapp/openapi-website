---
title: HTTP API Endpoints (from SDK)
id: http-endpoints
slug: /http-endpoints
sidebar_position: 3
---

This page is generated from the Rust SDK source in `longportapp/openapi` (`rust/src`) and lists the HTTP API paths actually used by SDK code.

> Note: This list follows current SDK implementation. Endpoints/methods may change when SDK updates.

## Base URL

- `https://openapi.longportapp.com`
- `https://openapi.longportapp.cn`

## Quote

| Method | Path |
| ------ | ---- |
| GET | `/v1/watchlist/groups` |
| POST | `/v1/watchlist/groups` |
| DELETE | `/v1/watchlist/groups` |
| PUT | `/v1/watchlist/groups` |
| GET | `/v1/quote/get_security_list` |
| GET | `/v1/quote/market_temperature` |
| GET | `/v1/quote/history_market_temperature` |

## Trade / Asset / Risk

| Method | Path |
| ------ | ---- |
| GET | `/v1/trade/execution/history` |
| GET | `/v1/trade/execution/today` |
| GET | `/v1/trade/order/history` |
| GET | `/v1/trade/order/today` |
| GET | `/v1/trade/order` |
| POST | `/v1/trade/order` |
| PUT | `/v1/trade/order` |
| DELETE | `/v1/trade/order` |
| GET | `/v1/trade/estimate/buy_limit` |
| GET | `/v1/asset/account` |
| GET | `/v1/asset/cashflow` |
| GET | `/v1/asset/fund` |
| GET | `/v1/asset/stock` |
| GET | `/v1/risk/margin-ratio` |

## Legacy (compatibility)

| Method | Path |
| ------ | ---- |
| GET | `/v1/token/refresh` |

## Source locations in SDK

- `rust/src/quote/context.rs`
- `rust/src/trade/context.rs`
- `rust/src/config.rs`

Repository: <https://github.com/longportapp/openapi/tree/main/rust/src>
