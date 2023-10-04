---
sidebar_position: -999
slug: /
title: OpenAPI 介紹
id: getting_started_introduce
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 簡介

LongPort OpenAPI 為有研發能力的投資者提供程序化行情交易接口，助力投資者根據自身投資策略搭建交易或行情策略分析工具。覆蓋以下類別功能：

- 交易類 - 創建、修改、撤銷訂單，當日/歷史訂單及成交記錄的查詢等
- 行情類 - 實時行情報價、歷史行情數的獲取等
- 資產類 - 實時賬戶資產、持倉、現金查詢等
- 實時訂閱 - 提供行情實時報價以及訂單狀態實時變更信息推送

## 接口類型

LongPort 提供接入底層服務的 HTTP / WebSockets 接口以及封裝在上層的 SDK（Python / C++ ...）等多種接入方式，靈活選擇。

## 如何開通

1. 登錄 [LongPort App](https://longportapp.com/download) 完成開戶；
2. 登錄 [longportapp.com](https://longportapp.com) 進入開發者平台，完成開發者認證即 OpenAPI 權限申請，獲取令牌。

## 使用權限及限制

:::caution

所有的接口都是有最小間隔限制的，所以理論上同一個接口都是不支持併發調用。

:::

### 交易類

| 市場     | 股票 ETF | 權證 | 期權 |
| -------- | -------- | ---- | ---- |
| 香港市場 | ✓        | ✓    |      |
| 美國市場 | ✓        | ✓    | ✓    |

#### 頻次限制

:::caution

- 30 秒內不超過 30 次調用，且每兩次調用之間間隔不小於 0.02 秒

:::

### 行情類

請訪問閲讀：[行情權限與限制](/docs/quote/level)

## 使用費用

LongPort 不針對接口服務額外收取開通或使用費用，只需開通 LongPort 賬戶及 OpenAPI 服務權限後即可免費使用。實際交易產生佣金費用或高級行情產品費用參考 [官網收費](https://longbridge.hk/rate) 說明或諮詢線上客服。

## 其他

OpenAPI 服務由 LongPort 及其適用的關聯公司提供（具體以協議為準）。
