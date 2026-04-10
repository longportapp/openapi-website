import type MarkdownIt from 'markdown-it'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Map CLI subcommand names to their doc page paths (locale-independent)
const CLI_COMMAND_MAP: Record<string, string> = {
  // Market Data
  quote: '/docs/cli/market-data/quote',
  depth: '/docs/cli/market-data/depth',
  kline: '/docs/cli/market-data/kline',
  trades: '/docs/cli/market-data/trades',
  brokers: '/docs/cli/market-data/brokers',
  intraday: '/docs/cli/market-data/intraday',
  static: '/docs/cli/market-data/static',
  'market-temp': '/docs/cli/market-data/market-temp',
  'calc-index': '/docs/cli/market-data/calc-index',
  capital: '/docs/cli/market-data/capital',
  trading: '/docs/cli/market-data/trading',
  participants: '/docs/cli/market-data/participants',
  'security-list': '/docs/cli/market-data/security-list',
  subscriptions: '/docs/cli/market-data/subscriptions',
  // Derivatives
  option: '/docs/cli/derivatives/option',
  warrant: '/docs/cli/derivatives/warrant',
  // Content
  news: '/docs/cli/content/news',
  topic: '/docs/cli/content/topic',
  topics: '/docs/cli/content/topic',
  filing: '/docs/cli/content/filing',
  // Watchlist
  watchlist: '/docs/cli/watchlist/watchlist',
  // Account
  assets: '/docs/cli/account/assets',
  positions: '/docs/cli/account/positions',
  'fund-positions': '/docs/cli/account/fund-positions',
  'cash-flow': '/docs/cli/account/cash-flow',
  portfolio: '/docs/cli/account/portfolio',
  // Orders
  order: '/docs/cli/orders/order',
  orders: '/docs/cli/orders/order',
  buy: '/docs/cli/orders/order',
  sell: '/docs/cli/orders/order',
  cancel: '/docs/cli/orders/order',
  replace: '/docs/cli/orders/order',
  executions: '/docs/cli/orders/order',
  'max-qty': '/docs/cli/orders/max-qty',
  'margin-ratio': '/docs/cli/orders/margin-ratio',
  'exchange-rate': '/docs/cli/orders/exchange-rate',
}

function getLocalePrefix(localeIndex: string): string {
  switch (localeIndex) {
    case 'zh-CN': return '/zh-CN'
    case 'zh-HK': return '/zh-HK'
    default: return ''
  }
}

function getInstallLabel(localeIndex: string): string {
  switch (localeIndex) {
    case 'zh-CN': return '安装'
    case 'zh-HK': return '安裝'
    default: return 'Install'
  }
}

function getUsageLabel(localeIndex: string): string {
  switch (localeIndex) {
    case 'zh-CN': return '使用文档'
    case 'zh-HK': return '使用文件'
    default: return 'Usage'
  }
}

function getInstallUrl(localeIndex: string): string {
  return `${getLocalePrefix(localeIndex)}/docs/cli/installation`
}

function extractFirstCommand(content: string): string | null {
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const parts = trimmed.split(/\s+/)
    if (parts[0] === 'longbridge' && parts[1]) return parts[1]
  }
  return null
}

function getUsageUrl(cmd: string, localeIndex: string): string | null {
  const path = CLI_COMMAND_MAP[cmd]
  if (!path) return null
  return `${getLocalePrefix(localeIndex)}${path}`
}

// Colors matching github-light / github-dark shiki themes (auto-switch via CSS vars)
const C = {
  binary: 'style="--shiki-light:#6f42c1;--shiki-dark:#b392f0"', // purple
  subcmd: 'style="--shiki-light:#005cc5;--shiki-dark:#79b8ff"', // blue
  args:   'style="--shiki-light:#24292e;--shiki-dark:#e1e4e8"', // default text
} as const

// Colors for inline comments (the # ... part at end of a command line)
const C_comment = 'style="--shiki-light:#6a737d;--shiki-dark:#6a737d"' // gray

function renderLine(line: string): string {
  const trimmed = line.trim()
  if (!trimmed) return ''

  // Pure comment lines (start with #)
  if (trimmed.startsWith('#')) {
    return `<span class="line"><span ${C_comment}>${escapeHtml(trimmed)}</span></span>`
  }

  // Split command from inline comment (# ...)
  const commentIdx = trimmed.indexOf('  #')
  const command = commentIdx >= 0 ? trimmed.slice(0, commentIdx).trimEnd() : trimmed
  const comment = commentIdx >= 0 ? trimmed.slice(commentIdx) : ''

  const parts = command.split(/\s+/)
  if (parts[0] !== 'longbridge') {
    return `<span class="line"><span ${C.args}>${escapeHtml(command)}</span>${comment ? `<span ${C_comment}>${escapeHtml(comment)}</span>` : ''}</span>`
  }

  let html = `<span class="line"><span ${C.binary}>${escapeHtml(parts[0])}</span>`
  if (parts.length > 1) {
    html += ` <span ${C.subcmd}>${escapeHtml(parts[1])}</span>`
    if (parts.length > 2) {
      html += ` <span ${C.args}>${escapeHtml(parts.slice(2).join(' '))}</span>`
    }
  }
  if (comment) {
    html += `<span ${C_comment}>${escapeHtml(comment)}</span>`
  }
  return html + '</span>'
}

function generateCliBlock(content: string, installLabel: string, installUrl: string, usageLabel: string, usageUrl: string | null): string {
  const lines = content
    .split('\n')
    .map(renderLine)
    .filter(Boolean)
    .join('\n')

  const links = usageUrl
    ? `<a href="${usageUrl}" class="vp-cli-usage-link">${escapeHtml(usageLabel)}</a><span class="vp-cli-link-sep"> | </span><a href="${installUrl}" class="vp-cli-install-link">${escapeHtml(installLabel)}</a>`
    : `<a href="${installUrl}" class="vp-cli-install-link">${escapeHtml(installLabel)}</a>`

  return (
    `<div class="vp-cli-command">` +
    `<h2>CLI<span class="vp-cli-links">${links}</span></h2>` +
    `<div class="language-bash vp-adaptive-theme">` +
    `<span class="lang">bash</span>` +
    `<pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0">` +
    `<code>${lines}</code></pre></div>` +
    `</div>`
  )
}

function replaceCliCommand(src: string, installLabel: string, installUrl: string, usageLabel: string, localeIndex: string): string {
  return src.replace(
    /<CliCommand>([\s\S]*?)<\/CliCommand>/g,
    (_, content: string) => {
      const trimmed = content.trim()
      const cmd = extractFirstCommand(trimmed)
      const usageUrl = cmd ? getUsageUrl(cmd, localeIndex) : null
      return generateCliBlock(trimmed, installLabel, installUrl, usageLabel, usageUrl)
    },
  )
}

export function CliCommandPlugin(md: MarkdownIt) {
  md.core.ruler.push('cli_command', (state) => {
    const localeIndex: string = state.env?.localeIndex ?? 'root'
    const installLabel = getInstallLabel(localeIndex)
    const installUrl = getInstallUrl(localeIndex)
    const usageLabel = getUsageLabel(localeIndex)

    let i = 0
    while (i < state.tokens.length) {
      const token = state.tokens[i]

      // Case 1: already an html_block (e.g. multiline <CliCommand>)
      if (token.type === 'html_block' && token.content.includes('<CliCommand>')) {
        token.content = replaceCliCommand(token.content, installLabel, installUrl, usageLabel, localeIndex)
        i++
        continue
      }

      // Case 2: single-line <CliCommand> parsed as paragraph > inline
      if (
        token.type === 'paragraph_open' &&
        state.tokens[i + 1]?.type === 'inline' &&
        state.tokens[i + 1].content.includes('<CliCommand>') &&
        state.tokens[i + 2]?.type === 'paragraph_close'
      ) {
        const replaced = replaceCliCommand(state.tokens[i + 1].content, installLabel, installUrl, usageLabel, localeIndex)
        const htmlToken = new state.Token('html_block', '', 0)
        htmlToken.content = replaced
        state.tokens.splice(i, 3, htmlToken)
        i++
        continue
      }

      i++
    }
  })
}
