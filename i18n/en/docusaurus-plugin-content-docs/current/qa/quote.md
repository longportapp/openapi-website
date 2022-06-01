---
id: quote_qa
title: Quote Releated
slug: broker
sidebar_position: 1
---

## Q1: How to calculate the subscription quote, is it one or more subscriptions if I both subscribe depth and broker with the same security?

A: The subscription quote is only calculated according to the security dimension, only one subscription will be calculted if you subscribe muilty quote type with one security.

## Q2: What is the specific limit logic for request frequency limit?

A: Use the token bucket to limit request and control the request rate. No more than 10 calls in 1 second, and no more than 5 concurrent requests.

## Q3: What is the available subscribing securities and corresponding symbol formats?

A: The security code uses the `ticker.region` format, `ticker` represents the code. Aavailable subscribing securities are as followes.

<table>
    <tr>
        <td>Market</td>
        <td>Symbol</td>
        <td>Ticker</td>
        <td>Region</td>
    </tr>
    <tr>
        <td rowspan="2">HK Market</td>
        <td>Securities (including equities, ETFs, Warrants, CBBCs)</td>
        <td>The official code of the security on the exchange</td>
        <td>HK</td>
    </tr>
    <tr>
        <td>Hang Seng Index</td>
        <td>HSI</td>
        <td>HK</td>
    </tr>
    <tr>
        <td rowspan="2">US Market</td>
        <td>Securities (including stocks, ETFs)</td>
        <td>The official code of the security on the exchange</td>
        <td>US</td>
    </tr>
    <tr>
        <td>Nasdsaq Index</td>
        <td>.IXIC</td>
        <td>US</td>
    </tr>
    <tr>
        <td rowspan="2">CN Market</td>
        <td>Securities (including stocks, ETFs)</td>
        <td>The official code of the security on the exchange</td>
        <td>SH or SZ</td>
    </tr>
    <tr>
        <td>Index</td>
        <td>The official code of the security on the exchange</td>
        <td>SH or SZ</td>
    </tr>
</table>

## Q4: What is the quote authority of OpenAPI? How to buy quote cards?

A:

- Quote Authority
  In accordance with the rules of the exchange, the authority of OpenAPI are independent, and are not shared with Longbridge's App, PC, and Web permissions. For example, the Hong Kong stock Level 2 authority you have on the Longbrdge App cannot be used on the OpenAPI side. Longbridge also presents basic market rights to OpenAPI users. If you need a higher-level market, you can activate the high-level quote authority by purchasing a market card.
- How to buy quote cards  
  Longbridge users can choose the market cards they want to buy through the "Market Store" in the Longbridge App.
- See the table below for a list of quote authority
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
            Coming Soon
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
