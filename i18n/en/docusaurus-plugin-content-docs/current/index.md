---
sidebar_position: -999
slug: /
title: Introduction to OpenAPI
id: getting_started_introduce
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

Longbridge OpenAPI provides programmatic quote trading interfaces for investors with research and development capabilities and assists them to build trading or quote strategy analysis tools based on their own investment strategies. The functions fall into the following categories:

- Trading - Create, amend, cancel orders, query today’s/past orders and transaction details, etc.
- Quotes - Real-time quotes, acquisition of historical quotes, etc.
- Portfolio - Real-time query of the account assets, positions, funds
- Real-time subscription - Provides real-time quotes and push notifications for order status changes

## Interface Type

Longbridge provides diversified access methods such as HTTP / WebSockets interfaces for accessing the underlying services and SDK (Python / C++, etc.) encapsulated in the upper layer, allowing flexible choices.

## How to Enable OpenAPI

1. Log in to the [Longbridge App](https://longbridgeapp.com/download) or the official website [longbridgehk.com](https://longbridge.hk) to complete the account opening process of Longbridge Integrated A/C (the interface services of the Longbridge Standard A/C are not currently available);

2. Log in to the [longbridgeapp.com](https://longbridgeapp.com) and enter the developer platform, complete the developer verification (OpenAPI permission application), and obtain a token.

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

<table>
    <tr>
        <td>Market</td>
        <td>Symbol</td>
        <td>Access Method</td>
    </tr>
    <tr>
        <td rowspan="2">HK Market</td>
        <td>Securities (including equities, ETFs, Warrants, CBBCs)</td>
        <td rowspan="2">
            <ul>
            <li>Mainland China: Please Purchase <font color="red"><a href="https://activity.lbkrs.com/spa/mall?market=HK">L2 Advanced Quotes-OpenAPI - OpenAPI</a></font></li>
            <li>Non-Mainland China: Please Purchase <font color="red"><a href="https://activity.lbkrs.com/spa/mall?market=HK">L2 Advanced Quotes (International) -OpenAPI</a></font></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>Hang Seng Index</td>
    </tr>
    <tr>
        <td rowspan="3">US Market</td>
        <td>Securities (including stocks, ETFs)</td>
        <td rowspan="2">
            <ul>
            <li>Level 1: Please Purchase <font color="red"><a href="https://activity.lbkrs.com/spa/mall?market=US">L1 Nasdaq Basic - OpenAPI</a></font></li>
            <li>
                Level 2: Coming Soon
            </li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>Nasdsaq Index</td>
    </tr>
    <tr>
        <td>OPRA OPRA Options</td>
        <td>
            <li>Level 1: Please Purchase <font color="red"><a href="https://activity.lbkrs.com/spa/mall?market=US">OPRA Options-Open API</a></font></li>
        </td>
    </tr>
    <tr>
        <td rowspan="2">CN Market</td>
        <td>Securities (including stocks, ETFs)</td>
        <td rowspan="2">
        <ul>
            <li>Mainland China: LV1 For Free</li>
            <li>Non-Mainland China: Not Available</li>
        </ul>
        </td>
    </tr>
    <tr>
        <td>Index</td>
    </tr>
</table>

#### Rate Limiting

:::caution

- One account can only create one long link and subscribe to a maximum of 500 symbols at the same time
- No more than 10 calls in a 1-second interval and the number of concurrent requests should not exceed 5

:::

## Pricing

Longbridge does not charge any additional fees for activating or using interface services. You only need to open a Longbridge Integrated A/C and get OpenAPI service permissions to use it for free. Please refer to [Pricing](https://longbridge.hk/rate) or consult online customer service for the actual commissions or advanced quotes fees incurred by transactions.

## Other

The OpenAPI services are provided by Longbridge Securities (HK) Limited and the applicable affiliates (subject to the agreement).
