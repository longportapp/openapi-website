---
title: 'intraday'
sidebar_label: 'intraday'
sidebar_position: 5
---

# longbridge intraday

Get today's minute-by-minute price and volume data (intraday line) for any symbol.

## Basic Usage

<CliCommand>
longbridge intraday TSLA.US
</CliCommand>

## Scenarios

### View today's intraday price line

<CliCommand>
longbridge intraday TSLA.US
</CliCommand>

Outputs one bar per minute from market open to the latest available tick, showing price, average price, volume, and turnover.

### Include pre-market and post-market for US stocks

<CliCommand>
longbridge intraday AAPL.US --session all
</CliCommand>

```json
[
  { "avg_price": "258.368439", "price": "258.330", "time": "2026-04-09 08:00:00", "turnover": "97663.270", "volume": "378" },
  { "avg_price": "258.382920", "price": "258.240", "time": "2026-04-09 08:01:00", "turnover": "1622133.447", "volume": "6278" }
]
```

`--session all` includes pre-market bars starting from approximately 8:00 AM ET, as well as post-market bars after 4:00 PM ET.

### JSON output

<CliCommand>
longbridge intraday TSLA.US --format json
</CliCommand>

```json
[
  { "avg_price": "343.204277", "price": "342.785", "time": "2026-04-09 13:30:00", "turnover": "175813597.955", "volume": "512271" },
  { "avg_price": "343.143985", "price": "343.502", "time": "2026-04-09 13:31:00", "turnover": "55557410.273", "volume": "161997" },
  { "avg_price": "343.117905", "price": "342.710", "time": "2026-04-09 13:32:00", "turnover": "72686011.787", "volume": "211891" }
]
```

Each bar includes `price` (last trade price for that minute), `avg_price` (volume-weighted average), `volume`, `turnover`, and `time`.
