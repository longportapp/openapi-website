---
title: HTTP API Endpoints (from SDK)
id: http-endpoints
slug: /api
sidebar_position: 3
---

This section provides one page per endpoint mapped from Rust SDK source.

## Endpoint Pages

- [GET /v1/watchlist/groups](./http-endpoints/get-v1-watchlist-groups)
- [POST /v1/watchlist/groups](./http-endpoints/post-v1-watchlist-groups)
- [DELETE /v1/watchlist/groups](./http-endpoints/delete-v1-watchlist-groups)
- [PUT /v1/watchlist/groups](./http-endpoints/put-v1-watchlist-groups)
- [GET /v1/quote/get_security_list](./http-endpoints/get-v1-quote-get-security-list)
- [GET /v1/quote/market_temperature](./http-endpoints/get-v1-quote-market-temperature)
- [GET /v1/quote/history_market_temperature](./http-endpoints/get-v1-quote-history-market-temperature)
- [GET /v1/trade/execution/history](./http-endpoints/get-v1-trade-execution-history)
- [GET /v1/trade/execution/today](./http-endpoints/get-v1-trade-execution-today)
- [GET /v1/trade/order/history](./http-endpoints/get-v1-trade-order-history)
- [GET /v1/trade/order/today](./http-endpoints/get-v1-trade-order-today)
- [GET /v1/trade/order](./http-endpoints/get-v1-trade-order)
- [POST /v1/trade/order](./http-endpoints/post-v1-trade-order)
- [PUT /v1/trade/order](./http-endpoints/put-v1-trade-order)
- [DELETE /v1/trade/order](./http-endpoints/delete-v1-trade-order)
- [GET /v1/trade/estimate/buy_limit](./http-endpoints/get-v1-trade-estimate-buy-limit)
- [GET /v1/asset/account](./http-endpoints/get-v1-asset-account)
- [GET /v1/asset/cashflow](./http-endpoints/get-v1-asset-cashflow)
- [GET /v1/asset/fund](./http-endpoints/get-v1-asset-fund)
- [GET /v1/asset/stock](./http-endpoints/get-v1-asset-stock)
- [GET /v1/risk/margin-ratio](./http-endpoints/get-v1-risk-margin-ratio)
- [GET /v1/token/refresh (legacy)](./http-endpoints/get-v1-token-refresh)

## Source

- `rust/src/quote/context.rs`
- `rust/src/trade/context.rs`
- `rust/src/config.rs`
- Repository: <https://github.com/longportapp/openapi/tree/main/rust/src>
