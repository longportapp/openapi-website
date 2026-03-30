---
sidebar_position: 2.1
slug: /cli
sidebar_label: CLI
sidebarCollapsed: true
id: cli
sidebar_icon: terminal
---

# Longbridge Terminal CLI

Longbridge Terminal 是一款 AI-native 命令行工具，覆盖全部 Longbridge Developers 端点，支持实时行情、账户管理与交易操作。专为脚本自动化、AI 代理工具调用及日常终端交易工作流设计。

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

## 安装

**Homebrew**

```bash
brew install --cask longbridge/tap/longbridge-terminal
```

**安装脚本**

```bash
curl -sSL https://github.com/longbridge/longbridge-terminal/raw/main/install | sh
```

安装完成后，`longbridge` 二进制文件位于 `/usr/local/bin`。

## 认证

使用 OAuth 2.0 认证，无需手动管理 Token：

```bash
longbridge login    # 打开浏览器完成 OAuth 授权，Token 保存至 ~/.longbridge/terminal/.openapi-session
longbridge logout   # 清除已保存的 Token
```

## 可用能力

### 行情数据

```bash
longbridge quote TSLA.US 700.HK                                       # 实时行情
longbridge depth TSLA.US                                              # Level 2 盘口深度
longbridge trades TSLA.US [--count 50]                                # 最新逐笔成交
longbridge kline TSLA.US [--period day] [--count 100]                 # K 线（OHLCV）
longbridge kline history TSLA.US --start 2024-01-01 --end 2024-12-31 # 历史 K 线
longbridge intraday TSLA.US                                           # 当日分时数据
longbridge static TSLA.US                                             # 标的静态参考信息
longbridge calc-index TSLA.US --index pe,pb,eps                       # 财务指标（PE、PB、EPS 等）
longbridge capital flow TSLA.US                                       # 当日资金流入流出时序
longbridge capital dist TSLA.US                                       # 资金分布快照
longbridge market-temp [HK|US|CN|SG]                                  # 市场情绪温度指数（0–100）
```

### 公司公告与文件

```bash
longbridge filing list AAPL.US [--count 20]          # 公司公告与监管文件列表（财报、公告、SEC 申报等）
longbridge filing detail AAPL.US <id>            # 文件原文（Markdown 格式）；多文件用 --file-index N 指定附件（如 8-K Exhibit）
```

### 社区内容

```bash
longbridge topic mine                           # 我发布的全部讨论
longbridge topic mine --type article            # 仅长文
longbridge topic mine --type post --size 10     # 短帖，每页 10 条
longbridge topic mine --page 2                  # 翻页
longbridge topic create --body "今天看好 700.HK"                                           # 发短帖（纯文本）
longbridge topic create --body "NVDA GTC 看点" --tickers NVDA.US                          # 带关联标的
longbridge topic create --title "我的分析" --body "$(cat post.md)" --type article          # 发长文（从文件读取）
```

### 期权与权证

```bash
longbridge option quote AAPL240119C190000         # 期权实时行情
longbridge option chain AAPL.US                   # 期权链（所有到期日）
longbridge option chain AAPL.US --date 2024-01-19 # 指定到期日的行权价列表
longbridge warrant quote 12345.HK                 # 权证实时行情
longbridge warrant list 700.HK                    # 标的关联权证列表
```

### 自选股

```bash
longbridge watchlist                                             # 查看自选股分组
longbridge watchlist create "My Portfolio"                       # 新建分组
longbridge watchlist update <id> --add TSLA.US --remove AAPL.US  # 添加/移除标的
longbridge watchlist delete <id>                                 # 删除分组
```

### 交易

```bash
longbridge orders                                      # 当日订单，加 --history 查历史
longbridge buy TSLA.US 100 --price 250.00              # 买入（执行前需确认）
longbridge sell TSLA.US 100 --price 260.00             # 卖出（执行前需确认）
longbridge cancel <order_id>                           # 撤单（执行前需确认）
longbridge replace <order_id> --qty 200 --price 255.00 # 改单
longbridge balance                                     # 账户现金余额
longbridge positions                                   # 股票持仓
longbridge fund-positions                              # 基金持仓
longbridge executions                                  # 成交记录
```

### 账户结单

```bash
longbridge statement list                                                       # 列出最近的日结单
longbridge statement list --type monthly                                        # 列出月结单
longbridge statement export --file-key <KEY> --section equity_holdings          # 导出某个板块为 Markdown 到终端
longbridge statement export --file-key <KEY> --section stock_trades -o trades.csv  # 导出为 CSV 文件
```

### 标的格式

```
<代码>.<市场>   例如   TSLA.US   700.HK   600519.SH
```

支持市场：`HK`（香港）· `US`（美国）· `CN` / `SH` / `SZ`（A 股）· `SG`（新加坡）

## AI 集成

### JSON 输出

所有命令支持 `--format json`，输出机器可读的结构化数据，适合 AI 代理调用和管道处理：

```bash
longbridge quote TSLA.US --format json
longbridge positions --format json | jq '.[] | {symbol, quantity}'
```

### 安装 AI Skill

为 AI 工具（如 Claude）安装 Skill，使其掌握全部 `longbridge` 命令知识：

```bash
npx skills add longbridge/developers
```

安装后，AI 可直接从对话中查询行情、执行技术分析、管理交易：

```
claude> 展示 NVDA 和 TSLA 最近 5 天的表现

⏺ Bash(longbridge kline TSLA.US --period day --count 5 & longbridge kline NVDA.US --period day --count 5 & wait)
  ⎿  +---------------------+---------+---------+---------+---------+----------+-----------------+
     | Time                | Open    | High    | Low     | Close   | Volume   | Turnover        |
     … +11 lines (ctrl+o to expand)

⏺ TSLA 数据已加载，以下是近 5 日表现：

  TSLA.US — 近 5 日

  ┌────────┬────────┬────────┬────────┬────────┬──────────┐
  │  日期  │  开盘  │  最高  │  最低  │  收盘  │  涨跌幅  │
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

  5 日收益：-0.92% | 区间：$389.95 – $416.38
```

### 财报分析示例

AI 可直接调用 `filings` 检索公告列表，再用 `filing-detail` 拉取原始文件，完成跨公司财报对比：

```
claude> 对比分析 TSLA 和 NVDA 2025 Q4 的财报数据

⏺ Bash(longbridge filing list TSLA.US & longbridge filing list NVDA.US & wait)
  ⎿  TSLA.US  610186794100660481  10-K   2025-02-26  Annual Report FY2025
     NVDA.US  620129220687041793  8-K    2026-02-26  Q4 FY2026 Earnings Release
     … +18 filings

⏺ Bash(longbridge filing detail TSLA.US 610186794100660481 --file-index 0 &
        longbridge filing detail NVDA.US 620129220687041793 --file-index 1 & wait)
  ⎿  [TSLA 10-K FY2025 / NVDA 8-K Exhibit 99.1 Q4 FY2026 已加载]

⏺ 数据来源：100% 官方公告 via Longbridge filings + filing-detail
  - TSLA：10-K FY2025（filing-detail TSLA.US 610186794100660481 --file-index 0）
  - NVDA：8-K Exhibit 99.1 Q4 FY2026（filing-detail NVDA.US 620129220687041793 --file-index 1）

  一、损益表对比（全年）

  ┌────────────┬─────────────┬─────────────┬───────────┐
  │    指标    │ TSLA FY2025 │ NVDA FY2026 │  倍数差   │
  ├────────────┼─────────────┼─────────────┼───────────┤
  │ 总营收     │    $94,827M │   $215,938M │ NVDA 2.3x │
  │ 营收同比   │         -3% │        +65% │         — │
  │ 毛利润     │    $17,094M │   $153,463M │   NVDA 9x │
  │ 毛利率     │       18.0% │       71.1% │  +53 ppts │
  │ 营业利润   │     $4,355M │   $130,387M │  NVDA 30x │
  │ 营业利润率 │        4.6% │       60.4% │  +56 ppts │
  │ 净利润     │     $3,794M │   $120,067M │  NVDA 32x │
  │ 摊薄 EPS   │       $1.08 │       $4.90 │         — │
  └────────────┴─────────────┴─────────────┴───────────┘

  二、现金流对比（全年）

  ┌────────────┬─────────────┬─────────────┐
  │    指标    │ TSLA FY2025 │ NVDA FY2026 │
  ├────────────┼─────────────┼─────────────┤
  │ 经营现金流 │    $14,747M │   $102,718M │
  │ 资本支出   │     $8,527M │     $6,042M │
  │ 自由现金流 │     $6,220M │    $96,676M │
  │ FCF 利润率 │        6.6% │       44.8% │
  └────────────┴─────────────┴─────────────┘

  NVDA 的 CapEx 甚至低于 TSLA，却产生了 15x 的自由现金流。

  三、核心风险

  TSLA：汽车竞争加剧、品牌压力、Musk 精力分散；汽车业务同比 -10%，
        能源（+27%）和服务（+19%）部分对冲。
  NVDA：对华出口管制；Q1 FY27 指引 $78B 已排除中国数据中心收入，
        单季营收约等于 TSLA 全年。
```

## 速率限制

Longbridge OpenAPI 最高支持每秒 10 次调用，SDK 自动刷新 OAuth Token。
