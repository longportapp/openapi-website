---
title: 'dividend'
sidebar_label: 'dividend'
sidebar_position: 3
---

# longbridge dividend

View the historical dividend payment history for a stock.

## Basic Usage

<CliCommand>
longbridge dividend AAPL.US
</CliCommand>

## Scenarios

### View dividend history

<CliCommand>
longbridge dividend AAPL.US
</CliCommand>

Lists all historical dividend payments for Apple, including payment dates, amounts per share, and dividend type.

### HK dividend example

<CliCommand>
longbridge dividend 700.HK
</CliCommand>

Works the same for Hong Kong-listed stocks. Tencent pays dividends periodically and this shows the full payment history.

### Find the next ex-dividend date

<CliCommand>
# The ex_date field shows the ex-dividend date for each record
longbridge dividend AAPL.US
</CliCommand>

The most recent record shows the last known ex-dividend date. For upcoming dividends not yet announced, check `finance-calendar` with the `dividend` type.

### View dividend distribution scheme details

<CliCommand>
# Show detailed dividend distribution scheme (lot size, currency, ratio)
longbridge dividend detail AAPL.US
</CliCommand>

The `detail` subcommand shows the full distribution scheme — useful when a dividend includes bonus shares or rights alongside cash.

### JSON for automation

<CliCommand>
longbridge dividend AAPL.US --format json
</CliCommand>

Returns structured JSON with `ex_date`, `payment_date`, `record_date`, and a `desc` field containing the dividend amount description (e.g., `"每股派息 0.26 USD"`) — suitable for piping into scripts or tracking tools.
