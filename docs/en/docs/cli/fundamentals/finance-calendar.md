---
title: 'finance-calendar'
sidebar_label: 'finance-calendar'
sidebar_position: 6
---

# longbridge finance-calendar

Browse upcoming financial events — earnings reports, dividend payments, IPOs, and macroeconomic releases — filtered by symbol, market, or event type.

## Basic Usage

<CliCommand>
longbridge finance-calendar financial
</CliCommand>

## Scenarios

### Upcoming earnings for a stock

<CliCommand>
longbridge finance-calendar financial --symbol TSLA.US
</CliCommand>

Shows Tesla's upcoming earnings dates along with analyst estimates for EPS and revenue. Use `--symbol` to narrow down to a specific stock.

### Today's dividend events for the US market

<CliCommand>
longbridge finance-calendar dividend --market US
</CliCommand>

Lists all dividend-related events (ex-dividend dates, payment dates) scheduled for US-listed stocks. Useful for tracking which stocks are going ex-dividend.

### High-importance macro events

<CliCommand>
longbridge finance-calendar macrodata --star 3
</CliCommand>

Filters macroeconomic events to only show high-importance releases (3-star). Covers data like CPI, NFP, Fed rate decisions, and similar market-moving events.

### IPO calendar

<CliCommand>
longbridge finance-calendar ipo
</CliCommand>

Shows upcoming IPOs across supported markets. Combine with `--market` to filter by a specific exchange.
