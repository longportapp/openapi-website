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

### JSON for automation

<CliCommand>
longbridge dividend AAPL.US --format json
</CliCommand>

Returns structured JSON with payment date, ex-dividend date, amount, and dividend type — suitable for piping into scripts or tracking tools.
