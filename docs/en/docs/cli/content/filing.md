---
title: 'filing'
sidebar_label: 'filing'
sidebar_position: 2
---

# longbridge filing

Browse regulatory filings and disclosure documents for a symbol. For US-listed stocks, this includes SEC EDGAR filings such as Form 4 insider transactions, 8-K current reports, and 10-K annual reports. HK-listed stocks return exchange disclosure filings from the Hong Kong Stock Exchange.

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

Lists the most recent filings for the symbol with titles, form types, and publication dates. The `file_urls` field in JSON output contains direct download links to the filing documents.

### Read a full filing

<CliCommand>
# Use the id from the filing list to read the full document
longbridge filing detail 633214836329945345
</CliCommand>

Returns the full text content of the filing. Useful for extracting specific disclosures or feeding to an AI model for analysis.
