---
title: 'security-list'
sidebar_label: 'security-list'
sidebar_position: 12
---

# longbridge security-list

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
# JSON output for validating eligibility before placing trades
longbridge security-list US --format json
</CliCommand>

Returns the full list of US symbols currently eligible for overnight trading sessions on Longbridge. Use `--format json` to get a machine-readable list for automating eligibility checks.

## Notes

Only the US market is supported (Longbridge API limitation). This list changes as eligibility is updated — check it before submitting overnight orders rather than relying on a cached copy.
