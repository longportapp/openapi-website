<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const activeCapIdx = ref(0)
const activeAgent = ref(0)
const installTab = ref<'npx' | 'bun'>('npx')

const caps = ['cap1', 'cap2', 'cap3', 'cap4', 'cap5', 'cap6']

const agents = [
  { name: 'Claude Code', method: 'CLI' },
  { name: 'Cursor', method: 'MCP' },
  { name: 'Codex', method: 'CLI' },
  { name: 'Claude Desktop', method: 'MCP' },
]

// AI responses — from SKILL.md Investment Analysis Workflow
const aiSteps: Record<string, string[]> = {
  cap1: ['longbridge quote ... --format json', 'longbridge valuation ...', 'Filtering: market cap > $50B, P/E < 25, MACD golden cross...', 'Found 12 matches across US and HK markets.'],
  cap2: ['longbridge kline TSLA.US --period day', 'longbridge kline TSLA.US --period 1h', 'MACD: bullish crossover on daily. KDJ: overbought. RSI: 62.', 'Support at 337.25, resistance at 348.88.'],
  cap3: ['longbridge financial-report NVDA.US --type quarterly', 'longbridge consensus NVDA.US', 'Revenue: $35.1B vs $33.2B est (+5.7% beat)', 'P/E forward: 28.4x — above sector median 24.1x'],
  cap4: ['longbridge insider-trades AAPL.US', 'longbridge investors', '3 insider sells in past 30 days (routine RSU)', 'Top 20 institutions: +2.1% net increase QoQ'],
  cap5: ['Preparing: TSLA.US trailing stop -8%', 'Order type: Trailing Stop Loss', 'Trigger: if price drops 8% from peak', '⚠ Awaiting your confirmation to execute.'],
  cap6: ['longbridge portfolio', 'longbridge positions', 'Monthly P&L: +$3,240 (+4.2%)', 'Top: NVDA +12.3% | Bottom: 700.HK -3.1%'],
}

// Typing effect
const typedPrompt = ref('')
const streamLines = ref<string[]>([])
const streaming = ref(false)
let typeTimer: ReturnType<typeof setInterval> | undefined
let streamTimer: ReturnType<typeof setInterval> | undefined

function startDemo() {
  // Clear
  typedPrompt.value = ''
  streamLines.value = []
  streaming.value = false
  if (typeTimer) clearInterval(typeTimer)
  if (streamTimer) clearInterval(streamTimer)

  const fullPrompt = t(`product.skill.${caps[activeCapIdx.value]}.example`)
  let charIdx = 0

  // Phase 1: type prompt
  typeTimer = setInterval(() => {
    charIdx += 2
    typedPrompt.value = fullPrompt.substring(0, charIdx)
    if (charIdx >= fullPrompt.length) {
      clearInterval(typeTimer)
      // Phase 2: stream AI response
      setTimeout(() => {
        streaming.value = true
        const steps = aiSteps[caps[activeCapIdx.value]]
        let stepIdx = 0
        streamTimer = setInterval(() => {
          if (stepIdx < steps.length) {
            streamLines.value.push(steps[stepIdx])
            stepIdx++
          } else {
            clearInterval(streamTimer)
          }
        }, 400)
      }, 300)
    }
  }, 25)
}

watch([activeCapIdx, activeAgent], () => startDemo())
onMounted(() => startDemo())

const copiedPrompt = ref(false)
function copyPrompt() {
  navigator.clipboard.writeText(t(`product.skill.${caps[activeCapIdx.value]}.example`))
  copiedPrompt.value = true
  setTimeout(() => { copiedPrompt.value = false }, 2000)
}

const copiedInstall = ref(false)
function copyInstall() {
  const cmd = installTab.value === 'npx' ? 'npx skills add longbridge/developers -g -y' : 'bunx skills add longbridge/developers -g -y'
  navigator.clipboard.writeText(cmd)
  copiedInstall.value = true
  setTimeout(() => { copiedInstall.value = false }, 2000)
}
</script>

<template>
  <section class="skill-section">
    <!-- Header -->
    <div class="skill-header">
      <div class="skill-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M12 2a4 4 0 014 4v1a1 1 0 001 1h1a4 4 0 010 8h-1a1 1 0 00-1 1v1a4 4 0 01-8 0v-1a1 1 0 00-1-1H6a4 4 0 010-8h1a1 1 0 001-1V6a4 4 0 014-4z"/><circle cx="12" cy="12" r="2"/></svg>
        <span>AI Skill</span>
      </div>
      <h2 class="skill-title">{{ $t('product.skill.title') }}</h2>
      <p class="skill-subtitle">{{ $t('product.skill.subtitle') }}</p>
      <p class="skill-desc">{{ $t('product.skill.desc') }}</p>
      <p class="skill-desc-extra">Following community standards — install once, works across all Skill-compatible AI agents. No vendor lock-in.</p>
    </div>

    <!-- Install (below intro) -->
    <div class="skill-install-bar">
      <div class="skill-install-tabs">
        <button class="skill-install-tab" :class="{ active: installTab === 'npx' }" @click="installTab = 'npx'">npx</button>
        <button class="skill-install-tab" :class="{ active: installTab === 'bun' }" @click="installTab = 'bun'">bun</button>
      </div>
      <div class="skill-install-cmd">
        <code>$ {{ installTab === 'npx' ? 'npx skills add longbridge/developers -g -y' : 'bunx skills add longbridge/developers -g -y' }}</code>
        <button class="skill-copy-btn" @click="copyInstall">
          <svg v-if="copiedInstall" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        </button>
      </div>
    </div>

    <!-- Agent selector + "more" -->
    <div class="skill-agent-row">
      <button
        v-for="(agent, idx) in agents"
        :key="agent.name"
        class="skill-agent-btn"
        :class="{ active: activeAgent === idx }"
        @click="activeAgent = idx"
      >{{ agent.name }} <span class="skill-agent-m">{{ agent.method }}</span></button>
      <span class="skill-agent-more">+ any Skill-compatible agent</span>
    </div>

    <!-- Agent simulator -->
    <ClientOnly>
      <div class="skill-mock">
        <div class="skill-mock-bar">
          <div class="skill-mock-dots"><span /><span /><span /></div>
          <span class="skill-mock-title">{{ agents[activeAgent].name }}</span>
        </div>

        <!-- Capability auto-cycling tabs -->
        <div class="skill-mock-caps">
          <button
            v-for="(cap, idx) in caps"
            :key="cap"
            class="skill-mock-cap"
            :class="{ active: activeCapIdx === idx }"
            @click="activeCapIdx = idx"
          >{{ $t(`product.skill.${cap}.title`) }}</button>
        </div>

        <div class="skill-mock-body">
          <!-- User typing -->
          <div class="skill-mock-msg">
            <span class="skill-mock-role">You</span>
            <div class="skill-mock-bubble">
              <p>{{ typedPrompt }}<span v-if="!streaming" class="skill-mock-caret">|</span></p>
              <button class="skill-mock-copy" @click="copyPrompt">
                <svg v-if="copiedPrompt" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              </button>
            </div>
          </div>

          <!-- AI streaming -->
          <div v-if="streaming" class="skill-mock-msg">
            <span class="skill-mock-role skill-mock-role-ai">{{ agents[activeAgent].name }}</span>
            <div class="skill-mock-stream">
              <span class="skill-mock-thinking">Using Longbridge Skill...</span>
              <TransitionGroup name="skill-stream-line" tag="div" class="skill-mock-cmds">
                <code v-for="(line, i) in streamLines" :key="i">{{ line }}</code>
              </TransitionGroup>
              <span v-if="streamLines.length < aiSteps[caps[activeCapIdx]].length" class="skill-mock-streaming">▊</span>
            </div>
          </div>
        </div>

        <div class="skill-mock-tip">
          Tip: prefix with <code>/longbridge</code> to force trigger
        </div>
      </div>
    </ClientOnly>

    <div class="skill-cta-wrap">
      <a href="/skill/install" class="skill-cta">
        {{ $t('product.skill.cta') }}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    </div>
  </section>
</template>

<style scoped>
.skill-section { padding: 4rem 0; background: var(--vp-c-bg); }

/* Header */
.skill-header { text-align: center; margin-bottom: 1.5rem; padding: 0 1.5rem; max-width: 40rem; margin-left: auto; margin-right: auto; }
.skill-badge { display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.25rem 0.75rem; border-radius: 9999px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); font-size: 0.75rem; font-weight: 600; color: var(--vp-c-text-3); margin-bottom: 1rem; }
.skill-title { font-size: 1.75rem; font-weight: 700; color: var(--vp-c-text-1); letter-spacing: -0.02em; }
.skill-subtitle { margin-top: 0.25rem; font-size: 0.95rem; color: var(--brand-color); font-weight: 600; line-height: 1.4; }
.skill-desc { margin-top: 0.5rem; font-size: 0.875rem; line-height: 1.6; color: var(--vp-c-text-2); }
.skill-desc-extra { margin-top: 0.25rem; font-size: 0.8rem; color: var(--vp-c-text-3); font-style: italic; }

/* Install bar */
.skill-install-bar { max-width: 32rem; margin: 0 auto 1.25rem; padding: 0 1.5rem; }
.skill-install-tabs { display: flex; gap: 0.25rem; margin-bottom: 0.375rem; justify-content: center; }
.skill-install-tab { padding: 0.2rem 0.5rem; border-radius: 0.25rem; font-size: 0.7rem; font-weight: 600; color: var(--vp-c-text-3); background: transparent; border: 1px solid transparent; cursor: pointer; transition: all 0.2s; }
.skill-install-tab.active { color: var(--brand-color); background: var(--vp-c-bg-soft); border-color: var(--vp-c-divider); }
.skill-install-cmd { display: flex; align-items: center; gap: 0.375rem; padding: 0.375rem 0.625rem; border-radius: 0.5rem; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); }
.skill-install-cmd code { font-size: 0.75rem; font-family: var(--vp-font-family-mono); color: var(--vp-c-text-2); flex: 1; }
.skill-copy-btn { display: flex; align-items: center; justify-content: center; width: 1.5rem; height: 1.5rem; border-radius: 0.25rem; color: var(--vp-c-text-3); background: transparent; border: 1px solid var(--vp-c-divider); cursor: pointer; transition: all 0.2s; flex-shrink: 0; }
.skill-copy-btn:hover { border-color: var(--brand-color); color: var(--brand-color); }
.skill-copy-btn:active { transform: scale(0.9); }

/* Agent row */
.skill-agent-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.375rem; margin-bottom: 1.25rem; padding: 0 1.5rem; }
.skill-agent-btn { padding: 0.3rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; color: var(--vp-c-text-3); background: transparent; border: 1px solid var(--vp-c-divider); cursor: pointer; transition: all 0.2s; }
.skill-agent-btn:hover { color: var(--vp-c-text-2); }
.skill-agent-btn.active { color: var(--brand-color); border-color: var(--brand-color); background: color-mix(in srgb, var(--brand-color) 6%, transparent); }
.skill-agent-m { font-size: 0.6rem; font-weight: 600; color: var(--brand-color); text-transform: uppercase; margin-left: 0.125rem; }
.skill-agent-more { padding: 0.3rem 0.75rem; border-radius: 9999px; font-size: 0.72rem; color: var(--vp-c-text-3); border: 1px dashed var(--vp-c-divider); font-style: italic; }

/* Mock */
.skill-mock { max-width: 48rem; margin: 0 auto; border-radius: 0.75rem; border: 1px solid var(--vp-c-divider); overflow: hidden; background: var(--vp-c-bg-soft); }
.skill-mock-bar { display: flex; align-items: center; padding: 0.5rem 0.75rem; border-bottom: 1px solid var(--vp-c-divider); }
.skill-mock-dots { display: flex; gap: 0.375rem; }
.skill-mock-dots span { width: 0.5rem; height: 0.5rem; border-radius: 50%; background: var(--vp-c-divider); }
.skill-mock-title { flex: 1; text-align: center; font-size: 0.7rem; font-weight: 600; color: var(--vp-c-text-3); }
.skill-mock-caps { display: flex; overflow-x: auto; border-bottom: 1px solid var(--vp-c-divider); padding: 0 0.5rem; }
.skill-mock-cap { padding: 0.375rem 0.5rem; font-size: 0.65rem; font-weight: 600; color: var(--vp-c-text-3); background: transparent; border: none; border-bottom: 2px solid transparent; cursor: pointer; white-space: nowrap; transition: all 0.2s; }
.skill-mock-cap:hover { color: var(--vp-c-text-2); }
.skill-mock-cap.active { color: var(--brand-color); border-bottom-color: var(--brand-color); }

.skill-mock-body { padding: 1rem; min-height: 12rem; }
.skill-mock-msg { margin-bottom: 0.875rem; }
.skill-mock-role { display: block; font-size: 0.65rem; font-weight: 700; color: var(--vp-c-text-3); text-transform: uppercase; margin-bottom: 0.25rem; }
.skill-mock-role-ai { color: var(--brand-color); }

.skill-mock-bubble { display: flex; align-items: flex-start; gap: 0.5rem; padding: 0.625rem 0.875rem; border-radius: 0.5rem; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); }
.skill-mock-bubble p { margin: 0; font-size: 0.8rem; line-height: 1.5; color: var(--vp-c-text-1); flex: 1; min-height: 1.2em; }
.skill-mock-caret { color: var(--brand-color); animation: blink-caret 0.6s step-end infinite; }
@keyframes blink-caret { 50% { opacity: 0; } }

.skill-mock-copy { display: flex; align-items: center; justify-content: center; width: 1.25rem; height: 1.25rem; border-radius: 0.25rem; color: var(--vp-c-text-3); background: transparent; border: none; cursor: pointer; flex-shrink: 0; opacity: 0; transition: all 0.2s; }
.skill-mock-bubble:hover .skill-mock-copy { opacity: 1; }
.skill-mock-copy:hover { color: var(--brand-color); }

.skill-mock-stream { display: flex; flex-direction: column; gap: 0.25rem; }
.skill-mock-thinking { font-size: 0.72rem; color: var(--vp-c-text-3); font-style: italic; }
.skill-mock-cmds { display: flex; flex-direction: column; gap: 0.25rem; }
.skill-mock-cmds code { font-size: 0.72rem; font-family: var(--vp-font-family-mono); color: var(--vp-c-text-2); padding: 0.2rem 0.5rem; border-radius: 0.25rem; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); }
.skill-mock-streaming { color: var(--brand-color); animation: blink-caret 0.6s step-end infinite; }

/* Stream line transition */
.skill-stream-line-enter-active { transition: opacity 0.3s, transform 0.3s; }
.skill-stream-line-enter-from { opacity: 0; transform: translateY(4px); }

.skill-mock-tip { padding: 0.375rem 0.75rem; font-size: 0.68rem; color: var(--vp-c-text-3); border-top: 1px solid var(--vp-c-divider); }
.skill-mock-tip code { font-family: var(--vp-font-family-mono); color: var(--brand-color); font-weight: 600; }

/* CTA */
.skill-cta-wrap { text-align: center; margin-top: 1.5rem; padding: 0 1.5rem; }
.skill-cta { display: inline-flex; align-items: center; gap: 0.375rem; font-size: 0.9rem; font-weight: 600; color: var(--brand-color); text-decoration: none !important; transition: gap 0.2s; }
.skill-cta:hover { gap: 0.625rem; }

@media (max-width: 640px) {
  .skill-agent-row { gap: 0.25rem; }
}
</style>
