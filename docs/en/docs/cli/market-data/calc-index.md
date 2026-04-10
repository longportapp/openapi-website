---
title: 'calc-index'
sidebar_label: 'calc-index'
sidebar_position: 8
---

# longbridge calc-index

Compute financial indexes for any symbol — P/E, P/B, dividend yield, turnover rate, options greeks, and more.

## Basic Usage

<CliCommand>
longbridge calc-index TSLA.US
</CliCommand>

## Scenarios

### Check P/E and P/B ratios

<CliCommand>
longbridge calc-index TSLA.US NVDA.US --index pe pb
longbridge calc-index TSLA.US NVDA.US --index pe pb --format json
</CliCommand>

Calculates the specified indexes for each symbol. Multiple symbols and multiple indexes can be requested in a single call. Only indexes that have data appear in the JSON output — indexes with no value are omitted.

### Default indexes (PE, PB, dividend yield, turnover rate, market cap)

<CliCommand>
longbridge calc-index TSLA.US
</CliCommand>

When `--index` is omitted, the default set is returned: `pe`, `pb`, `dps_rate`, `turnover_rate`, `total_market_value`.

### Options greeks for a derivative

<CliCommand>
longbridge calc-index 700.HK --index delta gamma vega theta
</CliCommand>

For options and warrants, request greeks directly. Only indexes applicable to the instrument type will appear in the output.

## Notes

Full list of supported index names: `last_done`, `change_value`, `change_rate`, `volume`, `turnover`, `ytd_change_rate`, `turnover_rate`, `total_market_value`, `capital_flow`, `amplitude`, `volume_ratio`, `pe` (alias: `pe_ttm`), `pb`, `dps_rate` (alias: `dividend_yield`), `five_day_change_rate`, `ten_day_change_rate`, `half_year_change_rate`, `five_minutes_change_rate`, `implied_volatility`, `delta`, `gamma`, `theta`, `vega`, `rho`, `open_interest`, `expiry_date`, `strike_price`.

Unknown index names are silently ignored — double-check spelling if an expected field is missing from the output.
