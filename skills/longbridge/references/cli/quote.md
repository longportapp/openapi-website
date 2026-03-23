# CLI Quote Commands

All commands support `--format json` for machine-readable output.

## quote

Real-time quotes for one or more securities.

```bash
longbridge quote SYMBOL1 [SYMBOL2 ...] [--format json]
```

**Output fields:** `symbol`, `name`, `last` (last price), `open`, `high`, `low`, `prev_close`, `volume`, `turnover`, `status`, `trade_session`

```bash
longbridge quote TSLA.US 700.HK AAPL.US
longbridge quote TSLA.US --format json
```

---

## depth

Level 2 order book (bid/ask depth) for a security.

```bash
longbridge depth SYMBOL [--format json]
```

**Output:** bid and ask queues with price, volume, and broker count.

```bash
longbridge depth 700.HK
```

---

## brokers

HK broker queue data — shows which broker IDs are at each price level.

```bash
longbridge brokers SYMBOL [--format json]
```

---

## trades

Recent tick-by-tick trades (time & sales).

```bash
longbridge trades SYMBOL [--count N] [--format json]
```

Default count: 50. Maximum: 1000.

```bash
longbridge trades TSLA.US --count 100
```

---

## intraday

Minute-by-minute OHLCV data for the current trading day.

```bash
longbridge intraday SYMBOL [--format json]
```

---

## kline

Recent candlestick (OHLCV) data.

```bash
longbridge kline SYMBOL [--period PERIOD] [--count N] [--adjust forward|no] [--format json]
```

**Periods:** `1m`, `5m`, `15m`, `30m`, `60m`, `day`, `week`, `month`, `quarter`, `year`

Default: `day`, count 100.

```bash
longbridge kline TSLA.US --period day --count 100
longbridge kline 700.HK --period 5m --count 200
longbridge kline NVDA.US --period week --count 52 --adjust forward
```

---

## kline-history

Historical OHLCV data by date range.

```bash
longbridge kline-history SYMBOL --start YYYY-MM-DD --end YYYY-MM-DD [--period PERIOD] [--adjust forward|no] [--format json]
```

```bash
longbridge kline-history TSLA.US --start 2024-01-01 --end 2024-12-31
longbridge kline-history 700.HK --start 2023-01-01 --end 2024-12-31 --period week
```

---

## static

Static reference information for a security.

```bash
longbridge static SYMBOL1 [SYMBOL2 ...] [--format json]
```

**Output fields:** `symbol`, `name_en`, `name_zh`, `exchange`, `currency`, `lot_size`, `total_shares`, `circulating_shares`, `eps`, `eps_ttm`, `bps`, `dividend_yield`

```bash
longbridge static NVDA.US TSLA.US 700.HK
```

---

## calc-index

Financial indexes (PE, PB, EPS, etc.) for securities.

```bash
longbridge calc-index SYMBOL1 [SYMBOL2 ...] --index INDEX1[,INDEX2,...] [--format json]
```

**Available indexes:** `pe`, `pb`, `eps`, `eps_ttm`, `dividend_ratio`, `52w_high`, `52w_low`, `historical_vol`, `current_ratio`, `quick_ratio`, `roe`, `roa`, `net_profit_margin`, `gross_margin`, `revenue`, `net_profit`, `ebitda`, `market_cap`, `total_assets`, `total_liabilities`, `shareholders_equity`

```bash
longbridge calc-index TSLA.US NVDA.US --index pe,pb,eps
longbridge calc-index 700.HK --index pe,pb,dividend_ratio,market_cap
```

---

## capital-flow

Intraday capital flow time series — shows net buy/sell flow by time bucket.

```bash
longbridge capital-flow SYMBOL [--format json]
```

---

## capital-dist

Capital distribution snapshot — breaks down holdings by large/mid/small retail.

```bash
longbridge capital-dist SYMBOL [--format json]
```

---

## market-temp

Market sentiment temperature score (0–100) for a market.

```bash
longbridge market-temp [MARKET] [--format json]
```

**Markets:** `HK`, `US`, `CN`, `SG`

```bash
longbridge market-temp HK
longbridge market-temp US
```

---

## trading-session

Trading session hours for all markets today.

```bash
longbridge trading-session [--format json]
```

---

## trading-days

Trading calendar for a market between two dates.

```bash
longbridge trading-days MARKET --start YYYY-MM-DD --end YYYY-MM-DD [--format json]
```

```bash
longbridge trading-days HK --start 2024-01-01 --end 2024-03-31
```

---

## option-quote

Real-time quotes for option securities.

```bash
longbridge option-quote SYMBOL1 [SYMBOL2 ...] [--format json]
```

Option symbol format: `AAPL230317C160000.US` (`TICKER` + `YYMMDD` + `C/P` + `STRIKE*1000`)

```bash
longbridge option-quote AAPL240119C190000.US AAPL240119P190000.US
```

---

## option-chain

Option chain for an underlying security.

```bash
# List all expiry dates
longbridge option-chain SYMBOL [--format json]

# Strike prices for a specific expiry
longbridge option-chain SYMBOL --date YYYY-MM-DD [--format json]
```

```bash
longbridge option-chain AAPL.US
longbridge option-chain AAPL.US --date 2024-01-19
```

---

## warrant-quote

Real-time quotes for warrant securities.

```bash
longbridge warrant-quote SYMBOL1 [SYMBOL2 ...] [--format json]
```

---

## warrant-list

List warrants linked to an underlying security.

```bash
longbridge warrant-list SYMBOL [--sort-by FIELD] [--order asc|desc] [--format json]
```

```bash
longbridge warrant-list 700.HK
longbridge warrant-list 700.HK --sort-by price --order desc
```

---

## participants

List all broker IDs and names in the market (HK only).

```bash
longbridge participants [--format json]
```
