---
sidebar_position: 1
title: 行情权限
slug: level
---

# 行情权限与限制

<table>
    <thead>
      <tr>
          <th width="80">市场</th>
          <th>标的</th>
          <th>权限获取方式</th>
      </tr>
    </thead>
    <tr>
        <td width="80" rowspan="2">港股</td>
        <td>证券类产品（含股票、ETFs、窝轮、牛熊、界内证）</td>
        <td rowspan="2">
          <p>请根据情况购买开通行情权限：</p>
            <ul>
            <li>中国大陆客户：<a href="https://activity.lbkrs.com/spa/mall?market=HK">港股 Lv2 实时行情 - OpenAPI</a></li>
            <li>其他地区客户：<a href="https://activity.lbkrs.com/spa/mall?market=HK">港股 Lv2 实时行情（国际版）- OpenAPI</a></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>恒生指数</td>
    </tr>
    <tr>
        <td rowspan="3">美股</td>
        <td>证券类产品（含纽交所、美交所、纳斯达克上市的股票、ETFs）</td>
        <td rowspan="2">
            <ul>
            <li>Level 1：请购买 <a href="https://activity.lbkrs.com/spa/mall?market=US">L1 Nasdaq Basic - OpenAPI</a></li>
            <li>Level 2：暂未上线，敬请期待。</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>纳斯达克指数</td>
    </tr>
    <tr>
        <td>OPRA 期权</td>
        <td>
            <ul>
            <li>Level 1：请购买 <a href="https://activity.lbkrs.com/spa/mall?market=US">OPRA 期权-Open API</a></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td rowspan="2">A 股</td>
        <td>证券类产品（含股票、ETFs）</td>
        <td rowspan="2">
        <ul>
            <li>中国大陆个人客户：免费获取 Lv1 行情</li>
            <li>非中国大陆客户 / 机构客户：暂不支持</li>
        </ul>
        </td>
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

LongPort 不针对接口服务额外收取开通或使用费用，只需开通 LongPort 账户及 OpenAPI 服务权限后即可免费使用。实际交易产生佣金费用或高级行情产品费用参考 [官网收费](https://longbridge.hk/rate) 说明或咨询线上客服。
