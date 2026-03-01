---
title: HTTP API 端点清单（来自 SDK）
id: http-endpoints
slug: /http-endpoints
sidebar_position: 3
---

本页根据 `longportapp/openapi` Rust SDK 源码（`rust/src`）整理，列出当前 SDK 实际调用的 HTTP API 路径，便于直接对照 HTTP 访问。

> 说明：本清单以 SDK 当前实现为准，若 SDK 更新，路径和方法可能变化。

## 基础域名

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

## Legacy（兼容）

| Method | Path |
| ------ | ---- |
| GET | `/v1/token/refresh` |

## 来源（SDK 代码位置）

- `rust/src/quote/context.rs`
- `rust/src/trade/context.rs`
- `rust/src/config.rs`

仓库：<https://github.com/longportapp/openapi/tree/main/rust/src>
