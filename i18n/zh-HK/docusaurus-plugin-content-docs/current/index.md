---
sidebar_position: -999
slug: /
title: OpenAPI 介紹
id: getting_started_introduce
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 簡介

Longbridge OpenAPI 為有研發能力的投資者提供程序化行情交易接口，助力投資者根據自身投資策略搭建交易或行情策略分析工具。覆蓋以下類別功能：

- 交易類 - 創建、修改、撤銷訂單，當日/歷史訂單及成交記錄的查詢等
- 行情類 - 實時行情報價、歷史行情數的獲取等
- 資產類 - 實時賬戶資產、持倉、現金查詢等
- 實時訂閱 - 提供行情實時報價以及訂單狀態實時變更信息推送

## 接口類型

Longbridge 提供接入底層服務的 HTTP / WebSockets 接口以及封裝在上層的 SDK（Python / C++ ...）等多種接入方式，靈活選擇。

## 如何開通

1. 登錄 [Longbridge App](https://longbridgeapp.com/download) 或官網 [longbridgehk.com](https://longbridge.hk) 完成長橋綜合賬戶的開戶（目前不支持長橋標準賬戶的接口服務）；
2. 登錄 [longbridgeapp.com](https://longbridgeapp.com) 進入開發者平台，完成開發者認證即 OpenAPI 權限申請，獲取令牌。

## 使用權限及限制

⚠️ 所有的接口都是有最小間隔限制的，所以理論上同一個接口都是不支持併發調用。

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

<table>
    <tr>
        <td>市場</td>
        <td>標的</td>
        <td>權限獲取方式</td>
    </tr>
    <tr>
        <td rowspan="2">港股市場</td>
        <td>證券類產品（含股票、ETFs、窩輪、牛熊、界內證）</td>
        <td rowspan="2">
            <ul>
            <li>中國大陸客戶：請購買 <font color="red"><a href="https://activity.lbkrs.com/spa/mall?market=HK">港股 Lv2 實時行情-OpenAPI - OpenAPI</a></font></li>
            <li>非中國大陸客戶：請購買 <font color="red"><a href="https://activity.lbkrs.com/spa/mall?market=HK">港股 Lv2 實時行情（國際版）- OpenAPI</a></font></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>恆生指數</td>
    </tr>
    <tr>
        <td rowspan="3">美股市場</td>
        <td>證券類產品（含紐交所、美交所、納斯達克上市的股票、ETFs）</td>
        <td rowspan="2">
            <ul>
            <li>Level 1：請購買 <font color="red">L1 Nasdaq Basic - OpenAPI</font></li>
            <li>Level 2：
                <ul>
                <li>Level 1：請購買 <font color="red"><a href="https://activity.lbkrs.com/spa/mall?market=US">L1 Nasdaq Basic - OpenAPI</a></font></li>
                <li>Level 2：暫未上線，敬請期待。</li>
                </ul>
            </li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>納斯達克指數</td>
    </tr>
    <tr>
        <td>OPRA 期權</td>
        <td>
            <ul>
            暫未上線，敬請期待。
            </ul>
        </td>
    </tr>
    <tr>
        <td rowspan="2">A 股市場</td>
        <td>證券類產品（含股票、ETFs）</td>
        <td rowspan="2">
        <ul>
            <li>中國大陸個人客戶：免費獲取 Lv1 行情</li>
            <li>非中國大陸客戶 / 機構客戶：暫不支持</li>
        </ul>
        </td>
    </tr>
    <tr>
        <td>指數</td>
    </tr>
</table>

#### 頻次限制

:::caution

- 一個賬號同時只能建立一個長連接，最多同時訂閱 500 個標的
- 1 秒內不超過 10 次調用，並發請求數不超過 5

:::

## 使用費用

長橋不針對接口服務額外收取開通或使用費用，只需開通長橋綜合賬戶及 OpenAPI 服務權限後即可免費使用。實際交易產生佣金費用或高級行情產品費用參考 [官網收費](https://longbridge.hk/rate) 說明或諮詢線上客服。

## 其他

OpenAPI 服務由長橋證券（香港）有限公司及其適用的關聯公司提供（具體以協議為準）。
