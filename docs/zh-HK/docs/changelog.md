---
id: changelog
title: 更新日誌
slug: changelog
sidebar_position: 7
---

## 2026-04-09

### CLI v0.14.3

- **`portfolio` 指令** — 組合總損益、各市場資產分布、持倉及現金明細
- **`investors` 指令** — 基於 SEC 13F 資料的主動基金經理排行榜，按 CIK 查詢指定投資者持倉（含即時價格）
- **`watchlist pin/unpin`** — 將標的置頂至自選股分組頂部
- **`assets` 指令** — 原 `balance` 更名，展示完整資產概覽：淨資產、購買力、保證金、風險等級及分幣種現金明細

## 2026-04-08

### CLI v0.14.2

- **`--lang` 標誌** — 為所有指令指定內容語言（`zh-CN`、`zh-HK`、`en`），自動回退到系統 `LANG` 環境變數

## 2026-04-02

### CLI v0.14.1

- **CN 區域登入** — `longbridge login` 支援中國大陸區域路由
- **`-v` 標誌** — 快速查看版本號

### CLI v0.14.0

- **Device Auth** — Longbridge Developers 平台現已支援 OAuth Device Auth 授權流程；`longbridge login` 顯示驗證 URL 和 Code，可在任意裝置完成授權，支援 SSH 和無頭環境
- **訂單增強** — 支援追蹤止損和 AO 訂單類型；訂單指令新增 `--expire-date`、`--outside-rth`、`--remark` 參數
- **修復** — Linux 預建二進位改為 musl，修復在部分發行版的 Segfault

## 2026-04-01

### CLI v0.13.0

- 新增**基本面 & 分析**命令：
  - `financial-report` — 財務報表，支援期間和類型篩選
  - `valuation` — P/E、P/B、P/S、股息率快照，支援同行對比和歷史模式
  - `forecast-eps` — 分析師 EPS 預測一致預期
  - `consensus` — 營收/利潤/EPS 一致預期，帶超預期/未達預期標注
  - `institution-rating` / `institution-rating detail` — 評級分佈及月度趨勢
  - `shareholder` — 機構持股，支援變動追蹤和排序
  - `fund-holder` — 持有該標的的基金和 ETF
  - `dividend` / `dividend detail` — 分紅歷史和分配方案
  - `finance-calendar` — 財務日曆，支援按事件類型篩選（財務、報告、分紅、IPO、宏觀數據、停市）
  - `exchange-rate` — 所有支援貨幣的匯率
- CLI 命令按業務域重新分組命名

## 2026-03-30

- 新增結單 API：
  - `GET /v1/statement/list` — 查詢日結單或月結單列表
  - `GET /v1/statement/download` — 獲取指定結單文件的預簽名下載地址

## 2026-03-25

- 新增社區 API：
  - `GET /content/topics/mine` — 獲取我發布的討論列表
  - `POST /content/topics` — 創建社區討論
  - `GET /content/topics/{id}` — 獲取討論詳情
  - `GET /content/topics/{topic_id}/comments` — 獲取討論回覆列表
  - `POST /content/topics/{topic_id}/comments` — 創建討論回覆

## 2025-06-17

- 更新獲取賬戶資金接口
  - `GET /v1/asset/account` 增加 (frozen_transaction_fees) 返回字段

## 2024-10-09

### SDK 2.0.0

- 連接伺服器時列印已開啟的行情包
- 交易 API 中的數量類型從 `int` 變更為 `Decimal`

## 2024-09-11

- 更新獲取標的列表接口
  - `GET /v1/quote/get_security_list` 返回的多語言名稱根據請求頭 `accept-language` 返回對應字段，不再一次性返回三種語言名稱

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

- [交易推送](https://open.longbridge.com/docs/trade/trade-definition#websocket-%E6%8E%A8%E9%80%81%E9%80%9A%E7%9F%A5) 新增`last_share`, `last_price`。

## 2024-04-13

- [交易推送](https://open.longbridge.com/docs/trade/trade-definition#websocket-%E6%8E%A8%E9%80%81%E9%80%9A%E7%9F%A5) 新增`remark`。

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
