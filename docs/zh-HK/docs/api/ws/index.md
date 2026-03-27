---
title: WebSocket API Overview
id: ws-overview
slug: /api/ws
sidebar_position: 0
---

Longbridge provides a binary protocol over both **WebSocket** and **TCP** for real-time market data and trade updates.

:::tip
Use WebSocket for simplicity. Switch to TCP only if you need lower latency for quote streaming.
:::

## Endpoints

Longbridge uses separate gateways for Market Quote and Trading.

### Market Quote

| Endpoint                                | Access Type |
| --------------------------------------- | ----------- |
| tcp://openapi-quote.longbridge.com:2020 | TCP         |
| wss://openapi-quote.longbridge.com      | WebSocket   |

### Trading

| Endpoint                                | Access Type |
| --------------------------------------- | ----------- |
| tcp://openapi-trade.longbridge.com:2020 | TCP         |
| wss://openapi-trade.longbridge.com      | WebSocket   |

### Mainland China

Users in mainland China can use the following endpoints for better connectivity:

#### Market Quote

| Endpoint                               | Access Type |
| -------------------------------------- | ----------- |
| tcp://openapi-quote.longbridge.cn:2020 | TCP         |
| wss://openapi-quote.longbridge.cn      | WebSocket   |

#### Trading

| Endpoint                               | Access Type |
| -------------------------------------- | ----------- |
| tcp://openapi-trade.longbridge.cn:2020 | TCP         |
| wss://openapi-trade.longbridge.cn      | WebSocket   |

## WebSocket vs TCP

| Feature | WebSocket | TCP |
|---------|-----------|-----|
| Streaming | Frame-based | Byte stream (harder to parse) |
| Handshake | URL query params | Custom packet |
| Heartbeat | Ping-Pong (browser-native) | Custom heartbeat packet |
| Security | TLS built-in | No TLS |

- `WebSocket` using URL Query to [Handshake](./protocol/handshake#websocket-how-to-handshake)
- `WebSocket` using [ping-pong](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#pings_and_pongs_the_heartbeat_of_websockets) for heartbeating, instead of sending a heartbeat packet.

## Authentication (OTP Token)

Before connecting, obtain a one-time password (OTP) via HTTP:

| Info        |                  |
| ----------- | ---------------- |
| HTTP Method | GET              |
| HTTP URL    | /v1/socket/token |

### Request Headers

| Field         | Type   | Required | Description                                           |
| ------------- | ------ | -------- | ----------------------------------------------------- |
| Authorization | string | Yes      |                                                       |
| Content-Type  | string | Yes      | `application/json; charset=utf-8` |

### Response Body

| Field   | Type   | Description                       |
| ------- | ------ | --------------------------------- |
| code    | int    | error code, failed if not equal 0 |
| msg     | string | error description                 |
| data    | object |                                   |
| ∟otp    | string | token                             |
| ∟limit  | int    | Total connection limit            |
| ∟online | int    | Current online connection count   |

```json
{
  "code": 0,
  "message": "",
  "data": {
    "otp": "xxxxxxxx",
    "online": 1,
    "limit": 10
  }
}
```

Use the `otp` value as the `token` in the [Auth](./protocol/control-command#auth) control command after connecting.

## Command Overview

Socket Feed provides real-time stock quote data updates and trade updates.

The quote and trade gateways use separate endpoints — see [Endpoints](#endpoints) above.

### Stock Quote

<table>
    <tr>
        <td>Type</td>
        <td>Description</td>
    </tr>
    <tr>
        <td rowspan="20">Pull</td>
        <td><a href="./quote/pull/static">Get Basic Information Of Securities</a></td>
    </tr>
    <tr>
        <td><a href="./quote/pull/quote">Get Real-time Quotes Of Securities</a></td>
    </tr>
    <tr>
        <td><a href="./quote/pull/option-quote">Get Real-time Quotes Of Option Securities</a></td>
    </tr>
    <tr>
        <td><a href="./quote/pull/warrant-quote">Get Real-time Quotes Of Warrant Securities</a></td>
    </tr>
    <tr>
        <td><a href="./quote/pull/depth">Get Security Depth</a></td>
    </tr>
    <tr>
        <td><a href="./quote/pull/brokers">Get Security Brokers</a></td>
    </tr>
    <tr>
        <td><a href="./quote/pull/broker-ids">Get Broker IDs</a></td>
    </tr>
    <tr>
        <td><a href="./quote/pull/trade">Get Security Trades</a></td>
    </tr>
    <tr>
        <td><a href="./quote/pull/intraday">Get Security Intraday</a></td>
    </tr>
    <tr>
        <td><a href="./quote/pull/candlestick">Get Security Candlestick</a></td>
    </tr>
    <tr>
        <td><a href="./quote/pull/optionchain-date">Get Option Chain Expiry Date List</a></td>
    </tr>
    <tr>
        <td><a href="./quote/pull/optionchain-date-strike">Get Option Chain Info By Date</a></td>
    </tr>
    <tr>
        <td><a href="./quote/pull/issuer">Get Warrant Issuer IDs</a></td>
    </tr>
    <tr>
        <td><a href="./quote/pull/warrant-filter">Get Filtered Warrant</a></td>
    </tr>
    <tr>
        <td><a href="./quote/pull/trade-session">Get Trading Session Of The Day</a></td>
    </tr>
    <tr>
        <td><a href="./quote/pull/trade-day">Get Market Trading Days</a></td>
    </tr>
    <tr>
        <td><a href="./quote/pull/capital-flow-intraday">Get Security Capital Flow Intraday</a></td>
    </tr>
    <tr>
        <td><a href="./quote/pull/capital-distribution">Get Security Capital Distribution</a></td>
    </tr>
    <tr>
        <td><a href="./quote/pull/calc-index">Get Calculate Indexes Of Securities</a></td>
    </tr>
    <tr>
        <td><a href="./quote/pull/history-candlestick">Get Security History Candlestick</a></td>
    </tr>
    <tr>
        <td rowspan="3">Subscription</td>
        <td><a href="./quote/subscribe/subscription">Get Subscription Information</a></td>
    </tr>
    <tr>
        <td><a href="./quote/subscribe/subscribe">Subscribe Quote</a></td>
    </tr>
    <tr>
        <td><a href="./quote/subscribe/unsubscribe">Unsubscribe Quote</a></td>
    </tr>
    <tr>
        <td rowspan="4">Push</td>
        <td><a href="./quote/push/quote">Push Real-time Quote</a></td>
    </tr>
    <tr>
        <td><a href="./quote/push/depth">Push Real-time Depth</a></td>
    </tr>
    <tr>
        <td><a href="./quote/push/broker">Push Real-time Brokers</a></td>
    </tr>
    <tr>
        <td><a href="./quote/push/trade">Push Real-time Trades</a></td>
    </tr>
</table>

### Trade

| Type      | Functional                                                                                                     |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| Subscribe | [Subscribe](./trade/trade-push#subscribe) <br/><br/> [Cancel Subscribe](./trade/trade-push#cancel-subscribe) |
| Notify    | [Notification](./trade/trade-push#push-notification)                                                               |
