---
title: 'portfolio'
sidebar_label: 'portfolio'
sidebar_position: 3
---

# longbridge portfolio

Get a full portfolio overview — total P/L, total assets, market value by market (US/HK/CN/SG), and cash balances.

## Basic Usage

<CliCommand>
longbridge portfolio
</CliCommand>

## Scenarios

### View portfolio summary

<CliCommand>
longbridge portfolio
</CliCommand>

Displays total asset value, total and today's P/L, and a breakdown of market value per market.

### JSON for tracking

<CliCommand>
longbridge portfolio --format json
</CliCommand>

```json
{
  "overview": {
    "total_asset": "125351.85", "market_cap": "66713.01", "total_cash": "58638.84",
    "total_pl": "136577.1920000", "total_today_pl": "10740.8030000",
    "margin_call": "0", "risk_level": 0, "credit_limit": "410651.27", "currency": "USD"
  },
  "market_accounts": {
    "US": { "market": "US", "currency": "USD", "market_value": "58659.658", "pl": "19845.542" },
    "HK": { "market": "HK", "currency": "HKD", "market_value": "62800.000", "pl": "14980.000" }
  }
}
```

`total_pl` is cumulative P/L across all positions, `total_today_pl` is today's unrealized gain/loss, and `market_accounts` breaks down market value and P/L per market.

## Requirements

OAuth account permission required. See the [account permission setup](/docs/trade/) guide.
