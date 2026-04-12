<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Feature items with corresponding terminal demos
const features = [
  {
    key: 'feat1',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
    // Terminal: show command categories — from docs/en/docs/cli/index.md
    terminal: [
      { type: 'cmd', text: '$ longbridge help' },
      { type: 'blank', text: '' },
      { type: 'comment', text: '  Market Data    quote kline depth trades intraday brokers' },
      { type: 'comment', text: '  Trading        order portfolio positions assets' },
      { type: 'comment', text: '  Fundamentals   valuation dividend financial-report' },
      { type: 'comment', text: '  Derivatives    option warrant' },
      { type: 'comment', text: '  Research       news filing insider-trades investors' },
      { type: 'comment', text: '  System         login logout check update tui' },
    ],
  },
  {
    key: 'feat2',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    // Terminal: TUI features — from docs/en/docs/cli/tui.md
    terminal: [
      { type: 'cmd', text: '$ longbridge tui' },
      { type: 'blank', text: '' },
      { type: 'data', text: '  ┌─ Watchlist ──────────────────────────┐' },
      { type: 'data', text: '  │ TSLA.US   345.62  +0.69%  62.1M     │' },
      { type: 'data', text: '  │ NVDA.US   183.91  +1.01%  116.4M  ◀ │' },
      { type: 'data', text: '  │ 700.HK    388.40  -0.51%  12.8M     │' },
      { type: 'data', text: '  └──────────────────────────────────────┘' },
      { type: 'comment', text: '  j/k navigate  Enter chart  / search  q quit' },
    ],
  },
  {
    key: 'feat3',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/></svg>`,
    // Terminal: JSON output — from docs/en/docs/cli/market-data/quote.md
    terminal: [
      { type: 'cmd', text: '$ longbridge quote TSLA.US --format json' },
      { type: 'json', text: '{ "secu_quote": [{' },
      { type: 'json', text: '    "symbol": "TSLA.US",' },
      { type: 'json', text: '    "last_done": "345.620",' },
      { type: 'json', text: '    "prev_close": "343.250",' },
      { type: 'json', text: '    "open": "343.150",' },
      { type: 'json', text: '    "high": "348.880",' },
      { type: 'json', text: '    "low": "337.250",' },
      { type: 'json', text: '    "volume": 62164016,' },
      { type: 'json', text: '    "turnover": "21375312140.000"' },
      { type: 'json', text: '}]}' },
    ],
  },
  {
    key: 'feat4',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
    // Terminal: OAuth device code flow — from docs/en/docs/cli/install.md
    terminal: [
      { type: 'cmd', text: '$ longbridge login' },
      { type: 'blank', text: '' },
      { type: 'comment', text: '  Visit this URL in your browser:' },
      { type: 'data', text: '  https://open.longbridge.com/oauth/device' },
      { type: 'blank', text: '' },
      { type: 'comment', text: '  Your device code:  ABCD-1234' },
      { type: 'blank', text: '' },
      { type: 'comment', text: '  Waiting for authorization...' },
      { type: 'data', text: '  ✓ Token saved to ~/.longbridge/openapi/tokens/' },
    ],
  },
]

const activeFeature = ref(0)
const terminalLines = computed(() => features[activeFeature.value].terminal)

// Typing animation
const visibleCount = ref(0)
let interval: ReturnType<typeof setInterval> | undefined

function startTyping() {
  visibleCount.value = 0
  if (interval) clearInterval(interval)
  interval = setInterval(() => {
    visibleCount.value++
    if (visibleCount.value >= terminalLines.value.length) {
      clearInterval(interval)
    }
  }, 120)
}

watch(activeFeature, () => startTyping())
onMounted(() => startTyping())

// Copy command
const copiedCmd = ref(false)
function copyCmd() {
  const cmd = terminalLines.value.find(l => l.type === 'cmd')
  if (cmd) {
    navigator.clipboard.writeText(cmd.text.replace(/^\$ /, ''))
    copiedCmd.value = true
    setTimeout(() => { copiedCmd.value = false }, 2000)
  }
}

// Copy install
const copiedInstall = ref(false)
function copyInstall() {
  navigator.clipboard.writeText('brew install --cask longbridge/tap/longbridge-terminal')
  copiedInstall.value = true
  setTimeout(() => { copiedInstall.value = false }, 2000)
}
</script>

<template>
  <section class="cli-section">
    <div class="cli-container">
      <!-- Left -->
      <div class="cli-text">
        <div class="cli-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
          <span>Command Line</span>
        </div>

        <h2 class="cli-title">{{ $t('product.cli.title') }}</h2>
        <p class="cli-subtitle">{{ $t('product.cli.subtitle') }}</p>

        <!-- Feature list — click/hover to switch terminal content -->
        <div class="cli-features">
          <button
            v-for="(feat, idx) in features"
            :key="feat.key"
            class="cli-feat"
            :class="{ active: activeFeature === idx }"
            @mouseenter="activeFeature = idx"
            @click="activeFeature = idx"
          >
            <span class="cli-feat-icon" v-html="feat.icon" />
            <span class="cli-feat-label">{{ $t(`product.cli.${feat.key}`) }}</span>
          </button>
        </div>

        <!-- Install -->
        <div class="cli-install">
          <div class="cli-install-cmd">
            <code>$ brew install --cask longbridge/tap/longbridge-terminal</code>
            <button class="cli-copy-btn" @click="copyInstall">
              <svg v-if="copiedInstall" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            </button>
          </div>
        </div>

        <a href="/docs/cli" class="cli-cta">
          {{ $t('product.cli.cta') }}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>

      <!-- Right: Terminal -->
      <ClientOnly>
        <div class="cli-terminal">
          <div class="cli-bar">
            <div class="cli-dots"><span /><span /><span /></div>
            <span class="cli-bar-title">longbridge — zsh</span>
            <button class="cli-bar-copy" @click="copyCmd">
              <svg v-if="copiedCmd" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            </button>
          </div>
          <div class="cli-body">
            <Transition name="cli-fade" mode="out-in">
              <div :key="activeFeature">
                <div
                  v-for="(line, i) in terminalLines"
                  :key="i"
                  class="cli-line"
                  :class="[`cli-line-${line.type}`, { visible: i < visibleCount }]"
                >{{ line.text }}</div>
                <span v-if="visibleCount >= terminalLines.length" class="cli-cursor">█</span>
              </div>
            </Transition>
          </div>
        </div>
      </ClientOnly>
    </div>
  </section>
</template>

<style scoped>
.cli-section { padding: 4rem 0; background: var(--vp-c-bg-soft); }

.cli-container {
  display: flex; align-items: center; gap: 2.5rem;
  max-width: 64rem; margin: 0 auto; padding: 0 1.5rem;
}

.cli-text { flex: 1; min-width: 0; }

.cli-badge {
  display: inline-flex; align-items: center; gap: 0.375rem;
  padding: 0.25rem 0.75rem; border-radius: 9999px;
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);
  font-size: 0.75rem; font-weight: 600; color: var(--vp-c-text-3); margin-bottom: 1rem;
}

.cli-title { font-size: 1.75rem; font-weight: 700; color: var(--vp-c-text-1); letter-spacing: -0.02em; }
.cli-subtitle { margin-top: 0.25rem; font-size: 0.95rem; font-weight: 600; color: var(--brand-color); line-height: 1.4; }

/* Feature list — interactive */
.cli-features { margin-top: 1.25rem; display: flex; flex-direction: column; gap: 0.25rem; }

.cli-feat {
  display: flex; align-items: flex-start; gap: 0.625rem;
  padding: 0.5rem 0.75rem; border-radius: 0.5rem;
  font-size: 0.85rem; color: var(--vp-c-text-2); line-height: 1.4;
  background: transparent; border: 1px solid transparent;
  cursor: pointer; text-align: left; transition: all 0.2s;
}

.cli-feat:hover { background: var(--vp-c-bg); border-color: var(--vp-c-divider); }

.cli-feat.active {
  background: var(--vp-c-bg);
  border-color: var(--brand-color);
  color: var(--vp-c-text-1);
}

.cli-feat.active .cli-feat-icon { color: var(--brand-color); }

.cli-feat-icon {
  display: flex; width: 1.125rem; height: 1.125rem;
  color: var(--vp-c-text-3); flex-shrink: 0; margin-top: 0.1rem; transition: color 0.2s;
}
.cli-feat-icon :deep(svg) { width: 100%; height: 100%; }

.cli-feat-label { flex: 1; }

/* Install */
.cli-install { margin-top: 1.25rem; }

.cli-install-cmd {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.5rem 0.75rem; border-radius: 0.5rem;
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);
}

.cli-install-cmd code { font-size: 0.75rem; font-family: var(--vp-font-family-mono); color: var(--vp-c-text-2); }

.cli-copy-btn {
  display: flex; align-items: center; justify-content: center;
  width: 1.75rem; height: 1.75rem; border-radius: 0.375rem;
  color: var(--vp-c-text-3); background: transparent;
  border: 1px solid var(--vp-c-divider); cursor: pointer; transition: all 0.2s;
}
.cli-copy-btn:hover { border-color: var(--brand-color); color: var(--brand-color); }
.cli-copy-btn:active { transform: scale(0.9); }

.cli-cta {
  display: inline-flex; align-items: center; gap: 0.375rem; margin-top: 1.25rem;
  font-size: 0.9rem; font-weight: 600; color: var(--brand-color);
  text-decoration: none !important; transition: gap 0.2s;
}
.cli-cta:hover { gap: 0.625rem; }

/* Terminal */
.cli-terminal {
  flex: 0 0 26rem; border-radius: 0.75rem;
  border: 1px solid rgba(255,255,255,0.08); overflow: hidden; background: #1a1b26;
}

.cli-bar {
  display: flex; align-items: center; padding: 0.5rem 0.75rem;
  background: #15161e; border-bottom: 1px solid #2a2b3d;
}

.cli-dots { display: flex; gap: 0.375rem; }
.cli-dots span { width: 0.625rem; height: 0.625rem; border-radius: 50%; }
.cli-dots span:nth-child(1) { background: #ff5f57; }
.cli-dots span:nth-child(2) { background: #febc2e; }
.cli-dots span:nth-child(3) { background: #28c840; }

.cli-bar-title { flex: 1; text-align: center; font-size: 0.7rem; color: #565869; font-weight: 500; }

.cli-bar-copy {
  display: flex; align-items: center; justify-content: center;
  width: 1.25rem; height: 1.25rem; border-radius: 0.25rem;
  color: #565869; background: transparent; border: none; cursor: pointer; transition: all 0.2s;
}
.cli-bar-copy:hover { color: #7aa2f7; }
.cli-bar-copy:active { transform: scale(0.85); }

.cli-body {
  padding: 0.75rem 1rem;
  font-family: "SF Mono", "Fira Code", monospace;
  font-size: 0.72rem; line-height: 1.6; min-height: 14rem; color: #a9b1d6;
}

.cli-line {
  white-space: pre; opacity: 0; transform: translateY(4px);
  transition: opacity 0.12s, transform 0.12s;
}
.cli-line.visible { opacity: 1; transform: translateY(0); }

.cli-line-cmd { color: #7aa2f7; }
.cli-line-header { color: #565869; }
.cli-line-sep { color: #3b3d57; }
.cli-line-data { color: #9ece6a; }
.cli-line-json { color: #e0af68; }
.cli-line-comment { color: #565869; }
.cli-line-blank { height: 0.75em; }

.cli-cursor { color: #7aa2f7; animation: blink 1s step-end infinite; }
@keyframes blink { 50% { opacity: 0; } }

/* Terminal content transition */
.cli-fade-enter-active, .cli-fade-leave-active { transition: opacity 0.15s; }
.cli-fade-enter-from, .cli-fade-leave-to { opacity: 0; }

/* Responsive */
@media (max-width: 768px) {
  .cli-container { flex-direction: column; }
  .cli-terminal { flex: none; width: 100%; }
}
</style>
