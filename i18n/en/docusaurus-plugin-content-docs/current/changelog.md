---
id: changelog
title: Changelog
slug: changelog
sidebar_position: 7
---
## 2024-05-17

-	Add an interface to retrieve the list of securities
	- `GET /v1/quote/get_security_list` to retrieve the list of securities

## 2024-05-06

- Update the interface for Get Account Balance
  - `GET /v1/asset/account` Add response field (buy_power)

## 2024-04-29

- Remove `TSMPCT`, `TSMAMT` Order type

## 2024-04-15

- Add `last_share`, `last_price` field to [Trade push](https://open.longportapp.com/en/docs/trade/trade-definition#websocket-notification).

## 2024-04-13

- Add `remark` field to [Trade push](https://open.longportapp.com/en/docs/trade/trade-definition#websocket-notification).

## 2023-11-03

- Add quote history candlestick interface
  - Long connection `Business Command：27`, obtain the history candlestick of security

## 2023-08-17

- Update the interface for Get Account Balance
  - `GET /v1/asset/account` Add parameter (currency)

## 2023-04-12

- Update the interface for Get Stock Positions
  - `GET /v1/asset/stock` Add response field (init_quantity)

## 2023-04-11

- Added order details query interface
  - 'GET /v1/trade/order' Get the order details
- Added the Estimate Maximum Purchase Quantity interface
  - 'GET /v1/trade/estimate/buy_limit' Get the estimated maximum purchase quantity
- U.S. stock options add market order and condition order support

## 2022-07-18

- Update security static info interface
  - Long connection `Business Command：10`, response add `board` fields

## 2022-07-14

- Add get stock margin ratio interface
  - `GET /v1/risk/margin-ratio` Get stock margin ratio

## 2022-06-30

- Add get watched groups interface
  - `GET /v1/watchlist/groups` Get watched groups

## 2022-06-20

- Update account balance interface
  - `GET /v1/asset/account` Response to increase the net assets (net_assets), initial margin (init_margin), maintenance margin (maintenance_margin) fields
- Update position interface
  - `GET /v1/asset/stock` Support users to obtain option positions

## 2022-06-15

- Add quote capital interface
  - Long connection `Business Command:24`, obtain the daily capital distribution of security
  - Long connection `Business Command:25`, obtain the daily capital flow intraday of security
