---
title: 'security-list'
sidebar_label: 'security-list'
sidebar_position: 12
---

# security-list

List US securities that are eligible for overnight trading on Longbridge.

## Basic Usage

<CliCommand>
longbridge security-list
</CliCommand>

## Scenarios

### View overnight-eligible US securities

<CliCommand>
# Default (US market)
longbridge security-list
# Explicit market
longbridge security-list US
</CliCommand>

Returns the full list of US symbols currently eligible for overnight trading sessions on Longbridge.

### JSON output for automation

<CliCommand>
longbridge security-list US --format json
</CliCommand>

```json
[
  { "name": "GDS", "symbol": "GDS.US" },
  { "name": "ZEEKR Intelligent Tech", "symbol": "ZK.US" }
]
```

Each entry contains the symbol and its display name. Use this list to validate overnight order eligibility before placing trades.

## Notes

Only the US market is supported (Longbridge API limitation). This list changes as eligibility is updated — check it before submitting overnight orders rather than relying on a cached copy.
