---
title: WS 和 TCP 接入的不同点
id: h
slug: /socket/diff_ws_tcp
sidebar_position: 6
---

我们同时支持 Websocket 和 TCP 的接入，不同点主要如下：

- TCP 数据是流式的，客户端编写难度比 Websocket 要大
- Websocket 握手包通过 [Url Query 发送](./protocol/handshake#websocket-链接如何握手)
- Websocket 的[心跳](./control-command#心跳)通过 Websocket 协议本身的心跳 `Ping-Pong` 进行
- Websocket 通信使用 TLS 进行加密，而 TCP 暂时没有

可以根据自己的需求选择，我们的私有协议时适用于两者的。

> 可以都先使用 `Websocket` 接入，较方便。如果对速度有更高的要求，行情可以接入 `TCP`。
