---
id: changelog
title: 更新日誌
slug: changelog
sidebar_position: 7
---

## 2024-10-09

### SDK 2.0.0

- 連接伺服器時列印已開啟的行情包
- 交易 API 中的數量類型從 `int` 變更為 `Decimal`


## 2024-08-28

- SDK 中 `Depth.price` 字段从 `Decimal` 类型改为 `Optional[Decimal]` 类型

## 2024-05-17

- 下單及訂單查詢接口擴展 `outside_rth` 字段支持夜盤交易

## 2024-05-06

- 更新獲取賬戶資金接口
  - `GET /v1/asset/account` 增加 (buy_power) 返回字段

## 2024-04-29

- 刪除 `TSMPCT`, `TSMAMT` 訂單類型

## 2024-04-15

- [交易推送](https://open.longportapp.com/docs/trade/trade-definition#websocket-%E6%8E%A8%E9%80%81%E9%80%9A%E7%9F%A5) 新增`last_share`, `last_price`。

## 2024-04-13

- [交易推送](https://open.longportapp.com/docs/trade/trade-definition#websocket-%E6%8E%A8%E9%80%81%E9%80%9A%E7%9F%A5) 新增`remark`。

## 2023-11-03

- 新增行情曆史 K 線接口
  - 長連接 `Business Command：27` 獲取標的曆史 K 線

## 2023-08-17

- 更新獲取賬戶資金接口
  - `GET /v1/asset/account` 增加入參 (currency) 字段

## 2023-04-12

- 更新獲取股票持倉接口
  - `GET /v1/asset/stock` 增加開盤前初始持倉 (init_quantity) 字段

## 2023-04-11

- 新增訂單詳情查詢接口
  - `GET /v1/trade/order` 獲取訂單詳情
- 新增預估最大購買數量接口
  - `GET /v1/trade/estimate/buy_limit` 獲取預估最大購買數量接口
- 美股期權添加市價單和條件單支持

## 2022-07-18

- 更新標的基礎信息接口
  - 長連接 `Business Command：10` 響應增加 `board` 字段

## 2022-07-14

- 新增獲取保證金比例接口
  - `GET /v1/risk/margin-ratio` 獲取保證金比例

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
