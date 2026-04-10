---
title: 'max-qty'
sidebar_label: 'max-qty'
sidebar_position: 3
---

# longbridge max-qty

Estimate the maximum quantity you can buy or sell given your current account balance, at a specified price.

## Basic Usage

<CliCommand>
longbridge max-qty TSLA.US --side buy --price 340.00
</CliCommand>

## Scenarios

### Max buy quantity at a price

<CliCommand>
longbridge max-qty TSLA.US --side buy --price 340.00
</CliCommand>

Returns the maximum number of shares you can purchase at the given price, broken down by cash and margin buying power.

### Max sell quantity

<CliCommand>
longbridge max-qty TSLA.US --side sell
</CliCommand>

Returns the maximum number of shares you can sell, based on your current holdings.

### JSON output

<CliCommand>
longbridge max-qty TSLA.US --side buy --price 250 --format json
</CliCommand>

```json
[
  { "field": "Symbol", "value": "TSLA.US" },
  { "field": "Cash Max Qty", "value": "0" },
  { "field": "Margin Max Qty", "value": "1219" }
]
```

`Cash Max Qty` is the quantity purchasable using cash only. `Margin Max Qty` is the quantity purchasable using margin. A cash value of `0` indicates insufficient cash balance at that price point.

## Requirements

OAuth trade permission is required to query maximum order quantities.
