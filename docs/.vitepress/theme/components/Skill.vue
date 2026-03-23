<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

// ─── i18n ─────────────────────────────────────────────────────────────────────

const isEN = computed(() => lang.value === 'en-US')
const isHK = computed(() => lang.value === 'zh-HK')

const t = {
  badge: computed(() => isEN.value ? 'Longbridge Developers · Skill' : 'Longbridge Developers · Skill'),
  heroTitle1: computed(() => isEN.value ? 'Let AI directly' : '让 AI 直接'),
  heroTitle2: computed(() => isEN.value ? 'quote, trade, and analyze' : '查行情、做交易、读财报'),
  heroSubtitle: computed(() =>
    isEN.value
      ? 'No coding required. With Longbridge Skill, let your AI assistant (OpenClaw, ChatGPT, Claude, etc.) directly access Hong Kong and US stock data and trading capabilities.'
      : isHK.value
        ? '無需編程。透過 Longbridge Skill，讓你的 AI 助手（OpenClaw、ChatGPT、Claude 等）直接存取港美股即時數據與交易能力。'
        : '无需编程。通过 Longbridge Skill，让你的 AI 助手（OpenClaw、ChatGPT、Claude 等）直接访问港美股实时数据与交易能力。'
  ),
  downloadZip: computed(() => isEN.value ? 'Download Skill ZIP' : isHK.value ? '下載 Skill ZIP 包' : '下载 Skill ZIP 包'),
  recommended: computed(() => isEN.value ? 'Recommended' : '推荐'),
  orCli: computed(() => isEN.value ? 'Or install via CLI' : isHK.value ? '或命令行安裝' : '或命令行安装'),
  copy: computed(() => isEN.value ? 'Copy' : '复制'),
  copied: computed(() => isEN.value ? 'Copied!' : '已复制'),
  installGuide: computed(() => isEN.value ? 'View installation guide for each client' : isHK.value ? '查看各客戶端安裝指引' : '查看各客户端安装指引'),
  supportedBy: computed(() => isEN.value ? 'Supported AI tools' : isHK.value ? '支持以下 AI 工具' : '支持以下 AI 工具'),
  scenariosTitle: computed(() => isEN.value ? 'What you can do with natural language' : isHK.value ? '用自然語言，完成以前只有專業系統才能做的事' : '用自然语言，完成以前只有专业系统才能做的事'),
  scenariosSubtitle: computed(() =>
    isEN.value
      ? 'Tell your AI assistant what you want — it calls Longbridge\'s data and trading APIs for you.'
      : isHK.value
        ? '直接告訴你的 AI 助手你想做什麼——它來調用 Longbridge 的數據與交易能力。'
        : '直接告诉你的 AI 助手你想做什么——它来调用 Longbridge 的数据与交易能力。'
  ),
  demoTitle: computed(() => isEN.value ? 'See it in action' : isHK.value ? '了解 Skill 能做什麼' : '了解 Skill 能做什么'),
  demoSubtitle: computed(() => isEN.value ? 'Select a scenario and AI tool to see the live demo' : isHK.value ? '選擇場景，查看你的 AI 助手如何工作' : '选择场景，查看你的 AI 助手如何工作'),
  installTitle: computed(() => isEN.value ? 'Get Started' : '开始安装'),
  installSubtitle: computed(() => isEN.value ? 'Choose your AI tool' : isHK.value ? '選擇你使用的 AI 工具' : '选择你使用的 AI 工具'),
  openclawInstallHint: computed(() =>
    isEN.value
      ? 'Type the following in the OpenClaw chat to install:'
      : isHK.value
        ? '在 OpenClaw 對話框中輸入以下內容，即可完成安裝：'
        : '在 OpenClaw 对话框中输入以下内容，即可完成安装：'
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

const scenarioCards = computed<ScenarioCard[]>(() => isEN.value ? [
  {
    id: 'monitor', color: '#00b8b8',
    label: 'Market Monitor',
    title: 'Track market moves and capital flows in real time',
    desc: 'Query real-time quotes, Level 2 order book depth, and capital flows. Get AI to aggregate multi-dimensional data to help you read market direction.',
    example: '"Which tech stocks saw the most net capital inflow today? What\'s the direction of large orders?"',
  },
  {
    id: 'research', color: '#1890ff',
    label: 'Stock Research',
    title: 'Understand a company from earnings to valuation to news',
    desc: 'Pull earnings reports, SEC filings, announcements and analyst data. AI extracts key metrics, compares competitors, and generates readable investment summaries.',
    example: '"Analyze NVDA: highlights from the latest quarter, whether the valuation is reasonable, and key risks."',
  },
  {
    id: 'trade', color: '#ff5000',
    label: 'Smart Trading',
    title: 'Place, modify, and check orders in one sentence',
    desc: 'No need to open a trading app. Say your intent in the conversation. AI shows order details and asks for confirmation before executing.',
    example: '"Buy 100 shares of AAPL at market price, tell me the current price first."',
  },
  {
    id: 'chart', color: '#4781ff',
    label: 'Chart & Technical Analysis',
    title: 'Use historical data to find timing references',
    desc: 'Get candlestick charts and historical trade data for any timeframe. Let AI analyze trends with technical indicators and highlight key support and resistance levels.',
    example: '"How has TSLA trended in the past 3 months? Is it near a key support or resistance level?"',
  },
  {
    id: 'portfolio', color: '#00b99a',
    label: 'Portfolio & Account',
    title: 'Know your full portfolio and P&L at any time',
    desc: 'Query account balance, stock and fund holdings, and daily trade records. Let AI summarize portfolio performance and identify the main drivers of gains and losses.',
    example: '"How is my portfolio performing today? Which stock contributed the most and which is dragging it down?"',
  },
  {
    id: 'coding', color: '#ff7333',
    label: 'Programming & Automation',
    title: 'Let AI write trading scripts and automation for you',
    desc: 'Describe your needs in natural language. Claude Code or Codex will generate complete Python/Rust programs using the Longbridge SDK — from data pipelines to real-time order systems.',
    example: '"Write a Python script that pulls my holdings after market close each day and saves the P&L and market value to CSV."',
  },
] : [
  {
    id: 'monitor', color: '#00b8b8',
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
    id: 'research', color: '#1890ff',
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
    id: 'trade', color: '#ff5000',
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
    id: 'chart', color: '#4781ff',
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
    id: 'portfolio', color: '#00b99a',
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
    id: 'coding', color: '#ff7333',
    label: isHK.value ? '編程 & 自動化' : '编程 & 自动化',
    title: isHK.value ? '讓 AI 幫你寫交易腳本與自動化策略' : '让 AI 帮你写交易脚本与自动化策略',
    desc: isHK.value
      ? '用自然語言描述需求，借助 Claude Code 或 Codex，AI 生成調用 Longbridge Python/Rust SDK 的完整程序——無論是數據分析腳本、批量下單策略還是實時推送監控。'
      : '用自然语言描述需求，借助 Claude Code 或 Codex，AI 生成调用 Longbridge Python/Rust SDK 的完整程序——无论是数据分析脚本、批量下单策略还是实时推送监控。',
    example: isHK.value
      ? '"幫我寫一個 Python 腳本，每天收盤後自動拉取持倉，把總市值和各股漲跌存入 CSV"'
      : '"帮我写一个 Python 脚本，每天收盘后自动拉取持仓，把总市值和各股涨跌存入 CSV"',
  },
])

interface DemoScenario {
  id: string
  label: string
  messages: DemoMessage[]
}

interface DemoMessage {
  role: 'user' | 'tool' | 'assistant'
  content: string
  command?: string
}

const demoScenarios = computed<DemoScenario[]>(() => [
  {
    id: 'quote',
    label: isEN.value ? 'Live Quote' : isHK.value ? '即時行情' : '实时行情',
    messages: [
      { role: 'user', content: isEN.value ? 'What\'s the current price of NVDA and TSLA?' : isHK.value ? 'NVDA 和 TSLA 現在行情怎麼樣？' : 'NVDA 和 TSLA 现在行情怎么样？' },
      { role: 'tool', command: 'longbridge quote NVDA.US TSLA.US', content: '' },
      {
        role: 'assistant',
        content: isEN.value
          ? 'NVDA.US   $135.82   +2.31%   Vol $40.2B\nTSLA.US   $172.41   −1.08%   Vol $23.1B\n\nNVDA broke above its 5-day high today. TSLA pulled back slightly on broad market sentiment.'
          : isHK.value
            ? 'NVDA.US   $135.82   +2.31%   成交額 $40.2B\nTSLA.US   $172.41   −1.08%   成交額 $23.1B\n\nNVDA 今日突破近 5 日高點，TSLA 受市場情緒拖累小幅回落。'
            : 'NVDA.US   $135.82   +2.31%   成交额 $40.2B\nTSLA.US   $172.41   −1.08%   成交额 $23.1B\n\nNVDA 今日突破近 5 日高点，TSLA 受市场情绪拖累小幅回落。',
      },
    ],
  },
  {
    id: 'trade',
    label: isEN.value ? 'Trading' : isHK.value ? '智能交易' : '智能交易',
    messages: [
      { role: 'user', content: isEN.value ? 'Buy 100 shares of AAPL at market price. Tell me the current price first.' : isHK.value ? '以市價買入 100 股 AAPL，執行前告訴我當前價格' : '以市价买入 100 股 AAPL，执行前告诉我当前价格' },
      { role: 'tool', command: 'longbridge quote AAPL.US', content: '' },
      {
        role: 'assistant',
        content: isEN.value
          ? 'Current AAPL.US: $178.32 (+0.85%)\n\nOrder preview:\n  Buy 100 shares @ market price\n  Est. cost: $17,832\n  Account: Main Account\n\nConfirm execution?'
          : isHK.value
            ? '當前 AAPL.US：$178.32（+0.85%）\n\n訂單預覽：\n  買入 100 股，市價成交\n  預計成本：$17,832\n  賬戶：主賬戶\n\n確認執行？'
            : '当前 AAPL.US：$178.32（+0.85%）\n\n订单预览：\n  买入 100 股，市价成交\n  预计成本：$17,832\n  账户：主账户\n\n确认执行？',
      },
    ],
  },
  {
    id: 'subscribe',
    label: isEN.value ? 'Subscription' : isHK.value ? '行情訂閱' : '行情订阅',
    messages: [
      { role: 'user', content: isEN.value ? 'Subscribe to real-time TSLA quote updates' : isHK.value ? '訂閱 TSLA 的即時行情推送' : '订阅 TSLA 的实时行情推送' },
      { role: 'tool', command: 'longbridge subscribe TSLA.US quote', content: '' },
      {
        role: 'assistant',
        content: isEN.value
          ? 'Subscribed to TSLA.US real-time quote updates.\n\nI\'ll push you notifications when the price moves significantly. You can also ask me to check at any time.'
          : isHK.value
            ? '已訂閱 TSLA.US 即時行情推送。\n\n後續價格出現明顯波動時我會主動推送給你，你也可以隨時查詢。'
            : '已订阅 TSLA.US 实时行情推送。\n\n后续价格出现明显波动时我会主动推送给你，你也可以随时查询。',
      },
    ],
  },
  {
    id: 'research',
    label: isEN.value ? 'Earnings' : isHK.value ? '財報分析' : '财报分析',
    messages: [
      { role: 'user', content: isEN.value ? 'Compare TSLA and NVDA\'s revenue and gross margin from their latest quarters' : isHK.value ? '對比 TSLA 和 NVDA 最新季度的營收和毛利率' : '对比 TSLA 和 NVDA 最新季度的营收和毛利率' },
      { role: 'tool', command: 'longbridge filings TSLA.US NVDA.US', content: '' },
      {
        role: 'assistant',
        content: isEN.value
          ? '              TSLA FY2025    NVDA FY2026\n  Revenue      $94.8B         $215.9B\n  YoY           −3%            +65%\n  Gross Margin  18.0%          71.1%\n  Net Income    $3.8B          $120.1B\n\nNVDA\'s gross margin is 4× TSLA\'s. NVDA data center revenue exceeded TSLA\'s full-year total in a single quarter.'
          : isHK.value
            ? '              TSLA FY2025    NVDA FY2026\n  營收          $94.8B         $215.9B\n  同比           −3%            +65%\n  毛利率         18.0%          71.1%\n  淨利潤         $3.8B          $120.1B\n\nNVDA 毛利率是 TSLA 的 4 倍。NVDA 單季數據中心收入已超過 TSLA 全年總營收。'
            : '              TSLA FY2025    NVDA FY2026\n  营收          $94.8B         $215.9B\n  同比           −3%            +65%\n  毛利率         18.0%          71.1%\n  净利润         $3.8B          $120.1B\n\nNVDA 毛利率是 TSLA 的 4 倍。NVDA 单季数据中心收入已超过 TSLA 全年总营收。',
      },
    ],
  },
])

interface Client {
  id: string
  label: string
  color: string
}

// All clients shown in hero chip row (popularity order)
const heroClients: Client[] = [
  { id: 'openclaw', label: 'OpenClaw', color: '#f59e0b' },
  { id: 'chatgpt', label: 'ChatGPT', color: '#10b981' },
  { id: 'claude', label: 'Claude', color: '#f97316' },
  { id: 'cursor', label: 'Cursor', color: '#1890ff' },
  { id: 'claude-code', label: 'Claude Code', color: '#818cf8' },
  { id: 'zed', label: 'Zed', color: '#00b8b8' },
  { id: 'windsurf', label: 'Windsurf', color: '#4781ff' },
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
const activeInstallClient = ref('openclaw')

// Visible messages for the chat window (built up by animation)
const phase = ref<'idle' | 'user' | 'tool' | 'assistant'>('idle')
const visibleUserMsg = ref('')
const visibleToolCmd = ref('')
const visibleAssistantMsg = ref('')
const toolExpanded = ref(false)

let animTimer: ReturnType<typeof setTimeout> | null = null

function clearAnim() {
  if (animTimer) clearTimeout(animTimer)
  animTimer = null
  phase.value = 'idle'
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

async function typewrite(target: { value: string }, text: string, speed = 28) {
  for (let i = 0; i < text.length; i++) {
    if (phase.value === 'idle') return // aborted
    target.value = text.slice(0, i + 1)
    await delay(speed)
  }
}

async function runAnimation() {
  clearAnim()
  const scenario = demoScenarios.value.find((s) => s.id === activeScenario.value)
  if (!scenario) return

  const [userMsg, toolMsg, assistantMsg] = scenario.messages

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
  phase.value = 'assistant'
  await typewrite(visibleAssistantMsg, assistantMsg.content, 18)
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

const copiedNpx = ref(false)
const copiedOpenclaw = ref(false)

async function copyText(text: string, indicator: { value: boolean }) {
  await navigator.clipboard.writeText(text)
  indicator.value = true
  setTimeout(() => (indicator.value = false), 1500)
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const currentClient = computed(() => clients.find((c) => c.id === activeClient.value) ?? clients[0])
const currentInstallClient = computed(() => clients.find((c) => c.id === activeInstallClient.value) ?? clients[0])
</script>

<template>
  <!-- ─── Hero ──────────────────────────────────────────────────────────────── -->
  <div class="skill-hero border-b border-[var(--vp-c-divider)]">
    <div class="max-w-3xl mx-auto px-6 py-16 text-center">
      <h1 class="skill-title">
        {{ t.heroTitle1.value }}<br />
        <span class="skill-gradient">{{ t.heroTitle2.value }}</span>
      </h1>

      <p class="skill-subtitle">{{ t.heroSubtitle.value }}</p>

      <!-- CTA block -->
      <div class="skill-cta">
        <!-- ZIP download -->
        <a href="#" class="skill-btn-primary">
          {{ t.downloadZip.value }}
          <span class="skill-tag">{{ t.recommended.value }}</span>
        </a>

        <!-- Divider -->
        <div class="skill-divider">
          <span class="skill-divider-line" />
          <span class="skill-divider-text">{{ t.orCli.value }}</span>
          <span class="skill-divider-line" />
        </div>

        <!-- npx command -->
        <div class="skill-cmd-block">
          <code class="skill-cmd-text">{{ npxCommand }}</code>
          <button class="skill-copy-btn" @click="copyText(npxCommand, copiedNpx)">
            {{ copiedNpx ? t.copied.value : t.copy.value }}
          </button>
        </div>

        <!-- Guide link -->
        <a href="#install" class="skill-guide-link">{{ t.installGuide.value }}</a>
      </div>

      <!-- Client labels -->
      <div class="skill-clients-label">{{ t.supportedBy.value }}</div>
      <div class="skill-clients-row">
        <span v-for="c in heroClients" :key="c.id" class="skill-client-chip" :style="{ color: c.color }">
          {{ c.label }}
        </span>
        <span class="skill-client-chip skill-client-more">
          {{ isEN.value ? '+ More' : '+ 更多' }}
        </span>
      </div>
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
          <p class="skill-card-desc">{{ card.desc }}</p>
          <div class="skill-card-example">
            <span class="skill-card-example-hint">{{ isEN.value ? 'Example' : '示例' }}</span>
            <span class="skill-card-example-text">{{ card.example }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ─── Demo ──────────────────────────────────────────────────────────────── -->
  <div class="skill-section skill-section-dark">
    <div class="skill-section-inner">
      <div class="skill-section-header">
        <h2 class="skill-section-title">{{ t.demoTitle.value }}</h2>
        <p class="skill-section-sub">{{ t.demoSubtitle.value }}</p>
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
              @click="activeScenario = s.id"
            >
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
                :style="activeClient === c.id ? { background: c.color, color: c.id === 'openclaw' ? '#000' : '#fff' } : {}"
                @click="activeClient = c.id"
              >
                {{ c.label }}
              </button>
            </div>

            <!-- Chat window -->
            <div class="skill-chat-window">
              <!-- Chrome bar -->
              <div class="skill-chat-chrome">
                <span class="skill-chat-dot" />
                <span class="skill-chat-dot" />
                <span class="skill-chat-dot" />
                <span class="skill-chat-app-name" :style="{ color: currentClient.color }">
                  {{ currentClient.label }}
                </span>
              </div>

              <!-- Messages -->
              <div class="skill-chat-body">
                <!-- User message -->
                <div v-if="phase !== 'idle'" class="skill-chat-user">
                  <div class="skill-chat-bubble skill-chat-bubble-user">{{ visibleUserMsg }}<span class="skill-cursor" /></div>
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
                    <pre class="skill-chat-pre">{{ visibleAssistantMsg }}<span v-if="visibleAssistantMsg.length < (demoScenarios.find(s => s.id === activeScenario)?.messages[2]?.content.length ?? 0)" class="skill-cursor" /></pre>
                  </div>
                </div>

                <!-- Idle state -->
                <div v-if="phase === 'idle'" class="skill-chat-idle">
                  <span class="skill-thinking-dot" /><span class="skill-thinking-dot" /><span class="skill-thinking-dot" />
                </div>
              </div>

              <!-- Input bar -->
              <div class="skill-chat-input-bar">
                <div class="skill-chat-input-placeholder">
                  {{ isEN.value ? 'Ask anything about markets...' : isHK.value ? '輸入你的問題...' : '输入你的问题...' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
    </div>
  </div>

  <!-- ─── Install ───────────────────────────────────────────────────────────── -->
  <div id="install" class="skill-section">
    <div class="skill-section-inner">
      <div class="skill-section-header">
        <h2 class="skill-section-title">{{ t.installTitle.value }}</h2>
        <p class="skill-section-sub">{{ t.installSubtitle.value }}</p>
      </div>

      <!-- Client tabs -->
      <div class="skill-install-tabs">
        <button
          v-for="c in clients"
          :key="c.id"
          class="skill-install-tab"
          :class="{ 'skill-install-tab-active': activeInstallClient === c.id }"
          @click="activeInstallClient = c.id"
        >
          {{ c.label }}
        </button>
      </div>

      <!-- Panel -->
      <div class="skill-install-panel">
        <!-- OpenClaw: conversational install -->
        <template v-if="activeInstallClient === 'openclaw'">
          <p class="skill-install-hint">{{ t.openclawInstallHint.value }}</p>
          <div class="skill-cmd-block">
            <code class="skill-cmd-text">{{ openclawCommand }}</code>
            <button class="skill-copy-btn" @click="copyText(openclawCommand, copiedOpenclaw)">
              {{ copiedOpenclaw ? t.copied.value : t.copy.value }}
            </button>
          </div>
        </template>

        <!-- Others: ZIP + npx -->
        <template v-else>
          <div class="skill-install-cta">
            <a href="#" class="skill-btn-primary">
              {{ t.downloadZip.value }}
              <span class="skill-tag">{{ t.recommended.value }}</span>
            </a>
            <div class="skill-divider">
              <span class="skill-divider-line" />
              <span class="skill-divider-text">{{ t.orCli.value }}</span>
              <span class="skill-divider-line" />
            </div>
            <div class="skill-cmd-block">
              <code class="skill-cmd-text">{{ npxCommand }}</code>
              <button class="skill-copy-btn" @click="copyText(npxCommand, copiedNpx)">
                {{ copiedNpx ? t.copied.value : t.copy.value }}
              </button>
            </div>
          </div>
        </template>
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
  border-bottom: 1px solid var(--vp-c-divider);
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
.skill-section-title {
  font-size: 1.5rem;
  font-weight: 700;
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
@media (max-width: 768px) {
  .skill-title { font-size: 1.875rem; }
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
  color: #fff;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.15s;
}
.skill-btn-primary:hover { opacity: 0.9; }
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
  font-size: 0.8125rem;
  color: var(--vp-c-brand-1);
  word-break: break-all;
}
.skill-copy-btn {
  flex-shrink: 0;
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
.skill-copy-btn:hover { color: var(--vp-c-text-1); }
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
}
.skill-client-more {
  color: var(--vp-c-text-3) !important;
  font-weight: 400;
}

/* ─── Scenario cards ─────────────────────────────────────────────────────── */
.skill-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
@media (max-width: 768px) {
  .skill-cards-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .skill-cards-grid { grid-template-columns: repeat(1, 1fr); }
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
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.skill-card-title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.35;
  border: none;
  padding: 0;
  margin: 0;
}
.skill-card-desc {
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  flex: 1;
}
.skill-card-example {
  padding: 10px 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  margin-top: 8px;
}
.skill-card-example-hint {
  display: block;
  font-size: 0.6875rem;
  color: var(--vp-c-text-3);
  margin-bottom: 3px;
}
.skill-card-example-text {
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}

/* ─── Demo layout ────────────────────────────────────────────────────────── */
.skill-demo {
  display: flex;
  gap: 16px;
  min-height: 420px;
}
.skill-demo-scenarios {
  width: 140px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
@media (max-width: 768px) {
  .skill-demo { flex-direction: column; }
  .skill-demo-scenarios { width: 100%; flex-direction: row; flex-wrap: wrap; }
}
.skill-demo-scenario-btn {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
}
.skill-demo-scenario-btn:hover { color: var(--vp-c-text-1); border-color: var(--vp-c-brand-1); }
.skill-demo-scenario-active {
  background: var(--vp-c-brand-soft) !important;
  border-color: var(--vp-c-brand-1) !important;
  color: var(--vp-c-brand-1) !important;
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
  gap: 6px;
  flex-wrap: wrap;
}
.skill-demo-client-tab {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  padding: 5px 12px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.15s;
}
.skill-demo-client-active {
  font-weight: 700;
  border-color: transparent !important;
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
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.skill-chat-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--vp-c-divider);
  flex-shrink: 0;
}
.skill-chat-app-name {
  margin-left: 8px;
  font-size: 0.75rem;
  font-weight: 600;
}
.skill-chat-body {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
}
.skill-chat-user { display: flex; justify-content: flex-end; }
.skill-chat-bubble {
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 0.875rem;
  max-width: 72%;
  line-height: 1.5;
}
.skill-chat-bubble-user {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-radius: 12px 12px 2px 12px;
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
  transition: max-height 0.3s ease, opacity 0.3s;
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
.skill-chat-assistant {}
.skill-chat-bubble-assistant {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-radius: 2px 12px 12px 12px;
  max-width: 85%;
}
.skill-chat-pre {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
}
.skill-chat-input-bar {
  border-top: 1px solid var(--vp-c-divider);
  padding: 10px 14px;
  display: flex;
  gap: 8px;
  align-items: center;
}
.skill-chat-input-placeholder {
  flex: 1;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 7px 12px;
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
}
.skill-chat-idle {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  flex: 1;
}

/* Typewriter cursor */
.skill-cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background: currentColor;
  vertical-align: text-bottom;
  animation: skill-blink 0.8s step-end infinite;
  margin-left: 1px;
}
@keyframes skill-blink {
  50% { opacity: 0; }
}

/* Thinking dots */
.skill-thinking-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
  animation: skill-dot-pulse 1.2s ease-in-out infinite;
}
.skill-thinking-dot:nth-child(2) { animation-delay: 0.2s; }
.skill-thinking-dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes skill-dot-pulse {
  0%, 60%, 100% { opacity: 0.3; transform: scale(1); }
  30% { opacity: 1; transform: scale(1.25); }
}

/* ─── Install section ────────────────────────────────────────────────────── */
.skill-install-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 0;
  flex-wrap: wrap;
}
.skill-install-tab {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-bottom: none;
  border-right: none;
  padding: 7px 16px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.15s;
}
.skill-install-tab:last-child { border-right: 1px solid var(--vp-c-divider); }
.skill-install-tab:first-child { border-radius: 6px 0 0 0; }
.skill-install-tab:last-child { border-radius: 0 6px 0 0; }
.skill-install-tab-active {
  background: var(--vp-c-bg) !important;
  color: var(--vp-c-text-1) !important;
  font-weight: 700;
}
.skill-install-panel {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0 8px 8px 8px;
  padding: 28px;
}
.skill-install-hint {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-bottom: 14px;
  text-align: center;
}
.skill-install-cta {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 480px;
  margin: 0 auto;
}
</style>
