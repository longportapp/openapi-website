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

// Terminal block: raw HTML with t-* span classes pre-applied
function termHTML(raw: string): string {
  return `<div class="demo-term">${raw}</div>`
}

function klineSvg(): string {
  const prices = [
    190.04, 188.54, 190.05, 186.94, 182.81, 184.97, 187.98, 187.9, 189.82, 191.55, 192.85, 195.56, 184.89, 177.19,
    182.48, 180.05, 183.04, 183.34, 177.82, 182.65, 184.77, 186.03, 183.14, 180.25, 183.22, 181.93, 180.4, 178.56,
    172.7, 175.64,
  ]
  const dates = [
    '2/9',
    '2/10',
    '2/11',
    '2/12',
    '2/13',
    '2/17',
    '2/18',
    '2/19',
    '2/20',
    '2/23',
    '2/24',
    '2/25',
    '2/26',
    '2/27',
    '3/2',
    '3/3',
    '3/4',
    '3/5',
    '3/6',
    '3/9',
    '3/10',
    '3/11',
    '3/12',
    '3/13',
    '3/16',
    '3/17',
    '3/18',
    '3/19',
    '3/20',
    '3/23',
  ]
  const w = 540,
    h = 110,
    pad = { t: 10, b: 22, l: 8, r: 8 }
  const iw = w - pad.l - pad.r,
    ih = h - pad.t - pad.b
  const min = Math.min(...prices) - 2,
    max = Math.max(...prices) + 2
  const px = (i: number) => pad.l + (i / (prices.length - 1)) * iw
  const py = (v: number) => pad.t + (1 - (v - min) / (max - min)) * ih
  const pts = prices.map((p, i) => `${px(i).toFixed(1)},${py(p).toFixed(1)}`).join(' ')
  const fp =
    `M${px(0)},${py(prices[0])} ` +
    prices
      .slice(1)
      .map((p, i) => `L${px(i + 1).toFixed(1)},${py(p).toFixed(1)}`)
      .join(' ') +
    ` L${px(prices.length - 1)},${pad.t + ih} L${px(0)},${pad.t + ih} Z`
  const peakI = prices.indexOf(Math.max(...prices))
  const troughI = prices.indexOf(Math.min(...prices))
  const xLbls = dates
    .map((d, i) =>
      i % 7 === 0
        ? `<text x="${px(i).toFixed(1)}" y="${h - 4}" text-anchor="middle" font-size="9" fill="currentColor" opacity="0.4">${d}</text>`
        : ''
    )
    .join('')
  const curY = py(prices[prices.length - 1])
  return `<svg viewBox="0 0 ${w} ${h}" style="width:100%;height:auto" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="kg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--vp-c-brand-1)" stop-opacity="0.2"/><stop offset="100%" stop-color="var(--vp-c-brand-1)" stop-opacity="0"/></linearGradient></defs><path d="${fp}" fill="url(#kg)"/><polyline points="${pts}" fill="none" stroke="var(--vp-c-brand-1)" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/><line x1="${pad.l}" y1="${curY.toFixed(1)}" x2="${w - pad.r}" y2="${curY.toFixed(1)}" stroke="var(--vp-c-brand-1)" stroke-width="1" stroke-dasharray="3,3" opacity="0.35"/><circle cx="${px(peakI).toFixed(1)}" cy="${py(prices[peakI]).toFixed(1)}" r="3.5" fill="var(--vp-c-yellow-1)"/><text x="${(px(peakI) + 5).toFixed(1)}" y="${(py(prices[peakI]) - 3).toFixed(1)}" font-size="9" fill="var(--vp-c-yellow-1)" font-weight="700">峰 $195.56</text><circle cx="${px(troughI).toFixed(1)}" cy="${py(prices[troughI]).toFixed(1)}" r="3.5" fill="#ff4d4f"/><text x="${(px(troughI) + 5).toFixed(1)}" y="${(py(prices[troughI]) + 13).toFixed(1)}" font-size="9" fill="#ff4d4f" font-weight="700">低 $172.70</text><rect x="${pad.l}" y="${py(174.5).toFixed(1)}" width="${iw}" height="${(py(171.5) - py(174.5)).toFixed(1)}" fill="#ff4d4f" opacity="0.05"/>${xLbls}</svg>`
}

function portfolioPieSvg(cn: boolean): string {
  // Colors already used throughout this component
  const data = [
    { sym: 'AAPL.US', val: 32585, color: '#4781ff' },
    { sym: 'NVDA.US', val: 17740, color: '#00c88c' },
    { sym: 'MSFT.US', val: 5670, color: '#a78bfa' },
    { sym: '9988.HK', val: 855, color: '#f59e0b' },
  ]
  const total = data.reduce((a, b) => a + b.val, 0)
  const cx = 76,
    cy = 76,
    r = 64,
    ri = 40
  let ang = -Math.PI / 2,
    paths = ''
  for (const d of data) {
    const slice = (d.val / total) * 2 * Math.PI
    const end = ang + slice
    const la = slice > Math.PI ? 1 : 0
    const [x1, y1] = [cx + r * Math.cos(ang), cy + r * Math.sin(ang)]
    const [x2, y2] = [cx + r * Math.cos(end), cy + r * Math.sin(end)]
    const [x3, y3] = [cx + ri * Math.cos(end), cy + ri * Math.sin(end)]
    const [x4, y4] = [cx + ri * Math.cos(ang), cy + ri * Math.sin(ang)]
    paths += `<path d="M${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${la},1 ${x2.toFixed(1)},${y2.toFixed(1)} L${x3.toFixed(1)},${y3.toFixed(1)} A${ri},${ri} 0 ${la},0 ${x4.toFixed(1)},${y4.toFixed(1)} Z" fill="${d.color}" opacity=".9" stroke="var(--vp-c-bg)" stroke-width="2"/>`
    ang = end
  }
  const legendRows = data
    .map((ld, li) => {
      const pct = ((ld.val / total) * 100).toFixed(1)
      const sep = li > 0 ? 'border-top:1px solid var(--vp-c-divider);' : ''
      return `<div style="${sep}display:flex;align-items:center;gap:8px;padding:6px 0"><span style="width:10px;height:10px;border-radius:3px;background:${ld.color};flex-shrink:0;display:inline-block"></span><span style="font-size:12px;font-weight:600;color:var(--vp-c-text-1);flex:1">${ld.sym}</span><span style="font-size:13px;font-weight:700;color:${ld.color}">${pct}%</span><span style="font-size:11px;color:var(--vp-c-text-3);width:44px;text-align:right">$${(ld.val / 1000).toFixed(1)}k</span></div>`
    })
    .join('')
  return `<div style="display:flex;align-items:center;gap:14px;margin:10px 0 12px"><svg width="152" height="152" viewBox="0 0 152 152" style="flex-shrink:0">${paths}<text x="${cx}" y="${cy - 5}" text-anchor="middle" font-size="9" fill="currentColor" opacity="0.4" letter-spacing=".05em">${cn ? '市值占比' : 'ALLOCATION'}</text><text x="${cx}" y="${cy + 12}" text-anchor="middle" font-size="15" font-weight="800" fill="currentColor">$56.8k</text></svg><div style="flex:1;border:1px solid var(--vp-c-divider);border-radius:9px;padding:4px 12px;background:var(--vp-c-bg)">${legendRows}</div></div>`
}

const demoScenarios = computed<DemoScenario[]>(() => {
  const cn = !isEN.value

  return [
    // ── 1. 持仓盈亏
    {
      id: 'portfolio',
      label: isEN.value ? 'Portfolio P&L' : isHK.value ? '持倉盈虧' : '持仓盈亏',
      messages: [
        {
          role: 'user',
          content: isEN.value
            ? "How's my account today? Show each position's P&L."
            : isHK.value
              ? '今天我的帳戶表現如何？幫我看下各個持倉'
              : '今天我的账户表现如何？帮我看下各个持仓',
        },
        {
          role: 'tool',
          command: 'longbridge positions && longbridge quote NVDA.US AAPL.US MSFT.US 9988.HK',
          content: '',
        },
        {
          role: 'assistant',
          rich: true,
          content: `
<div class="demo-scards">
  <div class="demo-scard"><div class="demo-sl">${isEN.value ? 'Total Value (est.)' : '总市值（估）'}</div><div class="demo-sv">$56,850</div><div class="demo-ss demo-muted">${cn ? '含 HKD 账户' : 'incl. HKD acct'}</div></div>
  <div class="demo-scard"><div class="demo-sl">${cn ? '今日盈亏' : "Today's P&L"}</div><div class="demo-sv demo-neg">-$135</div><div class="demo-ss demo-neg">${cn ? '2 涨 2 跌 · -0.24%' : '2↑ 2↓ · -0.24%'}</div></div>
  <div class="demo-scard"><div class="demo-sl">${cn ? '总浮动盈亏' : 'Total Float P&L'}</div><div class="demo-sv demo-pos">+$5,932</div><div class="demo-ss demo-muted">${cn ? '含 HKD 折算' : 'incl. HKD conv.'}</div></div></div>
<div class="demo-table-wrap"><table class="demo-table">
  <thead><tr>
    <th>${cn ? '代码' : 'Symbol'}</th>
    <th style="text-align:left">${cn ? '名称' : 'Name'}</th>
    <th>${cn ? '数量' : 'Qty'}</th>
    <th>${cn ? '成本' : 'Cost'}</th>
    <th>${cn ? '现价' : 'Price'}</th>
    <th>${cn ? '浮盈%' : 'Float%'}</th>
    <th>${cn ? '今日' : 'Today'}</th>
  </tr></thead>
  <tbody>
    <tr><td style="font-weight:700">9988.HK</td><td style="text-align:left;color:var(--vp-c-text-3);font-size:11px">${cn ? '阿里巴巴' : 'Alibaba'}</td><td>54</td><td class="demo-muted">HK$95.64</td><td>HK$123.20</td><td class="demo-pos">+28.8%</td><td class="demo-pos">▲ HK$189</td></tr>
    <tr><td style="font-weight:700">AAPL.US</td><td style="text-align:left;color:var(--vp-c-text-3);font-size:11px">Apple</td><td>133</td><td class="demo-muted">$211.59</td><td>$245.00</td><td class="demo-pos">+15.8%</td><td class="demo-neg">▼ $398</td></tr>
    <tr><td style="font-weight:700">NVDA.US</td><td style="text-align:left;color:var(--vp-c-text-3);font-size:11px">NVIDIA</td><td>101</td><td class="demo-muted">$163.50</td><td>$175.64</td><td class="demo-pos">+7.4%</td><td class="demo-pos">▲ $297</td></tr>
    <tr><td style="font-weight:700">MSFT.US</td><td style="text-align:left;color:var(--vp-c-text-3);font-size:11px">Microsoft</td><td>15</td><td class="demo-muted">$373.31</td><td>$378.00</td><td class="demo-pos">+1.3%</td><td class="demo-neg">▼$58</td></tr>
  </tbody>
</table></div>
${portfolioPieSvg(cn)}
<div class="demo-hi-box"><strong>${cn ? '今日小结' : "Today's Summary"}</strong>：${cn ? 'NVDA +1.70%（+$297）领涨，港股阿里 +2.92%（+HK$189）；AAPL -1.21%（-$398）和 MSFT -1.01%（-$58）回调。账户今日小幅收跌 -$135，整体浮盈 +$5,932。' : 'NVDA led gains +1.70% (+$297), HK Alibaba +2.92% (+HK$189). AAPL -1.21% (-$398) and MSFT -1.01% (-$58) dragged. Net today: -$135, overall float +$5,932.'}</div>`,
        },
      ],
      clientMessages: {
        claude: [
          {
            role: 'user',
            content: isEN.value
              ? "How's my account today? Show each position's P&L."
              : isHK.value
                ? '今天我的帳戶表現如何？幫我看下各個持倉'
                : '今天我的账户表现如何？帮我看下各个持仓',
          },
          {
            role: 'tool',
            command: 'longbridge positions && longbridge quote NVDA.US AAPL.US MSFT.US 9988.HK',
            content: '',
          },
          {
            role: 'assistant',
            rich: true,
            content: `<div style="font-size:13.5px;line-height:1.8;margin-bottom:12px">${cn ? '今天账户 2 涨 2 跌，小幅收跌 -$135。以下是完整盈亏状况：' : 'Today: 2 up, 2 down. Account slightly lower at -$135. Full P&L breakdown:'}</div>
<div class="demo-table-wrap"><table class="demo-table">
  <thead><tr>
    <th>${cn ? '代码' : 'Symbol'}</th>
    <th style="text-align:left">${cn ? '公司' : 'Company'}</th>
    <th>${cn ? '数量' : 'Qty'}</th>
    <th>${cn ? '成本' : 'Cost'}</th>
    <th>${cn ? '现价' : 'Price'}</th>
    <th>${cn ? '总浮盈' : 'Float P&L'}</th>
    <th>${cn ? '今日' : 'Today'}</th>
  </tr></thead>
  <tbody>
    <tr><td style="font-weight:700">9988.HK</td><td style="text-align:left;font-size:11px;color:var(--vp-c-text-3)">${cn ? '阿里巴巴集团' : 'Alibaba Group'}</td><td>54</td><td class="demo-muted">HK$95.64</td><td>HK$123.20</td><td class="demo-pos">+HK$1,488 (+28.8%)</td><td class="demo-pos">+HK$189</td></tr>
    <tr><td style="font-weight:700">NVDA.US</td><td style="text-align:left;font-size:11px;color:var(--vp-c-text-3)">NVIDIA Corp.</td><td>101</td><td class="demo-muted">$163.50</td><td>$175.64</td><td class="demo-pos">+$1,226 (+7.4%)</td><td class="demo-pos">+$297</td></tr>
    <tr><td style="font-weight:700">AAPL.US</td><td style="text-align:left;font-size:11px;color:var(--vp-c-text-3)">Apple Inc.</td><td>133</td><td class="demo-muted">$211.59</td><td>$245.00</td><td class="demo-pos">+$4,444 (+15.8%)</td><td class="demo-neg">-$398</td></tr>
    <tr><td style="font-weight:700">MSFT.US</td><td style="text-align:left;font-size:11px;color:var(--vp-c-text-3)">Microsoft Corp.</td><td>15</td><td class="demo-muted">$373.31</td><td>$378.00</td><td class="demo-pos">+$70 (+1.3%)</td><td class="demo-neg">-$58</td></tr>
  </tbody>
</table></div>
<div style="font-size:13px;line-height:1.85;color:var(--vp-c-text-2);margin:10px 0">
${cn ? '值得关注的几点：<br>• <strong style="color:var(--vp-c-text-1)">9988.HK（阿里）</strong> 持仓浮盈最高（+28.8%），今日随港股强势反弹 +HK$189<br>• <strong style="color:var(--vp-c-text-1)">NVDA</strong> 今日 +1.70%，GTC 催化剂持续发酵，持仓浮盈 +7.4%<br>• <strong style="color:var(--vp-c-text-1)">AAPL</strong> 今日回调 -1.21%（-$398），是账户最大拖累，但总持仓仍浮盈 +15.8%<br>• MSFT 小幅下跌 -1.01%（-$58），浮盈收窄至 +1.3%' : 'Key points:<br>• <strong style="color:var(--vp-c-text-1)">Alibaba (9988.HK)</strong> highest float gain (+28.8%), rebounded today +HK$189<br>• <strong style="color:var(--vp-c-text-1)">NVDA</strong> +1.70% today on GTC momentum, float +7.4%<br>• <strong style="color:var(--vp-c-text-1)">AAPL</strong> -1.21% today (-$398) biggest drag, but still +15.8% overall<br>• MSFT -1.01% (-$58), float narrowing to +1.3%'}</div>
<div class="demo-ai-sig">${cn ? '汇率估算 1 USD = 7.78 HKD；美股数据来自 2026-03-24 盘前' : 'Rate est. 1 USD = 7.78 HKD; US data from pre-market 2026-03-24'}</div>`,
          },
        ],
        'claude-code': [
          {
            role: 'user',
            content: isEN.value
              ? 'Print all my holdings with today and total P&L'
              : isHK.value
                ? '把我所有持倉的今日和總盈虧打印出來'
                : '把我所有持仓的今日和总盈亏打印出来',
          },
          { role: 'tool', command: 'longbridge positions --format json | python3 pnl.py', content: '' },
          {
            role: 'assistant',
            rich: true,
            content: termHTML(`<span class="t-p">$</span> longbridge positions

<span class="t-hd">账户持仓 · 2026-03-24 · 模拟账户</span>
<span class="t-dim">──────────────────────────────────────────────────────</span>
<span class="t-hd">Symbol     数量   成本价    现价     浮盈%    浮盈$     今日</span>
<span class="t-dim">──────────────────────────────────────────────────────</span>
9988.HK    54   HK95.64  HK123.20  <span class="t-pos">+28.8%</span>   <span class="t-pos">+HK1488</span>   <span class="t-pos">▲ HK189</span>
NVDA.US   101  $163.50   $175.64    <span class="t-pos">+7.4%</span>   <span class="t-pos">+$1,226</span>   <span class="t-pos">▲ $297</span>
AAPL.US   133  $211.59   $245.00   <span class="t-pos">+15.8%</span>   <span class="t-pos">+$4,444</span>   <span class="t-neg">▼ $398</span>
MSFT.US    15  $373.31   $378.00    <span class="t-pos">+1.3%</span>      <span class="t-pos">+$70</span>    <span class="t-neg">▼$58</span>
<span class="t-dim">──────────────────────────────────────────────────────</span>
今日盈亏 (USD est.): <span class="t-neg">-$135</span>   <span class="t-c"># NVDA/9988 涨，AAPL/MSFT 跌</span>
总浮盈   (USD est.): <span class="t-pos">+$5,932</span>  <span class="t-c"># HKD 按 7.78 折算</span>`),
          },
        ],
      },
    },

    // ── 2. 美股今日
    {
      id: 'usmarket',
      label: isEN.value ? 'US Market Today' : isHK.value ? '美股今日' : '美股今日',
      messages: [
        {
          role: 'user',
          content: isEN.value
            ? "What's happening in the US market today? Any major news driving the action?"
            : isHK.value
              ? '今天美股市場什麼情況？有什麼重要新聞驅動行情？'
              : '今天美股市场什么情况？有什么重要新闻驱动行情？',
        },
        {
          role: 'tool',
          command: 'longbridge quote SPY.US QQQ.US NVDA.US AAPL.US MSFT.US && longbridge news NVDA.US AAPL.US',
          content: '',
        },
        {
          role: 'assistant',
          rich: true,
          content: `
<div class="demo-mkt-bar">
  <div class="demo-mkt-item"><div class="demo-mkt-sym">S&amp;P 500 (SPY)</div><div class="demo-mkt-price">$655.38</div><div class="demo-mkt-chg demo-pos">+1.05%</div></div>
  <div class="demo-mkt-divider"></div>
  <div class="demo-mkt-item"><div class="demo-mkt-sym">${cn ? '纳斯达克 (QQQ)' : 'Nasdaq (QQQ)'}</div><div class="demo-mkt-price">$588.00</div><div class="demo-mkt-chg demo-pos">+1.15%</div></div>
  <div class="demo-mkt-divider"></div>
  <div class="demo-mkt-item"><div class="demo-mkt-sym">${cn ? '成交额' : 'Volume'}</div><div class="demo-mkt-price" style="font-size:13px">${cn ? '$886亿' : '$88.6B'}</div><div class="demo-mkt-chg demo-muted">${cn ? 'SPY 日均' : 'SPY daily'}</div></div>
  <div class="demo-mkt-divider"></div>
  <div class="demo-mkt-item"><div class="demo-mkt-sym">${cn ? '今日市场' : 'Market'}</div><div class="demo-mkt-price" style="font-size:13px;color:var(--up-color)">${cn ? '科技领涨' : 'Tech leads'}</div><div class="demo-mkt-chg demo-muted">${cn ? '风险偏好回暖' : 'Risk-on'}</div></div>
</div>
<div class="demo-qcards">
  <div class="demo-qcard"><div class="demo-qcard-sym">NVDA.US</div><div class="demo-qcard-name">NVIDIA Corporation</div><div class="demo-qcard-price">$175.64</div><div class="demo-qcard-chg demo-pos">+$2.94 · +1.70%</div><div class="demo-qcard-meta">${cn ? '成交额 $322.6亿 · GTC 催化剂' : 'Vol $32.3B · GTC catalyst'}</div></div>
  <div class="demo-qcard"><div class="demo-qcard-sym">AAPL.US</div><div class="demo-qcard-name">Apple Inc.</div><div class="demo-qcard-price">$245.00</div><div class="demo-qcard-chg demo-neg">-$2.99 · -1.21%</div><div class="demo-qcard-meta">${cn ? '成交额 $102.1亿 · WWDC 预告消化' : 'Vol $10.2B · WWDC digestion'}</div></div>
</div>
<div class="demo-news-feed">
  <div class="demo-news-item">
    <div class="demo-news-dot" style="background:var(--up-color)"></div>
    <div class="demo-news-body"><div class="demo-news-title">${cn ? 'Jensen Huang：AI 芯片 2027 年前累计需求达 $1 万亿，较去年预测翻倍' : "Jensen Huang: AI chip demand $1T by 2027 — double last year's forecast"}</div><div class="demo-news-meta">${cn ? 'GTC 2026 主题演讲 · 3小时前' : 'GTC 2026 Keynote · 3h ago'}</div></div>
    <div class="demo-news-signal" style="background:var(--vp-c-green-soft);color:var(--up-color)">${cn ? '强力看多' : 'Strong Bull'}</div>
  </div>
  <div class="demo-news-item">
    <div class="demo-news-dot" style="background:var(--up-color)"></div>
    <div class="demo-news-body"><div class="demo-news-title">${cn ? 'Bernstein：维持 NVDA "强力买入"，目标价隐含 56% 上行空间' : 'Bernstein: Maintain NVDA Strong Buy, target implying 56% upside'}</div><div class="demo-news-meta">${cn ? '分析师报告 · 今日 06:50' : 'Analyst report · 06:50'}</div></div>
    <div class="demo-news-signal" style="background:var(--vp-c-green-soft);color:var(--up-color)">${cn ? '看多 NVDA' : 'Bullish NVDA'}</div>
  </div>
  <div class="demo-news-item">
    <div class="demo-news-dot" style="background:var(--vp-c-indigo-1)"></div>
    <div class="demo-news-body"><div class="demo-news-title">${cn ? 'Apple 宣布 WWDC 2026 于 6月8–12日举行：iOS 27 将是 Apple AI 反攻的核心' : 'Apple announces WWDC 2026 June 8–12: iOS 27 to be core of AI comeback'}</div><div class="demo-news-meta">${cn ? 'Apple 官方公告 · 昨日 23:58' : 'Apple Official · Yesterday 23:58'}</div></div>
    <div class="demo-news-signal" style="background:var(--vp-c-indigo-soft);color:var(--vp-c-indigo-1)">${cn ? '短期催化' : 'Near-term catalyst'}</div>
  </div>
  <div class="demo-news-item">
    <div class="demo-news-dot" style="background:var(--vp-c-yellow-1)"></div>
    <div class="demo-news-body"><div class="demo-news-title">${cn ? 'Morgan Stanley 调查：iPhone 购买意向创新高，AI 功能成最大驱动因素' : 'Morgan Stanley: iPhone purchase intent at record high, AI features key driver'}</div><div class="demo-news-meta">${cn ? '研究报告 · 今日 06:44' : 'Research · 06:44'}</div></div>
    <div class="demo-news-signal" style="background:var(--vp-c-yellow-soft);color:var(--vp-c-yellow-1)">${cn ? '中性偏多' : 'Neutral-bullish'}</div>
  </div>
</div>
<div class="demo-hi-box"><strong>${cn ? '今日主线' : "Today's Theme"}</strong>：${cn ? 'GTC 2026 余热持续，Jensen Huang $1T 需求预测提振整个 AI 链。AAPL 则受 WWDC 预期支撑，iOS 27 AI 反攻叙事启动。科技大盘 SPY +1.05%、QQQ +1.15%，技术股集体修复。' : 'GTC 2026 afterglow continues to boost the AI chain. AAPL supported by WWDC expectations. Tech-heavy SPY +1.05%, QQQ +1.15% — broad tech recovery.'}</div>`,
        },
      ],
      clientMessages: {
        claude: [
          {
            role: 'user',
            content: isEN.value
              ? "What's happening in the US market today? Any major news driving the action?"
              : isHK.value
                ? '今天美股市場什麼情況？有什麼重要新聞驅動行情？'
                : '今天美股市场什么情况？有什么重要新闻驱动行情？',
          },
          {
            role: 'tool',
            command: 'longbridge quote SPY.US QQQ.US NVDA.US AAPL.US && longbridge news NVDA.US AAPL.US',
            content: '',
          },
          {
            role: 'assistant',
            rich: true,
            content: `
<div style="font-size:13.5px;line-height:1.8;margin-bottom:12px">${cn ? '今天美股整体收涨，科技板块领涨，有几条重要新闻推动了行情：' : "Today's US market closed higher, led by tech. Key news drivers:"}</div>
<div class="demo-mkt-bar" style="margin-bottom:14px">
  <div class="demo-mkt-item"><div class="demo-mkt-sym">SPY (S&amp;P500)</div><div class="demo-mkt-price">$655.38</div><div class="demo-mkt-chg demo-pos">+1.05%</div></div>
  <div class="demo-mkt-divider"></div>
  <div class="demo-mkt-item"><div class="demo-mkt-sym">QQQ (${cn ? '纳斯达克' : 'Nasdaq'})</div><div class="demo-mkt-price">$588.00</div><div class="demo-mkt-chg demo-pos">+1.15%</div></div>
</div>
<div style="font-size:13px;color:var(--vp-c-text-2);line-height:1.85;margin-bottom:12px"><strong style="color:var(--vp-c-text-1)">① ${cn ? 'GTC 2026 催化 NVDA（+1.70%）' : 'GTC 2026 catalyst for NVDA (+1.70%)'}</strong><br>
${cn ? 'Jensen Huang 发表主题演讲，预测 AI 芯片 2027 年前累计需求达 <strong style="color:var(--vp-c-yellow-1)">$1 万亿</strong>（去年仅预测 $5000 亿）。Bernstein 同日维持 NVDA 强力买入，隐含 56% 上行空间，带动 AI 链全线走强。' : 'Jensen Huang keynoted cumulative AI chip demand could reach <strong style="color:var(--vp-c-yellow-1)">$1 trillion</strong> by 2027 (vs $500B prior). Bernstein maintained Strong Buy with 56% upside, lifting the entire AI chain.'}<br><br>
<strong style="color:var(--vp-c-text-1)">② ${cn ? 'AAPL 今日回调 -1.21%（WWDC 利好消化中）' : 'AAPL pullback -1.21% (WWDC pricing in)'}</strong><br>
${cn ? 'Apple 宣布 WWDC 2026 于 6月8–12日举行，iOS 27 将重构 Siri 架构，向大语言模型交互逻辑靠拢。Morgan Stanley 同日调查显示 iPhone 购买意向创新高。' : 'Apple announced WWDC 2026 for June 8–12, iOS 27 expected to overhaul Siri with LLM-based interaction. Morgan Stanley survey showed iPhone purchase intent at record highs.'}</div>
<div class="demo-warn-box"><strong>${cn ? '注意' : 'Note'}</strong>：${cn ? '今日技术股整体偏强，但 QQQ 仍在 30 日均线下方。本周需关注宏观数据（PCE、就业）对风险情绪的影响。' : 'Tech broadly strong today, but QQQ still below 30d MA. Watch PCE and jobs data this week for macro impact on sentiment.'}</div>`,
          },
        ],
        'claude-code': [
          {
            role: 'user',
            content: isEN.value
              ? "Check today's market and key tech stocks"
              : isHK.value
                ? '查一下今天大盤和主要科技股的情況'
                : '查一下今天大盘和主要科技股的情况',
          },
          { role: 'tool', command: 'longbridge quote SPY.US QQQ.US NVDA.US AAPL.US MSFT.US', content: '' },
          {
            role: 'assistant',
            rich: true,
            content: termHTML(`<span class="t-p">$</span> longbridge quote SPY.US QQQ.US NVDA.US AAPL.US MSFT.US

<span class="t-hd">Symbol    Last      Prev     Chg%      Turnover</span>
<span class="t-dim">──────────────────────────────────────────────</span>
SPY.US    655.38   648.57   <span class="t-pos">+1.05%</span>    $886.1亿
QQQ.US    588.00   581.33   <span class="t-pos">+1.15%</span>    $530.6亿
NVDA.US   175.64   172.70   <span class="t-pos">+1.70%</span>    $322.6亿
AAPL.US   245.00   247.99   <span class="t-neg">-1.21%</span>    $102.1亿
MSFT.US   378.00   381.87   <span class="t-neg">-1.01%</span>    $113.9亿

<span class="t-c"># NVDA GTC 催化剂带动大盘，AAPL/MSFT 消化近期涨幅回调</span>
<span class="t-c"># 查看 NVDA 新闻：longbridge news NVDA.US</span>`),
          },
        ],
      },
    },

    // ── 3. 深度研究
    {
      id: 'research',
      label: isEN.value ? 'Deep Research' : isHK.value ? '深度研究' : '深度研究',
      messages: [
        {
          role: 'user',
          content: isEN.value
            ? 'Analyze NVDA using recent news, SEC filings, and 30-day chart — is it a good add here?'
            : isHK.value
              ? '結合 NVDA 最新新聞、近期 SEC 文件和 K 線走勢，幫我判斷現在是否適合加倉'
              : '结合 NVDA 最新新闻、近期 SEC 文件和 K 线走势，帮我判断现在是否适合加仓',
        },
        {
          role: 'tool',
          command:
            'longbridge news NVDA.US && longbridge filings NVDA.US && longbridge kline NVDA.US --period day --count 30',
          content: '',
        },
        {
          role: 'assistant',
          rich: true,
          content: `
<div class="demo-res-section">
  <div class="demo-res-hd"><span class="demo-res-hd-text">${cn ? '新闻面分析' : 'News Sentiment'}</span><span class="demo-res-signal" style="background:var(--vp-c-green-soft);color:var(--up-color)">${cn ? '极度看多' : 'Extremely Bullish'}</span></div>
  <div class="demo-news-feed">
    <div class="demo-news-item" style="padding:8px 10px"><div class="demo-news-dot" style="background:var(--up-color)"></div><div class="demo-news-body"><div class="demo-news-title" style="font-size:12.5px">${cn ? 'GTC 2026：Jensen Huang — AI 需求 2027 年累计 $1T，去年预测仅 $500B' : 'GTC 2026: Jensen Huang — AI demand $1T by 2027, vs $500B last year'}</div><div class="demo-news-meta">${cn ? '主题演讲 · 重大上调' : 'Keynote · major upward revision'}</div></div><div class="demo-news-signal" style="background:var(--vp-c-green-soft);color:var(--up-color)">++</div></div>
    <div class="demo-news-item" style="padding:8px 10px"><div class="demo-news-dot" style="background:var(--up-color)"></div><div class="demo-news-body"><div class="demo-news-title" style="font-size:12.5px">${cn ? 'Bernstein：强力买入，目标价含 56% 上行；Raymond James：85% 上行空间' : 'Bernstein: Strong Buy 56% upside; Raymond James: 85% upside'}</div><div class="demo-news-meta">${cn ? '机构报告 · 今日连续发布' : 'Multiple analyst reports today'}</div></div><div class="demo-news-signal" style="background:var(--vp-c-green-soft);color:var(--up-color)">+</div></div>
    <div class="demo-news-item" style="padding:8px 10px"><div class="demo-news-dot" style="background:var(--vp-c-indigo-1)"></div><div class="demo-news-body"><div class="demo-news-title" style="font-size:12.5px">${cn ? 'NVIDIA 宣布 Groq 整合 + 新推理专用 CPU，推理端布局加速' : 'NVIDIA announces Groq integration + inference-optimized CPU'}</div><div class="demo-news-meta">${cn ? 'GTC 产品公告 · 长期催化' : 'GTC product announcement · long-term catalyst'}</div></div><div class="demo-news-signal" style="background:var(--vp-c-indigo-soft);color:var(--vp-c-indigo-1)">${cn ? '中性+' : 'Neutral+'}</div></div>
  </div>
</div>
<div class="demo-res-section">
  <div class="demo-res-hd"><span class="demo-res-hd-text">${cn ? 'SEC 文件分析' : 'SEC Filings'}</span><span class="demo-res-signal" style="background:var(--vp-c-bg-mute);color:var(--vp-c-text-2)">${cn ? '中性' : 'Neutral'}</span></div>
  <div class="demo-res-body">
    <div style="display:flex;flex-direction:column;gap:5px">
      <div style="display:flex;gap:8px;align-items:baseline"><span style="font-size:10px;color:var(--vp-c-text-3);width:90px;flex-shrink:0">8-K · 03/02</span><span style="font-size:12.5px">${cn ? 'GTC 2026 会议及产品线更新公告，无负面披露' : 'GTC 2026 conference & product update — no negative disclosures'}</span></div>
      <div style="display:flex;gap:8px;align-items:baseline"><span style="font-size:10px;color:var(--vp-c-text-3);width:90px;flex-shrink:0">Form 4 × 6</span><span style="font-size:12.5px">${cn ? '内部人交易记录：无大规模净卖出，执行层未见减持信号' : 'Insider transactions: no large-scale net selling — management not reducing'}</span></div>
      <div style="display:flex;gap:8px;align-items:baseline"><span style="font-size:10px;color:var(--vp-c-text-3);width:90px;flex-shrink:0">144/A</span><span style="font-size:12.5px">${cn ? '例行转售申请，属常规披露，无异常' : 'Routine resale filing — normal, no red flags'}</span></div>
    </div>
  </div>
</div>
<div class="demo-res-section">
  <div class="demo-res-hd"><span class="demo-res-hd-text">${cn ? '技术面分析' : 'Technical Analysis'}</span><span class="demo-res-signal" style="background:var(--vp-c-yellow-soft);color:var(--vp-c-yellow-1)">${cn ? '底部形成中' : 'Base building'}</span></div>
  <div class="demo-kw" style="margin-bottom:0">
    <div class="demo-kh"><div><div style="font-size:11px;color:var(--vp-c-text-3);margin-bottom:2px">NVDA.US · ${cn ? '日线 30天' : 'Daily 30d'}</div><span class="demo-kprice">$175.64</span><span class="demo-kchg" style="background:var(--vp-c-green-soft);color:var(--up-color);margin-left:8px">+1.70%</span></div><div class="demo-kmeta"><div>${cn ? '峰 $195.56 → 低 $172.70' : 'Peak $195.56 → Low $172.70'}</div><div>${cn ? '回撤 −11.7%' : 'Drawdown −11.7%'}</div></div></div>
    ${klineSvg()}
  </div>
</div>
<div class="demo-verdict">
  <div class="demo-verdict-hd">${cn ? '综合判断' : 'Conclusion'}</div>
  <div class="demo-verdict-rows">
    <div class="demo-verdict-row"><span class="demo-verdict-label" style="color:var(--up-color)">${cn ? '基本面' : 'Fundamentals'}</span><span class="demo-verdict-val">${cn ? '强劲。$1T 需求预测 + 分析师密集看多，催化剂明确。8-K 和 Form 4 无异常，内部人未减持。' : 'Strong. $1T demand forecast + dense analyst bullishness. 8-K and Form 4 both clean — management not selling.'}</span></div>
    <div class="demo-verdict-row"><span class="demo-verdict-label" style="color:#f59e0b">${cn ? '技术面' : 'Technicals'}</span><span class="demo-verdict-val">${cn ? '$172–174 支撑三次有效，今日 +1.70% 是反弹第二日，底部形态趋于成立，但仍在均线下方。' : '$172–$174 held 3 times. Today +1.70% is 2nd consecutive bounce day — base forming, but still below 30d MA.'}</span></div>
    <div class="demo-verdict-row"><span class="demo-verdict-label" style="color:#4781ff">${cn ? '建议' : 'Suggestion'}</span><span class="demo-verdict-val">${cn ? '当前价位（$175）处于回调后低位，基本面支撑强，短期技术面正在修复。<strong style="color:var(--vp-c-text-1)">适合小仓位试探，分批建仓优于一次性买入。</strong>' : 'Current $175 is at a post-correction low with strong fundamentals and recovering technicals. <strong style="color:var(--vp-c-text-1)">Small initial position, scale in gradually rather than all at once.</strong>'}</span></div>
  </div>
</div>`,
        },
      ],
      clientMessages: {
        claude: [
          {
            role: 'user',
            content: isEN.value
              ? 'Analyze NVDA using recent news, SEC filings, and 30-day chart — is it a good add here?'
              : isHK.value
                ? '結合 NVDA 最新新聞、近期 SEC 文件和 K 線走勢，幫我判斷現在是否適合加倉'
                : '结合 NVDA 最新新闻、近期 SEC 文件和 K 线走势，帮我判断现在是否适合加仓',
          },
          {
            role: 'tool',
            command:
              'longbridge news NVDA.US && longbridge filings NVDA.US && longbridge kline NVDA.US --period day --count 30',
            content: '',
          },
          {
            role: 'assistant',
            rich: true,
            content: `
<div style="font-size:13.5px;line-height:1.8;margin-bottom:14px">${cn ? '我从三个维度分析了 NVDA 当前状况：' : "I've analyzed NVDA from three dimensions:"}</div>
<div style="font-size:12px;font-weight:700;color:var(--vp-c-text-2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">① ${cn ? '新闻面' : 'News'}</div>
<div style="font-size:13px;color:var(--vp-c-text-2);line-height:1.85;margin-bottom:14px">${cn ? '今日 NVDA 新闻情绪极度偏多。GTC 2026 主题演讲是核心催化剂：Jensen Huang 宣布 AI 芯片累计需求从 $500B 上调至 <strong style="color:var(--vp-c-yellow-1)">$1T</strong>。Bernstein、Raymond James 等机构当日相继发布看多报告，目标价隐含上行空间均超过 50%。' : 'Extremely bullish news. GTC 2026 keynote was the core catalyst: Jensen Huang raised cumulative AI chip demand from $500B to <strong style="color:var(--vp-c-yellow-1)">$1T</strong>. Bernstein and Raymond James both published bullish reports today, each implying 50%+ upside.'}</div>
<div style="font-size:12px;font-weight:700;color:var(--vp-c-text-2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">② ${cn ? 'SEC 文件' : 'SEC Filings'}</div>
<div style="font-size:13px;color:var(--vp-c-text-2);line-height:1.85;margin-bottom:14px">${cn ? '最近一份 8-K（3/2/2026）为 GTC 2026 正式公告，无负面事项。Form 4 内部人交易记录：近 6 份均为常规披露，未出现高管大规模卖出信号。' : 'Most recent 8-K (3/2/2026) is the GTC 2026 announcement — no negative items. Form 4 insider records: 6 recent filings, all routine — no large executive selling detected.'}</div>
<div style="font-size:12px;font-weight:700;color:var(--vp-c-text-2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">③ ${cn ? 'K 线走势' : 'Chart'}</div>
<div style="font-size:13px;color:var(--vp-c-text-2);line-height:1.85;margin-bottom:14px">${cn ? '30 日看，NVDA 从 2/25 高点 $195.56 回调至 3/20 低点 $172.70，跌幅 −11.7%。低点 $172–174 区间已三次获有效支撑。今日 +1.70%，是连续两日上涨，短期底部信号趋于确认，但仍在 30 日均线（$183）下方。' : '30-day chart: NVDA declined from $195.56 peak (Feb 25) to $172.70 low (Mar 20), a −11.7% drawdown. The $172–$174 zone held as support 3 times. Today +1.70% is the 2nd consecutive bounce day — base forming, but still below 30d MA ($183).'}</div>
<div class="demo-verdict">
  <div class="demo-verdict-hd">${cn ? '我的判断' : 'My Assessment'}</div>
  <div style="font-size:13px;line-height:1.85;color:var(--vp-c-text-2)">${cn ? '三个维度综合：基本面和催化剂指向需求端无虞，技术面正在修复而非破位。<strong style="color:var(--vp-c-text-1)">当前 $175 附近是相对合理的加仓位置</strong>，建议分 2–3 次买入，避免一次性追高。<br>主要风险：若宏观流动性收紧或 AI 泡沫叙事改变，高估值仍承压。' : 'All three angles converge: fundamentals strong, technicals recovering. <strong style="color:var(--vp-c-text-1)">$175 is a reasonable entry point — scale in over 2–3 tranches</strong> rather than all at once.<br>Key risk: valuation stays stretched if macro tightens or AI narrative shifts.'}</div>
</div>`,
          },
        ],
        'claude-code': [
          {
            role: 'user',
            content: isEN.value
              ? 'Analyze NVDA from news, filings, and chart — give me an add recommendation'
              : isHK.value
                ? '從新聞、文件、K 線三個角度分析 NVDA，給我加倉建議'
                : '从新闻、文件、K 线三个角度分析 NVDA，给我加仓建议',
          },
          {
            role: 'tool',
            command:
              'longbridge news NVDA.US --count 5 && longbridge filings NVDA.US --count 5 && longbridge kline NVDA.US --period day --count 30',
            content: '',
          },
          {
            role: 'assistant',
            rich: true,
            content: termHTML(`<span class="t-p">$</span> longbridge news NVDA.US --count 5

<span class="t-hd">NVDA 新闻 · 2026-03-24 (前 5 条)</span>
<span class="t-dim">─────────────────────────────────────────────────────</span>
<span class="t-pos">++</span> GTC 2026: Jensen Huang raises AI chip demand forecast to $1T thru 2027
<span class="t-pos">++</span> Bernstein: Buy NVDA, target +56% upside (Stacy Rasgon)
<span class="t-pos"> +</span> Raymond James: 85% upside potential for NVDA
<span class="t-pos"> +</span> NVIDIA packaging the world: GTC signals infra system pivot
   NVDA shares bought by Covea Finance <span class="t-c"># 机构增持信号</span>

<span class="t-p">$</span> longbridge filings NVDA.US --count 3

<span class="t-hd">NVDA SEC 文件</span>
<span class="t-dim">─────────────────────────────────────────────────────</span>
8-K    03/02  GTC 2026 announcement  <span class="t-c"># 正面催化剂</span>
Form4  03/24  x6 内部人交易          <span class="t-c"># 无大额净卖出 ✓</span>
144/A  03/23  例行转售申请           <span class="t-c"># 常规，无异常</span>

<span class="t-p">$</span> longbridge kline NVDA.US --period day --count 30

<span class="t-hd">NVDA.US 日线 30天摘要</span>
<span class="t-dim">─────────────────────────────────────────────────────</span>
30日高: <span class="t-hi">$195.56</span> (02-25)  |  30日低: <span class="t-neg">$172.70</span> (03-20)  |  今日: <span class="t-pos">$175.64 +1.70%</span>
支撑区: <span class="t-pos">$172–$174</span> (3次测试有效)  |  阻力: <span class="t-dim">$183–$184</span>
30日均: $183.24  |  现价低于均线 <span class="t-neg">-4.2%</span>

<span class="t-c">────────────────────────────────────────────────────</span>
<span class="t-c"># 综合：基本面极强，技术面底部形成中，$172–$175 分批建仓合理</span>`),
          },
        ],
      },
    },

    // ── 4. K 线分析
    {
      id: 'kline',
      label: isEN.value ? 'K-line Analysis' : isHK.value ? 'K 線分析' : 'K 线分析',
      messages: [
        {
          role: 'user',
          content: isEN.value
            ? 'How has NVDA trended over the past month? Where are the key support and resistance levels?'
            : isHK.value
              ? 'NVDA 近一個月走勢如何？關鍵支撐位和阻力位在哪？'
              : 'NVDA 近一个月走势如何？关键支撑位和阻力位在哪？',
        },
        { role: 'tool', command: 'longbridge kline NVDA.US --period day --count 30', content: '' },
        {
          role: 'assistant',
          rich: true,
          content: `
<div class="demo-kw">
  <div class="demo-kh">
    <div><div style="font-size:11px;color:var(--vp-c-text-3);margin-bottom:2px">NVIDIA · NVDA.US · ${cn ? '日线 · 2026-02-09 → 03-23' : 'Daily · 2026-02-09 → 03-23'}</div><span class="demo-kprice">$175.64</span><span class="demo-kchg" style="background:var(--vp-c-green-soft);color:var(--up-color);margin-left:8px">+$2.94 · +1.70%</span></div>
    <div class="demo-kmeta"><div>${cn ? '区间 $172.70 — $195.56' : 'Range $172.70 — $195.56'}</div><div>${cn ? '30日均价 $183.24' : '30d MA $183.24'}</div></div>
  </div>
  ${klineSvg()}
  <div class="demo-kstats">
    <div class="demo-kstat"><div class="demo-ksl">${cn ? '30日高点' : '30d High'}</div><div class="demo-ksv" style="color:var(--vp-c-yellow-1)">$195.56</div><div style="font-size:10px;color:var(--vp-c-text-3)">02-25</div></div>
    <div class="demo-kstat"><div class="demo-ksl">${cn ? '30日低点' : '30d Low'}</div><div class="demo-ksv demo-neg">$172.70</div><div style="font-size:10px;color:var(--vp-c-text-3)">${cn ? '03-20 · 距高 −11.7%' : '03-20 · −11.7% drawdown'}</div></div>
    <div class="demo-kstat"><div class="demo-ksl">${cn ? '现价 vs 均线' : 'Price vs MA'}</div><div class="demo-ksv demo-neg">−4.2%</div><div style="font-size:10px;color:var(--vp-c-text-3)">${cn ? '均线 $183.24' : 'MA $183.24'}</div></div>
  </div>
</div>
<div style="font-size:13px;line-height:1.8;color:var(--vp-c-text-2);margin-bottom:10px">
${cn ? 'NVDA 过去 30 天经历了一轮明显的高位回调：<br>• 2月下旬涨至 <strong style="color:var(--vp-c-yellow-1)">$195.56</strong> 峰值，随后持续走软<br>• 3月20日触及阶段低点 <strong class="demo-neg">$172.70</strong>（较峰值 −11.7%）<br>• 本周开始反弹，连续两日上涨，今日收 $175.64（+1.70%）' : 'NVDA has been in a clear correction over the past 30 days:<br>• Peaked at <strong style="color:var(--vp-c-yellow-1)">$195.56</strong> in late February, then steadily weakened<br>• Hit a cycle low of <strong class="demo-neg">$172.70</strong> on Mar 20 (−11.7% from peak)<br>• Now bouncing: 2 consecutive up days, closed today at $175.64 (+1.70%)'}
</div>
<div class="demo-warn-box"><strong>${cn ? '关键位置' : 'Key Levels'}</strong>：${cn ? '支撑区 $172–$174（已三次有效测试，成本密集区），阻力区 $183–$184（前期平台，有较大抛压）。若站稳 $178，则有望向均线 $183 修复；跌破 $172，则关注 $165 一带。' : 'Support $172–$174 (3 successful tests — strong floor). Resistance $183–$184 (prior consolidation zone). Reclaim of $178+ opens path to MA $183; break below $172 targets $165 area.'}</div>`,
        },
      ],
      clientMessages: {
        chatgpt: [
          {
            role: 'user',
            content: "Show me NVDA's price action over the past month",
          },
          { role: 'tool', command: 'longbridge kline NVDA.US --period day --count 30', content: '' },
          {
            role: 'assistant',
            rich: true,
            content: `
<div class="demo-kw">
  <div class="demo-kh">
    <div><div style="font-size:11px;color:var(--vp-c-text-3);margin-bottom:2px">NVDA.US · Daily · Feb 9 → Mar 23, 2026</div><span class="demo-kprice">$175.64</span><span class="demo-kchg" style="background:var(--vp-c-green-soft);color:var(--up-color);margin-left:8px">+$2.94 · +1.70%</span></div>
    <div class="demo-kmeta"><div>Range: $172.70 — $195.56</div><div>30d MA: $183.24</div></div>
  </div>
  ${klineSvg()}
  <div class="demo-kstats">
    <div class="demo-kstat"><div class="demo-ksl">30d High</div><div class="demo-ksv" style="color:var(--vp-c-yellow-1)">$195.56</div><div style="font-size:10px;color:var(--vp-c-text-3)">Feb 25</div></div>
    <div class="demo-kstat"><div class="demo-ksl">30d Low</div><div class="demo-ksv demo-neg">$172.70</div><div style="font-size:10px;color:var(--vp-c-text-3)">Mar 20 · −11.7% drawdown</div></div>
    <div class="demo-kstat"><div class="demo-ksl">vs 30d MA</div><div class="demo-ksv demo-neg">−4.2%</div><div style="font-size:10px;color:var(--vp-c-text-3)">below average</div></div>
  </div>
</div>
<div style="font-size:13px;line-height:1.8;color:var(--vp-c-text-2);margin-bottom:10px">
NVDA is in a <strong style="color:var(--vp-c-text-1)">correction and base-building phase</strong>:<br>
• Peaked at <strong style="color:var(--vp-c-yellow-1)">$195.56</strong> on Feb 25 (GTC anticipation / AI capex hype)<br>
• Declined to <strong class="demo-neg">$172.70</strong> on Mar 20 — a −11.7% drawdown<br>
• Now bouncing: 2 consecutive up days, <strong class="demo-pos">+1.70% today</strong><br>
• Still below 30-day MA ($183) — trend not yet reversed
</div>
<div class="demo-warn-box">📌 <strong>Key levels</strong>: Support at $172–$174 (3 successful tests — strong floor). Resistance at $183–$184 (prior consolidation zone). A reclaim of $184+ would signal trend recovery.</div>`,
          },
        ],
        'claude-code': [
          {
            role: 'user',
            content: isEN.value
              ? 'Print NVDA 30-day daily data, mark key levels'
              : isHK.value
                ? '打印 NVDA 近 30 日日線數據，標注關鍵位'
                : '打印 NVDA 近 30 日日线数据，标注关键位',
          },
          { role: 'tool', command: 'longbridge kline NVDA.US --period day --count 30', content: '' },
          {
            role: 'assistant',
            rich: true,
            content: termHTML(`<span class="t-p">$</span> longbridge kline NVDA.US --period day --count 30

<span class="t-hd">NVDA.US · 日线 · 2026-02-09 ~ 2026-03-23</span>
<span class="t-dim">──────────────────────────────────────────────</span>
<span class="t-hd">日期      收盘     较前日    备注</span>
<span class="t-dim">──────────────────────────────────────────────</span>
02-09    190.04
02-25    <span class="t-hi">195.56</span>   <span class="t-pos">▲ +1.4%</span>   <span class="t-c">← 30日峰值</span>
02-26    184.89   <span class="t-neg">▼ -5.5%</span>   <span class="t-c">← 大跌日</span>
02-27    177.19   <span class="t-neg">▼ -4.2%</span>
03-06    177.82   <span class="t-neg">▼ -3.0%</span>   <span class="t-c">← 二次下探</span>
03-20    <span class="t-neg">172.70</span>   <span class="t-neg">▼ -3.3%</span>   <span class="t-c">← 30日低点</span>
03-23    175.64   <span class="t-pos">▲ +1.7%</span>   <span class="t-c">← 今日收盘</span>
<span class="t-dim">──────────────────────────────────────────────</span>
30日均:   $183.24  |  现价低于均线 <span class="t-neg">-4.2%</span>
支撑区:   <span class="t-pos">$172–$174</span>  |  阻力区: $183–$184
峰谷回撤: <span class="t-neg">-11.7%</span>  |  当前修复: <span class="t-pos">+1.7%</span>

<span class="t-c"># 完整数据：longbridge kline NVDA.US --period day --count 30 --format json</span>`),
          },
        ],
      },
    },

    // ── 5. 资金分布
    {
      id: 'capitalflow',
      label: isEN.value ? 'Capital Flow' : isHK.value ? '資金分布' : '资金分布',
      messages: [
        {
          role: 'user',
          content: isEN.value
            ? "Check NVDA's capital flow breakdown in Longbridge and explain what it means"
            : isHK.value
              ? '查一下 Longbridge 裡面 NVDA 各檔資金的流入流出，幫我解釋一下'
              : '查一下 Longbridge 里面 NVDA 各档资金的流入流出，帮我解释一下',
        },
        { role: 'tool', command: 'longbridge capital-dist NVDA.US', content: '' },
        {
          role: 'assistant',
          rich: true,
          content: `
<div style="font-size:12px;color:var(--vp-c-text-3);margin-bottom:10px;letter-spacing:.03em">NVDA ${cn ? '各档资金分布（单位：千美元）· 2026-03-23 收盘' : 'Capital Flow Distribution (unit: thousand USD) · Close 2026-03-23'}</div>
<div class="demo-table-wrap"><table class="demo-table">
  <thead><tr>
    <th style="text-align:left">${cn ? '档位' : 'Tier'}</th>
    <th>${cn ? '流入' : 'Inflow'}</th>
    <th>${cn ? '流出' : 'Outflow'}</th>
    <th>${cn ? '净流入' : 'Net'}</th>
  </tr></thead>
  <tbody>
    <tr><td style="text-align:left">${cn ? '大单' : 'Large orders'}</td><td class="demo-pos">67,498</td><td class="demo-neg">69,583</td><td class="demo-neg">-2,085</td></tr>
    <tr><td style="text-align:left">${cn ? '中单' : 'Mid orders'}</td><td class="demo-pos">150,167</td><td class="demo-neg">187,894</td><td class="demo-neg">-37,728</td></tr>
    <tr><td style="text-align:left">${cn ? '小单' : 'Small orders'}</td><td class="demo-pos">270,966</td><td class="demo-neg">290,110</td><td class="demo-neg">-19,144</td></tr>
    <tr style="border-top:1px solid var(--vp-c-divider);font-weight:600"><td style="text-align:left">${cn ? '合计' : 'Total'}</td><td class="demo-pos">488,631</td><td class="demo-neg">547,587</td><td class="demo-neg">-58,956</td></tr>
  </tbody>
</table></div>
<div style="font-size:13px;line-height:1.85;color:var(--vp-c-text-2);margin:14px 0 10px">
<strong style="color:var(--vp-c-text-1)">${cn ? '大单（机构资金）基本持平' : 'Large orders (institutions) nearly flat'}</strong>：${cn ? '净流出仅 2,085 千美元，相对总成交额近乎可以忽略。机构在这个价位既没有大举建仓，也没有恐慌性撤退，态度偏观望。' : 'Net outflow of only $2.1M against billions in volume is negligible. Institutions are neither building nor fleeing — a "wait and see" stance.'}</div>
<div style="font-size:13px;line-height:1.85;color:var(--vp-c-text-2);margin-bottom:10px">
<strong style="color:var(--vp-c-text-1)">${cn ? '中单（量化/跟风盘）是主要卖压' : 'Mid-tier orders are the main selling pressure'}</strong>：${cn ? '净流出 37,728 千美元，占三档总净流出的约 64%。这类资金通常是量化策略或跟随趋势的活跃资金，反映短线情绪偏谨慎，可能是在 GTC 大会后获利了结。' : 'Net outflow of $37.7M accounts for ~64% of total net selling. Quant strategies and momentum traders profit-taking after the GTC conference rally.'}</div>
<div style="font-size:13px;line-height:1.85;color:var(--vp-c-text-2);margin-bottom:12px">
<strong style="color:var(--vp-c-text-1)">${cn ? '小单（散户）跟随小幅减仓' : 'Small orders (retail) following the trend'}</strong>：${cn ? '净流出 19,144 千美元，幅度适中，符合散户跟随大市情绪的惯常表现。' : 'Net outflow of $19.1M — moderate, consistent with retail following market sentiment.'}</div>
<div class="demo-hi-box"><strong>${cn ? '综合判断' : 'Bottom Line'}</strong>：${cn ? '整体短线承压，但大资金未恐慌离场。机构在 $172–$175 区间选择按兵不动，这本身就是一种支撑信号。结合今日反弹 +1.70%，可关注是否有大单转为净流入作为入场依据。' : "Short-term pressure exists, but big money has not panicked. Institutions holding ground in $172–$175 is a constructive signal. Combined with today's +1.70% bounce, watch for large-order net inflow as a potential entry catalyst."}</div>`,
        },
      ],
      clientMessages: {
        chatgpt: [
          {
            role: 'user',
            content: "Check NVDA's capital flow breakdown in Longbridge and explain what it means",
          },
          { role: 'tool', command: 'longbridge capital-dist NVDA.US', content: '' },
          {
            role: 'assistant',
            rich: true,
            content: `
<div style="font-size:12px;color:var(--vp-c-text-3);margin-bottom:10px">NVDA Capital Flow Distribution (unit: thousand USD) · Close 2026-03-23</div>
<div class="demo-table-wrap"><table class="demo-table">
  <thead><tr>
    <th style="text-align:left">Tier</th>
    <th>Inflow</th>
    <th>Outflow</th>
    <th>Net</th>
  </tr></thead>
  <tbody>
    <tr><td style="text-align:left">Large orders</td><td class="demo-pos">67,498</td><td class="demo-neg">69,583</td><td class="demo-neg">-2,085</td></tr>
    <tr><td style="text-align:left">Mid orders</td><td class="demo-pos">150,167</td><td class="demo-neg">187,894</td><td class="demo-neg">-37,728</td></tr>
    <tr><td style="text-align:left">Small orders</td><td class="demo-pos">270,966</td><td class="demo-neg">290,110</td><td class="demo-neg">-19,144</td></tr>
    <tr style="border-top:1px solid var(--vp-c-divider);font-weight:600"><td style="text-align:left">Total</td><td class="demo-pos">488,631</td><td class="demo-neg">547,587</td><td class="demo-neg">-58,956</td></tr>
  </tbody>
</table></div>
<div style="font-size:13px;line-height:1.85;color:var(--vp-c-text-2);margin:14px 0 10px">
<strong style="color:var(--vp-c-text-1)">Large orders (institutions) nearly flat</strong>: Net outflow of only $2.1M against billions in volume is negligible. Institutions neither building nor fleeing — a "wait and see" stance.</div>
<div style="font-size:13px;line-height:1.85;color:var(--vp-c-text-2);margin-bottom:10px">
<strong style="color:var(--vp-c-text-1)">Mid-tier orders are the main selling pressure</strong>: Net outflow of $37.7M accounts for ~64% of total net selling. This suggests quant and momentum traders taking profits after the GTC conference rally.</div>
<div class="demo-hi-box"><strong>Bottom line</strong>: Short-term pressure exists, but big money has not panicked. Institutions holding ground in $172–$175 is a constructive signal. Combined with today's +1.70% bounce, watch for large-order net inflow as a potential entry catalyst.</div>`,
          },
        ],
        'claude-code': [
          {
            role: 'user',
            content: isEN.value
              ? "Check NVDA's capital flow breakdown"
              : isHK.value
                ? '查一下 Longbridge 裡面 NVDA 各檔資金的流入流出'
                : '查一下 Longbridge 里面 NVDA 各档资金的流入流出',
          },
          { role: 'tool', command: 'longbridge capital-dist NVDA.US', content: '' },
          {
            role: 'assistant',
            rich: true,
            content: termHTML(`<span class="t-p">$</span> longbridge capital-dist NVDA.US

<span class="t-hd">NVDA 各档资金分布 (单位：千美元)</span>
大单: 流入 <span class="t-pos">67,498</span> / 流出 <span class="t-neg">69,583</span> / 净流入 <span class="t-neg">-2,085</span>
中单: 流入 <span class="t-pos">150,167</span> / 流出 <span class="t-neg">187,894</span> / 净流入 <span class="t-neg">-37,728</span>
小单: 流入 <span class="t-pos">270,966</span> / 流出 <span class="t-neg">290,110</span> / 净流入 <span class="t-neg">-19,144</span>
合计: 流入 <span class="t-pos">488,631</span> / 流出 <span class="t-neg">547,587</span> / 净流入 <span class="t-neg">-58,956</span>

<span class="t-hd">解读：</span>
<span class="t-dim">机构（大单）基本持平，净流出 -2,085 千美元，大资金未恐慌离场。</span>
<span class="t-dim">中单是主要卖压，净流出 -37,728 千美元（占总净流出 64%），</span>
<span class="t-dim">反映量化/跟风盘在 GTC 催化剂后短线获利了结。</span>
<span class="t-dim">散户（小单）跟随小幅减仓，整体结构尚未恶化。</span>
<span class="t-c"># 关注大单是否转为净流入，可作为阶段性入场参考。</span>`),
          },
        ],
      },
    },

    // ── 6. 条件委托
    {
      id: 'order',
      label: isEN.value ? 'Conditional Order' : isHK.value ? '條件委托' : '条件委托',
      messages: [
        {
          role: 'user',
          content: isEN.value
            ? 'NVDA up >3% today: buy 1/5 of available cash at market. Down >3%: sell 1/10 of my position. Set both conditions.'
            : isHK.value
              ? 'NVDA 今日漲幅超過 3% 時，以市價買入可用現金的 1/5；若跌幅超過 3%，以市價賣出當前持倉的 1/10。幫我設置這兩個條件'
              : 'NVDA 今日涨幅超过 3% 时，以市价买入可用现金的 1/5；若跌幅超过 3%，以市价卖出当前持仓的 1/10。帮我设置这两个条件',
        },
        {
          role: 'tool',
          command: 'longbridge quote NVDA.US && longbridge balance && longbridge positions',
          content: '',
        },
        {
          role: 'assistant',
          rich: true,
          content: `
<div class="demo-cond-block">
  <div class="demo-cond-header">
    <span>NVDA.US ${cn ? '条件委托 · 双向触发' : 'Conditional Order · Dual Trigger'}</span>
    <span>${cn ? '当前 $175.64 · 昨收 $172.70' : 'Current $175.64 · Prev $172.70'}</span>
  </div>
  <div class="demo-cond-body">
    <div style="font-size:11px;color:var(--vp-c-text-3);margin-bottom:12px">${cn ? '已基于当前持仓和账户余额自动计算委托参数' : 'Parameters auto-calculated from current position and balance'}</div>
    <div class="demo-cond-cards">
      <div class="demo-cond-card demo-cond-card-buy">
        <div class="demo-cond-card-hd demo-pos">${cn ? '条件一 · 上行触发买入' : 'Condition 1 · Buy on Rise'}</div>
        <div class="demo-cond-detail-row"><span class="demo-cond-key">${cn ? '触发条件' : 'Trigger'}</span><span>${cn ? '涨幅 > 3%' : 'Up > 3%'}</span></div>
        <div class="demo-cond-detail-row"><span class="demo-cond-key">${cn ? '触发价' : 'Trigger price'}</span><span class="demo-pos" style="font-weight:700">≥ $177.88</span></div>
        <div class="demo-cond-detail-row"><span class="demo-cond-key">${cn ? '委托类型' : 'Order type'}</span><span>${cn ? '市价单' : 'Market order'}</span></div>
        <div class="demo-cond-detail-row"><span class="demo-cond-key">${cn ? '可用现金' : 'Cash available'}</span><span>~$58,710 USD</span></div>
        <div class="demo-cond-detail-row"><span class="demo-cond-key">${cn ? '委托金额' : 'Order size'}</span><span>1/5 = <strong>~$11,742</strong></span></div>
        <div class="demo-cond-detail-row"><span class="demo-cond-key">${cn ? '预计数量' : 'Est. qty'}</span><span>${cn ? '约 <strong>66 股</strong>（@$177.88）' : 'approx. <strong>66 shares</strong> (@$177.88)'}</span></div>
      </div>
      <div class="demo-cond-card demo-cond-card-sell">
        <div class="demo-cond-card-hd demo-neg">${cn ? '条件二 · 下行触发卖出' : 'Condition 2 · Sell on Drop'}</div>
        <div class="demo-cond-detail-row"><span class="demo-cond-key">${cn ? '触发条件' : 'Trigger'}</span><span>${cn ? '跌幅 > 3%' : 'Down > 3%'}</span></div>
        <div class="demo-cond-detail-row"><span class="demo-cond-key">${cn ? '触发价' : 'Trigger price'}</span><span class="demo-neg" style="font-weight:700">≤ $167.52</span></div>
        <div class="demo-cond-detail-row"><span class="demo-cond-key">${cn ? '委托类型' : 'Order type'}</span><span>${cn ? '市价单' : 'Market order'}</span></div>
        <div class="demo-cond-detail-row"><span class="demo-cond-key">${cn ? '当前持仓' : 'Current position'}</span><span>101 ${cn ? '股' : 'shares'}</span></div>
        <div class="demo-cond-detail-row"><span class="demo-cond-key">${cn ? '卖出数量' : 'Sell qty'}</span><span>1/10 = <strong>10 ${cn ? '股' : 'shares'}</strong></span></div>
        <div class="demo-cond-detail-row"><span class="demo-cond-key">${cn ? '预计金额' : 'Est. value'}</span><span>${cn ? '约 <strong>$1,675</strong>（@$167.52）' : 'approx. <strong>$1,675</strong> (@$167.52)'}</span></div>
      </div>
    </div>
    <div class="demo-cond-status">
      <div class="demo-cond-status-hd">${cn ? '当前价位状态' : 'Current Price Status'}</div>
      <div class="demo-cond-status-row"><span>${cn ? '当前价格' : 'Current price'}</span><span class="demo-pos">$175.64 (+1.70%)</span></div>
      <div class="demo-cond-status-row"><span>${cn ? '距上行触发价' : 'To buy trigger'}</span><span class="demo-muted">+$2.24 / +1.27%</span></div>
      <div style="font-size:10px;color:var(--vp-c-text-3);margin-top:3px">${cn ? '买入触发进度：' : 'Buy trigger progress:'}</div>
      <div class="demo-progress-bar"><div class="demo-progress-fill" style="width:57%;background:linear-gradient(90deg,var(--vp-c-green-soft),var(--up-color))"></div></div>
      <div class="demo-cond-status-row" style="margin-top:8px"><span>${cn ? '距下行触发价' : 'To sell trigger'}</span><span class="demo-muted">-$8.12 / -4.62%</span></div>
      <div style="font-size:10px;color:var(--vp-c-text-3);margin-top:3px">${cn ? '卖出触发进度：' : 'Sell trigger progress:'}</div>
      <div class="demo-progress-bar"><div class="demo-progress-fill" style="width:0%;background:linear-gradient(90deg,var(--vp-c-red-soft),var(--down-color))"></div></div>
    </div>
    <div style="margin-top:14px;padding:10px 12px;background:var(--brand-5);border:1px solid var(--vp-c-brand-1);border-radius:8px;font-size:12.5px;color:var(--vp-c-text-1);font-weight:500;text-align:center">${cn ? '✓ 两个条件委托已确认提交' : '✓ Both conditional orders confirmed and submitted'}</div>
  </div>
</div>
<p class="demo-note">${cn ? '条件委托将在盘中持续监控，满足任一触发条件后自动提交市价单，执行前会发送通知确认。有效期：今日收盘前。' : 'Conditional orders monitor continuously during trading hours. When triggered, a market order is auto-submitted with a confirmation notification. Valid until market close today.'}</p>`,
        },
      ],
      clientMessages: {
        'claude-code': [
          {
            role: 'user',
            content: isEN.value
              ? 'Set up two conditional orders for NVDA: buy if up >3% today, sell 1/10 if down >3%'
              : isHK.value
                ? '幫我設置 NVDA 雙向條件委托：漲超 3% 時買入，跌超 3% 時賣出 1/10'
                : '帮我设置 NVDA 双向条件委托：涨超 3% 时买入，跌超 3% 时卖出 1/10',
          },
          {
            role: 'tool',
            command:
              'longbridge quote NVDA.US --format json && longbridge balance --format json && longbridge positions --format json',
            content: '',
          },
          {
            role: 'assistant',
            rich: true,
            content: termHTML(`<span class="t-p">$</span> <span class="t-c"># 解析条件 → 计算触发价和委托量</span>

基准价:     $172.70 (昨收)
当前价:     $175.64 (+1.70%)

<span class="t-hd">条件一 (Buy):</span>
  触发价:   $172.70 × 1.03 = <span class="t-pos">$177.88</span>
  可用现金: ~$58,710 USD
  委托金额: 1/5 = <span class="t-pos">$11,742</span>
  预计数量: 11742 / 177.88 ≈ <span class="t-pos">66 股</span>

<span class="t-hd">条件二 (Sell):</span>
  触发价:   $172.70 × 0.97 = <span class="t-neg">$167.52</span>
  持仓数量: 101 股
  卖出数量: 101 / 10 = <span class="t-neg">10 股</span>

<span class="t-p">$</span> <span class="t-c"># 提交两个条件委托...</span>

<span class="t-pos">✓</span> 条件委托 #1 已提交
  ID: 1221093847261847553  Buy 66 NVDA.US MKT if last >= 177.88
<span class="t-pos">✓</span> 条件委托 #2 已提交
  ID: 1221093847261847554  Sell 10 NVDA.US MKT if last <= 167.52

当前进度: $175.64 → 买入触发还差 +1.27% | 卖出触发还差 -4.62%

<span class="t-c"># 查看条件委托：longbridge orders --pending</span>
<span class="t-c"># 取消：longbridge cancel 1221093847261847553</span>`),
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
]

// ─── Demo animation state ─────────────────────────────────────────────────────

const activeScenario = ref('portfolio')
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

  await delay(50)

  // Phase 1: user message appears
  phase.value = 'user'
  await typewrite(visibleUserMsg, userMsg.content, 8)

  await delay(100)

  // Phase 2: tool call appears
  phase.value = 'tool'
  toolExpanded.value = true
  await typewrite(visibleToolCmd, toolMsg.command ?? '', 5)
  await delay(150)
  toolExpanded.value = false

  await delay(60)

  // Phase 3: assistant response
  isRichResponse.value = !!assistantMsg.rich
  phase.value = 'assistant'
  if (assistantMsg.rich) {
    // Rich HTML content: show at once (fade-in via CSS)
    visibleAssistantMsg.value = assistantMsg.content
  } else {
    await typewrite(visibleAssistantMsg, assistantMsg.content, 10)
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
  color: var(--up-color);
  font-weight: 600;
}
.skill-chat-bubble-assistant :deep(.demo-neg) {
  color: var(--down-color);
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
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px 14px;
  margin: 4px 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.78125rem;
  line-height: 1.65;
  overflow-x: auto;
  color: var(--vp-c-text-1);
}
.skill-chat-bubble-assistant :deep(.demo-code-block code) {
  background: none;
  padding: 0;
  font-size: inherit;
  color: inherit;
  white-space: pre;
}
.skill-chat-bubble-assistant :deep(.hl-k) {
  color: var(--vp-c-indigo-1);
}
.skill-chat-bubble-assistant :deep(.hl-s) {
  color: var(--up-color);
}
.skill-chat-bubble-assistant :deep(.hl-c) {
  color: var(--vp-c-text-3);
  font-style: italic;
}
.skill-chat-bubble-assistant :deep(.hl-n) {
  color: var(--vp-c-yellow-1);
}
.skill-chat-bubble-assistant :deep(.hl-b) {
  color: var(--vp-c-brand-1);
}
.skill-chat-bubble-assistant :deep(.hl-prompt) {
  color: var(--vp-c-brand-1);
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

/* ─── Rich demo content styles ────────────────────────────────────────────── */

/* Summary cards (持仓盈亏 / 美股今日) */
.skill-chat-bubble-assistant :deep(.demo-scards) {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 10px;
}
.skill-chat-bubble-assistant :deep(.demo-scard) {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 10px 12px;
}
.skill-chat-bubble-assistant :deep(.demo-sl) {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-bottom: 2px;
}
.skill-chat-bubble-assistant :deep(.demo-sv) {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.skill-chat-bubble-assistant :deep(.demo-ss) {
  font-size: 0.78rem;
  margin-top: 1px;
}

/* Market bar (美股今日) */
.skill-chat-bubble-assistant :deep(.demo-mkt-bar) {
  display: flex;
  align-items: center;
  gap: 0;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}
.skill-chat-bubble-assistant :deep(.demo-mkt-item) {
  display: flex;
  flex-direction: column;
  padding: 0 12px;
}
.skill-chat-bubble-assistant :deep(.demo-mkt-sym) {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}
.skill-chat-bubble-assistant :deep(.demo-mkt-price) {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.skill-chat-bubble-assistant :deep(.demo-mkt-chg) {
  font-size: 0.75rem;
}
.skill-chat-bubble-assistant :deep(.demo-mkt-divider) {
  width: 1px;
  height: 32px;
  background: var(--vp-c-divider);
}

/* Quote cards (美股今日) */
.skill-chat-bubble-assistant :deep(.demo-qcards) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 10px;
}
.skill-chat-bubble-assistant :deep(.demo-qcard) {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 10px 12px;
}
.skill-chat-bubble-assistant :deep(.demo-qcard-sym) {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.skill-chat-bubble-assistant :deep(.demo-qcard-name) {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}
.skill-chat-bubble-assistant :deep(.demo-qcard-price) {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.skill-chat-bubble-assistant :deep(.demo-qcard-chg) {
  font-size: 0.78rem;
  margin-top: 1px;
}
.skill-chat-bubble-assistant :deep(.demo-qcard-meta) {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
  margin-top: 3px;
}

/* News feed (美股今日) */
.skill-chat-bubble-assistant :deep(.demo-news-feed) {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;
}
.skill-chat-bubble-assistant :deep(.demo-news-item) {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.skill-chat-bubble-assistant :deep(.demo-news-dot) {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 5px;
}
.skill-chat-bubble-assistant :deep(.demo-news-body) {
  flex: 1;
}
.skill-chat-bubble-assistant :deep(.demo-news-title) {
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}
.skill-chat-bubble-assistant :deep(.demo-news-meta) {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
  margin-top: 1px;
}
.skill-chat-bubble-assistant :deep(.demo-news-signal) {
  font-size: 0.68rem;
  padding: 1px 6px;
  border-radius: 4px;
  flex-shrink: 0;
  margin-top: 2px;
}

/* Highlight / warning boxes */
.skill-chat-bubble-assistant :deep(.demo-hi-box) {
  background: var(--vp-c-green-soft);
  border-left: 3px solid var(--up-color);
  border-radius: 0 6px 6px 0;
  padding: 8px 12px;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  line-height: 1.55;
  margin-top: 4px;
}
.skill-chat-bubble-assistant :deep(.demo-warn-box) {
  background: var(--vp-c-yellow-soft);
  border-left: 3px solid var(--vp-c-yellow-1);
  border-radius: 0 6px 6px 0;
  padding: 8px 12px;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  line-height: 1.55;
  margin-top: 4px;
}

/* Research sections (深度研究) */
.skill-chat-bubble-assistant :deep(.demo-res-section) {
  margin-bottom: 10px;
}
.skill-chat-bubble-assistant :deep(.demo-res-hd) {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}
.skill-chat-bubble-assistant :deep(.demo-res-hd-text) {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.skill-chat-bubble-assistant :deep(.demo-res-signal) {
  font-size: 0.68rem;
  padding: 1px 6px;
  border-radius: 4px;
}
.skill-chat-bubble-assistant :deep(.demo-res-body) {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.55;
}

/* K-line wrapper */
.skill-chat-bubble-assistant :deep(.demo-kw) {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  overflow: hidden;
}
.skill-chat-bubble-assistant :deep(.demo-kw svg) {
  width: 100%;
  height: auto;
  display: block;
}
.skill-chat-bubble-assistant :deep(.demo-kh) {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 8px;
}
.skill-chat-bubble-assistant :deep(.demo-kprice) {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.skill-chat-bubble-assistant :deep(.demo-kchg) {
  font-size: 0.82rem;
  margin-top: 1px;
}
.skill-chat-bubble-assistant :deep(.demo-kmeta) {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-top: 1px;
}
.skill-chat-bubble-assistant :deep(.demo-kstats) {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin-top: 10px;
}
.skill-chat-bubble-assistant :deep(.demo-kstat) {
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  padding: 6px 8px;
}
.skill-chat-bubble-assistant :deep(.demo-ksl) {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
}
.skill-chat-bubble-assistant :deep(.demo-ksv) {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

/* Verdict block (深度研究) */
.skill-chat-bubble-assistant :deep(.demo-verdict) {
  background: var(--vp-c-green-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 10px 12px;
  margin-top: 8px;
}
.skill-chat-bubble-assistant :deep(.demo-verdict-hd) {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--up-color);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.skill-chat-bubble-assistant :deep(.demo-verdict-rows) {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.skill-chat-bubble-assistant :deep(.demo-verdict-row) {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
}
.skill-chat-bubble-assistant :deep(.demo-verdict-label) {
  color: var(--vp-c-text-2);
}
.skill-chat-bubble-assistant :deep(.demo-verdict-val) {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

/* Conditional order cards (条件委托) */
.skill-chat-bubble-assistant :deep(.demo-cond-block) {
  margin-bottom: 10px;
}
.skill-chat-bubble-assistant :deep(.demo-cond-header) {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 6px;
}
.skill-chat-bubble-assistant :deep(.demo-cond-body) {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.55;
}
.skill-chat-bubble-assistant :deep(.demo-cond-cards) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 10px;
}
.skill-chat-bubble-assistant :deep(.demo-cond-card) {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 10px 12px;
}
.skill-chat-bubble-assistant :deep(.demo-cond-card-buy) {
  border-top: 2px solid var(--up-color);
}
.skill-chat-bubble-assistant :deep(.demo-cond-card-sell) {
  border-top: 2px solid var(--down-color);
}
.skill-chat-bubble-assistant :deep(.demo-cond-card-hd) {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}
.skill-chat-bubble-assistant :deep(.demo-cond-detail-row) {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  margin-bottom: 2px;
}
.skill-chat-bubble-assistant :deep(.demo-cond-key) {
  color: var(--vp-c-text-3);
}
.skill-chat-bubble-assistant :deep(.demo-cond-status) {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 10px 12px;
  margin-top: 8px;
}
.skill-chat-bubble-assistant :deep(.demo-cond-status-hd) {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.skill-chat-bubble-assistant :deep(.demo-cond-status-row) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.78rem;
  padding: 3px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}
.skill-chat-bubble-assistant :deep(.demo-cond-status-row:last-child) {
  border-bottom: none;
}

/* Progress bar */
.skill-chat-bubble-assistant :deep(.demo-progress-bar) {
  background: var(--vp-c-divider);
  border-radius: 4px;
  height: 6px;
  overflow: hidden;
  margin: 8px 0;
}
.skill-chat-bubble-assistant :deep(.demo-progress-fill) {
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--vp-c-indigo-1), var(--up-color));
}

/* AI signal badge */
.skill-chat-bubble-assistant :deep(.demo-ai-sig) {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.68rem;
  color: var(--vp-c-indigo-1);
  background: var(--vp-c-indigo-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 1px 6px;
}

/* Terminal block (no dark background) */
.skill-chat-bubble-assistant :deep(.demo-term) {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 10px 12px;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
  font-size: 0.75rem;
  line-height: 1.75;
  white-space: pre;
  overflow-x: auto;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}
.skill-chat-bubble-assistant :deep(.demo-term .t-p) {
  color: var(--vp-c-brand-1);
}
.skill-chat-bubble-assistant :deep(.demo-term .t-hd) {
  color: var(--vp-c-text-1);
  font-weight: 700;
}
.skill-chat-bubble-assistant :deep(.demo-term .t-dim) {
  color: var(--vp-c-text-3);
}
.skill-chat-bubble-assistant :deep(.demo-term .t-pos) {
  color: var(--up-color);
}
.skill-chat-bubble-assistant :deep(.demo-term .t-neg) {
  color: var(--down-color);
}
.skill-chat-bubble-assistant :deep(.demo-term .t-hi) {
  color: var(--vp-c-yellow-1);
}
.skill-chat-bubble-assistant :deep(.demo-term .t-c) {
  color: var(--vp-c-indigo-1);
}
</style>
