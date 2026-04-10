---
title: 'exchange-rate'
sidebar_label: 'exchange-rate'
sidebar_position: 4
---

# longbridge exchange-rate

Get current foreign exchange rates for all currency pairs used in your Longbridge account.

## Basic Usage

<CliCommand>
longbridge exchange-rate
</CliCommand>

## Scenarios

### View all exchange rates

<CliCommand>
longbridge exchange-rate
</CliCommand>

Displays bid, offer, and average rates for all currency pairs available in your account (e.g., HKD/USD, HKD/CNH).

### JSON output for automation

<CliCommand>
longbridge exchange-rate --format json
</CliCommand>

```json
{
  "exchanges": [
    { "average_rate": 1.1465, "base_currency": "HKD", "bid_rate": 1.1465, "offer_rate": 1.1465, "other_currency": "CNH" },
    { "average_rate": 1, "base_currency": "HKD", "bid_rate": 1, "offer_rate": 1, "other_currency": "HKD" },
    { "average_rate": 7.7925, "base_currency": "HKD", "bid_rate": 7.7925, "offer_rate": 7.7925, "other_currency": "USD" }
  ]
}
```

All rates are expressed with HKD as the base currency. Use `average_rate` for conversion calculations.
