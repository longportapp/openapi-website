import type MarkdownIt from 'markdown-it'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}


function getInstallLabel(localeIndex: string): string {
  switch (localeIndex) {
    case 'zh-CN': return '安装 CLI'
    case 'zh-HK': return '安裝 CLI'
    default: return 'Install CLI'
  }
}

function getInstallUrl(localeIndex: string): string {
  switch (localeIndex) {
    case 'zh-CN': return '/zh-CN/docs/cli'
    case 'zh-HK': return '/zh-HK/docs/cli'
    default: return '/docs/cli'
  }
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

function generateCliBlock(content: string, installLabel: string, installUrl: string): string {
  const lines = content
    .split('\n')
    .map(renderLine)
    .filter(Boolean)
    .join('\n')

  return (
    `<div class="vp-cli-command">` +
    `<h2>CLI<a href="${installUrl}" class="vp-cli-install-link">${escapeHtml(installLabel)}</a></h2>` +
    `<div class="language-bash vp-adaptive-theme">` +
    `<span class="lang">bash</span>` +
    `<pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0">` +
    `<code>${lines}</code></pre></div>` +
    `</div>`
  )
}

function replaceCliCommand(src: string, installLabel: string, installUrl: string): string {
  return src.replace(
    /<CliCommand>([\s\S]*?)<\/CliCommand>/g,
    (_, content: string) => generateCliBlock(content.trim(), installLabel, installUrl),
  )
}

export function CliCommandPlugin(md: MarkdownIt) {
  md.core.ruler.push('cli_command', (state) => {
    const localeIndex: string = state.env?.localeIndex ?? 'root'
    const installLabel = getInstallLabel(localeIndex)
    const installUrl = getInstallUrl(localeIndex)

    let i = 0
    while (i < state.tokens.length) {
      const token = state.tokens[i]

      // Case 1: already an html_block (e.g. multiline <CliCommand>)
      if (token.type === 'html_block' && token.content.includes('<CliCommand>')) {
        token.content = replaceCliCommand(token.content, installLabel, installUrl)
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
        const replaced = replaceCliCommand(state.tokens[i + 1].content, installLabel, installUrl)
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
