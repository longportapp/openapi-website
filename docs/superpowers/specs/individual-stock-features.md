# 个股功能清单 & CLI 规划

> 来源：longbridge-gpui codebase 分析 + 内部 API 网关 scopes.json 比对 + engine WS 协议分析
> 目标：服务端暴露 API + CLI 命令设计

---

## 实施列表

| 负责人 | 分类   | 功能名称          | 协议 / 内部路径（参考）                                                                                 | CLI 命令                        | 类型     | 优先级 | 备注                                                                                 |
| ------ | ------ | ----------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- | ------ | ------------------------------------------------------------------------------------ |
|        | 行情   | 美股深度摆盘      | WS `TOTAL_VIEW` / `PushOrderBook(109)`                                                                  | `longbridge orderbook`          | 新命令   | P0     | 全量订单簿，含每笔挂单 id/volume/mp_id；`--brief` 取 60 档简要；引擎已实现，仅需暴露 |
|        | 行情   | K 线扩展时段      | WS `QuoteKline` — Session 参数                                                                          | `longbridge kline --session`    | 扩展现有 | P0     | 新增 `--session pre-post`（盘前盘后）/ `all`（含夜盘）；引擎已支持，CLI 未透传       |
|        | 行情   | 分时扩展时段      | WS `QuoteMinute` — trade_session 参数                                                                   | `longbridge intraday --session` | 扩展现有 | P0     | 新增 `--session pre`（盘前）/ `post`（盘后）/ `all`（全时段 IntraDay）；引擎已支持   |
|        | 行情   | 逐笔扩展时段      | WS `QuoteTrade` — `PRE_TRADE` / `POST_TRADE` / `NIGHT_TRADE`                                            | `longbridge trades --session`   | 扩展现有 | P0     | 盘前/盘后/夜盘逐笔成交；引擎已支持，CLI 未透传 session                               |
|        | 基本面 | 财务报表          | REST `GET /v5/stock-info/financial-reports`                                                             | `longbridge financials`         | 新命令   | P0     | 利润表 / 资产负债表 / 现金流，支持多期对比；`/statement` 含科目级明细                |
|        | 基本面 | 估值分析          | REST `GET /stock-info/valuation-detail` `GET /stock-info/history-valuation`                             | `longbridge valuation`          | 新命令   | P0     | PE/PB/PS/DY 当前值 + 历史走势 + 同行对比；history-valuation 支持 1Y/3Y/5Y/10Y        |
|        | 基本面 | 分析师评级        | REST `GET /stock-info/instratings-view` `GET /stock-info/instratings-detail`                            | `longbridge analyst`            | 新命令   | P0     | 评级分布（强买/买/持有/卖）+ 平均目标价 + 历史目标价序列                             |
|        | 基本面 | 分红历史          | REST `GET /stock-info/dividend/details` `GET /stock-info/get_company_dividends_info`                    | `longbridge dividends`          | 新命令   | P0     | 历史派息记录（除权日、金额、频率）；buybacks 回购数据可一并暴露                      |
|        | 基本面 | 一致预期          | REST `GET /fa/forecast-eps` `GET /stock-info/financial-consensus-detail`                                | `longbridge estimates`          | 新命令   | P0     | 分析师对未来季度/年度 EPS 和营收的区间预测；`fin-estimates` 包含多指标               |
|        | 公司   | 公司概况          | REST `GET /stock-info/comp-overview` `GET /stock-info/company-profile`                                  | `longbridge company`            | 新命令   | P1     | 成立日期、员工数、地址、IPO 价格、董事长、审计机构等 30+ 字段                        |
|        | 公司   | 公司高管          | REST `GET /stock-info/company-professionals`                                                            | `longbridge executives`         | 新命令   | P1     | 高管姓名、职位、biography、照片；支持多 symbol 批量查询                              |
|        | 公司   | 所属行业 & 排名   | REST `GET /v1/stock-info/panorama` `GET /v1/stock-info/ranking-in-industry`                             | `longbridge industry`           | 新命令   | P1     | 所属行业（涨跌家数）+ 个股在行业内各指标排名（PE、ROE、营收等）                      |
|        | 公司   | 股东结构          | REST `GET /stock-info/company-shareholders` `GET /stock-info/get_company_major_shareholders`            | `longbridge shareholders`       | 新命令   | P1     | Top20 主要股东；`--institutions` 机构明细；`--insiders` 内部人员持仓                 |
|        | 公司   | 主营业务拆分      | REST `GET /stock-info/business` `GET /stock-info/business-historical`                                   | `longbridge business`           | 新命令   | P1     | 按业务线/地区拆分营收占比，含历史趋势；`revenue-sankey` 桑基图数据可选               |
|        | 公司   | 供应链            | REST `GET /stock-info/supply-chains-detail` `GET /stock-info/supply_chains`                             | `longbridge supply-chain`       | 新命令   | P1     | 上下游供应商/客户列表，含产品描述；`industrial/chain` 系列含产业链维度               |
|        | 市场   | 指数 & ETF 成分股 | REST `GET /v2/discovery/index-constituents` `GET /stock-info/etf-holdings` `GET /market/concept_stocks` | `longbridge constituents`       | 新命令   | P1     | 统一命令覆盖指数（SPY.US）、ETF、概念板块三类；含涨跌统计和资金流排序                |
|        | 市场   | 持有该股的基金    | REST `GET /ut/fundamental/reverse/stock` `GET /stock-info/reverse/stock`                                | `longbridge fund-holders`       | 新命令   | P1     | 哪些基金/ETF 持有该股，API 已在网关确认存在；`/funds/holdings` 为 Top10              |
|        | 市场   | 新股日历 & 详情   | REST `GET /stock-info/ipos` `GET /stock-info/ipo-profile` `POST /ipo/calendar`                          | `longbridge ipo`                | 新命令   | P1     | 新股日历（upcoming/subscribing/listed）+ 招股详情；认购/撤单走 ipo-service scope     |
|        | 市场   | 我的新股认购记录  | REST `GET /ipo/history` `GET /ipo/holding`                                                              | `longbridge ipo-subscriptions`  | 新命令   | P1     | 当前账户的 IPO 认购记录与持仓；对齐 `orders`/`positions` 命名模式                    |
|        | 行情   | 期权成交量统计    | REST `GET /quote/option/volume_stats` `GET /quote/option/volume_stats_daily`                            | `longbridge option-volume`      | 新命令   | P2     | 正股对应 Call/Put 总成交量比例，日 K 级别统计；现有 `option-chain` 已覆盖链结构      |
|        | 市场   | 财经日历          | REST `POST /stock_info/finance_calendar` `POST /stock_info/finance_calendar_detail`                     | `longbridge calendar`           | 新命令   | P2     | 财报发布日、IPO 日期、宏观经济事件                                                   |
|        | 账户   | 股价提醒          | REST `POST /indicator/notify/setnotify` `POST /indicator/notify/getnotify` `POST /indicator/notify/deletenotify` | `longbridge alert`              | 新命令   | P1     | 设置/查看/删除价格提醒；支持多指标（价格/涨跌幅/成交量等）；scope: `price-notify`    |
|        | 账户   | 股票备注          | REST `POST /watchlist/stocknote/get` `POST /watchlist/stocknote/set`                                            | `longbridge note`               | 新命令   | P2     | 对自选股设置/读取个人备注；scope: `watchlist-service`                                |
|        | 行情   | 资金流（大笔）    | REST `GET /quote/flow/detail` `GET /quote/flow/kline` `GET /quote/flow/minutes`                                 | `longbridge flow`               | 新命令   | P0     | 大单净流入/流出（超大单/大单/中单/小单分层）；历史 K 线 + 分时趋势；scope: `quote-api` |
|        | 行情   | 做空数据          | REST `GET /quote/us_short_trades` `GET /quote/us_short_positions` `GET /quote/short_trades` `GET /quote/short_positions` | `longbridge short`        | 新命令   | P0     | 美股/港股卖空成交 + 做空持仓数量/比例；scope: `quote-api`                            |
|        | 基本面 | 财务评分          | REST `GET /stock-info/security-ratings` `GET /stock-info/security-rating-history` `GET /fa/rating-indicators-history` | `longbridge score`        | 新命令   | P1     | 多维打分（成长/价值/质量/动量）+ 历史走势 + 同行比较；scope: `stock-info`            |
|        | 基本面 | 股票估值          | REST `GET /fa/valuation-detail` `GET /stock-info/history-valuation` `GET /fa/valuation-in-industry`             | `longbridge valuation`          | 新命令   | P0     | PE/PB/PS/EV/DY 当前值 + 历史走势 + 行业分布；已有估值章节，此为独立命令              |
|        | 基本面 | 机构观点          | REST `GET /stock-info/instratings-view` `GET /stock-info/instratings-detail` `GET /fa/institution-rating-latest` | `longbridge analyst`            | 新命令   | P0     | 机构评级分布（强买/买/持有/卖）+ 平均目标价 + 评级明细；scope: `stock-info`          |
|        | 公司   | 内部人士交易      | REST `GET /stock-info/get_company_insider_holding_summary` `GET /stock-info/get_company_insider_trading_detail` | `longbridge insider`            | 新命令   | P1     | 高管/大股东增减持明细，含持仓汇总 + 交易时间线；scope: `fundamental-app`             |
|        | 账户   | 选股选息          | REST `POST /app/be/list` `POST /app/be/choose` `POST /app/be/calc`                                      | `longbridge scrip-dividend`     | 新命令   | P1     | 查看待选择的选股选息（BE）方案列表、提交选择；scope: `lb.portfolio.corporate-action` |
|        | 账户   | 供股要约（申购）  | REST `POST /portfolio/corpaction/subscribe/list` `POST /portfolio/corpaction/subscribe/apply`           | `longbridge rights`             | 新命令   | P1     | 查看供股/要约认购预告、发起申购、撤销、计算费用；scope: `lb.portfolio.corporate-action` |
|        | 账户   | 股东大会投票      | REST `POST /corporate_action/list/voting/app` `POST /corporate_action/instruction/voting/app`           | `longbridge agm`                | 新命令   | P1     | 查看待参与的股东大会、投票指令、历史记录；scope: `lb.portfolio.corporate-action`     |
|        | 账户   | 持仓日报          | REST `GET /daily_hold_report` `GET /portfolio/pnl/specific_date_pnl`                                    | `longbridge daily-report`       | 新命令   | P2     | 持仓股票相关资讯及日程 + 指定日期盈亏信息；scope: `social-service` / `portfolio-asset` |
|        | 账户   | 我的费率          | REST `GET /billing/my_rate` `GET /billing/my_rates_fee_copywriting`                                     | `longbridge my-rates`           | 新命令   | P2     | 当前账户适用的佣金费率、融资利率、融券费率；scope: `billing-service`                 |
|        | 发现   | 选股器            | REST `POST /calc/screener/search` `GET /calc/screener/market/config` `GET /calc/screener/theme/lists`   | `longbridge screener`           | 新命令   | P1     | 多指标条件筛选（估值/技术/基本面）；主题/行业维度；新版接口；scope: `discovery`      |

---

## 零、行情数据能力参考（WebSocket 协议）

> 行情走二进制 WS 长连接，不在 scopes.json 中，来源：`engine/src/ws/binary/`

### 订阅类型（SubTypes）

| SubType            | 说明                                             | 市场                   |
| ------------------ | ------------------------------------------------ | ---------------------- |
| `LIST`             | 列表页轻量价格（last_done, amount, balance）     | 全市场                 |
| `DETAIL`           | 详情页完整行情（见下方字段表）                   | 全市场                 |
| `DEPTH`            | 10 档买卖盘（price, volume, order_num）          | 全市场                 |
| `BROKER`           | 各档经纪商队列                                   | **仅港股**             |
| `TRADE`            | 盘中逐笔成交                                     | 全市场                 |
| `PRE_TRADE`        | 盘前逐笔成交                                     | **美股**               |
| `POST_TRADE`       | 盘后逐笔成交                                     | **美股**               |
| `NIGHT_TRADE`      | 夜盘逐笔成交                                     | 美股/A 股夜盘           |
| `TOTAL_VIEW`       | 深度摆盘——全量订单簿，含每笔挂单 id/volume/mp_id | **美股**（ORDER_BOOK） |
| `TOTAL_VIEW_BRIEF` | 深度摆盘简要数据（60 档）                         | **美股**               |

> `TOTAL_VIEW` 对应 proto `ORDER_BOOK`，`data_level`：0=默认、1=全量、2=仅 60 档挂单。Push 命令 `PushOrderBook(109)` / `PushOrderBookBrief(110)`。

### DETAIL 行情字段（StockDetail proto）

| 字段                                                                     | 说明                              |
| ------------------------------------------------------------------------ | --------------------------------- |
| last_done / open / high / low / prev_close                               | 最新价、开盘、最高、最低、昨收    |
| amount / balance                                                         | 成交量 / 成交额                   |
| turnover_rate / volume_rate / depth_rate                                 | 换手率 / 量比 / 委比              |
| year_high / year_low                                                     | 52 周高低                         |
| eps / eps_ttm / eps_forecast                                             | 每股收益（静/TTM/动）             |
| market_cap                                                               | 总市值                            |
| total_shares / circulating_shares                                        | 总股本 / 流通股本                 |
| bps / dps_rate / dividend_yield                                          | 每股净资产 / 股息率 / 股息 TTM    |
| limit_up / limit_down                                                    | 涨停价 / 跌停价（A 股）            |
| market_price / market_high / market_low / market_amount / market_balance | 盘前/盘后行情（美股）             |
| ah_premium                                                               | A/H 溢价（AH 两地上市股）         |
| inflow                                                                   | 大单资金净流入                    |
| industry_counter_id / industry_name                                      | 所属行业                          |
| stock_derivatives                                                        | 支持的衍生品（option/warrant 等） |
| tags / available_levels                                                  | 行情标签 / 可用行情等级           |

### K 线类型（KlineType）与参数

| 级别     | 枚举值                                          |
| -------- | ----------------------------------------------- |
| 分钟线   | 1m / 2m / 3m / 5m / 10m / 15m / 20m / 30m / 45m |
| 小时线   | 60m / 120m / 180m / 240m                        |
| 日线以上 | Day / Week / Month / Quarter / Year             |

- `AdjustType`：`NoAdjust`（不复权）/ `ForwardAdjust`（前复权）
- `Session`：`Trading` / `NormalAndPrePost`（含盘前盘后）/ `NormalAndOverNight`（含夜盘）/ `All`

### 分时类型（TimeshareType）

| 类型           | 说明                         |
| -------------- | ---------------------------- |
| `Trading`      | 当日分时（盘中）             |
| `FiveDays`     | 5 日分时                     |
| `Sample`       | 小分时（多股票缩略版）       |
| `PreTrading`   | 美股盘前分时                 |
| `PostTrading`  | 美股盘后分时                 |
| `NightTrading` | 夜盘分时                     |
| `IntraDay`     | 美股全时段（盘前 + 盘中 + 盘后） |

---

## 一、财务数据（Financial Statements）

### 功能说明

| 功能         | 说明                                                       |
| ------------ | ---------------------------------------------------------- |
| 最新财报摘要 | 最新一期报告期的关键指标（EPS、ROE、营收、净利润、现金流） |
| 财务概览列表 | 多期财报关键指标横向对比（年报/季报/中报）                 |
| 财务报表明细 | 利润表 / 资产负债表 / 现金流量表的完整科目数据，含 YoY     |

### 原始 API Path

```
GET /v4/stock-info/latest-financial-report
  ?counter_id=TSLA.US

GET /v5/stock-info/financial-reports
  ?counter_id=TSLA.US
  &report=FY2024        # 可选，报告期
  &kind=IS              # IS=利润表 BS=资产负债表 CF=现金流量表 ALL=全量

GET /v3/stock-info/statement
  ?counter_id=TSLA.US
  &report=FY2024        # 可选
  &kind=IS
```

### 报告期枚举

`Annual`（年报）/ `Interim`（中报）/ `Quarterly`（季报：Q1/Q2/Q3/Q4）/ `TTM`

### 财务报表类型枚举

`IS`（Income Statement 利润表）/ `BS`（Balance Sheet 资产负债表）/ `CF`（Cash Flow 现金流量表）

### 拟规划 CLI 命令

```bash
# 最新财报关键指标
longbridge financials TSLA.US

# 指定财务报表类型
longbridge financials TSLA.US --kind income-statement   # 利润表
longbridge financials TSLA.US --kind balance-sheet      # 资产负债表
longbridge financials TSLA.US --kind cash-flow          # 现金流量表

# 指定报告期
longbridge financials TSLA.US --period annual           # 年报（默认）
longbridge financials TSLA.US --period quarterly        # 季报

# 多期横向对比
longbridge financials TSLA.US --count 8                 # 最近 8 期

# JSON 输出
longbridge financials TSLA.US --format json
```

---

## 二、估值分析（Valuation）

### 功能说明

| 功能         | 说明                                            |
| ------------ | ----------------------------------------------- |
| 当前估值     | P/E、P/B、P/S、股息率当前值 + 行业中位数        |
| 历史估值走势 | 指定指标的历史数据序列，含 High/Median/Low 区间 |
| 同行对比     | 同行业个股估值横向排列（scatter/bar）           |
| 行业分布     | 该指标在行业内的分布（分组 histogram）          |

### 原始 API Path

```
GET /stock-info/valuation-detail
  ?counter_id=TSLA.US
  &indicator=PE         # PE / PB / PS / DY

GET /stock-info/history-valuation
  ?counter_id=TSLA.US
  &range=1Y             # 1Y / 3Y / 5Y / 10Y
  &indicator=PE
```

### 估值指标枚举

`PE`（市盈率）/ `PB`（市净率）/ `PS`（市销率）/ `DY`（股息率）

### 拟规划 CLI 命令

```bash
# 当前估值（全部指标）
longbridge valuation TSLA.US

# 历史估值走势
longbridge valuation TSLA.US --history --indicator pe   # P/E 历史
longbridge valuation TSLA.US --history --indicator pb --range 5y

# 同行对比
longbridge valuation TSLA.US --peers

# JSON 输出
longbridge valuation TSLA.US --format json
```

---

## 三、分析师观点（Analyst Ratings）

### 功能说明

| 功能         | 说明                                                    |
| ------------ | ------------------------------------------------------- |
| 评级分布概况 | 强买/买/持有/跑输/卖 各占比 + 汇总日期                  |
| 目标价详情   | 最新平均目标价、最高/最低目标价、历史目标价序列、达成率 |

### 原始 API Path

```
GET /stock-info/instratings-view
  ?counter_id=TSLA.US

GET /stock-info/instratings-detail
  ?counter_id=TSLA.US
```

### 评级枚举

`StrongBuy` / `Buy` / `Hold` / `Underperform` / `Sell` / `Unknown`

### 拟规划 CLI 命令

```bash
# 分析师评级概况（评级分布 + 当前目标价）
longbridge analyst TSLA.US

# 详细目标价历史
longbridge analyst TSLA.US --targets

# JSON 输出
longbridge analyst TSLA.US --format json
```

---

## 四、指数成分股（Index Constituents）

### 功能说明

| 功能           | 说明                                                            |
| -------------- | --------------------------------------------------------------- |
| 指数成分股列表 | 成分股清单，含最新价、涨跌幅、资金净流入/流出、总股本、流通股本 |
| 涨跌统计       | 成分股上涨/下跌/平盘数量                                        |
| 概念板块成分股 | 概念板块（如"新能源汽车 CP00013.US"）的龙头/成分股列表          |

### 原始 API Path

```
GET /v2/discovery/index-constituents
  ?counter_id=SPY.US     # 指数 symbol（如 SPY.US、000300.SH、HSI.HK）
  &offset=0
  &limit=100
  &indicator=0           # 排序指标字段 id
  &order=0               # 0=降序 1=升序

GET /market/concept_stocks
  ?concept_index=CP00013.US   # 概念板块 symbol
  &offset=0
  &limit=50
  &indicator=0
  &order=0
  &tab_key=0
  &filter_tag_key=1           # 1=龙头股 3=成分股
```

### 响应关键字段

```
IndexConstituentStock:
  counter_id, name, market, trade_status
  last_done       # 最新价
  prev_close      # 前收价
  chg             # 涨跌幅（%）
  inflow          # 资金净流入
  balance         # 资金净余额
  amount          # 成交额
  total_shares    # 总股本
  circulating_shares  # 流通股本
  tags            # 标签
  delay           # 是否延迟行情

统计：rise_num / fall_num / flat_num / total
```

### 拟规划 CLI 命令

```bash
# 指数成分股
longbridge constituents SPY.US               # S&P 500 成分股
longbridge constituents HSI.HK               # 恒生指数成分股
longbridge constituents 000300.SH            # 沪深300成分股

# 概念板块成分股
longbridge constituents CP00013.US           # 新能源汽车概念
longbridge constituents CP00011.US --leaders # 只看龙头股

# 排序
longbridge constituents SPY.US --sort chg    # 按涨跌幅
longbridge constituents SPY.US --sort amount # 按成交额
longbridge constituents SPY.US --sort inflow # 按资金净流入

# 分页
longbridge constituents SPY.US --limit 50 --offset 0

# JSON 输出
longbridge constituents SPY.US --format json
```

---

## 五、新股认购（IPO / New Listings）

> 注：longbridge-gpui 中无独立 crate，当前通过 H5 页面处理。以下为**规划阶段**，需服务端配合开放 API。

### 功能说明

| 功能     | 说明                                                       |
| -------- | ---------------------------------------------------------- |
| 新股日历 | 即将上市 / 正在认购 / 已上市的新股列表                     |
| 新股详情 | 招股信息：发行价区间、募资规模、行业、股份数量、认购截止日 |
| 认购状态 | 当前用户的认购记录和状态                                   |
| 中签结果 | 中签/暗盘/上市后表现                                       |

### 拟规划 API Path（待服务端设计）

```
GET /v1/ipo/calendar
  ?market=HK            # 市场：HK / US / SH / SZ
  &status=upcoming      # upcoming=即将 | subscribing=认购中 | listed=已上市

GET /v1/ipo/detail
  ?counter_id=XXXX.HK

GET /v1/ipo/subscriptions
  # 当前用户的认购记录（需登录）
```

### 拟规划 CLI 命令

```bash
# 新股日历
longbridge ipo                           # 近期新股（所有市场）
longbridge ipo --market hk               # 港股新股
longbridge ipo --market us               # 美股 IPO
longbridge ipo --status subscribing      # 正在认购中

# 新股详情
longbridge ipo XXXX.HK                   # 指定新股详情

# 我的认购记录
longbridge ipo-subscriptions             # 当前账户 IPO 认购记录

# JSON 输出
longbridge ipo --format json
```

---

## 六、新闻资讯（News）

> ✅ **已实现**：`longbridge news`、`longbridge news-detail`、`longbridge filings`、`longbridge filing-detail` 均已存在，无需新增。

---

## 七、期权链（Option Chain）

> 注：`longbridge option-chain` 已存在（期权链日期/行权价），以下为扩展

### 功能说明

| 功能           | 说明                               |
| -------------- | ---------------------------------- |
| 期权链（已有） | 获取到期日列表、各日期的行权价列表 |
| 期权成交量统计 | 正股对应的 Call/Put 总成交量比例   |

### 原始 API Path

```
GET /v4/gemini/option-list
  ?underlying_counter_id=AAPL.US

GET /v4/gemini/optionchain-date-list
  ?underlying_counter_id=AAPL.US
  &expire_date=2024-01-19

GET /v1/quote/option/volume_stats
  ?underlying_counter_id=AAPL.US
```

### 拟规划 CLI 命令

```bash
# Call/Put 成交量统计（新增）
longbridge option-volume AAPL.US          # Call vs Put 总量比
longbridge option-volume AAPL.US --format json
```

---

## 八、权证（Warrant）

> 注：`longbridge warrant-list` 已存在，以下是筛选能力扩展

### 功能说明

| 功能         | 说明                                                    |
| ------------ | ------------------------------------------------------- |
| 权证筛选配置 | 获取可用的筛选维度（类型、标签等）                      |
| 权证筛选列表 | 按条件筛选权证，含溢价率、Delta、隐含波动率、有效杠杆等 |

### 原始 API Path

```
GET /newmarket/warrant/filter/config
  ?type=0

POST /newmarket/warrant/filter/lists
{
  "counter_id": "700.HK",
  "filter": {...},
  "sort_by": "wt_delta",
  "sort_order": "desc",
  "offset": 0,
  "count": 20
}
```

### 关键字段

`wt_premium`（溢价率）/ `wt_delta`（敏感度）/ `wt_implied_volatility`（隐含波动率）/ `wt_effective_leverage`（有效杠杆）/ `wt_outstanding_ratio`（未平仓比率）

### 拟规划 CLI 命令

```bash
# 权证列表（扩展现有 warrant-list 的筛选能力）
longbridge warrant-list 700.HK
longbridge warrant-list 700.HK --sort delta
longbridge warrant-list 700.HK --sort iv       # 隐含波动率
longbridge warrant-list 700.HK --type call     # 只看认购证
longbridge warrant-list 700.HK --format json
```

---

## 九、公司概况与高管（Company Overview & Executives）

### 功能说明

| 功能            | 说明                                                                           |
| --------------- | ------------------------------------------------------------------------------ |
| 公司概况        | 成立日期、上市日期、员工数、地址、官网、IPO 价格、董事长、法人代表、审计机构等 |
| 公司高管列表    | 高管姓名、职位、简介（biography）、照片                                        |
| 全景聚合        | 所属行业（含行业涨跌家数、个股排名）+ 相关证券分时                             |
| 行业排名        | 个股关键指标在所属行业中的排名（PE、ROE、营收等）                              |
| 相关公司/供应链 | 与该股相关联的公司列表（上下游、生态伙伴），含 counter_id + 关联产品描述       |

### 原始 API Path

```
GET /stock-info/comp-overview
  ?counter_id=TSLA.US
  → 返回：name, company_name, founded, listing_date, market, ticker,
           chairman, secretary, audit_inst, category, year_end,
           employees, phone, fax, email, legal_repr, manager,
           issue_price, shares_offered, ads_ratio, profile ...

GET /stock-info/company-professionals
  ?counter_ids=TSLA.US       # 支持多个，逗号分隔
  → 返回：professional_list[].professionals[]:
           id, name, title, biography, photo, wiki_url

GET /v1/stock-info/panorama
  ?counter_id=TSLA.US
  → 返回：belonged_industry: {counter_id, name, rise_num, fall_num, rank, stock_num, stock_name}
           securities: [{counter_id, prices, minutes}]  # 相关证券小分时

GET /v1/stock-info/ranking-in-industry
  ?counter_id=TSLA.US
  → 返回：indicators[]: {name, value, ranking, code, unit}
           total, currency

GET /stock-info/company-wiki-agg
  ?counter_id=TSLA.US
  → 返回：related.list[]: {name, counter_id, product}  # 关联公司/供应链
```

### 拟规划 CLI 命令

```bash
# 公司概况
longbridge company TSLA.US                   # 公司基本信息（成立、员工、地址等）

# 公司高管
longbridge executives TSLA.US                # 高管列表（姓名、职位、简介）
longbridge executives TSLA.US --format json

# 所属行业 + 行业排名
longbridge industry TSLA.US                  # 所属行业 + 个股在行业内的指标排名

# 关联公司/供应链
longbridge related TSLA.US                   # 关联公司列表（含上下游、生态伙伴）
longbridge related TSLA.US --format json
```

---

## 十、分红方案（Dividend / Distribution Plan）

### 功能说明

| 功能         | 说明                                                       |
| ------------ | ---------------------------------------------------------- |
| 历史分红记录 | 历史派息记录：除权日、分红金额、频率                       |
| 股息率       | 当前股息率（Dividend Yield）                               |
| 分红事件     | 作为持仓活动事件（Activity）的一部分，可查询除权日、到账日 |

### 原始 API Path

```
# 方案一：分红作为图表 Activity 事件（来自 chart/api.rs）
# ActivityType::Dividend 对应 type_id: 10040/10140/10150/10160

# 方案二：持仓活动接口（来自 engine portfolio/api/activity.rs）
POST /stock/activity/for_holding
{
  "securities": ["TSLA.US"],
  "activity_types": ["DividendExDate"]
}
→ 返回：分红除权日期、分红金额

# 财务报表接口中含股息率字段（来自 financial/api.rs）
GET /v5/stock-info/financial-reports
  ?counter_id=TSLA.US
  → FinancialReportItem 含 dividend_yield 字段
```

### 拟规划 CLI 命令

```bash
# 分红历史
longbridge dividends TSLA.US                 # 历史分红记录
longbridge dividends TSLA.US --count 10      # 最近 10 次
longbridge dividends TSLA.US --format json
```

---

## 十一、股票被持仓的基金列表（Fund Holdings）

### 功能说明

| 功能           | 说明                                                      |
| -------------- | --------------------------------------------------------- |
| 持有该股的基金 | 哪些基金/ETF 持有这只股票，含持仓比例、持仓市值、持仓变化 |

### 原始 API Path

```
# 来自 ut-fundamental scope（scopes.json 确认存在）
GET /ut/fundamental/reverse/stock
  ?counter_id=TSLA.US
  → 基金反向关联：哪些基金持有该股票

GET /funds/holdings
  ?counter_id=TSLA.US
  → Top10 持仓基金列表

# 来自 fundamental-app scope（scopes.json 确认存在）
GET /stock-info/reverse/stock
  ?counter_id=TSLA.US
  → 股票代码在基金中的持仓列表
```

### 拟规划 CLI 命令

```bash
# 持有该股的基金（需服务端新开接口）
longbridge fund-holders TSLA.US              # 持有 TSLA 的基金/ETF 列表
longbridge fund-holders TSLA.US --count 20   # Top 20
longbridge fund-holders TSLA.US --format json
```

---

## 十二、主营业务拆分（Business Breakdown）

> 来源：`stock-info` scope（scopes.json 确认存在）

### 功能说明

| 功能         | 说明                                  |
| ------------ | ------------------------------------- |
| 主营业务构成 | 按业务线/地区拆分的收入占比（当前期） |
| 主营业务历史 | 各业务线收入的历史序列                |
| 营收桑基图   | 资金流向可视化（桑基图数据）          |

### 原始 API Path

```
GET /stock-info/business
  ?counter_id=TSLA.US

GET /stock-info/business-historical
  ?counter_id=TSLA.US

GET /stock-info/revenue-sankey
  ?counter_id=TSLA.US
```

### 拟规划 CLI 命令

```bash
longbridge business TSLA.US                  # 主营业务收入拆分
longbridge business TSLA.US --history        # 历史趋势
longbridge business TSLA.US --format json
```

---

## 十三、供应链（Supply Chain）

> 来源：`stock-info` scope + `fundamental-app` scope（scopes.json 确认，多个版本并存）

### 功能说明

| 功能            | 说明                              |
| --------------- | --------------------------------- |
| 核心供应链列表  | 上下游主要供应商/客户，含产品描述 |
| 供应链详情      | 上下游完整列表，分页              |
| 供应链股票筛选  | 按供应链关系筛选个股              |
| 供应链 Top 列表 | 热门供应链标的排行                |
| 产业链          | 所属产业链及产业链内个股          |

### 原始 API Path

```
GET /stock-info/supply_chains
  ?counter_id=TSLA.US
  → 核心供应链列表

GET /stock-info/supply-chains-detail
  ?counter_id=TSLA.US
  &offset=0&limit=20
  → 供应链详情列表（V1/V2/V3）

GET /stock-info/supply-chains-top-list
GET /stock-info/supply-chains-top-config

POST /stock-info/supply-chains-stock-screener
  → 供应链股票筛选器（V1/V2）

GET /stock-info/company-wiki-agg
  ?counter_id=TSLA.US
  → related.list[]: {name, counter_id, product}

# fundamental-app scope 确认的额外接口
GET /stock-info/supply-related-detail          # 上下游及对手详情
GET /stock-info/supplychain-tab                # 全景供应链 tab
GET /industrial/chain/relation                 # 产业链关系
GET /industrial/chain/counterid               # 查询所属产业链
```

### 拟规划 CLI 命令

```bash
longbridge supply-chain TSLA.US               # 供应链列表（上下游）
longbridge supply-chain TSLA.US --detail      # 完整详情分页
longbridge supply-chain TSLA.US --format json
```

---

## 十四、股东结构（Shareholders）

> 来源：`stock-info` scope（scopes.json 确认存在）

### 功能说明

| 功能         | 说明                          |
| ------------ | ----------------------------- |
| 股东列表     | Top20 主要股东（机构 + 个人） |
| 机构持仓明细 | 机构持股列表 + 持仓变动       |
| Insider 持仓 | 公司内部人员持股              |
| 经纪商持股   | 经纪商持股 Top                |

### 原始 API Path

```
GET /stock-info/company-shareholders
  ?counter_id=TSLA.US
  → 公司股东列表（V1/V2）

# fundamental-app scope 补充
GET /stock-info/get_company_major_shareholders        # Top20 股东
GET /stock-info/get_company_institution_holding_detail  # 机构持仓明细
GET /stock-info/get_company_insider_holding_detail      # Insider 持仓明细
GET /stock-info/broker-holdingtop                    # 经纪商持股 Top
```

### 拟规划 CLI 命令

```bash
longbridge shareholders TSLA.US               # 主要股东列表
longbridge shareholders TSLA.US --institutions # 机构持仓明细
longbridge shareholders TSLA.US --insiders    # Insider 持仓
longbridge shareholders TSLA.US --format json
```

---

## 十五、一致预期 / 业绩预测（Consensus Estimates）

> 来源：`stock-fundamental` scope + `fundamental-app` scope（scopes.json 确认）

### 功能说明

| 功能             | 说明                                 |
| ---------------- | ------------------------------------ |
| EPS 业绩预测     | 分析师对未来季度/年度 EPS 的一致预期 |
| 财务一致预期详情 | 营收、利润等多指标的机构预测区间     |
| 机构评级行业榜单 | 所属行业机构评级排名                 |

### 原始 API Path

```
GET /fa/forecast-eps
  ?counter_id=TSLA.US
  → EPS 业绩预测（stock-fundamental scope）

GET /stock-info/financial-consensus-detail
  ?counter_id=TSLA.US
  → 个股一致预期详情（fundamental-app scope）

GET /stock-info/fin-estimates
  ?counter_id=TSLA.US
  → 财务预测（一致预期）

GET /fa/institution-rating-industry-rank
  → 机构评级行业榜单
```

### 拟规划 CLI 命令

```bash
longbridge estimates TSLA.US                  # 分析师一致预期（EPS + 营收）
longbridge estimates TSLA.US --format json
```

---

## 十六、财经日历（Finance Calendar）

> 来源：`stock-info` scope（scopes.json 确认）

### 功能说明

| 功能     | 说明                                             |
| -------- | ------------------------------------------------ |
| 财经日历 | 重要经济事件（财报发布日、央行决议、宏观数据等） |
| 新股日历 | IPO 上市时间线                                   |

### 原始 API Path

```
POST /stock_info/finance_calendar
  → 财经日历主页接口（V2）

POST /stock_info/finance_calendar_detail
  → 财经日历详情列表

GET /stock_info/finance_calendar_date
  → 起止时间

POST /ipo/calendar
  → 新股日历 V2
```

### 拟规划 CLI 命令

```bash
longbridge calendar                           # 今日财经日历
longbridge calendar --date 2025-04-01        # 指定日期
longbridge calendar --type earnings          # 只看财报发布
longbridge calendar --format json
```

---

## 十七、ETF 成分股（ETF Holdings）

> 来源：`stock-info` scope（scopes.json 确认）

### 功能说明

| 功能           | 说明                                   |
| -------------- | -------------------------------------- |
| ETF 成分股列表 | ETF 的持仓股票列表（不同于指数成分股） |

### 原始 API Path

```
GET /stock-info/etf-holdings
  ?counter_id=SPY.US
  → ETF 成分股列表
```

### 说明

- 与**四、指数成分股**功能互补：`/discovery/index-constituents` 适用于指数，`/stock-info/etf-holdings` 专门针对 ETF 基金
- 可统一在 `longbridge constituents` 命令中处理，由命令自动识别类型

---

## 十八、待确认 / 不确定开放的功能

以下功能在 app 内存在，是否对外开放 API 需产品确认：

| 功能         | App Crate                               | 说明                                                 | 建议                           |
| ------------ | --------------------------------------- | ---------------------------------------------------- | ------------------------------ |
| 股票提醒     | `stock_reminder` / `price-notify` scope | `price-notify` scope 有完整的指标提醒 API            | 可直接对外开放                 |
| 技术指标数据 | `indicator-gateway` scope               | 获取/保存用户自定义指标配置，K 线额外指标数据         | 更适合作为工具 API，非数据查询 |
| 财务评分     | `stock-info` scope                      | `/stock-info/security-ratings`（多维打分）已确认存在 | 可直接对外开放                 |
| 榜单排行     | `rank-list` scope                       | 多指标排行榜（涨幅、换手率等）                       | 高价值，建议规划               |
| 信号推荐     | `signal-hub` scope                      | `/signal/recommend`、`/signal/list_signal_briefs`    | 需确认是否对外                 |
| 事件追踪     | `stock-info` scope                      | `/stock-info/companyact`（公司行动项）已确认         | 可直接对外开放                 |

---

## 十九、CLI 命令总览

### 现有命令（已实现）

| 命令                                                                                           | 说明                 |
| ---------------------------------------------------------------------------------------------- | -------------------- |
| `longbridge static`                                                                            | 证券基础信息         |
| `longbridge quote`                                                                             | 实时行情             |
| `longbridge depth`                                                                             | 盘口深度             |
| `longbridge kline` / `kline-history`                                                           | K 线数据              |
| `longbridge intraday`                                                                          | 当日分时             |
| `longbridge calc-index`                                                                        | PE/PB/EPS 等静态指标 |
| `longbridge capital-flow` / `capital-dist`                                                     | 资金流               |
| `longbridge market-temp`                                                                       | 市场情绪温度         |
| `longbridge filings` / `filing-detail`                                                         | 公告/申报            |
| `longbridge news` / `news-detail`                                                              | 个股新闻 ✅ 已有     |
| `longbridge topics` / `topic-detail` / `create-topic` / `topic-replies` / `create-topic-reply` | 社区讨论             |
| `longbridge option-chain` / `option-quote`                                                     | 期权                 |
| `longbridge warrant-list` / `warrant-quote`                                                    | 权证                 |
| `longbridge watchlist`                                                                         | 自选股               |
| `longbridge orders` / `order` / `buy` / `sell` / `cancel` / `replace`                          | 交易                 |
| `longbridge positions` / `fund-positions`                                                      | 持仓                 |
| `longbridge balance` / `cash-flow` / `statement`                                               | 账户                 |

### 新增命令规划

```bash
# 财务基本面
longbridge financials <symbol> [--kind income-statement|balance-sheet|cash-flow] [--period annual|quarterly] [--count N]
longbridge valuation <symbol> [--history] [--indicator pe|pb|ps|dy] [--range 1y|3y|5y|10y] [--peers]
longbridge analyst <symbol> [--targets]
longbridge dividends <symbol> [--count N]
longbridge estimates <symbol>                 # 分析师一致预期（EPS + 营收预测）

# 公司信息
longbridge company <symbol>                   # 公司基本概况
longbridge executives <symbol>                # 公司高管列表
longbridge industry <symbol>                  # 所属行业 + 行业内排名
longbridge shareholders <symbol> [--institutions] [--insiders]  # 股东结构
longbridge business <symbol> [--history]      # 主营业务拆分

# 供应链
longbridge supply-chain <symbol> [--detail]  # 上下游供应链

# 行情扩展
longbridge constituents <symbol> [--sort chg|amount|inflow] [--leaders]  # 指数/ETF/概念成分股
longbridge option-volume <symbol>             # 期权 Call/Put 成交量统计

# 新股
longbridge ipo [--market hk|us|sh|sz] [--status upcoming|subscribing|listed]
longbridge ipo <symbol>
longbridge ipo-subscriptions

# 基金持仓（API 已确认存在）
longbridge fund-holders <symbol> [--count N]

# 财经日历
longbridge calendar [--date YYYY-MM-DD] [--type earnings|ipo|economic]

# 权证扩展（已有命令，新增 flag）
longbridge warrant-list <symbol> [--sort delta|iv|premium|leverage] [--type call|put]
```

### 新增命令汇总表

| 命令                       | API 来源                                                                              | 状态                |
| -------------------------- | ------------------------------------------------------------------------------------- | ------------------- |
| `longbridge financials`    | `/stock-info/financial-reports`、`/stock-info/statement`                              | 🆕 新增             |
| `longbridge valuation`     | `/stock-info/valuation-detail`、`/stock-info/history-valuation`                       | 🆕 新增             |
| `longbridge analyst`       | `/stock-info/instratings-view`、`/stock-info/instratings-detail`                      | 🆕 新增             |
| `longbridge dividends`     | `/stock-info/dividend/details`、`/stock-info/get_company_dividends_info`              | 🆕 新增             |
| `longbridge estimates`     | `/fa/forecast-eps`、`/stock-info/financial-consensus-detail`                          | 🆕 新增             |
| `longbridge company`       | `/stock-info/comp-overview`、`/stock-info/company-profile`                            | 🆕 新增             |
| `longbridge executives`    | `/stock-info/company-professionals`                                                   | 🆕 新增             |
| `longbridge industry`      | `/stock-info/panorama`、`/stock-info/ranking-in-industry`                             | 🆕 新增             |
| `longbridge shareholders`  | `/stock-info/company-shareholders`、`/stock-info/get_company_major_shareholders`      | 🆕 新增             |
| `longbridge business`      | `/stock-info/business`、`/stock-info/business-historical`                             | 🆕 新增             |
| `longbridge supply-chain`  | `/stock-info/supply-chains-detail`、`/stock-info/supply_chains`                       | 🆕 新增             |
| `longbridge constituents`  | `/discovery/index-constituents`、`/stock-info/etf-holdings`、`/market/concept_stocks` | 🆕 新增             |
| `longbridge option-volume` | `/quote/option/volume_stats`                                                          | 🆕 新增             |
| `longbridge ipo`           | `/stock-info/ipo-profile`、`/ipo/info`、`/ipo/calendar`                               | 🆕 新增             |
| `longbridge fund-holders`  | `/ut/fundamental/reverse/stock`、`/stock-info/reverse/stock`                          | 🆕 新增（API 已有） |
| `longbridge calendar`      | `/stock_info/finance_calendar`                                                        | 🆕 新增             |
| `longbridge scrip-dividend` | `/app/be/list`、`/app/be/choose`、`/app/be/calc`                                     | 🆕 新增             |
| `longbridge rights`        | `/portfolio/corpaction/subscribe/list`、`/portfolio/corpaction/subscribe/apply`       | 🆕 新增             |
| `longbridge agm`           | `/corporate_action/list/voting/app`、`/corporate_action/instruction/voting/app`       | 🆕 新增             |
| `longbridge daily-report`  | `/daily_hold_report`、`/portfolio/pnl/specific_date_pnl`                              | 🆕 新增             |
| `longbridge my-rates`      | `/billing/my_rate`、`/billing/my_rates_fee_copywriting`                               | 🆕 新增             |
| `longbridge screener`      | `/calc/screener/search`、`/calc/screener/market/config`、`/calc/screener/theme/lists` | 🆕 新增             |

---

## 二十、选股选息（Scrip Dividend / BE）

### 功能说明

| 功能         | 说明                                                           |
| ------------ | -------------------------------------------------------------- |
| 方案列表     | 查看持仓中待选择的选股选息（Bond Election）方案                |
| 数值计算     | 输入选择比例，计算可兑换股数/现金金额                          |
| 提交选择     | 确认选择方案（股票 or 现金 or 混合）                           |

### 原始 API Path

```
POST /app/be/list
{
  "language": "zh-CN"
}

POST /app/be/calc
{
  "election_id": "...",
  "stock_ratio": 50
}

POST /app/be/choose
{
  "election_id": "...",
  "choice": "stock"       # stock | cash | mixed
}
```

> Scope: `lb.portfolio.corporate-action`

### 拟规划 CLI 命令

```bash
# 查看待处理的选股选息方案
longbridge scrip-dividend

# 选择方案（提交）
longbridge scrip-dividend --id <election_id> --choice stock
longbridge scrip-dividend --id <election_id> --choice cash
```

---

## 二十一、供股要约（Rights / Subscription）

### 功能说明

| 功能         | 说明                                                           |
| ------------ | -------------------------------------------------------------- |
| 预告列表     | 查看持仓中可参与的供股/要约认购预告                            |
| 申购详情     | 获取单个预告的详细信息（截止日、比例、价格等）                 |
| 发起申购     | 提交认购申请                                                   |
| 撤销申购     | 撤销已提交的认购                                               |
| 计算费用     | 按认购数量预估费用                                             |
| 历史记录     | 查询历史认购记录                                               |

### 原始 API Path

```
POST /portfolio/corpaction/subscribe/list
POST /portfolio/corpaction/subscribe/detail
POST /portfolio/corpaction/subscribe/apply
POST /portfolio/corpaction/subscribe/reovke
POST /portfolio/corpaction/subscribe/calculate_fee
POST /portfolio/corpaction/subscribe/history
```

> Scope: `lb.portfolio.corporate-action`

### 拟规划 CLI 命令

```bash
# 查看待参与的供股/要约列表
longbridge rights

# 申购
longbridge rights apply --id <event_id> --quantity 100

# 撤销
longbridge rights revoke --id <event_id>

# 历史记录
longbridge rights --history
```

---

## 二十二、股东大会投票（AGM / EGM Voting）

### 功能说明

| 功能         | 说明                                                           |
| ------------ | -------------------------------------------------------------- |
| 待参与列表   | 查看当前账户可参与投票的股东大会                               |
| 投票指令     | 对特定议案提交投票（赞成/反对/弃权）                           |
| 作废指令     | 撤销已提交的投票指令                                           |
| 历史记录     | 查询历史参与记录                                               |

### 原始 API Path

```
POST /corporate_action/list/voting/app        # 待参与列表
POST /corporate_action/instruction/voting/app # 提交投票
POST /corporate_action/cancel/voting/app      # 作废指令
POST /corporate_action/history/voting/app     # 历史记录
```

> Scope: `lb.portfolio.corporate-action`

### 拟规划 CLI 命令

```bash
# 查看待参与的股东大会
longbridge agm

# 投票
longbridge agm vote --id <meeting_id> --resolution 1 --choice for   # for | against | abstain

# 撤销
longbridge agm cancel --id <meeting_id>

# 历史
longbridge agm --history
```

---

## 二十三、持仓日报（Daily Hold Report）

### 功能说明

| 功能           | 说明                                                             |
| -------------- | ---------------------------------------------------------------- |
| 当日持仓日报   | 持仓股票相关资讯（新闻、公告、日程）汇总                        |
| 指定日期盈亏   | 查询某一日期的盈亏信息（收益率、绝对值、最佳/最差持仓）          |
| 月度盈亏总览   | 月度累计盈亏、盈亏日历                                           |

### 原始 API Path

```
GET /daily_hold_report
GET /portfolio/pnl/specific_date_pnl
  ?date=2024-01-19
GET /portfolio/pnl/monthly_pnl_info
  ?year_month=2024-01
GET /portfolio/pnl/calendar
  ?start_date=2024-01-01&end_date=2024-01-31
```

> Scope: `social-service`（持仓日报资讯）/ `portfolio-asset`（盈亏数据）

### 拟规划 CLI 命令

```bash
# 今日持仓日报
longbridge daily-report

# 指定日期盈亏
longbridge daily-report --date 2024-01-19

# 月度汇总
longbridge daily-report --month 2024-01

# 盈亏日历
longbridge daily-report --calendar --start 2024-01-01 --end 2024-01-31
```

---

## 二十四、我的费率（My Rates）

### 功能说明

| 功能         | 说明                                                           |
| ------------ | -------------------------------------------------------------- |
| 账户费率     | 当前账户适用的佣金费率（按市场）                               |
| 融资利率     | 当前账户的融资（Margin）年化利率                               |
| 融券费率     | 当前账户的融券（Stock Borrowing）费率                          |
| 第三方费用   | 各市场第三方收费说明文案（证监会、交易所等）                   |

### 原始 API Path

```
GET /billing/my_rate                      # 账户佣金费率
GET /billing/cash_margin_financing_rate   # 融资利率
GET /billing/security_lending/fee         # 融券费率
GET /billing/my_rates_fee_copywriting     # 第三方费用文案
POST /billing/us_estimate_fee             # 美股预估费用计算
```

> Scope: `billing-service`

### 拟规划 CLI 命令

```bash
# 查看我的费率
longbridge my-rates

# 只看融资利率
longbridge my-rates --type financing

# 只看融券费率
longbridge my-rates --type borrowing

# 美股预估费用（按成交金额计算）
longbridge my-rates --estimate-us --amount 10000
```

---

## 二十五、选股器（Screener）

### 功能说明

| 功能         | 说明                                                                   |
| ------------ | ---------------------------------------------------------------------- |
| 市场配置     | 获取支持筛选的市场列表                                                 |
| 主题列表     | 预设主题策略（价值股、成长股、高股息等）                               |
| 主题筛选条件 | 获取某主题下的筛选条件                                                 |
| 条件筛选查询 | 多指标组合筛选（PE、PB、ROE、市值、营收增长率等估值/基本面/技术指标）  |
| AI 智能选股  | 自然语言描述条件（需独立 AI 模块，暂不规划 CLI）                       |

### 原始 API Path

```
GET /calc/screener/market/config          # 支持的市场
GET /calc/screener/theme/lists            # 主题列表
GET /calc/screener/condition/lists        # 主题筛选条件
GET /calc/screener/entrance               # 入口配置
POST /calc/screener/search
{
  "market": "US",
  "filters": [
    {"indicator": "pe_ttm", "min": 5, "max": 20},
    {"indicator": "roe", "min": 15}
  ],
  "sort_by": "market_cap",
  "sort_order": "desc",
  "offset": 0,
  "count": 20
}
```

> Scope: `discovery`（新版 `/calc/screener/`；旧版 `/screener/` 已废弃）

### 拟规划 CLI 命令

```bash
# 使用预设主题筛选
longbridge screener --theme dividend      # 高股息主题

# 自定义条件筛选
longbridge screener --market US --pe-max 20 --roe-min 15 --sort market-cap

# 查看可用市场
longbridge screener --markets

# 查看可用主题
longbridge screener --themes
```

---

## 二十六、股价提醒（Price Alert）

### 功能说明

| 功能         | 说明                                                               |
| ------------ | ------------------------------------------------------------------ |
| 查看提醒     | 获取某只股票当前设置的所有提醒条件                                 |
| 全局提醒列表 | 获取账户下所有股票的提醒                                           |
| 设置提醒     | 创建/更新提醒（价格触达、涨跌幅、成交量等多种指标）                |
| 删除提醒     | 删除指定提醒                                                       |
| 检查支持     | 检查某只股票是否支持提醒（部分市场/品种受限）                      |

### 原始 API Path

```
POST /indicator/notify/getnotify
{
  "counter_id": "TSLA.US"
}

POST /indicator/notify/global/getnotify    # 全账户提醒列表

POST /indicator/notify/setnotify
{
  "counter_id": "TSLA.US",
  "notify_type": "price",     # price | change_rate | volume
  "operator": "gte",          # gte | lte
  "value": "300"
}

POST /indicator/notify/deletenotify
{
  "notify_id": "..."
}

POST /indicator/notify/supported
{
  "counter_id": "TSLA.US"
}
```

> Scope: `price-notify`（新版 `/indicator/notify/`；旧版 `/stock/price/notify` 已废弃）

### 拟规划 CLI 命令

```bash
# 查看 TSLA 当前所有提醒
longbridge alert TSLA.US

# 查看所有股票的提醒
longbridge alert --all

# 设置价格提醒
longbridge alert set TSLA.US --price-gte 350
longbridge alert set TSLA.US --price-lte 200

# 设置涨跌幅提醒
longbridge alert set TSLA.US --change-gte 5     # 涨幅超 5%
longbridge alert set TSLA.US --change-lte -5    # 跌幅超 5%

# 删除提醒
longbridge alert delete --id <notify_id>
longbridge alert delete TSLA.US --all           # 删除该股所有提醒
```

---

## 二十七、股票备注（Stock Note）

### 功能说明

| 功能     | 说明                                       |
| -------- | ------------------------------------------ |
| 读取备注 | 获取自选股上设置的个人备注文字             |
| 设置备注 | 新增或更新对某只股票的个人备注（覆盖写入） |

### 原始 API Path

```
POST /watchlist/stocknote/get
{
  "counter_id": "TSLA.US"
}

POST /watchlist/stocknote/set
{
  "counter_id": "TSLA.US",
  "note": "Q4 财报前关注，目标价 350"
}
```

> Scope: `watchlist-service`

### 拟规划 CLI 命令

```bash
# 读取备注
longbridge note TSLA.US

# 设置备注
longbridge note TSLA.US "Q4 财报前关注，目标价 350"

# 清空备注
longbridge note TSLA.US ""
```

---

## 二十八、资金流 / 大笔买卖（Fund Flow）

### 功能说明

| 功能         | 说明                                                                     |
| ------------ | ------------------------------------------------------------------------ |
| 实时资金流   | 当日超大单/大单/中单/小单净流入流出，含买入金额和卖出金额                |
| 资金流分时   | 当日分时净流入趋势（与价格叠加）                                         |
| 资金流历史   | 按日/周/月粒度的历史净流入 K 线                                          |
| 资金流聚合   | 多只股票批量查询资金流汇总                                               |

### 原始 API Path

```
GET /quote/flow/detail
  ?counter_id=TSLA.US

GET /quote/flow/minutes
  ?counter_id=TSLA.US

GET /quote/flow/kline
  ?counter_id=TSLA.US
  &period=day            # day | week | month
  &count=30
```

> Scope: `quote-api`

### 拟规划 CLI 命令

```bash
# 当日资金流详情（超大/大/中/小单）
longbridge flow TSLA.US

# 历史资金流 K 线
longbridge flow TSLA.US --period week --count 20

# 资金流分时趋势
longbridge flow TSLA.US --intraday

# 多股汇总
longbridge flow TSLA.US AAPL.US NVDA.US
```

---

## 二十九、做空数据（Short Data）

### 功能说明

| 功能           | 说明                                                            |
| -------------- | --------------------------------------------------------------- |
| 美股做空成交   | 每日卖空成交量，含日期序列（SEC 披露数据）                      |
| 美股做空持仓   | 机构做空持仓数量 + 占流通股比例（Short Interest）               |
| 港股卖空成交   | 港股每日卖空成交量序列                                          |
| 港股卖空持仓   | 港股沽空持仓数量序列                                            |

### 原始 API Path

```
# 美股
GET /quote/us_short_trades
  ?counter_id=TSLA.US
  &count=30

GET /quote/us_short_positions
  ?counter_id=TSLA.US
  &count=30

# 港股
GET /quote/short_trades
  ?counter_id=700.HK
  &count=30

GET /quote/short_positions
  ?counter_id=700.HK
  &count=30
```

> Scope: `quote-api`

### 拟规划 CLI 命令

```bash
# 做空成交量序列
longbridge short TSLA.US --trades

# 做空持仓/Short Interest
longbridge short TSLA.US --positions

# 默认同时显示两者
longbridge short TSLA.US

# 港股
longbridge short 700.HK
```

---

## 三十、财务评分（Financial Score）

### 功能说明

| 功能         | 说明                                                                   |
| ------------ | ---------------------------------------------------------------------- |
| 多维打分     | 成长性/价值/质量/动量/综合评分（0–100 分）                             |
| 同行比较     | 在同行业中的打分排名                                                   |
| 历史走势     | 各维度评分的历史序列                                                   |
| 指标明细     | 每个维度下的子指标贡献值                                               |

### 原始 API Path

```
GET /stock-info/security-ratings
  ?counter_id=TSLA.US

GET /stock-info/security-industry-ratings
  ?counter_id=TSLA.US

GET /stock-info/security-rating-history
  ?counter_id=TSLA.US
  &dimension=growth       # growth | value | quality | momentum | overall

GET /fa/rating-indicators-history
  ?counter_id=TSLA.US
```

> Scope: `stock-info`

### 拟规划 CLI 命令

```bash
# 综合评分
longbridge score TSLA.US

# 指定维度
longbridge score TSLA.US --dimension growth

# 历史走势
longbridge score TSLA.US --history

# 同行对比
longbridge score TSLA.US --peers
```

---

## 三十一、股票估值（Valuation）

### 功能说明

| 功能         | 说明                                                                   |
| ------------ | ---------------------------------------------------------------------- |
| 估值指标     | PE/PB/PS/PCF/EV/EV-EBITDA/股息率，当前值 + 历史均值                   |
| 历史估值     | 各指标历史走势（1Y/3Y/5Y/10Y）                                         |
| 行业分布     | 当前估值在行业内的百分位排名                                           |
| 同行比较     | 与同行业公司估值对比                                                   |

### 原始 API Path

```
GET /fa/valuation-detail
  ?counter_id=TSLA.US

GET /stock-info/history-valuation
  ?counter_id=TSLA.US
  &period=3y             # 1y | 3y | 5y | 10y

GET /fa/valuation-in-industry
  ?counter_id=TSLA.US

GET /stock-info/industry-valuation-distribution
  ?counter_id=TSLA.US
```

> Scope: `financial-analysis` / `stock-info`

### 拟规划 CLI 命令

```bash
# 当前估值概览
longbridge valuation TSLA.US

# 历史估值走势
longbridge valuation TSLA.US --history --period 3y

# 行业内估值分布
longbridge valuation TSLA.US --industry

# 同行对比
longbridge valuation TSLA.US --peers
```

---

## 三十二、机构观点（Analyst Ratings）

### 功能说明

| 功能         | 说明                                                                     |
| ------------ | ------------------------------------------------------------------------ |
| 评级概况     | 强买/买/持有/卖/强卖数量分布 + 平均目标价                                |
| 评级明细     | 各机构最新评级、目标价、上次评级、变动方向                               |
| 最新评级     | 最近 N 条评级变动记录（含日期、机构名、评级变化）                        |
| 行业榜单     | 同行业机构评级排行                                                       |

### 原始 API Path

```
GET /stock-info/instratings-view
  ?counter_id=TSLA.US

GET /stock-info/instratings-detail
  ?counter_id=TSLA.US
  &offset=0&count=20

GET /fa/institution-rating-latest
  ?counter_id=TSLA.US
  &count=10

GET /fa/institution-rating-industry-rank
  ?counter_id=TSLA.US
```

> Scope: `stock-info` / `financial-analysis`

### 拟规划 CLI 命令

```bash
# 评级概况 + 平均目标价
longbridge analyst TSLA.US

# 各机构评级明细
longbridge analyst TSLA.US --detail

# 最近评级变动
longbridge analyst TSLA.US --latest --count 10

# 行业内排行
longbridge analyst TSLA.US --industry-rank
```

---

## 三十三、内部人士交易（Insider Trading）

### 功能说明

| 功能           | 说明                                                               |
| -------------- | ------------------------------------------------------------------ |
| 持仓汇总       | Insider 总持仓量及占比（柱状图摘要）                               |
| 交易明细       | 按时间维度的增减持交易记录（日期、人员、买卖方向、数量、价格）     |
| 持仓明细       | 按季度的各 Insider 持仓数量变化                                    |
| 单一股东详情   | 指定股东（公司/机构/个人/Insider）的持仓 + 交易信息                |

### 原始 API Path

```
GET /stock-info/get_company_insider_holding_summary
  ?counter_id=TSLA.US

GET /stock-info/get_company_insider_trading_detail
  ?counter_id=TSLA.US
  &start_date=2024-01-01
  &end_date=2024-12-31

GET /stock-info/get_company_insider_holding_detail
  ?counter_id=TSLA.US
  &quarter=2024Q4

GET /stock-info/get_company_single_holding_trading_info
  ?counter_id=TSLA.US
  &holder_id=...
```

> Scope: `fundamental-app`

### 拟规划 CLI 命令

```bash
# 内部人士持仓汇总
longbridge insider TSLA.US

# 最近 N 条交易记录
longbridge insider TSLA.US --trades --count 20

# 指定时间范围
longbridge insider TSLA.US --trades --start 2024-01-01 --end 2024-12-31

# 按季度持仓明细
longbridge insider TSLA.US --holdings --quarter 2024Q4
```
