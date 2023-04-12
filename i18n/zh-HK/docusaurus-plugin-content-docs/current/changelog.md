---
id: changelog
title: 更新日誌
slug: changelog
sidebar_position: 7
---

## 2022-07-18

- 更新標的基礎信息接口
  - 長連接 `Business Command：10` 響應增加 `board` 字段

## 2022-06-30

- 新增獲取關注分組接口
  - `GET /v1/watchlist/groups` 獲取關注分組

## 2022-06-20

- 更新賬號資金接口
  - `GET /v1/asset/account` 響應增加淨資產 (net_assets)、初始保證金 (init_margin)、維持保證金 (maintenance_margin) 字段
- 更新持倉接口
  - `GET /v1/asset/stock` 支持用戶獲取期權持倉

## 2022-06-15

- 新增行情資金流接口
  - 長連接 `Business Command：24` 獲取標的當日資金流向
  - 長連接 `Business Command：25` 獲取標的當日資金分佈

## 2022-07-14

- 新增獲取保證金比例接口
  - `GET /v1/risk/margin-ratio` 獲取保證金比例
