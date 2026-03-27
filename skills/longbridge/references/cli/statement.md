# Statement Commands

Query and export account statements (daily or monthly) as CSV or markdown.

## Workflow

1. **List** statements to get available `file_key` values
2. **Export** a statement by `file_key`, selecting one or more sections to output

## Commands

### `statement list` — Query statement list

```bash
longbridge statement list [--type daily|monthly] [--start-date <YYYYMMDD>] [--limit <N>]
```

| Flag           | Required | Default | Description                         |
| -------------- | -------- | ------- | ----------------------------------- |
| `--type`       | No       | `daily` | Statement type: `daily` / `monthly` |
| `--start-date` | No       | -       | Start date for the query (YYYYMMDD) |
| `--limit`      | No       | `5`     | Number of results to return         |

**Examples:**

```bash
# List recent 5 daily statements
longbridge statement list

# List monthly statements
longbridge statement list  --type monthly

# List with custom date range and limit
longbridge statement list  --start-date 20250101 --limit 10
```

**Output columns:** `Date`, `File Key`

### `statement export` — Export statement sections

```bash
longbridge statement export --file-key <KEY> --section <SECTION>... [--format csv|md] [-o <OUTPUT>]
```

| Flag           | Required | Description                                                                                    |
| -------------- | -------- | ---------------------------------------------------------------------------------------------- |
| `--file-key`   | Yes      | File key obtained from `statement list`                                                        |
| `--section`    | Yes      | One or more sections to export (see table below)                                               |
| `--format`     | No       | `csv` or `md`. Defaults to `md` when `-o` is omitted, `csv` when `-o` is provided.             |
| `-o, --output` | No       | Output path. Omit to print to stdout. Single section: file path. Multiple sections: directory. |

**Print markdown to stdout (default without `-o`):**

```bash
longbridge statement export --file-key abc123 --section equity_holdings
```

**Save as CSV file:**

```bash
longbridge statement export --file-key abc123 --section stock_trades -o trades.csv
```

**Multiple sections to directory:**

```bash
longbridge statement export --file-key abc123 \
  --section equity_holdings stock_trades interests \
  -o ./statement-2025-03/
# produces:
#   ./statement-2025-03/equity_holdings.csv
#   ./statement-2025-03/stock_trades.csv
#   ./statement-2025-03/interests.csv
```

**Force markdown format to file:**

```bash
longbridge statement export --file-key abc123 --section asset --format md -o asset.md
```

## StatementSection Reference

| Value                     | Description                                |
| ------------------------- | ------------------------------------------ |
| `asset`                   | Account asset overview (single row)        |
| `account_balances`        | Account balance summary by currency        |
| `equity_holdings`         | Equity/stock holdings summary              |
| `account_balance_changes` | Account balance change records             |
| `stock_trades`            | Stock trade records                        |
| `equity_holding_changes`  | Equity holding change records              |
| `account_balance_locks`   | Account balance lock records               |
| `equity_holding_locks`    | Equity holding lock records                |
| `option_trades`           | Option trade records                       |
| `fund_trades`             | Fund trade records                         |
| `ipo_trades`              | IPO subscription records                   |
| `virtual_trades`          | Virtual asset trade records                |
| `interests`               | Interest charges/credits                   |
| `lending_fees`            | Securities lending fee records             |
| `custodian_fees`          | Custodian fee records                      |
| `corps`                   | Corporate actions (dividends, splits, etc) |

## Scenario Guide — Which sections to query

| User intent                                    | Recommended sections                                       |
| ---------------------------------------------- | ---------------------------------------------------------- |
| Check account asset overview                   | `asset` `account_balances`  `equity_holdings`              |
| Check account balance by currency              | `account_balances`                                         |
| Check current holdings / positions             | `equity_holdings`                                          |
| Analyze holdings as percentage of total assets | `asset` `equity_holdings`                                  |
| Review recent asset changes                    | `account_balance_changes` `equity_holding_changes`         |
| Check recent order / trade history             | `stock_trades` `fund_trades` `ipo_trades` `virtual_trades` |
| Check margin interest / financing costs        | `interests`                                                |
| Review lending and custody costs               | `lending_fees` `custodian_fees`                            |
| Check corporate actions (dividends, splits)    | `corps`                                                    |
| Full statement export                          | all sections                                               |

## Common Recipes

```bash
# Quick daily workflow: list → export to stdout for AI analysis
longbridge statement list
longbridge statement export --file-key <KEY> \
  --section asset equity_holdings stock_trades account_balance_changes

# Save daily report as CSV files
longbridge statement export --file-key <KEY> \
  --section asset equity_holdings stock_trades account_balance_changes \
  -o ./daily-report/

# Export only interest and fee sections from a monthly statement
longbridge statement list --type monthly
longbridge statement export --file-key <KEY> \
  --section interests lending_fees custodian_fees \
  -o ./monthly-fees/

# Single section to a specific file
longbridge statement export --file-key <KEY> --section corps -o corps.csv
```
