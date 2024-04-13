---
sidebar_position: 1
title: 行情权限
slug: level
---

# 行情权限与限制

<table>
    <thead>
      <tr>
          <th width="160">市场</th>
          <th>标的</th>
      </tr>
    </thead>
    <tr>
        <td width="160" rowspan="2">港股</td>
        <td>证券类产品（含股票、ETFs、窝轮、牛熊、界内证）</td>
    </tr>
    <tr>
        <td>恒生指数</td>
    </tr>
    <tr>
        <td rowspan="3">美股</td>
        <td>证券类产品（含纽交所、美交所、纳斯达克上市的股票、ETFs）</td>
    </tr>
    <tr>
        <td>纳斯达克指数</td>
    </tr>
    <tr>
        <td>OPRA 期权</td>
    </tr>
    <tr>
        <td rowspan="2">A 股</td>
        <td>证券类产品（含股票、ETFs）</td>
    </tr>
    <tr>
        <td>指数</td>
    </tr>
</table>

#### 频次限制

:::caution

- 一个账号同时只能建立一个长连接，最多同时订阅 500 个标的
- 1 秒内不超过 10 次调用，并发请求数不超过 5

:::

## 使用费用

LongPort 不针对接口服务额外收取开通或使用费用，只需开通 LongPort 账户及 OpenAPI 服务权限后即可免费使用。实际交易费率请咨询您开通证券账户的券商。
