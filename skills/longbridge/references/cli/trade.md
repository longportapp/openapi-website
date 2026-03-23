# CLI Trade Commands

All commands support `--format json`. Trade-modifying commands prompt for confirmation before executing.

## orders

List today's orders.

```bash
longbridge orders [--format json]
longbridge orders --history   # Past orders (not today)
longbridge orders --history --start YYYY-MM-DD --end YYYY-MM-DD
```

**Output fields:** `order_id`, `symbol`, `side`, `order_type`, `status`, `quantity`, `price`, `executed_qty`, `executed_price`, `submitted_at`, `updated_at`

---

## buy

Submit a buy order. Prompts for confirmation before sending.

```bash
longbridge buy SYMBOL QUANTITY [--price PRICE] [--order-type TYPE] [--tif TIF] [--outside-rth RTH] [--format json]
```

**Order types (`--order-type`):**
- `LO` — Limit Order (default, requires `--price`)
- `MO` — Market Order
- `ALO` — At-Auction Limit Order
- `AO` — At-Auction Order
- `ELO` — Enhanced Limit Order (HK only)
- `SLO` — Special Limit Order (HK only)
- `ODD` — Odd Lots Order
- `LIT` — Limit If Touched (requires `--price` and `--trigger-price`)
- `MIT` — Market If Touched (requires `--trigger-price`)
- `TSLPAMT` — Trailing Limit (Trailing Amount)
- `TSLPPCT` — Trailing Limit (Trailing Percent)

**Time in force (`--tif`):**
- `Day` — Day Order (default)
- `GTC` — Good Till Canceled
- `GTD` — Good Till Date (requires `--expire-date`)

**Outside RTH (`--outside-rth`, US only):**
- `RTH_ONLY` — Regular trading hours only (default)
- `ANY_TIME` — Pre/post market allowed
- `OVERNIGHT` — Overnight session

```bash
# Limit buy at $250
longbridge buy TSLA.US 100 --price 250.00

# Market buy
longbridge buy AAPL.US 50 --order-type MO

# HK at-auction limit order
longbridge buy 700.HK 200 --order-type ALO --price 45.00

# US pre/post-market limit order
longbridge buy TSLA.US 100 --price 248.00 --outside-rth ANY_TIME

# GTC limit order
longbridge buy NVDA.US 10 --price 800.00 --tif GTC
```

---

## sell

Submit a sell order. Prompts for confirmation before sending.

```bash
longbridge sell SYMBOL QUANTITY [--price PRICE] [--order-type TYPE] [--tif TIF] [--outside-rth RTH] [--format json]
```

```bash
longbridge sell TSLA.US 100 --price 260.00
longbridge sell AAPL.US 50 --order-type MO
```

---

## cancel

Cancel a pending order. Prompts for confirmation.

```bash
longbridge cancel ORDER_ID [--format json]
```

```bash
longbridge cancel 683615454870679552
```

---

## replace

Modify a pending order. Prompts for confirmation.

```bash
longbridge replace ORDER_ID [--qty N] [--price PRICE] [--trigger-price PRICE] [--format json]
```

```bash
longbridge replace 683615454870679552 --qty 200 --price 255.00
longbridge replace 683615454870679552 --price 245.00
```

---

## balance

Account cash balance by currency.

```bash
longbridge balance [--format json]
```

**Output fields:** `currency`, `available_cash`, `net_assets`, `buying_power`, `margin_call`, `max_finance_amount`, `remaining_finance_amount`, `risk_level`, `margin_ratio`

---

## positions

Current stock positions.

```bash
longbridge positions [--format json]
```

**Output fields:** `symbol`, `name`, `quantity`, `available_quantity`, `cost_price`, `current_price`, `market_value`, `unrealized_pnl`, `unrealized_pnl_ratio`, `currency`

---

## fund-positions

Current fund (mutual fund / ETF) positions.

```bash
longbridge fund-positions [--format json]
```

---

## executions

Trade executions (fills) for today.

```bash
longbridge executions [--format json]
longbridge executions --history --start YYYY-MM-DD --end YYYY-MM-DD
```

**Output fields:** `order_id`, `trade_id`, `symbol`, `trade_done_at`, `quantity`, `price`

---

## margin-ratio

Margin ratios for a security (initial, maintenance, forced liquidation).

```bash
longbridge margin-ratio SYMBOL [--format json]
```

```bash
longbridge margin-ratio TSLA.US
```

---

## order-detail

Full detail of a specific order, including charge breakdown.

```bash
longbridge order-detail ORDER_ID [--format json]
```

---

## estimate-qty

Estimate the maximum quantity that can be purchased.

```bash
longbridge estimate-qty SYMBOL --order-type TYPE [--price PRICE] [--side buy|sell] [--format json]
```

```bash
longbridge estimate-qty TSLA.US --order-type LO --price 250.00
longbridge estimate-qty 700.HK --order-type MO --side buy
```
