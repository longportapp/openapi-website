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

## Installation

<Tabs groupId="cli-install">
  <TabItem value="homebrew" label="macOS (Homebrew)" default>

```bash
brew install --cask longbridge/tap/longbridge-terminal
```

  </TabItem>
  <TabItem value="script" label="Linux / macOS (Script)">

```bash
curl -sSL https://open.longbridge.com/longbridge/longbridge-terminal/install | sh
```

  </TabItem>
  <TabItem value="scoop" label="Windows (Scoop)">

```powershell
scoop install https://open.longbridge.com/longbridge/longbridge-terminal/longbridge.json
```

  </TabItem>
  <TabItem value="powershell" label="Windows (PowerShell)">

```powershell
iwr https://open.longbridge.com/longbridge/longbridge-terminal/install.ps1 | iex
```

  </TabItem>
</Tabs>

After installation, run `longbridge login` to authenticate, then try any command:

<CliCommand>
# Check real-time price
longbridge quote TSLA.US NVDA.US

# View your portfolio
longbridge portfolio

# Get JSON output for scripting or AI agents
longbridge quote AAPL.US --format json
</CliCommand>

## JSON Output

Every command supports `--format json` for machine-readable output. Use it for scripting,
piping into `jq`, or feeding data to AI agents:

<CliCommand>
longbridge positions --format json
longbridge quote TSLA.US NVDA.US --format json
</CliCommand>

## Symbol Format

Symbols use `CODE.MARKET` format:

| Example | Market |
| ------- | ------ |
| `TSLA.US` | US stocks |
| `700.HK` | Hong Kong |
| `600519.SH` | China A-share (Shanghai) |
| `000568.SZ` | China A-share (Shenzhen) |
| `D05.SG` | Singapore |
| `BTCUSD.HAS` | Crypto (Longbridge-specific) |
