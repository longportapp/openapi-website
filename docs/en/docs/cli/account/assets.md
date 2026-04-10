---
title: 'assets'
sidebar_label: 'assets'
sidebar_position: 1
---

# longbridge assets

View your full account overview — net assets, buying power, margin status, risk level, and cash balances across all currencies.

## Basic Usage

<CliCommand>
longbridge assets
</CliCommand>

## Scenarios

### Check account overview

<CliCommand>
longbridge assets
</CliCommand>

Displays net assets, total cash, buying power, margin usage, and risk level in a readable table.

### JSON for monitoring account health

<CliCommand>
longbridge assets --format json
</CliCommand>

```json
[
  {
    "buy_power": "106701.11", "currency": "USD",
    "cash_infos": [
      { "available_cash": "-38665.68", "currency": "USD", "frozen_cash": "332.19", "settling_cash": "-10108.02", "withdraw_cash": "-38665.68" },
      { "available_cash": "755592.21", "currency": "HKD", "frozen_cash": "64.69", "settling_cash": "-27760.00", "withdraw_cash": "755592.21" }
    ],
    "init_margin": "18650.73", "maintenance_margin": "16279.15",
    "margin_call": "0", "max_finance_amount": "410651.27",
    "net_assets": "125351.85", "remaining_finance_amount": "371985.59",
    "risk_level": "Safe", "total_cash": "58638.84"
  }
]
```

Key fields: `risk_level` shows your current margin safety status, `net_assets` is total portfolio value in the account currency, `buy_power` is the maximum amount available to buy, and `margin_call` is non-zero if a margin call has been triggered.

## Requirements

OAuth account permission required. See the [account permission setup](/docs/trade/) guide.
