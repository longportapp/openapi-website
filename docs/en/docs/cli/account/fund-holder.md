---
title: 'fund-holder'
sidebar_label: 'fund-holder'
sidebar_position: 6
---

# longbridge fund-holder

Find which ETFs and funds hold a given stock, along with each fund's position ratio and report date.

## Basic Usage

<CliCommand>
longbridge fund-holder AAPL.US
</CliCommand>

## Scenarios

### Find top ETF holders of a stock

<CliCommand>
longbridge fund-holder AAPL.US
</CliCommand>

Lists the ETFs and funds with the largest exposure to the given stock, sorted by position ratio.

### Get more holders

<CliCommand>
longbridge fund-holder TSLA.US --count 50
</CliCommand>

Use `--count` to retrieve more results beyond the default limit.

### JSON output

<CliCommand>
longbridge fund-holder AAPL.US --count 3 --format json
</CliCommand>

```json
{
  "lists": [
    { "code": "AAPX", "counter_id": "ETF/US/AAPX", "currency": "USD", "name": "T-Rex 2X Long Apple Daily Target ETF", "position_ratio": "67.61921", "report_date": "2026.04.03" },
    { "code": "GXPT", "counter_id": "ETF/US/GXPT", "currency": "USD", "name": "Global X PureCap MSCI Infor Tech ETF", "position_ratio": "19.57739", "report_date": "2026.04.06" },
    { "code": "161128", "counter_id": "ETF/SZ/161128", "currency": "CNY", "name": "易方达标普信息科技指数(QDII-LOF)A(人民币份额)", "position_ratio": "17.37837", "report_date": "2025.12.31" }
  ]
}
```

`position_ratio` is the percentage of the fund's portfolio allocated to the queried stock. `report_date` is the date of the last filing that reported the holding.
