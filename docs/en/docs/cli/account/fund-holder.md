---
title: 'fund-holder'
sidebar_label: 'fund-holder'
sidebar_position: 6
---

# longbridge fund-holder

Find which ETFs and funds hold a given stock, along with each fund's position ratio and report date.

## Basic Usage

<CliCommand>
longbridge fund-holder AAPL.US
</CliCommand>

## Scenarios

### Find top ETF holders of a stock

<CliCommand>
longbridge fund-holder AAPL.US
longbridge fund-holder AAPL.US --format json
</CliCommand>

Lists the ETFs and funds with the largest exposure to the given stock, sorted by position ratio.

### Get more holders

<CliCommand>
longbridge fund-holder TSLA.US --count 50
</CliCommand>

Use `--count` to retrieve more results beyond the default limit.

## Requirements

OAuth account permission required. See the [account permission setup](/docs/trade/) guide.
