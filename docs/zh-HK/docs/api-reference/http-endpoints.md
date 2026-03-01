---
title: HTTP API 端點清單（來自 SDK）
id: http-endpoints
slug: /http-endpoints
sidebar_position: 3
---

本頁根據 `longportapp/openapi` Rust SDK 原始碼（`rust/src`）整理，列出 SDK 目前實際呼叫的 HTTP API 路徑，方便直接以 HTTP 方式對照。

> 說明：清單以 SDK 目前實作為準，SDK 更新後路徑或方法可能變更。

## 基礎網域

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

## Legacy（相容）

| Method | Path |
| ------ | ---- |
| GET | `/v1/token/refresh` |

## 來源（SDK 程式碼位置）

- `rust/src/quote/context.rs`
- `rust/src/trade/context.rs`
- `rust/src/config.rs`

倉庫：<https://github.com/longportapp/openapi/tree/main/rust/src>
