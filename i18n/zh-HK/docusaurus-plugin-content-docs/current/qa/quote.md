---
id: quote_qa
title: 行情相關
slug: broker
sidebar_position: 1
---

## Q1：訂閱額度怎麼算的，同一個標的訂閱盤口，經濟隊列，是算 1 個還是多個？

A：僅按照標的維度計算訂閱額度，同一個標的同時訂閱多種行情，算同一個訂閱額度。

## Q2：請求限頻的具體限制邏輯是怎樣？

A：使用令牌桶進行限流，控制請求速率。1 秒內不超過 10 次調用，並發請求數不超過 5。

## Q3：目前可以訂閱的標的（包括指數）和對應的 symbol 格式？

A：標的代碼使用 `ticker.region` 格式，`ticker` 表示標的代碼。支持訂閱的標的如下：

<table>
    <tr>
        <td>市場</td>
        <td>標的</td>
        <td>Ticker</td>
        <td>Region</td>
    </tr>
    <tr>
        <td rowspan="4">港股市場</td>
        <td>證券類產品（含股票、ETFs、窩輪、牛熊、界內證）</td>
        <td>標的在交易所的官方代碼</td>
        <td>HK</td>
    </tr>
    <tr>
        <td>恆生指數</td>
        <td>HSI</td>
        <td>HK</td>
    </tr>
    <tr>
        <td>國企指數</td>
        <td>HSCEI</td>
        <td>HK</td>
    </tr>
    <tr>
        <td>恆生科技指數</td>
        <td>HSTECH</td>
        <td>HK</td>
    </tr>
    <tr>
        <td rowspan="3">美股市場</td>
        <td>證券類產品（含紐交所、美交所、納斯達克上市的股票、ETFs）</td>
        <td>標的在交易所的官方代碼</td>
        <td>US</td>
    </tr>
    <tr>
        <td>納斯達克指數</td>
        <td>.IXIC</td>
        <td>US</td>
    </tr>
    <tr>
        <td>道瓊斯指數</td>
        <td>.DJI</td>
        <td>US</td>
    </tr>
    <tr>
        <td rowspan="2">A 股市場</td>
        <td>證券類產品（含股票、ETFs）</td>
        <td>標的在交易所的官方代碼</td>
        <td>SH 或 SZ</td>
    </tr>
    <tr>
        <td>指數</td>
        <td>標的在交易所的官方代碼</td>
        <td>SH 或 SZ</td>
    </tr>
</table>

可以使用 LongPort App 查看標的的 symbol
<img src="https://pub.lbkrs.com/files/202206/7CSoiaDR4wGZPNCT/20220629-180013.jpeg" className="max-w-2xl" />

## Q4：OpenAPI 的行情权限是怎么样？如何购买行情卡？

A：

- 行情權限
  應交易所規則，OpenAPI 的權限是獨立的，和客戶端（App、PC、Web）權限不共享。比如，你在客戶端上擁有的港股 Level 2 權限並不能同樣代入 OpenAPI 端使用。LongPort 也給 OpenAPI 用戶贈送了基礎的行情權益，如你需要更高級別的行情，可以通過券商行情商店，或聯繫券商購買行情卡激活高級別行情權限。
- 如何購買行情卡  
  LongPort 用戶可以通過 LongPort App 中的「行情商店」自行選擇想要購買的行情卡。

## Q5：各個市場的清盤時間

A:

- 美股市場：09:20:00 EDT/EST
- 港股市場：08:50:00 CST
- A 股市場：09:00:00 CST
- 新加坡市場：08:20:00 CST

## Q6：如何取得夜盤行情

A:

- 夜盤行情需要主動開啟，方式為在鑑權接口的 `metadata` 欄位填入 key `need_over_night_quote`, value `true`。

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

- 開啟夜盤行情後，拉取和推送接口都將可以在夜盤交易時段，取得到夜盤盤情。
