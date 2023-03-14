---
id: log_change
title: Change Log
slug: log_change
sidebar_position: 7
---

## 2022-07-18

- Update security static info interface
  - Long connection `Business Command：10`, response add `board` fields

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

## 2022-07-14

- Add get stock margin ratio interface
  - `GET /v1/risk/margin-ratio` Get stock margin ratio
