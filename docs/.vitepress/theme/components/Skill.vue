<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

// ─── i18n ─────────────────────────────────────────────────────────────────────

const isEN = computed(() => lang.value === 'en-US')
const isHK = computed(() => lang.value === 'zh-HK')
const installGuideUrl = computed(() => (isEN.value ? '/skill/install' : `/${lang.value}/skill/install`))

const t = {
  badge: computed(() => (isEN.value ? 'Longbridge Developers · Skill' : 'Longbridge Developers · Skill')),
  heroTitle1: computed(() => 'Longbridge Skill'),
  heroTitle2: computed(() =>
    isEN.value
      ? 'Unlock investing and analysis for your AI'
      : isHK.value
        ? '為你的 AI 解鎖投資、分析能力'
        : '为你的 AI 解锁投资、分析能力'
  ),
  heroSubtitle: computed(() =>
    isEN.value
      ? 'With Longbridge Skill, let your AI assistant (OpenClaw, ChatGPT, Claude, etc.) directly access Hong Kong and US stock data and trading capabilities.'
      : isHK.value
        ? '透過 Longbridge Skill，讓你的 AI 助手（OpenClaw、ChatGPT、Claude 等）直接存取港美股即時數據與交易能力。'
        : '通过 Longbridge Skill，让你的 AI 助手（OpenClaw、ChatGPT、Claude 等）直接访问港美股实时数据与交易能力。'
  ),
  downloadZip: computed(() => (isEN.value ? 'Download Skill ZIP' : isHK.value ? '下載 Skill ZIP' : '下载 Skill ZIP')),
  recommended: computed(() => (isEN.value ? 'Recommended' : '推荐')),
  orCli: computed(() => (isEN.value ? 'Or install via CLI' : isHK.value ? '或命令行安裝' : '或命令行安装')),
  copy: computed(() => (isEN.value ? 'Copy' : '复制')),
  copied: computed(() => (isEN.value ? 'Copied!' : '已复制')),
  ctaHint: computed(() =>
    isEN.value
      ? 'Copy and send to any AI — it will walk you through the installation:'
      : isHK.value
        ? '複製以下內容發送給任意 AI，它會引導你完成 Skill 安裝：'
        : '复制以下内容发送给任意 AI，它会引导你完成 Skill 安装：'
  ),
  installGuide: computed(() =>
    isEN.value
      ? 'View installation guide for each client →'
      : isHK.value
        ? '查看各客戶端具體安裝方式 →'
        : '查看各客户端具体安装方式 →'
  ),
  supportedBy: computed(() =>
    isEN.value ? 'Supported AI tools' : isHK.value ? '支持以下 AI 工具' : '支持以下 AI 工具'
  ),
  scenariosTitle: computed(() =>
    isEN.value
      ? 'What you can do with natural language'
      : isHK.value
        ? '用自然語言，完成以前只有專業系統才能做的事'
        : '用自然语言，完成以前只有专业系统才能做的事'
  ),
  scenariosSubtitle: computed(() =>
    isEN.value
      ? "Tell your AI assistant what you want — it calls Longbridge's data and trading APIs for you."
      : isHK.value
        ? '直接告訴你的 AI 助手你想做什麼——它來調用 Longbridge 的數據與交易能力。'
        : '直接告诉你的 AI 助手你想做什么——它来调用 Longbridge 的数据与交易能力。'
  ),
  demoTitle: computed(() =>
    isEN.value ? 'See it in action' : isHK.value ? '了解 Skill 能做什麼' : '了解 Skill 能做什么'
  ),
  demoSubtitle: computed(() =>
    isEN.value
      ? 'Select a scenario and AI tool to see the live demo'
      : isHK.value
        ? '選擇場景，查看你的 AI 助手如何工作'
        : '选择场景，查看你的 AI 助手如何工作'
  ),
  installTitle: computed(() => (isEN.value ? 'Get Started' : '开始安装')),
  installSubtitle: computed(() =>
    isEN.value ? 'Choose your AI tool' : isHK.value ? '選擇你使用的 AI 工具' : '选择你使用的 AI 工具'
  ),
  manualInstallLabel: computed(() => (isEN.value ? 'Manual Install' : isHK.value ? '手動安裝' : '手动安装')),
  manualInstallHint: computed(() =>
    isEN.value
      ? 'Extract and import into Claude, ChatGPT, Cursor and other AI clients.'
      : isHK.value
        ? '解壓後導入 Claude、ChatGPT、Cursor 等 AI 客戶端。'
        : '解压后导入 Claude、ChatGPT、Cursor 等 AI 客户端。'
  ),
  cliInstallHint: computed(() =>
    isEN.value
      ? 'Install into your project for Claude Code, Codex and similar tools.'
      : isHK.value
        ? '安裝到項目目錄，適用於 Claude Code、Codex 等工具。'
        : '安装到项目目录，适用于 Claude Code、Codex 等工具。'
  ),
  oneLinerLabel: computed(() =>
    isEN.value ? 'Copy and send to any AI' : isHK.value ? '複製後發送給任意 AI' : '复制后发送给任意 AI'
  ),
  oneLinerHint: computed(() =>
    isEN.value
      ? 'Paste this message into any AI assistant (Claude, ChatGPT, etc.) and it will guide you through the installation.'
      : isHK.value
        ? '將以下這句話發送給任意 AI 助手（Claude、ChatGPT 等），它會自動引導你完成安裝。'
        : '将以下这句话发送给任意 AI 助手（Claude、ChatGPT 等），它会自动引导你完成安装。'
  ),
}

// ─── Data ─────────────────────────────────────────────────────────────────────

interface ScenarioCard {
  id: string
  color: string
  label: string
  title: string
  desc: string
  example: string
}

const scenarioCards = computed<ScenarioCard[]>(() =>
  isEN.value
    ? [
        {
          id: 'monitor',
          color: '#00b8b8',
          label: 'Market Monitor',
          title: 'Track market moves and capital flows in real time',
          desc: 'Query real-time quotes, Level 2 order book depth, and capital flows. Get AI to aggregate multi-dimensional data to help you read market direction.',
          example: '"Which tech stocks saw the most net capital inflow today? What\'s the direction of large orders?"',
        },
        {
          id: 'research',
          color: '#1890ff',
          label: 'Stock Research',
          title: 'Understand a company from earnings to valuation to news',
          desc: 'Pull earnings reports, SEC filings, announcements and analyst data. AI extracts key metrics, compares competitors, and generates readable investment summaries.',
          example:
            '"Analyze NVDA: highlights from the latest quarter, whether the valuation is reasonable, and key risks."',
        },
        {
          id: 'trade',
          color: '#ff5000',
          label: 'Smart Trading',
          title: 'Place, modify, and check orders in one sentence',
          desc: 'No need to open a trading app. Say your intent in the conversation. AI shows order details and asks for confirmation before executing.',
          example: '"Buy 100 shares of AAPL at market price, tell me the current price first."',
        },
        {
          id: 'chart',
          color: '#4781ff',
          label: 'Chart & Technical Analysis',
          title: 'Use historical data to find timing references',
          desc: 'Get candlestick charts and historical trade data for any timeframe. Let AI analyze trends with technical indicators and highlight key support and resistance levels.',
          example: '"How has TSLA trended in the past 3 months? Is it near a key support or resistance level?"',
        },
        {
          id: 'portfolio',
          color: '#00b99a',
          label: 'Portfolio & Account',
          title: 'Know your full portfolio and P&L at any time',
          desc: 'Query account balance, stock and fund holdings, and daily trade records. Let AI summarize portfolio performance and identify the main drivers of gains and losses.',
          example:
            '"How is my portfolio performing today? Which stock contributed the most and which is dragging it down?"',
        },
        {
          id: 'coding',
          color: '#ff7333',
          label: 'Programming & Automation',
          title: 'Let AI write trading scripts and automation for you',
          desc: 'Describe your needs in natural language. Claude Code or Codex will generate complete Python/Rust programs using the Longbridge SDK — from data pipelines to real-time order systems.',
          example:
            '"Write a Python script that pulls my holdings after market close each day and saves the P&L and market value to CSV."',
        },
      ]
    : [
        {
          id: 'monitor',
          color: '#00b8b8',
          label: isHK.value ? '行情監控' : '行情监控',
          title: isHK.value ? '即時掌握市場動態，洞察資金與盤口' : '实时掌握市场动态，洞察资金与盘口',
          desc: isHK.value
            ? '查詢即時報價、Level 2 盤口深度與資金流向，讓 AI 匯總多維度數據，幫你判斷市場風向。'
            : '查询实时报价、Level 2 盘口深度与资金流向，让 AI 汇总多维度数据，帮你判断市场风向。',
          example: isHK.value
            ? '"今天科技板塊資金淨流入最多的是哪幾隻？主力大單方向怎樣？"'
            : '"今天科技板块资金净流入最多的是哪几只？主力大单方向怎样？"',
        },
        {
          id: 'research',
          color: '#1890ff',
          label: isHK.value ? '個股全景分析' : '个股全景分析',
          title: isHK.value ? '讀懂一家公司，從財報到估值到新聞' : '读懂一家公司，从财报到估值到新闻',
          desc: isHK.value
            ? '拉取財報、SEC 申報、公告與分析師數據；AI 提煉核心指標，橫向對比競爭對手，生成可讀的投資參考摘要。'
            : '拉取财报、SEC 申报、公告与分析师数据；AI 提炼核心指标，横向对比竞争对手，生成可读的投资参考摘要。',
          example: isHK.value
            ? '"分析 NVDA：最新季報亮點、當前估值是否合理，以及主要風險"'
            : '"分析 NVDA：最新季报亮点、当前估值是否合理，以及主要风险"',
        },
        {
          id: 'trade',
          color: '#ff5000',
          label: isHK.value ? '智能交易' : '智能交易',
          title: isHK.value ? '一句話完成下單、改單、查持倉' : '一句话完成下单、改单、查持仓',
          desc: isHK.value
            ? '無需打開交易軟件，直接在對話中說出意圖。AI 先展示訂單詳情並請你確認，確認後才真正執行。'
            : '无需打开交易软件，直接在对话中说出意图。AI 先展示订单详情并请你确认，确认后才真正执行。',
          example: isHK.value
            ? '"以市價買入 100 股 AAPL，執行前告訴我當前價格"'
            : '"以市价买入 100 股 AAPL，执行前告诉我当前价格"',
        },
        {
          id: 'chart',
          color: '#4781ff',
          label: isHK.value ? '走勢 & 技術分析' : '走势 & 技术分析',
          title: isHK.value ? '用歷史數據，找到買賣的時機參考' : '用历史数据，找到买卖的时机参考',
          desc: isHK.value
            ? '獲取任意週期 K 線與歷史成交數據，讓 AI 結合技術指標分析趨勢，標出關鍵支撐與壓力位。'
            : '获取任意周期 K 线与历史成交数据，让 AI 结合技术指标分析趋势，标出关键支撑与压力位。',
          example: isHK.value
            ? '"TSLA 近 3 個月走勢怎樣？當前在關鍵支撐位還是壓力位附近？"'
            : '"TSLA 近 3 个月走势怎样？当前在关键支撑位还是压力位附近？"',
        },
        {
          id: 'portfolio',
          color: '#00b99a',
          label: isHK.value ? '持倉 & 賬戶' : '持仓 & 账户',
          title: isHK.value ? '隨時了解你的資產全貌與盈虧狀況' : '随时了解你的资产全貌与盈亏状况',
          desc: isHK.value
            ? '查詢賬戶餘額、股票與基金持倉、當日成交記錄，讓 AI 匯總你的組合表現並指出主要盈虧來源。'
            : '查询账户余额、股票与基金持仓、当日成交记录，让 AI 汇总你的组合表现并指出主要盈亏来源。',
          example: isHK.value
            ? '"我今天持倉盈虧怎樣？哪隻股票貢獻最多，哪隻在拖累組合？"'
            : '"我今天持仓盈亏怎样？哪只股票贡献最多，哪只在拖累组合？"',
        },
        {
          id: 'coding',
          color: '#ff7333',
          label: isHK.value ? '編程 & 自動化' : '编程 & 自动化',
          title: isHK.value ? '讓 AI 幫你寫交易腳本與自動化策略' : '让 AI 帮你写交易脚本与自动化策略',
          desc: isHK.value
            ? '用自然語言描述需求，借助 Claude Code 或 Codex，AI 生成調用 Longbridge Python/Rust SDK 的完整程序——無論是數據分析腳本、批量下單策略還是實時推送監控。'
            : '用自然语言描述需求，借助 Claude Code 或 Codex，AI 生成调用 Longbridge Python/Rust SDK 的完整程序——无论是数据分析脚本、批量下单策略还是实时推送监控。',
          example: isHK.value
            ? '"幫我寫一個 Python 腳本，每天收盤後自動拉取持倉，把總市值和各股漲跌存入 CSV"'
            : '"帮我写一个 Python 脚本，每天收盘后自动拉取持仓，把总市值和各股涨跌存入 CSV"',
        },
      ]
)

interface DemoScenario {
  id: string
  label: string
  messages: DemoMessage[]
  clientMessages?: Record<string, DemoMessage[]>
}

interface DemoMessage {
  role: 'user' | 'tool' | 'assistant'
  content: string
  command?: string
  rich?: boolean // if true, content is HTML rendered via v-html
}

// ─── Lightweight syntax highlighter for demo code blocks ──────────────────────

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function colorizeTokens(raw: string): string {
  // Single-pass tokenizer: processes raw text once to avoid regex-on-html corruption
  const KW =
    /^(from|import|def|class|for|if|else|elif|return|in|as|with|not|and|or|True|False|None|print|float|int|str|dict|list|abs|len|range)\b/
  const NUM = /^\d+(?:\.\d+)?(?:[BKMbkm])?\b/
  let out = ''
  let i = 0
  while (i < raw.length) {
    // String literal (double or single quoted)
    if (raw[i] === '"' || raw[i] === "'") {
      const q = raw[i]
      let j = i + 1
      while (j < raw.length && raw[j] !== q) j++
      if (j < raw.length) j++
      out += `<span class="hl-s">${escHtml(raw.slice(i, j))}</span>`
      i = j
      continue
    }
    // Keyword (at word boundary)
    if (/\w/.test(raw[i]) && (i === 0 || !/\w/.test(raw[i - 1]))) {
      const m = raw.slice(i).match(KW)
      if (m) {
        out += `<span class="hl-k">${m[1]}</span>`
        i += m[1].length
        continue
      }
    }
    // Number (at word boundary)
    if (/\d/.test(raw[i]) && (i === 0 || !/\w/.test(raw[i - 1]))) {
      const m = raw.slice(i).match(NUM)
      if (m) {
        out += `<span class="hl-n">${m[0]}</span>`
        i += m[0].length
        continue
      }
    }
    out += escHtml(raw[i])
    i++
  }
  return out
}

function highlightCode(raw: string): string {
  return raw
    .split('\n')
    .map((line) => {
      // Shell prompt line (starts with $)
      if (/^\s*\$\s/.test(line)) {
        const esc = escHtml(line)
        return `<span class="hl-prompt">$</span>${esc.slice(esc.indexOf('$') + 1)}`
      }
      // Full-line comment
      const ci = line.indexOf('#')
      if (ci >= 0) {
        return colorizeTokens(line.slice(0, ci)) + `<span class="hl-c">${escHtml(line.slice(ci))}</span>`
      }
      return colorizeTokens(line)
    })
    .join('\n')
}

function codeHTML(raw: string): string {
  return `<pre class="demo-code-block"><code>${highlightCode(raw)}</code></pre>`
}

const demoScenarios = computed<DemoScenario[]>(() => {
  const cn = !isEN.value // zh-CN or zh-HK

  // ── Shared rich-HTML builders ──────────────────────────────────────────────

  // Quote table: accepts custom rows so each client can show different stocks
  // extraHTML is optional — used for sparklines etc. in the default (OpenClaw) view
  const quoteTableHTML = (rows: string, note: string, extraHTML = '') => `
<div class="demo-table-wrap"><table class="demo-table">
  <thead><tr>
    <th>${cn ? '代码' : 'Symbol'}</th>
    <th>${cn ? '现价' : 'Price'}</th>
    <th>${cn ? '涨跌' : 'Change'}</th>
    <th>${cn ? '成交额' : 'Turnover'}</th>
  </tr></thead>
  <tbody>${rows}</tbody>
</table></div>
${extraHTML}
<p class="demo-note">${note}</p>`

  // Mini sparkline: both use brand teal; NVDA uptrend (+3.28%), TSLA downtrend (−3.24%)
  // viewBox 0 0 100 40, y range 4–36; realistic zigzag shapes, not monotone
  const buildSparkData = (prices: number[]) => {
    const min = Math.min(...prices),
      max = Math.max(...prices)
    const pts = prices.map((p, i) => ({
      x: +((i * 100) / (prices.length - 1)).toFixed(2),
      y: +(4 + (1 - (p - min) / (max - min)) * 32).toFixed(2),
    }))
    const line = pts.map((p) => `${p.x},${p.y}`).join(' ')
    // Close path: go to bottom-right corner, then bottom-left, then back to start
    const fill =
      `M ${pts[0].x},${pts[0].y} ` +
      pts
        .slice(1)
        .map((p) => `L ${p.x},${p.y}`)
        .join(' ') +
      ` L ${pts[pts.length - 1].x},40 L 0,40 Z`
    return { line, fill }
  }
  // NVDA: overall uptrend — dips early then rallies; ends at +3.28%
  const nvda = buildSparkData([100, 97, 102, 99, 95, 99, 105, 110, 116, 124])
  // TSLA: overall downtrend — small bounces but keeps falling; ends at −3.24%
  const tsla = buildSparkData([120, 118, 114, 117, 111, 105, 109, 100, 93, 87])
  const nvdaTslaSparkline = `
<div class="demo-sparkline-row">
  <div class="demo-sparkline-item">
    <div class="demo-sparkline-label">NVDA.US<span class="demo-pos">+3.28%</span></div>
    <div class="demo-sparkline-chart">
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" class="demo-sparkline-svg">
        <defs>
          <linearGradient id="sg-nvda" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#00b8b8" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="#00b8b8" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <path d="${nvda.fill}" fill="url(#sg-nvda)"/>
        <polyline points="${nvda.line}" fill="none" stroke="#00b8b8" stroke-width="1" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
      </svg>
    </div>
    <div class="demo-sparkline-price">$172.70</div>
  </div>
  <div class="demo-sparkline-item">
    <div class="demo-sparkline-label">TSLA.US<span class="demo-neg">−3.24%</span></div>
    <div class="demo-sparkline-chart">
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" class="demo-sparkline-svg">
        <defs>
          <linearGradient id="sg-tsla" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#00b8b8" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="#00b8b8" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <path d="${tsla.fill}" fill="url(#sg-tsla)"/>
        <polyline points="${tsla.line}" fill="none" stroke="#00b8b8" stroke-width="1" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
      </svg>
    </div>
    <div class="demo-sparkline-price">$367.96</div>
  </div>
</div>`

  // Row sets for different client contexts
  const rowsNvdaTsla = `
    <tr><td>NVDA.US</td><td>$172.70</td><td class="demo-pos">+3.28%</td><td class="demo-muted">$42.1B</td></tr>
    <tr><td>TSLA.US</td><td>$367.96</td><td class="demo-neg">−3.24%</td><td class="demo-muted">$29.2B</td></tr>`
  const rowsSpyQqq = `
    <tr><td>SPY.US</td><td>$558.20</td><td class="demo-pos">+0.31%</td><td class="demo-muted">$8.2B</td></tr>
    <tr><td>QQQ.US</td><td>$478.95</td><td class="demo-pos">+0.82%</td><td class="demo-muted">$4.1B</td></tr>`
  const rowsAaplHk = `
    <tr><td>AAPL.US</td><td>$247.99</td><td class="demo-neg">−0.39%</td><td class="demo-muted">$12.6B</td></tr>
    <tr><td>700.HK</td><td>HK$382.60</td><td class="demo-pos">+1.18%</td><td class="demo-muted">HK$15.3B</td></tr>`

  // Portfolio table + SVG donut chart
  // Values: AAPL 100×$247.99=$24,799(23.2%), NVDA 50×$172.70=$8,635(8.1%), TSLA 200×$367.96=$73,592(68.8%)
  // SVG: r=28, C=175.93; TSLA=121.0, AAPL=40.76, NVDA=14.17
  const portfolioChartHTML = (note: string) => `
<div class="demo-table-wrap"><table class="demo-table">
  <thead><tr>
    <th>${cn ? '代码' : 'Symbol'}</th>
    <th>${cn ? '持仓' : 'Qty'}</th>
    <th>${cn ? '成本' : 'Cost'}</th>
    <th>${cn ? '现价' : 'Price'}</th>
    <th>${cn ? '盈亏' : 'P&L'}</th>
  </tr></thead>
  <tbody>
    <tr><td>AAPL.US</td><td>${cn ? '100股' : '100'}</td><td>$220.50</td><td>$247.99</td><td class="demo-pos">+12.5%</td></tr>
    <tr><td>NVDA.US</td><td>${cn ? '50股' : '50'}</td><td>$145.30</td><td>$172.70</td><td class="demo-pos">+18.9%</td></tr>
    <tr><td>TSLA.US</td><td>${cn ? '200股' : '200'}</td><td>$398.00</td><td>$367.96</td><td class="demo-neg">−7.5%</td></tr>
  </tbody>
</table></div>
<div class="demo-chart-row">
  <svg viewBox="0 0 80 80" width="96" height="96" style="flex-shrink:0">
    <circle cx="40" cy="40" r="28" fill="none" stroke="#ff5000" stroke-width="11"
      stroke-dasharray="121.0 175.93" transform="rotate(-90 40 40)" />
    <circle cx="40" cy="40" r="28" fill="none" stroke="#00b8b8" stroke-width="11"
      stroke-dasharray="40.76 175.93" stroke-dashoffset="-121.0"
      transform="rotate(-90 40 40)" />
    <circle cx="40" cy="40" r="28" fill="none" stroke="#4781ff" stroke-width="11"
      stroke-dasharray="14.17 175.93" stroke-dashoffset="-161.76"
      transform="rotate(-90 40 40)" />
    <text x="40" y="36" text-anchor="middle" font-size="9" font-weight="700" fill="currentColor">$107K</text>
    <text x="40" y="47" text-anchor="middle" font-size="6.5" fill="#94a3b8">${cn ? '总市值' : 'Total'}</text>
  </svg>
  <div class="demo-legend">
    <div class="demo-legend-item"><span class="demo-dot" style="background:#ff5000"></span>TSLA 68.8%</div>
    <div class="demo-legend-item"><span class="demo-dot" style="background:#00b8b8"></span>AAPL 23.2%</div>
    <div class="demo-legend-item"><span class="demo-dot" style="background:#4781ff"></span>NVDA 8.1%</div>
  </div>
</div>
<div class="demo-summary">${cn ? '总市值' : 'Total'} <strong>$107,026</strong> · ${cn ? '今日' : 'Today'} <span class="demo-neg">−$1,640 (−1.4%)</span></div>
<p class="demo-note">${note}</p>`

  // Subscription card — parameterized per stock
  const subscribeHTML = (
    symbol: string,
    price: string,
    chg: string,
    isPos: boolean,
    turnover: string,
    alertUp: string,
    alertDown: string,
    note: string
  ) => `
<div>
  <div style="font-size:0.8125rem;font-weight:600;margin-bottom:6px">${cn ? `已订阅 ${symbol} 实时行情 ✓` : `Subscribed to ${symbol} ✓`}</div>
  <div class="demo-price-row">
    <span class="demo-price-big">${price}</span>
    <span class="${isPos ? 'demo-pos' : 'demo-neg'}" style="font-size:0.875rem;font-weight:600">${chg}</span>
    <span class="demo-muted" style="font-size:0.75rem">${cn ? `成交额 ${turnover}` : `Turnover ${turnover}`}</span>
  </div>
  <div class="demo-alerts">
    <div class="demo-alert-item">↑ ${alertUp}</div>
    <div class="demo-alert-item">↓ ${alertDown}</div>
  </div>
</div>
<p class="demo-note">${note}</p>`

  // Earnings comparison table
  const earningsTableHTML = (note: string) => `
<div class="demo-table-wrap"><table class="demo-table">
  <thead><tr>
    <th></th>
    <th>TSLA Q4'25</th>
    <th>NVDA Q4'26</th>
  </tr></thead>
  <tbody>
    <tr><td>${cn ? '营收' : 'Revenue'}</td><td>$25.7B</td><td class="demo-pos">$39.3B</td></tr>
    <tr class="demo-highlight"><td>${cn ? '同比' : 'YoY'}</td><td class="demo-pos">+2%</td><td class="demo-pos">+78%</td></tr>
    <tr><td>${cn ? '毛利率' : 'Gross Margin'}</td><td>16.3%</td><td class="demo-pos">73.5%</td></tr>
    <tr class="demo-highlight"><td>${cn ? '净利润' : 'Net Income'}</td><td>$2.3B</td><td class="demo-pos">$22.1B</td></tr>
  </tbody>
</table></div>
<p class="demo-note">${note}</p>`

  // ── Helper: user & tool messages per scenario ──────────────────────────────
  const quoteUserMsg = isEN.value
    ? "What's the latest on NVDA and TSLA today?"
    : isHK.value
      ? 'NVDA 和 TSLA 今天行情怎樣？'
      : 'NVDA 和 TSLA 今天行情怎样？'
  const portfolioUserMsg = isEN.value
    ? "How's my portfolio today? Show each position's P&L."
    : isHK.value
      ? '我今天持倉表現怎樣？各股盈虧情況？'
      : '我今天持仓表现怎样？各股盈亏情况？'
  const subscribeUserMsg = isEN.value
    ? 'Subscribe to NVDA real-time quote and alert me on big moves'
    : isHK.value
      ? '訂閱 NVDA 實時行情，價格大幅波動時提醒我'
      : '订阅 NVDA 实时行情，价格大幅波动时提醒我'
  const earningsUserMsg = isEN.value
    ? "Compare TSLA and NVDA's latest quarterly results"
    : isHK.value
      ? '對比 TSLA 和 NVDA 最新季報的核心財務數據'
      : '对比 TSLA 和 NVDA 最新季报的核心财务数据'

  return [
    // ── Scenario 1: 实时行情 ── real data: 2026-03-23 close
    {
      id: 'quote',
      label: isEN.value ? 'Live Quote' : isHK.value ? '即時行情' : '实时行情',
      // OpenClaw default: conversational table + analysis
      messages: [
        {
          role: 'user',
          content: isEN.value
            ? "What's the latest on NVDA and TSLA today?"
            : isHK.value
              ? 'NVDA 和 TSLA 今天行情怎樣？'
              : 'NVDA 和 TSLA 今天行情怎样？',
        },
        { role: 'tool', command: 'longbridge quote NVDA.US TSLA.US', content: '' },
        {
          role: 'assistant',
          rich: true,
          content: quoteTableHTML(
            rowsNvdaTsla,
            cn
              ? 'NVDA 成交额 $42.1B 放量上涨，突破 10 日区间；TSLA 连续承压'
              : 'NVDA +3.28% on $42.1B volume — breakout. TSLA continues to slide.',
            nvdaTslaSparkline
          ),
        },
      ],
      clientMessages: {
        // ChatGPT: broad market / ETF focus
        chatgpt: [
          {
            role: 'user',
            content: isEN.value
              ? 'How are SPY and QQQ doing today?'
              : isHK.value
                ? 'SPY 和 QQQ 今天表現怎樣？'
                : 'SPY 和 QQQ 今天表现怎样？',
          },
          { role: 'tool', command: 'longbridge quote SPY.US QQQ.US', content: '' },
          {
            role: 'assistant',
            rich: true,
            content: quoteTableHTML(
              rowsSpyQqq,
              cn
                ? '大盘整体偏强，科技股领涨，QQQ 跑赢 SPY'
                : 'Broad market holding up. QQQ outperforming SPY — tech leading.'
            ),
          },
        ],
        // Claude: cross-market comparison (US + HK)
        claude: [
          {
            role: 'user',
            content: isEN.value
              ? 'Compare AAPL and Tencent (700.HK) today'
              : isHK.value
                ? '對比 AAPL 和騰訊（700.HK）今日表現'
                : '对比 AAPL 和腾讯（700.HK）今日表现',
          },
          { role: 'tool', command: 'longbridge quote AAPL.US 700.HK', content: '' },
          {
            role: 'assistant',
            rich: true,
            content: quoteTableHTML(
              rowsAaplHk,
              cn
                ? '港美市场走势分化：AAPL 随大盘小幅走弱，腾讯港股受科技板块提振小幅反弹'
                : 'Divergence: AAPL drifted with US market; Tencent HK rebounded on tech sentiment.'
            ),
          },
        ],
        // Claude Code: terminal output — AAPL + MSFT
        'claude-code': [
          {
            role: 'user',
            content: isEN.value
              ? 'Check AAPL and MSFT prices'
              : isHK.value
                ? '查一下 AAPL 和 MSFT 的報價'
                : '查一下 AAPL 和 MSFT 的报价',
          },
          { role: 'tool', command: 'longbridge quote AAPL.US MSFT.US', content: '' },
          {
            role: 'assistant',
            rich: true,
            content: codeHTML(
              '$ longbridge quote AAPL.US MSFT.US\n\nSymbol    Last    Chg%    Turnover\nAAPL.US   247.99  -0.39%   $12.6B\nMSFT.US   388.75  -1.24%   $9.8B\n\n# AAPL 10d range: 242.10–253.48\n# MSFT 10d range: 381.50–398.20\n# Both under slight pressure; MSFT underperforming on cloud margin concern'
            ),
          },
        ],
        // Codex: Python — NVDA + AMD (semiconductor pair)
        codex: [
          {
            role: 'user',
            content: isEN.value
              ? 'Get quotes for NVDA and AMD'
              : isHK.value
                ? '獲取 NVDA 和 AMD 的報價'
                : '获取 NVDA 和 AMD 的报价',
          },
          { role: 'tool', command: 'longbridge quote NVDA.US AMD.US --format json', content: '' },
          {
            role: 'assistant',
            rich: true,
            content: codeHTML(
              'quotes = lb.quote(["NVDA.US", "AMD.US"])\n\n# Output:\n# NVDA.US  last=172.70  chg=-3.28%  vol=241_323_528\n# AMD.US   last=104.85  chg=-2.14%  vol=58_204_917\n\n# Semiconductor pair both selling off\n# NVDA/AMD spread: 172.70 / 104.85 = 1.65x\n# 30d rolling corr: 0.87 (high co-movement)'
            ),
          },
        ],
      },
    },

    // ── Scenario 2: 持仓资产 ── simulated account data (no real account access)
    {
      id: 'portfolio',
      label: isEN.value ? 'Portfolio' : isHK.value ? '持倉資產' : '持仓资产',
      messages: [
        {
          role: 'user',
          content: isEN.value
            ? "How's my portfolio today? Show each position's P&L."
            : isHK.value
              ? '我今天持倉表現怎樣？各股盈虧情況？'
              : '我今天持仓表现怎样？各股盈亏情况？',
        },
        { role: 'tool', command: 'longbridge positions', content: '' },
        {
          role: 'assistant',
          rich: true,
          content: portfolioChartHTML(
            cn
              ? '今日: −$1,640 (−1.4%)。NVDA 最大贡献 +$1,370，TSLA 拖累 −$6,008'
              : 'Daily: −$1,640 (−1.4%). NVDA top gainer +$1,370; TSLA the drag −$6,008.'
          ),
        },
      ],
      clientMessages: {
        'claude-code': [
          {
            role: 'user',
            content: isEN.value
              ? 'Write a script to fetch my holdings and compute P&L.'
              : isHK.value
                ? '幫我寫腳本獲取持倉並計算各股今日盈虧'
                : '帮我写脚本获取持仓并计算各股今日盈亏',
          },
          { role: 'tool', command: 'longbridge positions', content: '' },
          {
            role: 'assistant',
            rich: true,
            content: codeHTML(
              'from longbridge.openapi import TradeContext\n\nctx = TradeContext.from_env()\nres = ctx.stock_positions()\n\nfor pos in res.channels[0].positions:\n    cost  = float(pos.cost_price)\n    price = float(pos.current_price)\n    pnl   = (price - cost) / cost * 100\n    qty   = int(pos.quantity)\n    print(f"{pos.symbol}  qty={qty}  cost={cost:.2f}  price={price:.2f}  pnl={pnl:+.1f}%")\n\n# AAPL.US  qty=100  cost=220.50  price=247.99  pnl=+12.5%\n# NVDA.US  qty=50   cost=145.30  price=172.70  pnl=+18.9%\n# TSLA.US  qty=200  cost=398.00  price=367.96  pnl=-7.5%'
            ),
          },
        ],
        codex: [
          {
            role: 'user',
            content: isEN.value
              ? 'Write a script to fetch my holdings and compute P&L.'
              : isHK.value
                ? '幫我寫腳本獲取持倉並計算各股今日盈虧'
                : '帮我写脚本获取持仓并计算各股今日盈亏',
          },
          { role: 'tool', command: 'longbridge positions', content: '' },
          {
            role: 'assistant',
            rich: true,
            content: codeHTML(
              'ctx = TradeContext.from_env()\npositions = ctx.stock_positions().channels[0].positions\n\nfor p in positions:\n    cost, price = float(p.cost_price), float(p.current_price)\n    pnl_pct = (price - cost) / cost * 100\n    pnl_abs = (price - cost) * int(p.quantity)\n    print(f"{p.symbol}  {pnl_pct:+.1f}%  ${pnl_abs:+,.0f}")\n\n# AAPL.US  +12.5%  +$2,749\n# NVDA.US  +18.9%  +$1,370\n# TSLA.US   -7.5%  -$6,008'
            ),
          },
        ],
      },
    },

    // ── Scenario 3: 行情订阅 ── real NVDA data
    {
      id: 'subscribe',
      label: isEN.value ? 'Subscription' : isHK.value ? '行情訂閱' : '行情订阅',
      messages: [
        {
          role: 'user',
          content: isEN.value
            ? 'Subscribe to NVDA real-time quote and alert me on big moves'
            : isHK.value
              ? '訂閱 NVDA 實時行情，價格大幅波動時提醒我'
              : '订阅 NVDA 实时行情，价格大幅波动时提醒我',
        },
        { role: 'tool', command: 'longbridge subscribe NVDA.US quote', content: '' },
        {
          role: 'assistant',
          rich: true,
          content: subscribeHTML(
            'NVDA.US',
            '$172.70',
            '−3.28%',
            false,
            '$42.1B',
            cn ? '突破 $178（昨收）时提醒' : 'Alert if above $178 (prev close)',
            cn ? '跌破 $170（关键支撑）时提醒' : 'Alert if below $170 (key support)',
            cn ? '随时问我「NVDA 现在怎样」查看最新行情' : 'Ask "how is NVDA doing" anytime for a quick update.'
          ),
        },
      ],
      clientMessages: {
        // ChatGPT: TSLA subscription
        chatgpt: [
          {
            role: 'user',
            content: isEN.value
              ? 'Track TSLA and alert me when it moves sharply'
              : isHK.value
                ? '訂閱 TSLA 行情，大幅波動時提醒我'
                : '订阅 TSLA 行情，大幅波动时提醒我',
          },
          { role: 'tool', command: 'longbridge subscribe TSLA.US quote', content: '' },
          {
            role: 'assistant',
            rich: true,
            content: subscribeHTML(
              'TSLA.US',
              '$367.96',
              '−3.24%',
              false,
              '$29.2B',
              cn ? '突破 $380（昨收）时提醒' : 'Alert if above $380 (prev close)',
              cn ? '跌破 $360（近期低点）时提醒' : 'Alert if below $360 (recent low)',
              cn
                ? '价格波动 ±2% 或成交量异常时将实时推送通知'
                : "I'll notify you on ±2% moves or unusual volume spikes."
            ),
          },
        ],
        // Claude: 700.HK (Tencent) — HK market
        claude: [
          {
            role: 'user',
            content: isEN.value
              ? 'Subscribe to Tencent (700.HK) real-time data'
              : isHK.value
                ? '訂閱騰訊（700.HK）實時行情'
                : '订阅腾讯（700.HK）实时行情',
          },
          { role: 'tool', command: 'longbridge subscribe 700.HK quote', content: '' },
          {
            role: 'assistant',
            rich: true,
            content: subscribeHTML(
              '700.HK',
              'HK$382.60',
              '+1.18%',
              true,
              'HK$15.3B',
              cn ? '突破 HK$390（压力位）时提醒' : 'Alert if above HK$390 (resistance)',
              cn ? '跌破 HK$375（支撑位）时提醒' : 'Alert if below HK$375 (support)',
              cn
                ? '港股通可交易，注意收盘时间与内地不同（16:00 港时）'
                : 'Stock Connect eligible. HK market closes 16:00 HKT.'
            ),
          },
        ],
        // Claude Code: AAPL subscription with Python alert code
        'claude-code': [
          {
            role: 'user',
            content: isEN.value
              ? 'Stream AAPL quotes and alert on 1% move'
              : isHK.value
                ? '訂閱 AAPL 行情，波動超 1% 時發出警報'
                : '订阅 AAPL 行情，波动超 1% 时发出警报',
          },
          { role: 'tool', command: 'longbridge subscribe AAPL.US quote', content: '' },
          {
            role: 'assistant',
            rich: true,
            content: codeHTML(
              'from longbridge.openapi import QuoteContext, SubType, PushQuote\n\nctx = QuoteContext.from_env()\nctx.subscribe(["AAPL.US"], [SubType.Quote], is_first_push=True)\n\nBASE = 247.99  # current price\n\ndef on_quote(symbol: str, event: PushQuote):\n    chg = (event.last_done - BASE) / BASE * 100\n    if abs(chg) >= 1.0:\n        print(f"[Alert] {symbol} {event.last_done:.2f} ({chg:+.2f}%)")\n\nctx.set_on_quote(on_quote)\nctx.run()'
            ),
          },
        ],
        // Codex: QQQ streaming subscription
        codex: [
          {
            role: 'user',
            content: isEN.value
              ? 'Stream QQQ live data and watch for breakouts'
              : isHK.value
                ? '監控 QQQ 實時行情，留意突破信號'
                : '监控 QQQ 实时行情，留意突破信号',
          },
          { role: 'tool', command: 'longbridge subscribe QQQ.US quote', content: '' },
          {
            role: 'assistant',
            rich: true,
            content: codeHTML(
              '# Stream QQQ real-time\nclient.subscribe(["QQQ.US"], sub_types=[SubType.Quote])\n\n# Live feed:\n# [09:31:02] QQQ.US  478.95  +0.82%  vol=12.4M\n# [09:31:15] QQQ.US  479.20  +0.87%  vol=13.1M\n# [09:31:48] QQQ.US  479.85  +1.01%  vol=14.8M\n# [Breakout ↑] QQQ crossed $479.50 (intraday pivot)'
            ),
          },
        ],
      },
    },

    // ── Scenario 4: 财报分析 ── real Q4 data (TSLA Q4'25, NVDA Q4 FY26)
    {
      id: 'research',
      label: isEN.value ? 'Earnings' : isHK.value ? '財報分析' : '财报分析',
      messages: [
        {
          role: 'user',
          content: isEN.value
            ? "Compare TSLA and NVDA's latest quarterly results"
            : isHK.value
              ? '對比 TSLA 和 NVDA 最新季報的核心財務數據'
              : '对比 TSLA 和 NVDA 最新季报的核心财务数据',
        },
        { role: 'tool', command: 'longbridge filings TSLA.US NVDA.US', content: '' },
        {
          role: 'assistant',
          rich: true,
          content: earningsTableHTML(
            cn
              ? 'NVDA 毛利率是 TSLA 的 4.5 倍，数据中心单项（$35.6B）已超过 TSLA 全季营收'
              : "NVDA's data center alone ($35.6B) exceeded TSLA's entire quarterly revenue."
          ),
        },
      ],
      clientMessages: {
        // ChatGPT: AAPL vs MSFT comparison
        chatgpt: [
          {
            role: 'user',
            content: isEN.value
              ? "Compare AAPL and MSFT's latest quarterly earnings"
              : isHK.value
                ? '對比 AAPL 和 MSFT 最新季報'
                : '对比 AAPL 和 MSFT 最新季报',
          },
          { role: 'tool', command: 'longbridge filings AAPL.US MSFT.US', content: '' },
          {
            role: 'assistant',
            rich: true,
            content: `
<div class="demo-table-wrap"><table class="demo-table">
  <thead><tr>
    <th></th>
    <th>AAPL Q1'26</th>
    <th>MSFT Q2'26</th>
  </tr></thead>
  <tbody>
    <tr><td>${cn ? '营收' : 'Revenue'}</td><td>$124.3B</td><td>$69.6B</td></tr>
    <tr class="demo-highlight"><td>${cn ? '同比' : 'YoY'}</td><td class="demo-pos">+4%</td><td class="demo-pos">+16%</td></tr>
    <tr><td>${cn ? '毛利率' : 'Gross Margin'}</td><td>46.5%</td><td class="demo-pos">69.8%</td></tr>
    <tr class="demo-highlight"><td>${cn ? '净利润' : 'Net Income'}</td><td class="demo-pos">$33.4B</td><td>$24.1B</td></tr>
  </tbody>
</table></div>
<p class="demo-note">${cn ? 'MSFT 增速领先（+16%），Azure 云业务 +31% 驱动；AAPL 总营收更高但增速放缓' : 'MSFT growing faster (+16%) driven by Azure +31%. AAPL larger but slower growth.'}</p>`,
          },
        ],
        // Claude: NVDA vs TSLA — profitability angle
        claude: [
          {
            role: 'user',
            content: isEN.value
              ? 'Which is more profitable — NVDA or TSLA?'
              : isHK.value
                ? 'NVDA 和 TSLA 哪個更賺錢？'
                : 'NVDA 和 TSLA 哪个更赚钱？',
          },
          { role: 'tool', command: 'longbridge filings NVDA.US TSLA.US', content: '' },
          {
            role: 'assistant',
            rich: true,
            content: earningsTableHTML(
              cn
                ? 'NVDA 以 1.5 倍营收创造了 TSLA 9.6 倍的净利润——差距源于商业模式，而非规模'
                : 'NVDA generates 9.6× more profit on 1.5× revenue. A structural gap, not scale.'
            ),
          },
        ],
        // Claude Code: TSLA vs NVDA with pandas
        'claude-code': [
          {
            role: 'user',
            content: isEN.value
              ? "Compare TSLA and NVDA's latest quarterly results"
              : isHK.value
                ? '對比 TSLA 和 NVDA 最新季報的核心財務數據'
                : '对比 TSLA 和 NVDA 最新季报的核心财务数据',
          },
          { role: 'tool', command: 'longbridge filings TSLA.US NVDA.US', content: '' },
          {
            role: 'assistant',
            rich: true,
            content: codeHTML(
              'import pandas as pd\n\ndata = {\n    "TSLA Q4\'25": {"rev": 25.7, "yoy": 2,  "gm": 16.3, "ni": 2.3},\n    "NVDA Q4\'26": {"rev": 39.3, "yoy": 78, "gm": 73.5, "ni": 22.1},\n}\n\ndf = pd.DataFrame(data).T\ndf.columns = ["Rev($B)", "YoY%", "GM%", "NI($B)"]\nprint(df.to_string())\n\n#              Rev($B)  YoY%   GM%  NI($B)\n# TSLA Q4\'25     25.7     2  16.3     2.3\n# NVDA Q4\'26     39.3    78  73.5    22.1'
            ),
          },
        ],
        // Codex: AAPL vs MSFT earnings comparison
        codex: [
          {
            role: 'user',
            content: isEN.value
              ? 'Pull AAPL and MSFT earnings data and compare'
              : isHK.value
                ? '獲取 AAPL 和 MSFT 最新季報並對比'
                : '获取 AAPL 和 MSFT 最新季报并对比',
          },
          { role: 'tool', command: 'longbridge filings AAPL.US MSFT.US', content: '' },
          {
            role: 'assistant',
            rich: true,
            content: codeHTML(
              'filings = client.get_filings(["AAPL.US", "MSFT.US"])\nmetrics = {s: extract_financials(f) for s, f in filings.items()}\n\n# Results:\n# AAPL: rev=124.3B  yoy=+4%   gm=46.5%  ni=33.4B\n# MSFT: rev=69.6B   yoy=+16%  gm=69.8%  ni=24.1B\n\ngm_gap = 69.8 - 46.5    # => 23.3pp MSFT margin lead\ngrowth_gap = 16 - 4     # => 12pp MSFT growth lead'
            ),
          },
        ],
      },
    },
  ]
})

interface Client {
  id: string
  label: string
  color: string
}

// SVG icons for each client (Simple Icons paths, viewBox="0 0 24 24")
const clientIcons: Record<string, string> = {
  openclaw: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="currentColor" width="15" height="15"><path d="M60 10 C30 10 15 35 15 55 C15 75 30 95 45 100 L45 110 L55 110 L55 100 C55 100 60 102 65 100 L65 110 L75 110 L75 100 C90 95 105 75 105 55 C105 35 90 10 60 10Z"/><path d="M20 45 C5 40 0 50 5 60 C10 70 20 65 25 55 C28 48 25 45 20 45Z"/><path d="M100 45 C115 40 120 50 115 60 C110 70 100 65 95 55 C92 48 95 45 100 45Z"/></svg>`,
  chatgpt: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.19 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.376-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>`,
  claude: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 248 248" fill="currentColor" width="15" height="15"><path d="M52.4285 162.873L98.7844 136.879L99.5485 134.602L98.7844 133.334H96.4921L88.7237 132.862L62.2346 132.153L39.3113 131.207L17.0249 130.026L11.4214 128.844L6.2 121.873L6.7094 118.447L11.4214 115.257L18.171 115.847L33.0711 116.911L55.485 118.447L71.6586 119.392L95.728 121.873H99.5485L100.058 120.337L98.7844 119.392L97.7656 118.447L74.5877 102.732L49.4995 86.1905L36.3823 76.62L29.3779 71.7757L25.8121 67.2858L24.2839 57.3608L30.6515 50.2716L39.3113 50.8623L41.4763 51.4531L50.2636 58.1879L68.9842 72.7209L93.4357 90.6804L97.0015 93.6343L98.4374 92.6652L98.6571 91.9801L97.0015 89.2625L83.757 65.2772L69.621 40.8192L63.2534 30.6579L61.5978 24.632C60.9565 22.1032 60.579 20.0111 60.579 17.4246L67.8381 7.49965L71.9133 6.19995L81.7193 7.49965L85.7946 11.0443L91.9074 24.9865L101.714 46.8451L116.996 76.62L121.453 85.4816L123.873 93.6343L124.764 96.1155H126.292V94.6976L127.566 77.9197L129.858 57.3608L132.15 30.8942L132.915 23.4505L136.608 14.4708L143.994 9.62643L149.725 12.344L154.437 19.0788L153.8 23.4505L150.998 41.6463L145.522 70.1215L141.957 89.2625H143.994L146.414 86.7813L156.093 74.0206L172.266 53.698L179.398 45.6635L187.803 36.802L193.152 32.5484H203.34L210.726 43.6549L207.415 55.1159L196.972 68.3492L188.312 79.5739L175.896 96.2095L168.191 109.585L168.882 110.689L170.738 110.53L198.755 104.504L213.91 101.787L231.994 98.7149L240.144 102.496L241.036 106.395L237.852 114.311L218.495 119.037L195.826 123.645L162.07 131.592L161.696 131.893L162.137 132.547L177.36 133.925L183.855 134.279H199.774L229.447 136.524L237.215 141.605L241.8 147.867L241.036 152.711L229.065 158.737L213.019 154.956L175.45 145.977L162.587 142.787H160.805V143.85L171.502 154.366L191.242 172.089L215.82 195.011L217.094 200.682L213.91 205.172L210.599 204.699L188.949 188.394L180.544 181.069L161.696 165.118H160.422V166.772L164.752 173.152L187.803 207.771L188.949 218.405L187.294 221.832L181.308 223.959L174.813 222.777L161.187 203.754L147.305 182.486L136.098 163.345L134.745 164.2L128.075 235.42L125.019 239.082L117.887 241.8L111.902 237.31L108.718 229.984L111.902 215.452L115.722 196.547L118.779 181.541L121.58 162.873L123.291 156.636L123.14 156.219L121.773 156.449L107.699 175.752L86.304 204.699L69.3663 222.777L65.291 224.431L58.2867 220.768L58.9235 214.27L62.8713 208.48L86.304 178.705L100.44 160.155L109.551 149.507L109.462 147.967L108.959 147.924L46.6977 188.512L35.6182 189.93L30.7788 185.44L31.4156 178.115L33.7079 175.752L52.4285 162.873Z"/></svg>`,
  'claude-code': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  codex: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
}

// All clients shown in hero chip row (popularity order)
const heroClients: Client[] = [
  { id: 'openclaw', label: 'OpenClaw', color: '#f59e0b' },
  { id: 'chatgpt', label: 'ChatGPT', color: '#10b981' },
  { id: 'claude', label: 'Claude', color: '#f97316' },
  { id: 'claude-code', label: 'Claude Code', color: '#818cf8' },
  { id: 'codex', label: 'Codex', color: '#94a3b8' },
]

// Clients available in demo tabs
const clients: Client[] = [
  { id: 'openclaw', label: 'OpenClaw', color: '#f59e0b' },
  { id: 'chatgpt', label: 'ChatGPT', color: '#10b981' },
  { id: 'claude', label: 'Claude', color: '#f97316' },
  { id: 'claude-code', label: 'Claude Code', color: '#818cf8' },
  { id: 'codex', label: 'Codex', color: '#94a3b8' },
]

// ─── Demo animation state ─────────────────────────────────────────────────────

const activeScenario = ref('quote')
const activeClient = ref('openclaw')

// Visible messages for the chat window (built up by animation)
const phase = ref<'idle' | 'user' | 'tool' | 'assistant'>('idle')
const isRichResponse = ref(false)
const visibleUserMsg = ref('')
const visibleToolCmd = ref('')
const visibleAssistantMsg = ref('')
const toolExpanded = ref(false)

let animTimer: ReturnType<typeof setTimeout> | null = null

function clearAnim() {
  if (animTimer) clearTimeout(animTimer)
  animTimer = null
  phase.value = 'idle'
  isRichResponse.value = false
  visibleUserMsg.value = ''
  visibleToolCmd.value = ''
  visibleAssistantMsg.value = ''
  toolExpanded.value = false
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    animTimer = setTimeout(resolve, ms)
  })
}

async function typewrite(target: { value: string }, text: string, speed = 5) {
  for (let i = 0; i < text.length; i++) {
    if (phase.value === 'idle') return // aborted
    target.value = text.slice(0, i + 1)
    await delay(speed)
  }
}

async function runAnimation() {
  clearAnim()
  const msgs = currentMessages.value
  if (!msgs.length) return

  const [userMsg, toolMsg, assistantMsg] = msgs

  await delay(400)
  if (phase.value === 'idle' && animTimer === null) {
    // aborted before we even started
  }

  // Phase 1: user message appears
  phase.value = 'user'
  await typewrite(visibleUserMsg, userMsg.content, 32)

  await delay(600)

  // Phase 2: tool call appears
  phase.value = 'tool'
  toolExpanded.value = true
  await typewrite(visibleToolCmd, toolMsg.command ?? '', 20)
  await delay(800)
  toolExpanded.value = false

  await delay(300)

  // Phase 3: assistant response
  isRichResponse.value = !!assistantMsg.rich
  phase.value = 'assistant'
  if (assistantMsg.rich) {
    // Rich HTML content: show at once (fade-in via CSS)
    visibleAssistantMsg.value = assistantMsg.content
  } else {
    await typewrite(visibleAssistantMsg, assistantMsg.content, 18)
  }
}

watch([activeScenario, activeClient], () => {
  clearAnim()
  phase.value = 'idle'
  runAnimation()
})

onMounted(() => {
  runAnimation()
})

onUnmounted(() => {
  clearAnim()
})

// ─── Copy button ──────────────────────────────────────────────────────────────

const npxCommand = 'npx skills add longbridge/developers'
const openclawCommand = '/skills add longbridge/developers'
const oneLinerCommand = computed(() =>
  isEN.value
    ? 'Install Longbridge Skill following the guide: \nhttps://open.longbridge.com/skill/install'
    : isHK.value
      ? '根據指引安裝 Longbridge SKILL：\nhttps://open.longbridge.com/skill/install'
      : '根据指引安装 Longbridge SKILL：\nhttps://open.longbridge.com/skill/install'
)

const copiedNpx = ref(false)
const copiedOpenclaw = ref(false)
const copiedOneLiner = ref(false)

async function copyText(text: string, indicator: { value: boolean }) {
  await navigator.clipboard.writeText(text)
  indicator.value = true
  setTimeout(() => (indicator.value = false), 1500)
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const currentClient = computed(() => clients.find((c) => c.id === activeClient.value) ?? clients[0])

const currentMessages = computed(() => {
  const scenario = demoScenarios.value.find((s) => s.id === activeScenario.value)
  if (!scenario) return []
  return scenario.clientMessages?.[activeClient.value] ?? scenario.messages
})
</script>

<template>
  <!-- ─── Hero ──────────────────────────────────────────────────────────────── -->
  <div class="skill-hero border-b border-[var(--vp-c-divider)]">
    <div class="max-w-3xl mx-auto px-6 py-16 text-center">
      <h1 class="skill-title">
        {{ t.heroTitle1.value }}
      </h1>
      <div class="skill-title1">{{ t.heroTitle2.value }}</div>

      <p class="skill-subtitle">{{ t.heroSubtitle.value }}</p>

      <!-- CTA block -->
      <div class="skill-cta">
        <p class="skill-cta-hint">{{ t.ctaHint.value }}</p>
        <!-- One-liner -->
        <div class="skill-cmd-block skill-cmd-block--prominent">
          <pre class="skill-cmd-text">{{ oneLinerCommand }}</pre>
          <div class="skill-copy-wrap">
            <button class="skill-copy-btn" @click="copyText(oneLinerCommand, copiedOneLiner)">
              <svg
                v-if="!copiedOneLiner"
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {{ copiedOneLiner ? t.copied.value : t.copy.value }}
            </button>
            <span class="skill-copy-tooltip" :class="{ 'skill-copy-tooltip--show': copiedOneLiner }">{{
              t.copied.value
            }}</span>
          </div>
        </div>

        <!-- Guide link -->
        <a :href="installGuideUrl" class="skill-guide-link">{{ t.installGuide.value }}</a>
      </div>

      <!-- Client labels -->
      <div class="skill-clients-label">{{ t.supportedBy.value }}</div>
      <div class="skill-clients-row">
        <span v-for="c in heroClients" :key="c.id" class="skill-client-chip">
          <span v-if="clientIcons[c.id]" class="skill-client-icon" v-html="clientIcons[c.id]" />
          {{ c.label }}
        </span>
        <span class="skill-client-more">
          {{ isEN.value ? 'Cursor, Zed, and more...' : 'Cursor, Zed, 更多...' }}
        </span>
      </div>
    </div>
  </div>

  <!-- ─── Demo ──────────────────────────────────────────────────────────────── -->
  <div class="skill-section skill-section-dark">
    <div class="skill-section-inner">
      <div class="skill-section-header">
        <h2 class="skill-section-title">{{ t.demoTitle.value }}</h2>
        <div class="skill-section-sub">{{ t.demoSubtitle.value }}</div>
      </div>

      <ClientOnly>
        <div class="skill-demo">
          <!-- Left: scenario list -->
          <div class="skill-demo-scenarios">
            <button
              v-for="s in demoScenarios"
              :key="s.id"
              class="skill-demo-scenario-btn"
              :class="{ 'skill-demo-scenario-active': activeScenario === s.id }"
              @click="activeScenario = s.id">
              {{ s.label }}
            </button>
          </div>

          <!-- Right: client tabs + chat window -->
          <div class="skill-demo-panel">
            <!-- Client tabs -->
            <div class="skill-demo-clients">
              <button
                v-for="c in clients"
                :key="c.id"
                class="skill-demo-client-tab"
                :class="{ 'skill-demo-client-active': activeClient === c.id }"
                @click="activeClient = c.id">
                {{ c.label }}
              </button>
            </div>

            <!-- Chat window -->
            <div class="skill-chat-window">
              <!-- Chrome bar -->
              <div class="skill-chat-chrome">
                <div class="skill-chat-traffic">
                  <span class="skill-chat-tl tl-r" />
                  <span class="skill-chat-tl tl-y" />
                  <span class="skill-chat-tl tl-g" />
                </div>
                <span class="skill-chat-chrome-title">{{ currentClient.label }}</span>
              </div>

              <!-- Messages -->
              <div class="skill-chat-body">
                <!-- User message -->
                <div v-if="phase !== 'idle'" class="skill-chat-user">
                  <div class="skill-chat-bubble skill-chat-bubble-user">
                    {{ visibleUserMsg }}
                  </div>
                </div>

                <!-- Tool call -->
                <div v-if="phase === 'tool' || phase === 'assistant'" class="skill-chat-tool">
                  <div class="skill-chat-tool-bar" :class="{ expanded: toolExpanded }">
                    <code>{{ visibleToolCmd }}</code>
                  </div>
                </div>

                <!-- Assistant response -->
                <div v-if="phase === 'assistant'" class="skill-chat-assistant">
                  <div class="skill-chat-bubble skill-chat-bubble-assistant">
                    <!-- Rich HTML (chat clients) -->
                    <div v-if="isRichResponse" class="skill-chat-rich" v-html="visibleAssistantMsg" />
                    <!-- Plain text / code (code clients) -->
                    <pre
                      v-else
                      class="skill-chat-pre">{{ visibleAssistantMsg }}<span v-if="visibleAssistantMsg.length < (currentMessages[2]?.content.length ?? 0)" class="skill-cursor" /></pre>
                  </div>
                </div>

                <!-- Idle state -->
                <div v-if="phase === 'idle'" class="skill-chat-idle">
                  <span class="skill-thinking-dot" /><span class="skill-thinking-dot" /><span
                    class="skill-thinking-dot" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
    </div>
  </div>

  <!-- ─── Scenario Cards ────────────────────────────────────────────────────── -->
  <div class="skill-section">
    <div class="skill-section-inner">
      <div class="skill-section-header">
        <h2 class="skill-section-title">{{ t.scenariosTitle.value }}</h2>
        <p class="skill-section-sub">{{ t.scenariosSubtitle.value }}</p>
      </div>

      <div class="skill-cards-grid">
        <div v-for="card in scenarioCards" :key="card.id" class="skill-card">
          <span class="skill-card-label" :style="{ color: card.color }">{{ card.label }}</span>
          <h3 class="skill-card-title">{{ card.title }}</h3>
          <div class="skill-card-desc">{{ card.desc }}</div>
          <div class="skill-card-example">
            <span class="skill-card-example-text">{{ card.example }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ─── Install ───────────────────────────────────────────────────────────── -->
  <div id="install" class="skill-section">
    <div class="skill-section-inner">
      <div class="skill-section-header">
        <h2 class="skill-section-title">{{ t.installTitle.value }}</h2>
        <p class="skill-section-sub">{{ t.installSubtitle.value }}</p>
      </div>

      <!-- One-liner install (top, full width) -->
      <div class="skill-one-liner">
        <div class="skill-one-liner-header">
          <span class="skill-one-liner-label">{{ t.oneLinerLabel.value }}</span>
          <span class="skill-one-liner-hint">{{ t.oneLinerHint.value }}</span>
        </div>
        <div class="skill-cmd-block skill-cmd-block--prominent">
          <pre class="skill-cmd-text">{{ oneLinerCommand }}</pre>
          <div class="skill-copy-wrap">
            <button class="skill-copy-btn" @click="copyText(oneLinerCommand, copiedOneLiner)">
              <svg
                v-if="!copiedOneLiner"
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {{ copiedOneLiner ? t.copied.value : t.copy.value }}
            </button>
            <span class="skill-copy-tooltip" :class="{ 'skill-copy-tooltip--show': copiedOneLiner }">{{
              t.copied.value
            }}</span>
          </div>
        </div>
      </div>

      <!-- Manual install (left-right split) -->
      <div class="skill-install-split">
        <!-- Left: ZIP download -->
        <div class="skill-install-panel">
          <div class="skill-install-panel-header">
            <span class="skill-install-panel-label">{{ t.downloadZip.value }}</span>
            <span class="skill-tag">{{ t.recommended.value }}</span>
          </div>
          <p class="skill-install-panel-hint">{{ t.manualInstallHint.value }}</p>
          <a href="/skill/longbridge.zip" download class="skill-btn-primary">
            {{ t.downloadZip.value }}
          </a>
          <a :href="installGuideUrl" class="skill-guide-link" style="margin-top: auto">{{ t.installGuide.value }}</a>
        </div>

        <!-- Right: CLI -->
        <div class="skill-install-panel">
          <div class="skill-install-panel-header">
            <span class="skill-install-panel-label">{{ t.orCli.value }}</span>
          </div>
          <p class="skill-install-panel-hint">{{ t.cliInstallHint.value }}</p>
          <div class="skill-cmd-block">
            <code class="skill-cmd-text">{{ npxCommand }}</code>
            <div class="skill-copy-wrap">
              <button class="skill-copy-btn" @click="copyText(npxCommand, copiedNpx)">
                <svg
                  v-if="!copiedNpx"
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {{ copiedNpx ? t.copied.value : t.copy.value }}
              </button>
              <span class="skill-copy-tooltip" :class="{ 'skill-copy-tooltip--show': copiedNpx }">{{
                t.copied.value
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ─── Layout ─────────────────────────────────────────────────────────────── */
.skill-hero {
  background: var(--vp-c-bg);
}
.skill-section {
  padding: 64px 0;
}
.skill-section-dark {
  background: var(--vp-c-bg-soft);
}
.skill-section-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.skill-section-header {
  text-align: center;
  margin-bottom: 40px;
}
.skill-section-dark .skill-section-header {
  margin-bottom: 24px;
}
.skill-section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
  border: none;
  padding: 0;
}
.skill-section-sub {
  font-size: 0.9375rem;
  color: var(--vp-c-text-2);
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */
.skill-badge {
  display: inline-block;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 20px;
  padding: 3px 14px;
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
  letter-spacing: 0.04em;
  margin-bottom: 20px;
}
.skill-title {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
  border: none;
  padding: 0;
  letter-spacing: -0.02em;
}
.skill-title1 {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--vp-c-brand-1);
  margin-bottom: 24px;
  border: none;
  padding: 0;
}
@media (max-width: 768px) {
  .skill-title {
    font-size: 1.875rem;
  }
}
.skill-gradient {
  color: var(--vp-c-brand-1);
}
.skill-subtitle {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 36px;
}

/* ─── CTA block ──────────────────────────────────────────────────────────── */
.skill-cta {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 480px;
  margin: 0 auto 36px;
}
.skill-btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--vp-c-brand-1);
  color: var(--vp-button-brand-text) !important;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none !important;
  cursor: pointer;
  transition: opacity 0.15s;
}
.skill-btn-primary:hover {
  opacity: 0.9;
}
.dark .skill-btn-primary {
  background: var(--brand-60);
}
.skill-tag {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 0.6875rem;
  font-weight: 400;
}
.skill-divider {
  display: flex;
  align-items: center;
  gap: 10px;
}
.skill-divider-line {
  flex: 1;
  height: 1px;
  background: var(--vp-c-divider);
}
.skill-divider-text {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}
.skill-cmd-block {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 11px 14px;
}
.skill-cmd-text {
  flex: 1;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
  white-space: pre-wrap;
  word-break: break-all;
  text-align: left;
  margin: 0;
  background: none;
  border: none;
  padding: 0;
}
.skill-copy-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 4px 10px;
  font-size: 0.6875rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.skill-copy-btn:hover {
  color: var(--vp-c-text-1);
}
.skill-copy-wrap {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
}
.skill-copy-tooltip {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
  font-size: 0.6875rem;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 100;
  opacity: 0;
  transition:
    opacity 0.15s,
    transform 0.15s;
}
.skill-copy-tooltip--show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
.skill-copy-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: var(--vp-c-text-1);
}
.skill-cta-hint {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin: 0 0 4px;
}
.skill-guide-link {
  font-size: 0.8125rem;
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

/* ─── Client chips ───────────────────────────────────────────────────────── */
.skill-clients-label {
  font-size: 0.6875rem;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 10px;
}
.skill-clients-row {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}
.skill-client-chip {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 5px 14px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.skill-client-icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  opacity: 0.8;
}
.skill-client-more {
  color: var(--vp-c-text-3);
  font-size: 0.8125rem;
  font-weight: 400;
  align-self: center;
}

/* ─── Scenario cards ─────────────────────────────────────────────────────── */
.skill-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
@media (max-width: 768px) {
  .skill-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .skill-cards-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
.skill-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.skill-card-label {
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.skill-card-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.35;
  border: none;
  padding: 0;
  margin: 0;
}
.skill-card-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  flex: 1;
}
.skill-card-example {
  margin: 4px -20px -20px;
  padding: 10px 20px;
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  border-radius: 0 0 8px 8px;
}
.skill-card-example-text {
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
  line-height: 1.2;
}

/* ─── Demo layout ────────────────────────────────────────────────────────── */
.skill-demo {
  display: flex;
  gap: 16px;
  min-height: 420px;
}
.skill-demo-scenarios {
  margin-top: 50px;
  width: 160px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
@media (max-width: 768px) {
  .skill-demo {
    flex-direction: column;
  }
  .skill-demo-scenarios {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
.skill-demo-scenario-btn {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
}
.skill-demo-scenario-btn:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-brand-1);
}
.skill-demo-scenario-active {
  background: var(--vp-c-brand-1) !important;
  border-color: var(--vp-c-brand-1) !important;
  color: var(--vp-button-brand-text) !important;
}
.dark .skill-demo-scenario-active {
  background: var(--brand-60) !important;
  border-color: var(--brand-60) !important;
}

/* ─── Demo panel ─────────────────────────────────────────────────────────── */
.skill-demo-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}
.skill-demo-clients {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--vp-c-divider);
  flex-wrap: wrap;
}
.skill-demo-client-tab {
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  padding: 6px 14px;
  font-size: 0.8125rem;
  font-weight: 400;
  color: var(--vp-c-text-3);
  cursor: pointer;
  transition: color 0.15s;
}
.skill-demo-client-tab:hover {
  color: var(--vp-c-text-1);
}
.skill-demo-client-active {
  color: var(--vp-c-text-1) !important;
  font-weight: 600;
  border-bottom-color: var(--vp-c-brand-1) !important;
}
.dark .skill-demo-client-active {
  border-bottom-color: var(--brand-60) !important;
}

/* ─── Chat window ────────────────────────────────────────────────────────── */
.skill-chat-window {
  flex: 1;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 340px;
}
.skill-chat-chrome {
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 9px 14px;
  display: flex;
  align-items: center;
}
.skill-chat-traffic {
  display: flex;
  gap: 5px;
  align-items: center;
}
.skill-chat-tl {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  flex-shrink: 0;
}
.tl-r {
  background: #ff5f57;
}
.tl-y {
  background: #febc2e;
}
.tl-g {
  background: #28c840;
}
.skill-chat-chrome-title {
  flex: 1;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-left: 8px;
}
.skill-chat-body {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
}
.skill-chat-user {
  display: flex;
  justify-content: flex-end;
}
.skill-chat-bubble {
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 0.875rem;
  max-width: 72%;
  line-height: 1.5;
}
.skill-chat-bubble-user {
  background: var(--vp-c-brand-1);
  color: var(--vp-button-brand-text);
  border-radius: 12px 12px 2px 12px;
}
.dark .skill-chat-bubble-user {
  background: var(--brand-60);
}

.skill-chat-tool {
  display: flex;
  gap: 8px;
}
.skill-chat-tool-bar {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
  transition:
    max-height 0.3s ease,
    opacity 0.3s;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  padding: 0 12px;
}
.skill-chat-tool-bar.expanded {
  max-height: 60px;
  opacity: 1;
  padding: 8px 12px;
}
.skill-chat-assistant {
}
.skill-chat-bubble-assistant {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-radius: 2px 12px 12px 12px;
  max-width: 92%;
}

/* ── Rich content (v-html) ── */
.skill-chat-rich {
  animation: demo-fadein 0.25s ease;
}
@keyframes demo-fadein {
  from {
    opacity: 0;
    transform: translateY(3px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* Shadcn-style table: wrapper div holds outer border+radius, tr provides row dividers */
.skill-chat-bubble-assistant :deep(.demo-table-wrap) {
  overflow: hidden;
  margin-bottom: 4px;
}
.skill-chat-bubble-assistant :deep(.demo-table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;
}
.skill-chat-bubble-assistant :deep(.demo-table thead tr) {
  border-bottom: 1px solid var(--vp-c-divider);
}
.skill-chat-bubble-assistant :deep(.demo-table tbody tr) {
  border-bottom: 1px solid var(--vp-c-divider);
}
.skill-chat-bubble-assistant :deep(.demo-table tbody tr:last-child) {
  border-bottom: none;
}
.skill-chat-bubble-assistant :deep(.demo-table th) {
  text-align: left;
  color: var(--vp-c-text-3);
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 7px 14px;
}
.skill-chat-bubble-assistant :deep(.demo-table td) {
  padding: 8px 14px;
}
.skill-chat-bubble-assistant :deep(.demo-table th:not(:first-child)),
.skill-chat-bubble-assistant :deep(.demo-table td:not(:first-child)) {
  text-align: right;
}
.skill-chat-bubble-assistant :deep(.demo-pos) {
  color: #16a34a;
  font-weight: 600;
}
.skill-chat-bubble-assistant :deep(.demo-neg) {
  color: #dc2626;
  font-weight: 600;
}
.skill-chat-bubble-assistant :deep(.demo-muted) {
  color: var(--vp-c-text-3);
}
.skill-chat-bubble-assistant :deep(.demo-highlight td) {
  background: var(--brand-5);
}
.skill-chat-bubble-assistant :deep(.demo-note) {
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 8px 0 0;
}
.skill-chat-bubble-assistant :deep(.demo-summary) {
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
  padding-top: 8px;
  border-top: 1px solid var(--vp-c-divider);
  margin-top: 4px;
}
.skill-chat-bubble-assistant :deep(.demo-chart-row) {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 0 4px;
}
.skill-chat-bubble-assistant :deep(.demo-legend) {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.skill-chat-bubble-assistant :deep(.demo-legend-item) {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}
.skill-chat-bubble-assistant :deep(.demo-dot) {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.skill-chat-bubble-assistant :deep(.demo-price-row) {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 6px 0;
}
.skill-chat-bubble-assistant :deep(.demo-price-big) {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.skill-chat-bubble-assistant :deep(.demo-alerts) {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
}
.skill-chat-bubble-assistant :deep(.demo-alert-item) {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 4px 10px;
}
.skill-chat-pre {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
}

/* ── Sparkline chart (quote scenario) ── */
.skill-chat-bubble-assistant :deep(.demo-sparkline-row) {
  display: flex;
  gap: 12px;
  padding: 8px 0 4px;
}
.skill-chat-bubble-assistant :deep(.demo-sparkline-item) {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.skill-chat-bubble-assistant :deep(.demo-sparkline-label) {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}
.skill-chat-bubble-assistant :deep(.demo-sparkline-chart) {
  width: 100%;
  height: 64px;
}
.skill-chat-bubble-assistant :deep(.demo-sparkline-svg) {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}
.skill-chat-bubble-assistant :deep(.demo-sparkline-price) {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

/* ── Code blocks with syntax highlighting ── */
.skill-chat-bubble-assistant :deep(.demo-code-block) {
  background: #1a1a2e;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 12px 14px;
  margin: 4px 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.78125rem;
  line-height: 1.65;
  overflow-x: auto;
  color: #e2e8f0;
}
.skill-chat-bubble-assistant :deep(.demo-code-block code) {
  background: none;
  padding: 0;
  font-size: inherit;
  color: inherit;
  white-space: pre;
}
.skill-chat-bubble-assistant :deep(.hl-k) {
  color: #f472b6;
}
.skill-chat-bubble-assistant :deep(.hl-s) {
  color: #86efac;
}
.skill-chat-bubble-assistant :deep(.hl-c) {
  color: #64748b;
  font-style: italic;
}
.skill-chat-bubble-assistant :deep(.hl-n) {
  color: #fb923c;
}
.skill-chat-bubble-assistant :deep(.hl-b) {
  color: #7dd3fc;
}
.skill-chat-bubble-assistant :deep(.hl-prompt) {
  color: #00b8b8;
  user-select: none;
}

.skill-chat-idle {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  flex: 1;
}

/* Thinking dots */
.skill-thinking-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
  animation: skill-dot-pulse 1.2s ease-in-out infinite;
}
.skill-thinking-dot:nth-child(2) {
  animation-delay: 0.2s;
}
.skill-thinking-dot:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes skill-dot-pulse {
  0%,
  60%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  30% {
    opacity: 1;
    transform: scale(1.25);
  }
}

/* ─── Install section ────────────────────────────────────────────────────── */
.skill-one-liner {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.skill-one-liner-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.skill-one-liner-label {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}
.skill-one-liner-hint {
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.skill-install-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
}
@media (max-width: 640px) {
  .skill-install-split {
    grid-template-columns: 1fr;
  }
}
.skill-install-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.skill-install-panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
}
.skill-install-panel-label {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.skill-install-panel-hint {
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0;
}
</style>
