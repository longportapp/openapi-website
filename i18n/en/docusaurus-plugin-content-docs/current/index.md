---
sidebar_position: -999
slug: /
title: Introduction
id: getting_started_introduce
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

LongPort OpenAPI provides programmatic quote trading interfaces for investors with research and development capabilities and assists them to build trading or quote strategy analysis tools based on their own investment strategies. The functions fall into the following categories:

- **Trading** - Create, amend, cancel orders, query today's/past orders and transaction details, etc.
- **Quotes** - Real-time quotes, acquisition of historical quotes, etc.
- **Portfolio** - Real-time query of the account assets, positions, funds
- **Real-time subscription** - Provides real-time quotes and push notifications for order status changes

## Interface Type

LongPort provides diversified access methods such as HTTP / WebSockets interfaces for accessing the underlying services and SDK (Python / C++, etc.) encapsulated in the upper layer, allowing flexible choices.

## How to Enable OpenAPI

1. Log in to the [LongPort App](https://longportapp.com/download) to complete the account opening process;

2. Log in to the [longportapp.com](https://longportapp.com) and enter the developer platform, complete the developer verification (OpenAPI permission application), and obtain a token.

## Permissions and Restrictions

:::caution

All APIs have minimal invoke interval limitation, so same API can't be invoking in concurrency.

:::

### Trading

| Market    | Stock and ETF | Warrant&CBBC | Options |
| --------- | ------------- | ------------ | ------- |
| HK Market | ✓             | ✓            |         |
| US Market | ✓             | ✓            | ✓       |

#### Rate Limiting

:::caution

- No more than 30 calls in a 30-second interval and the time between two successive calls should be more than 0.02 seconds

:::

### Quotes

Please visit [Quote Permissions and Restrictions](/docs/quote/level) for details.

## Pricing

LongPort does not charge any additional fees for activating or using interface services. You only need to open a LongPort Integrated A/C and get OpenAPI service permissions to use it for free. Please refer to [Pricing](https://longbridge.hk/rate) or consult online customer service for the actual commissions or advanced quotes fees incurred by transactions.

## Other

The OpenAPI services are provided by LongPort and the applicable affiliates (subject to the agreement).
openapi-trade.longportapp.com
