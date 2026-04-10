---
title: 'financial-report'
sidebar_label: 'financial-report'
sidebar_position: 1
---

# longbridge financial-report

Fetch income statements, balance sheets, and cash flow statements for any public company.

## Basic Usage

<CliCommand>
longbridge financial-report TSLA.US
</CliCommand>

## Scenarios

### Get the latest income statement

<CliCommand>
longbridge financial-report TSLA.US --kind IS
</CliCommand>

Returns the income statement for the most recent reporting period, including EPS, revenue, and other earnings line items.

### Get all three statements

<CliCommand>
longbridge financial-report TSLA.US
</CliCommand>

Fetches the income statement, balance sheet, and cash flow statement together. Equivalent to `--kind ALL`.

### Get the cash flow statement

<CliCommand>
longbridge financial-report TSLA.US --kind CF
</CliCommand>

Returns the cash flow statement, covering operating, investing, and financing activities.

### Annual balance sheet

<CliCommand>
longbridge financial-report 700.HK --kind BS --report af
</CliCommand>

Retrieves the annual balance sheet for Tencent. Use `--report` to choose the reporting period: `af` (annual), `saf` (semi-annual), `q1`, `3q`, or `qf` (quarterly).
