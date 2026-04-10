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
</CliCommand>

Lists the most recent filings for the symbol with titles, form types, and publication dates.

### JSON with download links

<CliCommand>
longbridge filing TSLA.US --format json
</CliCommand>

```json
[
  { "description": "", "file_count": 1, "file_name": "4 - Tesla, Inc. (0001318605) (Issuer)", "file_urls": ["https://www.sec.gov/Archives/edgar/data/1318605/000197292826000002/xslF345X06/edgardoc.xml"], "id": "633214836329945345", "publish_at": 1775174932, "title": "Tesla | 4 - Tesla, Inc. (0001318605) (Issuer)" },
  { "description": "", "file_count": 2, "file_name": "8-K - Tesla, Inc. (0001318605) (Filer)", "file_urls": ["https://www.sec.gov/Archives/edgar/data/1318605/000162828026022956/tsla-20260402.htm", "https://www.sec.gov/Archives/edgar/data/1318605/000162828026022956/exhibit9911111.htm"], "id": "633048285147044097", "publish_at": 1775135233, "title": "Tesla | 8-K - Tesla, Inc. (0001318605) (Filer)" }
]
```

The `file_urls` array contains direct download links to the filing documents on SEC EDGAR. Filings with multiple documents (e.g., 8-K with exhibits) will have more than one URL.
