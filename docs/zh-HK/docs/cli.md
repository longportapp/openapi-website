---
sidebar_position: 2.1
slug: /cli
sidebar_label: CLI
sidebarCollapsed: true
id: cli
---

# Longbridge Terminal CLI

Longbridge Terminal 是一款 AI-native 命令列工具，涵蓋全部 Longbridge OpenAPI 端點，支援即時行情、帳戶管理與交易操作。專為腳本自動化、AI 代理工具調用及日常終端交易工作流程設計。

**GitHub：** [longbridge/longbridge-terminal](https://github.com/longbridge/longbridge-terminal)

```bash
$ longbridge static NVDA.US
+---------+--------------------+----------+----------+----------+--------------+--------------+--------------------+--------------------+-------------------+----------------+
| Symbol  | Name (EN)          | Exchange | Currency | Lot Size | Total Shares | Circ. Shares | EPS                | EPS TTM            | BPS               | Dividend Yield |
+============================================================================================================================================================================+
| NVDA.US | NVIDIA Corporation | NASD     | USD      | 1        | 24300000000  | 23501828621  | 4.9410288065843621 | 4.9410288065843621 | 6.472962962962963 | 0.04           |
+---------+--------------------+----------+----------+----------+--------------+--------------+--------------------+--------------------+-------------------+----------------+

$ longbridge quote TSLA.US NVDA.US --format json
[
  {
    "high": "403.730",
    "last": "395.560",
    "low": "394.420",
    "open": "396.220",
    "prev_close": "391.200",
    "status": "Normal",
    "symbol": "TSLA.US",
    "turnover": "23138752546.000",
    "volume": "58068343"
  },
  {
    "high": "188.880",
    "last": "183.220",
    "low": "181.410",
    "open": "182.970",
    "prev_close": "180.250",
    "status": "Normal",
    "symbol": "NVDA.US",
    "turnover": "40023702698.000",
    "volume": "217307380"
  }
]
```

## 安裝

**Homebrew**

```bash
brew install --cask longbridge/tap/longbridge-terminal
```

**安裝腳本**

```bash
curl -sSL https://github.com/longbridge/longbridge-terminal/raw/main/install | sh
```

安裝完成後，`longbridge` 二進位檔案位於 `/usr/local/bin`。

## 認證

使用 OAuth 2.0 認證，無需手動管理 Token：

```bash
longbridge login    # 開啟瀏覽器完成 OAuth 授權，Token 儲存至 ~/.longbridge/terminal/.openapi-session
longbridge logout   # 清除已儲存的 Token
```

## 可用能力

### 行情資料

```bash
longbridge quote TSLA.US 700.HK                                       # 即時行情
longbridge depth TSLA.US                                              # Level 2 盤口深度
longbridge trades TSLA.US [--count 50]                                # 最新逐筆成交
longbridge kline TSLA.US [--period day] [--count 100]                 # K 線（OHLCV）
longbridge kline-history TSLA.US --start 2024-01-01 --end 2024-12-31 # 歷史 K 線
longbridge intraday TSLA.US                                           # 當日分時資料
longbridge static TSLA.US                                             # 標的靜態參考資訊
longbridge calc-index TSLA.US --index pe,pb,eps                       # 財務指標（PE、PB、EPS 等）
longbridge capital-flow TSLA.US                                       # 當日資金流入流出時序
longbridge capital-dist TSLA.US                                       # 資金分佈快照
longbridge market-temp [HK|US|CN|SG]                                  # 市場情緒溫度指數（0–100）
```

### 期權與權證

```bash
longbridge option-quote AAPL240119C190000         # 期權即時行情
longbridge option-chain AAPL.US                   # 期權鏈（所有到期日）
longbridge option-chain AAPL.US --date 2024-01-19 # 指定到期日的行權價列表
longbridge warrant-quote 12345.HK                 # 權證即時行情
longbridge warrant-list 700.HK                    # 標的關聯權證列表
```

### 自選股

```bash
longbridge watchlist                                             # 查看自選股分組
longbridge watchlist create "My Portfolio"                       # 新建分組
longbridge watchlist update <id> --add TSLA.US --remove AAPL.US  # 新增/移除標的
longbridge watchlist delete <id>                                 # 刪除分組
```

### 交易

```bash
longbridge orders                                      # 當日訂單，加 --history 查歷史
longbridge buy TSLA.US 100 --price 250.00              # 買入（執行前需確認）
longbridge sell TSLA.US 100 --price 260.00             # 賣出（執行前需確認）
longbridge cancel <order_id>                           # 撤單（執行前需確認）
longbridge replace <order_id> --qty 200 --price 255.00 # 改單
longbridge balance                                     # 帳戶現金餘額
longbridge positions                                   # 股票持倉
longbridge fund-positions                              # 基金持倉
longbridge executions                                  # 成交記錄
```

### 標的格式

```
<代碼>.<市場>   例如   TSLA.US   700.HK   600519.SH
```

支援市場：`HK`（香港）· `US`（美國）· `CN` / `SH` / `SZ`（A 股）· `SG`（新加坡）

## AI 整合

### JSON 輸出

所有命令支援 `--format json`，輸出機器可讀的結構化資料，適合 AI 代理調用和管道處理：

```bash
longbridge quote TSLA.US --format json
longbridge positions --format json | jq '.[] | {symbol, quantity}'
```

### 安裝 AI Skill

為 AI 工具（如 Claude）安裝 Skill，使其掌握全部 `longbridge` 命令知識：

```bash
npx skills add longbridge/longbridge-terminal
```

安裝後，AI 可直接從對話中查詢行情、執行技術分析、管理交易：

```
claude> 展示 NVDA 和 TSLA 最近 5 天的表現

⏺ Bash(longbridge kline TSLA.US --period day --count 5 & longbridge kline NVDA.US --period day --count 5 & wait)
  ⎿  +---------------------+---------+---------+---------+---------+----------+-----------------+
     | Time                | Open    | High    | Low     | Close   | Volume   | Turnover        |
     … +11 lines (ctrl+o to expand)

⏺ TSLA 資料已載入，以下是近 5 日表現：

  TSLA.US — 近 5 日

  ┌────────┬────────┬────────┬────────┬────────┬──────────┐
  │  日期  │  開盤  │  最高  │  最低  │  收盤  │  漲跌幅  │
  ├────────┼────────┼────────┼────────┼────────┼──────────┤
  │ Mar 10 │ 402.22 │ 406.59 │ 398.19 │ 399.24 │ —        │
  ├────────┼────────┼────────┼────────┼────────┼──────────┤
  │ Mar 11 │ 402.28 │ 416.38 │ 402.15 │ 407.82 │ ▲ +2.15% │
  ├────────┼────────┼────────┼────────┼────────┼──────────┤
  │ Mar 12 │ 405.18 │ 406.50 │ 394.65 │ 395.01 │ ▼ -3.14% │
  ├────────┼────────┼────────┼────────┼────────┼──────────┤
  │ Mar 13 │ 399.17 │ 400.20 │ 389.95 │ 391.20 │ ▼ -0.96% │
  ├────────┼────────┼────────┼────────┼────────┼──────────┤
  │ Mar 16 │ 396.22 │ 403.73 │ 394.42 │ 395.56 │ ▲ +1.11% │
  └────────┴────────┴────────┴────────┴────────┴──────────┘

  5 日收益：-0.92% | 區間：$389.95 – $416.38
```

## 速率限制

Longbridge OpenAPI 最高支援每秒 10 次調用，SDK 自動刷新 OAuth Token。
