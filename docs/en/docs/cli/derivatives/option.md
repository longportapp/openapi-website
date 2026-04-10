---
title: 'option'
sidebar_label: 'option'
sidebar_position: 1
---

# longbridge option

Look up real-time quotes for US option contracts and browse the full option chain for any underlying symbol.

## Basic Usage

<CliCommand>
longbridge option chain AAPL.US
</CliCommand>

## Scenarios

### Browse the option chain for a stock

Without `--date`, this returns all available expiry dates for AAPL options. Pick an expiry date, then pass it with `--date` to see the strikes.

### View strikes for a specific expiry

<CliCommand>
longbridge option chain AAPL.US --date 2026-04-17 --format json
</CliCommand>

```json
[
  { "call_symbol": "AAPL260417C110000.US", "put_symbol": "AAPL260417P110000.US", "standard": "true", "strike": "110" },
  { "call_symbol": "AAPL260417C115000.US", "put_symbol": "AAPL260417P115000.US", "standard": "true", "strike": "115" },
  { "call_symbol": "AAPL260417C120000.US", "put_symbol": "AAPL260417P120000.US", "standard": "true", "strike": "120" }
]
```

Each row shows the call and put symbols for that strike. Copy a symbol from `call_symbol` or `put_symbol` to get a live quote.

### Get a real-time quote for an option contract

<CliCommand>
longbridge option quote AAPL260417C190000.US --format json
</CliCommand>

```json
[
  {
    "symbol": "AAPL260417C190000.US",
    "last": "12.35",
    "bid": "12.30",
    "ask": "12.40",
    "open_interest": "4821",
    "implied_volatility": "0.2341",
    "delta": "0.4812",
    "gamma": "0.0231",
    "theta": "-0.0512",
    "vega": "0.1843"
  }
]
```

Returns the latest bid, ask, last price, implied volatility, and greeks (delta, gamma, theta, vega) for the given contract.

## Requirements

`option quote` requires an options account and options market data permission. `option chain` works with Level 1 quote access. See [Quote Permissions](/docs/quote/) for subscription details.

## Notes

Option symbol format: `AAPL260417C190000.US` — underlying AAPL, expiry 2026-04-17, Call, $190.00 strike. The numeric price component is in units of $0.001, so 190000 = $190.00.
