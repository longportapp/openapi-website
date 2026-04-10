---
title: 'quote'
sidebar_label: 'quote'
sidebar_position: 1
---

# quote

Get real-time quotes for one or more symbols — price, volume, change from previous close, and extended-hours data for US stocks.

## Basic Usage

<CliCommand>
longbridge quote TSLA.US
</CliCommand>

## Scenarios

### Check a single stock

<CliCommand>
longbridge quote TSLA.US
</CliCommand>

Displays the latest price, open, high, low, volume, turnover, and previous close for TSLA.

### Compare multiple symbols across markets

<CliCommand>
longbridge quote TSLA.US NVDA.US 700.HK
</CliCommand>

Pass multiple symbols in one call to compare quotes side by side. Symbols from different markets (US, HK, CN) are all supported.

### Get JSON output for scripting

<CliCommand>
longbridge quote TSLA.US NVDA.US 700.HK --format json
</CliCommand>

```json
[
  {
    "high": "348.880", "last": "345.620", "low": "337.250", "open": "343.150",
    "overnight_quote": null,
    "post_market_quote": { "high": "346.260", "last": "344.930", "low": "344.820", "prev_close": "345.620", "timestamp": "2026-04-09 23:59:59", "turnover": "466156791.277", "volume": 1348872 },
    "pre_market_quote": { "high": "346.450", "last": "343.100", "low": "339.695", "prev_close": "343.250", "timestamp": "2026-04-09 13:30:00", "turnover": "324073796.066", "volume": 945393 },
    "prev_close": "343.250", "status": "Normal", "symbol": "TSLA.US", "turnover": "21375312140.000", "volume": 62164016
  },
  {
    "high": "184.080", "last": "183.910", "low": "180.620", "open": "181.840",
    "post_market_quote": { "high": "183.950", "last": "183.020", "low": "182.900", "prev_close": "183.910", "timestamp": "2026-04-09 23:59:58", "turnover": "1107171195.312", "volume": 6021581 },
    "pre_market_quote": { "high": "182.080", "last": "181.990", "low": "180.000", "prev_close": "182.080", "timestamp": "2026-04-09 13:30:00", "turnover": "202190107.132", "volume": 1116645 },
    "prev_close": "182.080", "status": "Normal", "symbol": "NVDA.US", "turnover": "21303315176.000", "volume": 116428523
  },
  {
    "high": "514.000", "last": "505.500", "low": "504.500", "open": "508.000",
    "overnight_quote": null, "post_market_quote": null, "pre_market_quote": null,
    "prev_close": "508.500", "status": "Normal", "symbol": "700.HK", "turnover": "4423321731.000", "volume": 8692526
  }
]
```

`pre_market_quote` and `post_market_quote` fields are populated for US stocks when extended-hours data is available. HK stocks show `null` for those fields.
