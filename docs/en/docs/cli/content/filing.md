---
title: 'filing'
sidebar_label: 'filing'
sidebar_position: 2
---

# longbridge filing

Browse SEC filings and regulatory documents for a symbol — Form 4 insider transactions, 8-K current reports, 10-K annual reports, and more.

## Basic Usage

<CliCommand>
longbridge filing TSLA.US
</CliCommand>

## Scenarios

### View recent filings

<CliCommand>
longbridge filing TSLA.US
# Output as JSON for scripting
longbridge filing TSLA.US --format json
</CliCommand>

Lists the most recent filings for the symbol with titles, form types, and publication dates. The `file_urls` field in JSON output contains direct download links to the filing documents on SEC EDGAR.

### Read a full filing

<CliCommand>
# Use the id from the filing list to read the full document
longbridge filing detail 633214836329945345
</CliCommand>

Returns the full text content of the filing. Useful for extracting specific disclosures or feeding to an AI model for analysis.
