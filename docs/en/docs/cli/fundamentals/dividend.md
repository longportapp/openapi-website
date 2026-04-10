---
title: 'dividend'
sidebar_label: 'dividend'
sidebar_position: 3
---

# longbridge dividend

View the historical dividend payment history for a stock.

## Basic Usage

```bash
longbridge dividend 700.HK
```

```
| desc                                 | ex_date    | payment_date | record_date |
|--------------------------------------|------------|--------------|-------------|
| 每股派息 5.3 HKD                     | 2026.05.15 | 2026.06.01   | 2026.05.18  |
| 每股派息 4.5 HKD                     | 2025.05.16 | 2025.05.30   | 2025.05.19  |
| 每股派息 3.4 HKD                     | 2024.05.17 | 2024.05.31   | 2024.05.20  |
| 每股派息 2.4 HKD                     | 2023.05.19 | 2023.06.05   | 2023.05.22  |
```

## Scenarios

### View dividend history

```bash
longbridge dividend AAPL.US
```

Lists all historical dividend payments for Apple, including payment dates, amounts per share, and dividend type.

### HK dividend example

```bash
longbridge dividend 700.HK
```

Works the same for Hong Kong-listed stocks. Tencent pays dividends periodically and this shows the full payment history.

### Find the next ex-dividend date

```bash
# The ex_date field shows the ex-dividend date for each record
longbridge dividend AAPL.US
```

The most recent record shows the last known ex-dividend date. For upcoming dividends not yet announced, check `finance-calendar` with the `dividend` type.

### View dividend distribution scheme details

```bash
# Show detailed dividend distribution scheme (lot size, currency, ratio)
longbridge dividend detail AAPL.US
```

The `detail` subcommand shows the full distribution scheme — useful when a dividend includes bonus shares or rights alongside cash.

### JSON for automation

```bash
longbridge dividend AAPL.US --format json
```

Returns structured JSON with `ex_date`, `payment_date`, `record_date`, and a `desc` field containing the dividend amount description (e.g., `"每股派息 0.26 USD"`) — suitable for piping into scripts or tracking tools.
