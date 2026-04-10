---
title: 'Longbridge CLI'
sidebar_label: 'Overview'
sidebar_position: 1
---

# Longbridge CLI

Longbridge CLI (`longbridge`) is an AI-native command-line tool covering every Longbridge OpenAPI
endpoint — real-time market data, fundamentals, account management, and trading. Designed for
scripting, AI-agent tool-calling, and daily workflows from the terminal.

**GitHub:** [longbridge/longbridge-terminal](https://github.com/longbridge/longbridge-terminal)

## Quick Start

See [Installation](/docs/cli/installation) for platform-specific install instructions and authentication setup. After installing, try any command:

```bash
# Check real-time price
longbridge quote TSLA.US NVDA.US

# View your portfolio
longbridge portfolio

# Get JSON output for scripting or AI agents
longbridge quote AAPL.US --format json
```

## JSON Output

Every command supports `--format json` for machine-readable output. Use it for scripting,
piping into `jq`, or feeding data to AI agents:

```bash
longbridge positions --format json
longbridge quote TSLA.US NVDA.US --format json
```

## Symbol Format

Symbols use `CODE.MARKET` format:

| Example      | Market                       |
| ------------ | ---------------------------- |
| `TSLA.US`    | US stocks                    |
| `700.HK`     | Hong Kong                    |
| `600519.SH`  | China A-share (Shanghai)     |
| `000568.SZ`  | China A-share (Shenzhen)     |
| `D05.SG`     | Singapore                    |
| `BTCUSD.HAS` | Crypto (Longbridge-specific) |
