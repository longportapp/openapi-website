---
id: quote_qa
title: 行情相关
slug: broker
sidebar_position: 1
---

## Q1：订阅额度怎么算的，同一个标的订阅盘口，经济队列，是算 1 个还是多个？

A：仅按照标的维度计算订阅额度，同一个标的同时订阅多种行情，算同一个订阅额度。

## Q2：请求限频的具体限制逻辑是怎样？

A：使用令牌桶进行限流，控制请求速率。1 秒内不超过 10 次调用，并发请求数不超过 5。

## Q3：目前可以订阅的标的（包括指数）和对应的 symbol 格式？

A：标的代码使用 `ticker.region` 格式，`ticker` 表示标的代码。支持订阅的标的如下：

<table>
    <tr>
        <td>市场</td>
        <td>标的</td>
        <td>Ticker</td>
        <td>Region</td>
    </tr>
    <tr>
        <td rowspan="4">港股市场</td>
        <td>证券类产品（含股票、ETFs、窝轮、牛熊、界内证）</td>
        <td>标的在交易所的官方代码</td>
        <td>HK</td>
    </tr>
    <tr>
        <td>恒生指数</td>
        <td>HSI</td>
        <td>HK</td>
    </tr>
    <tr>
        <td>国企指数</td>
        <td>HSCEI</td>
        <td>HK</td>
    </tr>
    <tr>
        <td>恒生科技指数</td>
        <td>HSTECH</td>
        <td>HK</td>
    </tr>
    <tr>
        <td rowspan="3">美股市场</td>
        <td>证券类产品（含纽交所、美交所、纳斯达克上市的股票、ETFs）</td>
        <td>标的在交易所的官方代码</td>
        <td>US</td>
    </tr>
    <tr>
        <td>纳斯达克指数</td>
        <td>.IXIC</td>
        <td>US</td>
    </tr>
    <tr>
        <td>道琼斯指数</td>
        <td>.DJI</td>
        <td>US</td>
    </tr>
    <tr>
        <td rowspan="2">A 股市场</td>
        <td>证券类产品（含股票、ETFs）</td>
        <td>标的在交易所的官方代码</td>
        <td>SH 或 SZ</td>
    </tr>
    <tr>
        <td>指数</td>
        <td>标的在交易所的官方代码</td>
        <td>SH 或 SZ</td>
    </tr>
</table>

可以使用 LongPort App 查看标的的 symbol
<img src="https://pub.lbkrs.com/files/202206/7CSoiaDR4wGZPNCT/20220629-180013.jpeg" className="max-w-2xl" />

## Q4：OpenAPI 的行情权限是怎么样？如何购买行情卡？

A：

- 行情权限
  应交易所规则，OpenAPI 的权限是独立的，和客户端（App、PC、Web）权限不共享。比如，你在客户端上拥有的港股 Level 2 权限并不能同样代入 OpenAPI 端使用。LongPort 也给 OpenAPI 用户赠送了基础的行情权益，如你需要更高级别的行情，可以通过券商行情商店，或联系券商购买行情卡激活高级别行情权限。
- 如何购买行情卡  
  LongPort 用户可以通过 LongPort App 中的「行情商店」自行选择想要购买的行情卡。

## Q5：各个市场的清盘时间

A:

- 美股市场：09:20:00 EST
- 港股市场：08:50:00 CST
- A 股市场：09:00:00 CST
- 新加坡市场：08:20:00 CST

## Q6：如何获取夜盘行情

A:

- 夜盘行情需要主动开启，方式为在鉴权接口的 `metadata` 字段填充 key `need_over_night_quote`, value `true`。

```protobuf
message AuthRequest {
  string token = 1;
  map<string, string> metadata = 2;
}

message ReconnectRequest {
  string session_id = 1;
  map<string, string> metadata = 2;
}
```

- 开启夜盘行情后，拉取和推送接口都将可以在夜盘交易时段，获取到夜盘盘情。
