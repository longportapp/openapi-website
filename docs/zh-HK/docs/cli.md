---
sidebar_position: 2.1
slug: /cli
sidebar_label: CLI
sidebarCollapsed: true
id: cli
sidebar_icon: terminal
---

# Longbridge Terminal CLI

Longbridge Terminal 是一款 AI-native 命令列工具，涵蓋全部 Longbridge Developers 端點，支援即時行情、帳戶管理與交易操作。專為腳本自動化、AI 代理工具調用及日常終端交易工作流程設計。

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
longbridge kline history TSLA.US --start 2024-01-01 --end 2024-12-31 # 歷史 K 線
longbridge intraday TSLA.US                                           # 當日分時資料
longbridge static TSLA.US                                             # 標的靜態參考資訊
longbridge calc-index TSLA.US --index pe,pb,eps                       # 財務指標（PE、PB、EPS 等）
longbridge capital flow TSLA.US                                       # 當日資金流入流出時序
longbridge capital dist TSLA.US                                       # 資金分佈快照
longbridge market-temp [HK|US|CN|SG]                                  # 市場情緒溫度指數（0–100）
```

### 公司公告與文件

```bash
longbridge filing list AAPL.US [--count 20]          # 公司公告與監管文件列表（財報、公告、SEC 申報等）
longbridge filing detail AAPL.US <id>            # 文件原文（Markdown 格式）；多文件用 --file-index N 指定附件（如 8-K Exhibit）
```

### 基本面與分析

```bash
# 財務報表（利潤表、資產負債表、現金流量表）
longbridge financial-report TSLA.US
# 年度利潤表
longbridge financial-report TSLA.US --kind IS --report af
# 季度資產負債表
longbridge financial-report TSLA.US --kind BS --report qf
# 估值快照：PE、PB、PS、股息率 + 同業對比
longbridge valuation TSLA.US
# 歷史 PE 時間序列
longbridge valuation TSLA.US --history
# PB 歷史，5 年區間
longbridge valuation TSLA.US --history --indicator pb --range 5
# 分析師 EPS 預測共識
longbridge forecast-eps TSLA.US
# 收入/利潤/EPS 共識（含超預期/不及預期標注）
longbridge consensus TSLA.US
# 機構評級分佈與目標價共識
longbridge institution-rating TSLA.US
# 月度評級趨勢與分析師準確率
longbridge institution-rating detail TSLA.US
# 機構股東列表（含變動追蹤）
longbridge shareholder AAPL.US
# 增持機構，按持股量排序
longbridge shareholder AAPL.US --range inc --sort owned
# 持有該標的的基金和 ETF（預設前 20）
longbridge fund-holder AAPL.US
# 全部持倉機構
longbridge fund-holder AAPL.US --count -1
# 歷史股息記錄
longbridge dividend AAPL.US
# 股息分配方案詳情
longbridge dividend detail AAPL.US
# 即將發布的財經事件
longbridge finance-calendar financial
# 指定標的財報日曆
longbridge finance-calendar report --symbol AAPL.US --symbol TSLA.US
# 僅高重要性宏觀經濟事件
longbridge finance-calendar macrodata --star 3
# 美股即將派息事件
longbridge finance-calendar dividend --market US
# 全市場匯率
longbridge exchange-rate
```

### 社區內容

```bash
longbridge topic mine                           # 我發布的全部討論
longbridge topic mine --type article            # 僅長文
longbridge topic mine --type post --size 10     # 短帖，每頁 10 條
longbridge topic mine --page 2                  # 翻頁
longbridge topic create --body "今天看好 700.HK"                                           # 發短帖（純文本）
longbridge topic create --body "NVDA GTC 看點" --tickers NVDA.US                          # 帶關聯標的
longbridge topic create --title "我的分析" --body "$(cat post.md)" --type article          # 發長文（從文件讀取）
```

### 期權與權證

```bash
longbridge option quote AAPL240119C190000         # 期權即時行情
longbridge option chain AAPL.US                   # 期權鏈（所有到期日）
longbridge option chain AAPL.US --date 2024-01-19 # 指定到期日的行權價列表
longbridge warrant quote 12345.HK                 # 權證即時行情
longbridge warrant list 700.HK                    # 標的關聯權證列表
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

### 帳戶結單

```bash
longbridge statement list                                                       # 列出最近的日結單
longbridge statement list --type monthly                                        # 列出月結單
longbridge statement export --file-key <KEY> --section equity_holdings          # 匯出某個板塊為 Markdown 到終端
longbridge statement export --file-key <KEY> --section stock_trades -o trades.csv  # 匯出為 CSV 檔案
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
npx skills add longbridge/developers
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

### 財報分析示例

AI 可直接調用 `filings` 檢索公告列表，再用 `filing-detail` 拉取原始文件，完成跨公司財報對比：

```
claude> 對比分析 TSLA 和 NVDA 2025 Q4 的財報數據

⏺ Bash(longbridge filing list TSLA.US & longbridge filing list NVDA.US & wait)
  ⎿  TSLA.US  610186794100660481  10-K   2025-02-26  Annual Report FY2025
     NVDA.US  620129220687041793  8-K    2026-02-26  Q4 FY2026 Earnings Release
     … +18 filings

⏺ Bash(longbridge filing detail TSLA.US 610186794100660481 --file-index 0 &
        longbridge filing detail NVDA.US 620129220687041793 --file-index 1 & wait)
  ⎿  [TSLA 10-K FY2025 / NVDA 8-K Exhibit 99.1 Q4 FY2026 已載入]

⏺ 數據來源：100% 官方公告 via Longbridge filings + filing-detail
  - TSLA：10-K FY2025（filing-detail TSLA.US 610186794100660481 --file-index 0）
  - NVDA：8-K Exhibit 99.1 Q4 FY2026（filing-detail NVDA.US 620129220687041793 --file-index 1）

  一、損益表對比（全年）

  ┌────────────┬─────────────┬─────────────┬───────────┐
  │    指標    │ TSLA FY2025 │ NVDA FY2026 │  倍數差   │
  ├────────────┼─────────────┼─────────────┼───────────┤
  │ 總營收     │    $94,827M │   $215,938M │ NVDA 2.3x │
  │ 營收同比   │         -3% │        +65% │         — │
  │ 毛利潤     │    $17,094M │   $153,463M │   NVDA 9x │
  │ 毛利率     │       18.0% │       71.1% │  +53 ppts │
  │ 營業利潤   │     $4,355M │   $130,387M │  NVDA 30x │
  │ 營業利潤率 │        4.6% │       60.4% │  +56 ppts │
  │ 淨利潤     │     $3,794M │   $120,067M │  NVDA 32x │
  │ 攤薄 EPS   │       $1.08 │       $4.90 │         — │
  └────────────┴─────────────┴─────────────┴───────────┘

  二、現金流對比（全年）

  ┌────────────┬─────────────┬─────────────┐
  │    指標    │ TSLA FY2025 │ NVDA FY2026 │
  ├────────────┼─────────────┼─────────────┤
  │ 經營現金流 │    $14,747M │   $102,718M │
  │ 資本支出   │     $8,527M │     $6,042M │
  │ 自由現金流 │     $6,220M │    $96,676M │
  │ FCF 利潤率 │        6.6% │       44.8% │
  └────────────┴─────────────┴─────────────┘

  NVDA 的 CapEx 甚至低於 TSLA，卻產生了 15x 的自由現金流。

  三、核心風險

  TSLA：汽車競爭加劇、品牌壓力、Musk 精力分散；汽車業務同比 -10%，
        能源（+27%）和服務（+19%）部分對沖。
  NVDA：對華出口管制；Q1 FY27 指引 $78B 已排除中國數據中心收入，
        單季營收約等於 TSLA 全年。
```

## 速率限制

Longbridge OpenAPI 最高支援每秒 10 次調用，SDK 自動刷新 OAuth Token。

## Release Notes

### [v0.13.0](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.13.0)

- **新增：基本面與分析命令** — `financial-report`、`valuation`、`forecast-eps`、`consensus`、`institution-rating`、`shareholder`、`fund-holder`、`dividend`、`finance-calendar`、`exchange-rate`
- **重大變更：命令結構調整** — 19 個扁平命令遷移為子命令樹（如 `news-detail` → `news detail`、`kline-history` → `kline history`、`warrant-list` → `warrant list`）
- **中國區節點支援** — 設定 `LONGBRIDGE_REGION=cn` 可路由至中國節點

### [v0.12.0](https://github.com/longbridge/longbridge-terminal/releases/tag/v0.12.0)

- **新增：`statement` 命令** — 列出和匯出日結單/月結單
- **TUI** — 修復 `q` 退出；自選股頁面新增資訊列表與詳情視圖

---

完整更新日誌：[github.com/longbridge/longbridge-terminal/releases](https://github.com/longbridge/longbridge-terminal/releases)
