---
sidebar_position: 1
title: 行情權限
slug: level
---

# 行情權限與限制

<table>
    <thead>
      <tr>
          <th width="80">市場</th>
          <th>標的</th>
          <th>權限獲取方式</th>
      </tr>
    </thead>
    <tr>
        <td width="80" rowspan="2">港股</td>
        <td>證券類產品（含股票、ETFs、窩輪、牛熊、界內證）</td>
        <td rowspan="2">
          <p>請根據情況購買開通行情權限：</p>
            <ul>
            <li>中國大陸客户：<a href="https://activity.lbkrs.com/spa/mall?market=HK">港股 Lv2 實時行情 - OpenAPI</a></li>
            <li>其他地區客户：<a href="https://activity.lbkrs.com/spa/mall?market=HK">港股 Lv2 實時行情（國際版）- OpenAPI</a></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>恆生指數</td>
    </tr>
    <tr>
        <td rowspan="3">美股</td>
        <td>證券類產品（含紐交所、美交所、納斯達克上市的股票、ETFs）</td>
        <td rowspan="2">
            <ul>
            <li>Level 1：請購買 <a href="https://activity.lbkrs.com/spa/mall?market=US">L1 Nasdaq Basic - OpenAPI</a></li>
            <li>Level 2：暫未上線，敬請期待。</li>
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
            <li>Level 1：請購買 <a href="https://activity.lbkrs.com/spa/mall?market=US">OPRA 期權-Open API</a></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td rowspan="2">A 股</td>
        <td>證券類產品（含股票、ETFs）</td>
        <td rowspan="2">
        <ul>
            <li>中國大陸個人客户：免費獲取 Lv1 行情</li>
            <li>非中國大陸客户 / 機構客户：暫不支持</li>
        </ul>
        </td>
    </tr>
    <tr>
        <td>指數</td>
    </tr>
</table>

#### 頻次限制

:::caution

- 一個賬號同時只能建立一個長連接，最多同時訂閲 500 個標的
- 1 秒內不超過 10 次調用，併發請求數不超過 5

:::

## 使用費用

LongPort 不針對接口服務額外收取開通或使用費用，只需開通 LongPort 賬户及 OpenAPI 服務權限後即可免費使用。實際交易產生佣金費用或高級行情產品費用參考 [官網收費](https://longbridge.hk/rate) 説明或諮詢線上客服。
