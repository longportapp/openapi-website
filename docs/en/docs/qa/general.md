---
title: General
sidebar_position: 0
---

## Q1: Do I need to open a live account to call Longbridge OpenAPI?

A: We provide a paper account, you can use it to complete the debugging of the OpenAPI quote and trading interfaces.

## Q2: How to open a paper account for debugging?

A: Please visit [Development Center](https://open.longbridge.com/account/) to enable the paper account and obtain the corresponding App Key & Secret and Access Token.

## Q3: Are the trading permissions for simulation debugging the same as for real accounts?

A: Quote is the same, trading might be different.

Paper accounts and live accounts share the same App Key & Secret, but have different Access Tokens. Quote permissions are associated with the App Key & Secret, while trading permissions are associated with the Access Token. Therefore, under paper accounts and live accounts, quote permissions are the same, but trading permissions are associated with the securities account and may differ.

## Q4: Which markets and types of securities are supported for quote and trading in paper account debugging?

A: Market: Supports real-time market data for Hong Kong stocks, US stocks, and A-share markets. For advanced market data such as full US market data and Hong Kong Level2 data, they can be purchased through the online market store and accessed via OpenAPI.

Trading: Supports trading of Hong Kong and US stocks, ETFs, and Hong Kong warrant trading. Short selling is supported for US stocks. OTC stocks, pre & post market trading, and options trading are not supported in paper accounts.

## Q5: Interface call frequency limits

A: Please visit [Rate Limit](docs/#rate-limit) for specific descriptions.

## Q6: How are interface call frequency limits applied in the case of multiple accounts?

A: If a customer holds multiple securities accounts, such as intraday financing or other sub-accounts, the trading interface call frequency limits are calculated and controlled based on different securities accounts, while quote interface calls are not affected by multiple accounts and are uniformly limited.

## Q7: Are there additional charges for trading operations through Longbridge OpenAPI?

A: We do not charge additional fees for accessing market queries, trading, etc., via OpenAPI. For account-related fees such as trading commissions, platform fees, and market permissions, please refer to the information provided by the app and the official website.

## Q8: How to disable the permission table output in the console after the SDK connects to the server?

A: You can set the environment variable `LONGPORT_PRINT_QUOTE_PACKAGES` to `false`, or set `enable_print_quote_packages` to `false` when creating the `Config` object in the code to disable the permission table output in the console.
