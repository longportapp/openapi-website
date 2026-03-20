---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
titleTemplate: APIs, LLM, MCP, CLI & More
pageClass: longbridge-home-page
hero:
  image:
    src: /assets/code.svg
    alt: Longbridge
  text: 'Longbridge <span>Developers</span>'
  tagline: Stable · Safe · Fast
  actions:
    - theme: brand
      text: Apply
      link: /auth
      target: _self

features:
  - icon: <img src="/assets/icon-code.svg" width="48" height="48"/>
    title: Multiple Access Methods
    details: Support HTTP/WebSocket/Longbridge binary protocol and multi-language SDK, allowing flexible access
    link: docs/
    linkText: Getting Started

  - icon: <img src="/assets/icon-cloud.svg" width="48" height="48" />
    title: Resilient Scalability
    details: Hybrid cloud-native microservices with 24/7 uptime, off-site failover, and elastic scaling for continuous reliability.

  - icon: <img src="/assets/icon-lanuch.svg" width="48" height="48" />
    title: Ultra Latency
    details: Lightning-fast transactions with as low as 10ms delay, powered by cloud-native distributed in-memory databases and stateless architecture
---

<HomePage/>
