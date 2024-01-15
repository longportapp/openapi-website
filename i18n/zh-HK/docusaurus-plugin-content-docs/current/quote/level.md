---
sidebar_position: 1
title: 行情權限
slug: level
---

# 行情權限與限制

<table>
    <thead>
      <tr>
          <th width="160">市場</th>
          <th>標的</th>
      </tr>
    </thead>
    <tr>
        <td width="160" rowspan="2">港股</td>
        <td>證券類產品（含股票、ETFs、窩輪、牛熊、界內證）</td>
    </tr>
    <tr>
        <td>恆生指數</td>
    </tr>
    <tr>
        <td rowspan="3">美股</td>
        <td>證券類產品（含紐交所、美交所、納斯達克上市的股票、ETFs）</td>
    </tr>
    <tr>
        <td>納斯達克指數</td>
    </tr>
    <tr>
        <td>OPRA 期權</td>
    </tr>
    <tr>
        <td rowspan="2">A 股</td>
        <td>證券類產品（含股票、ETFs）</td>
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

LongPort 不針對接口服務額外收取開通或使用費用，只需開通 LongPort 賬户及 OpenAPI 服務權限後即可免費使用。實際交易產生佣金費用或高級行情產品費用參考官網收費説明或諮詢線上客服。
