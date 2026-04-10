---
title: 'investors'
sidebar_label: 'investors'
sidebar_position: 3
---

# longbridge investors

Browse active institutional fund managers ranked by AUM (from SEC 13F filings), and drill into any manager's current holdings.

## Basic Usage

<CliCommand>
longbridge investors
</CliCommand>

## Scenarios

### Browse top fund managers

<CliCommand>
longbridge investors
</CliCommand>

Lists the largest institutional investors ranked by AUM, with their CIK identifier, name, reported AUM, and the period of the latest 13F filing.

### View a fund manager's holdings

<CliCommand>
# Use the CIK from the investors list to drill into holdings
longbridge investors 0001067983
longbridge investors 0001067983 --format json
</CliCommand>

Pass a CIK to see the full list of equity positions reported by that fund manager. CIK `0001067983` is Berkshire Hathaway.
