<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const activeClient = ref(0)

const clients = [
  {
    name: 'Claude Code',
    type: 'shell' as const,
    cmd: 'claude mcp add --transport http longbridge https://openapi.longbridge.com/mcp',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12l2 2 4-4"/></svg>`,
  },
  {
    name: 'Codex',
    type: 'ui' as const,
    steps: ['Settings', 'MCP Servers', 'Add Server'],
    fields: { Name: 'longbridge', Type: 'Streamable HTTP', URL: 'https://openapi.longbridge.com/mcp' },
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>`,
  },
  {
    name: 'Cursor',
    type: 'ui' as const,
    steps: ['Settings', 'MCP Servers', 'Add Remote MCP Server'],
    fields: { URL: 'https://openapi.longbridge.com/mcp' },
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l14 9-14 9V3z"/></svg>`,
  },
  {
    name: 'Zed',
    type: 'json' as const,
    json: { mcpServers: { longbridge: { url: 'https://openapi.longbridge.com/mcp' } } },
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
  },
  {
    name: 'Cherry Studio',
    type: 'ui' as const,
    steps: ['Settings', 'MCP Servers', 'Add'],
    fields: { URL: 'https://openapi.longbridge.com/mcp' },
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
  },
]

const tools = [
  { key: 'tool1', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>` },
  { key: 'tool2', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>` },
  { key: 'tool3', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>` },
]

const currentClient = computed(() => clients[activeClient.value])
const copyText = computed(() => {
  const c = currentClient.value
  if (c.type === 'shell') return c.cmd
  if (c.type === 'json') return JSON.stringify(c.json, null, 2)
  return ''
})
const formattedJson = computed(() => {
  const c = currentClient.value
  if (c.type === 'json' && c.json) return JSON.stringify(c.json, null, 2)
  return ''
})

// Refs
const hubRef = ref<HTMLElement>()
const containerRef = ref<HTMLElement>()
const clientRefs = ref<HTMLElement[]>([])
const toolRefs = ref<HTMLElement[]>([])
const moreRef = ref<HTMLElement>()

function setClientRef(el: any, idx: number) {
  if (el) clientRefs.value[idx] = el as HTMLElement
}
function setToolRef(el: any, idx: number) {
  if (el) toolRefs.value[idx] = el as HTMLElement
}

// SVG seamless tree connector
const svgW = ref(0)
const svgH = ref(0)
const leftLines = ref<{ d: string; faded: boolean }[]>([])
const rightLines = ref<{ d: string }[]>([])
const ready = ref(false)

function calcPaths() {
  if (!containerRef.value || !hubRef.value) return
  const cr = containerRef.value.getBoundingClientRect()
  svgW.value = cr.width
  svgH.value = cr.height

  const hub = hubRef.value.getBoundingClientRect()
  const hubLX = hub.left - cr.left
  const hubRX = hub.right - cr.left
  const hubCY = hub.top - cr.top + hub.height / 2

  // Trunk X positions: right at the hub edges (seamless)
  const trunkLX = hubLX
  const trunkRX = hubRX

  // === LEFT: each node draws a seamless L-shaped path to hub ===
  const allLeftEls = [...clientRefs.value]
  if (moreRef.value) allLeftEls.push(moreRef.value)

  const ll: { d: string; faded: boolean }[] = []
  allLeftEls.forEach((el, i) => {
    if (!el) return
    const rect = el.getBoundingClientRect()
    const sx = rect.right - cr.left
    const sy = rect.top - cr.top + rect.height / 2
    // Seamless: horizontal from node → trunk X, then vertical to hubCY, ending at hub left edge
    if (Math.abs(sy - hubCY) < 2) {
      // Same Y as hub: straight horizontal line
      ll.push({ d: `M ${sx},${sy} L ${trunkLX},${hubCY}`, faded: i >= clients.length })
    } else {
      // L-shape: horizontal → vertical (meet at trunkLX)
      ll.push({
        d: `M ${sx},${sy} L ${trunkLX},${sy} L ${trunkLX},${hubCY}`,
        faded: i >= clients.length,
      })
    }
  })
  leftLines.value = ll

  // === RIGHT: hub → each tool node (seamless L-shape) ===
  const rl: { d: string }[] = []
  toolRefs.value.forEach(el => {
    if (!el) return
    const rect = el.getBoundingClientRect()
    const ex = rect.left - cr.left
    const ey = rect.top - cr.top + rect.height / 2
    if (Math.abs(ey - hubCY) < 2) {
      rl.push({ d: `M ${trunkRX},${hubCY} L ${ex},${ey}` })
    } else {
      rl.push({ d: `M ${trunkRX},${hubCY} L ${trunkRX},${ey} L ${ex},${ey}` })
    }
  })
  rightLines.value = rl
}

let ro: ResizeObserver | undefined
onMounted(() => {
  nextTick(() => {
    requestAnimationFrame(() => {
      calcPaths()
      ready.value = true
    })
  })
  if (containerRef.value) {
    ro = new ResizeObserver(() => calcPaths())
    ro.observe(containerRef.value)
  }
})
onBeforeUnmount(() => ro?.disconnect())

const copiedCmd = ref(false)
function copyCmd() {
  navigator.clipboard.writeText(copyText.value)
  copiedCmd.value = true
  setTimeout(() => { copiedCmd.value = false }, 2000)
}
</script>

<template>
  <section class="mcp-section">
    <div class="mcp-header">
      <div class="mcp-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m-7-3.5l5.2-3m1.6-1l5.2-3M5 6.5l5.2 3m1.6 1l5.2 3"/></svg>
        <span>Model Context Protocol</span>
      </div>
      <h2 class="mcp-title">{{ $t('product.mcp.title') }}</h2>
      <p class="mcp-subtitle">{{ $t('product.mcp.subtitle') }}</p>
      <p class="mcp-desc">{{ $t('product.mcp.desc') }}</p>
    </div>

    <ClientOnly>
      <div ref="containerRef" class="mcp-hub">
        <!-- Left: AI Clients -->
        <div class="mcp-col mcp-col-left">
          <div
            v-for="(client, idx) in clients"
            :key="client.name"
            :ref="(el) => setClientRef(el, idx)"
            class="mcp-node"
            :class="{ active: activeClient === idx }"
            @click="activeClient = idx"
          >
            <span class="mcp-node-icon" v-html="client.icon" />
            <span class="mcp-node-label">{{ client.name }}</span>
          </div>
          <div ref="moreRef" class="mcp-node mcp-node-more">
            <span class="mcp-node-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </span>
            <span class="mcp-node-label mcp-more-label">Any MCP Client</span>
          </div>
        </div>

        <!-- Center: Hub -->
        <div class="mcp-col mcp-col-center">
          <div ref="hubRef" class="mcp-hub-box">
            <span class="mcp-hub-label">Longbridge MCP</span>
          </div>
        </div>

        <!-- Right: Tools -->
        <div class="mcp-col mcp-col-right">
          <div
            v-for="(tool, idx) in tools"
            :key="tool.key"
            :ref="(el) => setToolRef(el, idx)"
            class="mcp-node mcp-node-tool"
          >
            <span class="mcp-node-icon" v-html="tool.icon" />
            <div class="mcp-tool-text">
              <span class="mcp-node-label">{{ $t(`product.mcp.${tool.key}`) }}</span>
              <span class="mcp-tool-desc">{{ $t(`product.mcp.${tool.key}.desc`) }}</span>
            </div>
          </div>
        </div>

        <!-- SVG Seamless Connectors -->
        <svg
          v-if="ready"
          class="mcp-svg-overlay"
          :width="svgW"
          :height="svgH"
          :viewBox="`0 0 ${svgW} ${svgH}`"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Left lines: node → hub (seamless L-shapes) -->
          <template v-for="(l, i) in leftLines" :key="'ll-' + i">
            <path :d="l.d" stroke="#00b8b8" stroke-width="1.5" :stroke-opacity="l.faded ? 0.1 : 0.2" stroke-linejoin="round" />
            <circle r="2" fill="#00b8b8" :opacity="l.faded ? 0.25 : 0.7">
              <animateMotion :dur="`${2.2 + i * 0.3}s`" repeatCount="indefinite" :path="l.d" />
            </circle>
          </template>

          <!-- Right lines: hub → tool (seamless L-shapes) -->
          <template v-for="(l, i) in rightLines" :key="'rl-' + i">
            <path :d="l.d" stroke="#00b8b8" stroke-width="1.5" stroke-opacity="0.2" stroke-linejoin="round" />
            <circle r="2" fill="#00b8b8" opacity="0.7">
              <animateMotion :dur="`${2.5 + i * 0.4}s`" repeatCount="indefinite" :path="l.d" />
            </circle>
          </template>
        </svg>
      </div>
    </ClientOnly>

    <!-- Config -->
    <div class="mcp-config">
      <div class="mcp-config-tabs">
        <button
          v-for="(client, idx) in clients"
          :key="client.name"
          class="mcp-config-tab"
          :class="{ active: activeClient === idx }"
          @click="activeClient = idx"
        >{{ client.name }}</button>
      </div>

      <div v-if="currentClient.type === 'shell'" class="mcp-config-panel">
        <div class="mcp-config-cmd">
          <span class="mcp-cmd-prompt">$</span>
          <code class="mcp-cmd-shell">{{ currentClient.cmd }}</code>
          <button class="mcp-copy-btn" @click="copyCmd">
            <svg v-if="copiedCmd" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          </button>
        </div>
      </div>

      <div v-else-if="currentClient.type === 'json'" class="mcp-config-panel">
        <div class="mcp-config-json">
          <pre class="mcp-json-code"><code>{{ formattedJson }}</code></pre>
          <button class="mcp-copy-btn mcp-copy-json" @click="copyCmd">
            <svg v-if="copiedCmd" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          </button>
        </div>
      </div>

      <div v-else-if="currentClient.type === 'ui'" class="mcp-config-panel">
        <div class="mcp-config-steps">
          <div class="mcp-steps-nav">
            <template v-for="(step, idx) in currentClient.steps" :key="idx">
              <span class="mcp-step">{{ step }}</span>
              <svg v-if="idx < currentClient.steps.length - 1" class="mcp-step-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </template>
          </div>
          <div v-if="currentClient.fields" class="mcp-fields">
            <div v-for="(value, key) in currentClient.fields" :key="key" class="mcp-field">
              <span class="mcp-field-key">{{ key }}</span>
              <span class="mcp-field-value">{{ value }}</span>
            </div>
          </div>
        </div>
      </div>

      <p class="mcp-config-note">OAuth 2.1 — browser opens automatically on first use. No API key needed.</p>
    </div>

    <div class="mcp-cta-wrap">
      <a href="/docs/mcp" class="mcp-cta">
        {{ $t('product.mcp.cta') }}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    </div>
  </section>
</template>

<style scoped>
.mcp-section { padding: 4rem 0; background: var(--vp-c-bg-soft); }

.mcp-header { text-align: center; margin-bottom: 2rem; padding: 0 1.5rem; max-width: 40rem; margin-left: auto; margin-right: auto; }
.mcp-badge { display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.25rem 0.75rem; border-radius: 9999px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); font-size: 0.75rem; font-weight: 600; color: var(--vp-c-text-3); margin-bottom: 1rem; }
.mcp-title { font-size: 1.75rem; font-weight: 700; color: var(--vp-c-text-1); letter-spacing: -0.02em; }
.mcp-subtitle { margin-top: 0.25rem; font-size: 0.95rem; color: var(--brand-color); font-weight: 600; line-height: 1.4; }
.mcp-desc { margin-top: 0.5rem; font-size: 0.875rem; line-height: 1.6; color: var(--vp-c-text-2); }

/* Hub layout */
.mcp-hub {
  position: relative;
  max-width: 56rem;
  min-width: 48rem;
  margin: 0 auto 2rem;
  padding: 2rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3.5rem;
  overflow: hidden;
}

.mcp-svg-overlay { position: absolute; top: 0; left: 0; pointer-events: none; z-index: 1; }

.mcp-col { display: flex; flex-direction: column; gap: 0.5rem; z-index: 5; }
.mcp-col-left { align-items: flex-end; }
.mcp-col-right { align-items: flex-start; }
.mcp-col-center { flex-shrink: 0; }

/* Nodes */
.mcp-node {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.375rem 0.75rem; border-radius: 0.5rem;
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg);
  cursor: pointer; transition: all 0.2s; white-space: nowrap;
}
.mcp-node:hover { border-color: var(--brand-color); }
.mcp-node.active { border-color: var(--brand-color); color: var(--brand-color); background: color-mix(in srgb, var(--brand-color) 6%, transparent); box-shadow: 0 0 0 1px var(--brand-color); }

.mcp-node-icon { display: flex; width: 1rem; height: 1rem; color: var(--vp-c-text-3); flex-shrink: 0; }
.mcp-node-icon :deep(svg) { width: 100%; height: 100%; }
.mcp-node.active .mcp-node-icon { color: var(--brand-color); }
.mcp-node-label { font-size: 0.78rem; font-weight: 600; color: var(--vp-c-text-1); }
.mcp-node.active .mcp-node-label { color: var(--brand-color); }

.mcp-node-more { cursor: default; border-style: dashed; opacity: 0.55; }
.mcp-node-more:hover { border-color: var(--vp-c-divider); opacity: 0.75; }
.mcp-more-label { color: var(--vp-c-text-3) !important; font-weight: 500 !important; }

.mcp-node-tool { cursor: default; }
.mcp-node-tool .mcp-node-icon { color: var(--brand-color); }
.mcp-tool-text { display: flex; flex-direction: column; }
.mcp-tool-desc { font-size: 0.68rem; color: var(--vp-c-text-3); white-space: normal; max-width: 13rem; }

/* Hub box */
.mcp-hub-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1.5px solid var(--brand-color);
  background: color-mix(in srgb, var(--brand-color) 6%, var(--vp-c-bg));
  box-shadow: 0 0 16px color-mix(in srgb, var(--brand-color) 10%, transparent);
  z-index: 5;
  flex-shrink: 0;
  white-space: nowrap;
}

.mcp-hub-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--brand-color);
}

/* Config */
.mcp-config { max-width: 40rem; margin: 0 auto; padding: 0 1.5rem; }
.mcp-config-tabs { display: flex; gap: 0.25rem; margin-bottom: 0.5rem; overflow-x: auto; }
.mcp-config-tab {
  padding: 0.3rem 0.625rem; border-radius: 0.375rem;
  font-size: 0.75rem; font-weight: 600; color: var(--vp-c-text-3);
  background: transparent; border: 1px solid transparent;
  cursor: pointer; white-space: nowrap; transition: all 0.2s;
}
.mcp-config-tab:hover { color: var(--vp-c-text-2); }
.mcp-config-tab.active { color: var(--brand-color); background: var(--vp-c-bg); border-color: var(--vp-c-divider); }

.mcp-config-panel { border-radius: 0.5rem; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); overflow: hidden; }
.mcp-config-cmd { display: flex; align-items: flex-start; gap: 0.5rem; padding: 0.75rem 0.875rem; }
.mcp-cmd-prompt { font-size: 0.75rem; font-family: var(--vp-font-family-mono); color: var(--vp-c-text-3); user-select: none; line-height: 1.5; }
.mcp-cmd-shell { font-size: 0.75rem; font-family: var(--vp-font-family-mono); color: var(--brand-color); line-height: 1.5; flex: 1; word-break: break-all; }

.mcp-config-json { position: relative; padding: 0.75rem 0.875rem; }
.mcp-json-code { margin: 0; padding: 0; font-size: 0.75rem; font-family: var(--vp-font-family-mono); color: var(--vp-c-text-1); line-height: 1.6; white-space: pre; overflow-x: auto; }
.mcp-json-code code { font-family: inherit; }
.mcp-copy-json { position: absolute; top: 0.5rem; right: 0.5rem; }

.mcp-config-steps { padding: 0.75rem 0.875rem; }
.mcp-steps-nav { display: flex; align-items: center; gap: 0.375rem; flex-wrap: wrap; margin-bottom: 0.625rem; }
.mcp-step { display: inline-flex; align-items: center; padding: 0.25rem 0.5rem; border-radius: 0.25rem; background: color-mix(in srgb, var(--vp-c-text-3) 8%, transparent); font-size: 0.7rem; font-weight: 600; color: var(--vp-c-text-2); }
.mcp-step-arrow { color: var(--vp-c-text-3); flex-shrink: 0; }
.mcp-fields { display: flex; flex-direction: column; gap: 0.375rem; }
.mcp-field { display: flex; align-items: baseline; gap: 0.5rem; font-size: 0.75rem; }
.mcp-field-key { font-weight: 600; color: var(--vp-c-text-3); min-width: 3rem; font-family: var(--vp-font-family-mono); font-size: 0.7rem; }
.mcp-field-value { font-family: var(--vp-font-family-mono); font-size: 0.7rem; color: var(--brand-color); word-break: break-all; }

.mcp-copy-btn { display: flex; align-items: center; justify-content: center; width: 1.5rem; height: 1.5rem; border-radius: 0.25rem; color: var(--vp-c-text-3); background: transparent; border: 1px solid var(--vp-c-divider); cursor: pointer; transition: all 0.2s; flex-shrink: 0; }
.mcp-copy-btn:hover { border-color: var(--brand-color); color: var(--brand-color); }
.mcp-copy-btn:active { transform: scale(0.9); }

.mcp-config-note { margin-top: 0.5rem; font-size: 0.75rem; color: var(--vp-c-text-3); text-align: center; }

.mcp-cta-wrap { text-align: center; margin-top: 1.5rem; }
.mcp-cta { display: inline-flex; align-items: center; gap: 0.375rem; font-size: 0.9rem; font-weight: 600; color: var(--brand-color); text-decoration: none !important; transition: gap 0.2s; }
.mcp-cta:hover { gap: 0.625rem; }

@media (max-width: 768px) {
  .mcp-hub { min-width: unset; flex-direction: column; gap: 2rem; padding: 1.5rem 1rem; }
  .mcp-svg-overlay { display: none; }
  .mcp-col-left { align-items: center; flex-direction: row; flex-wrap: wrap; justify-content: center; }
  .mcp-col-right { align-items: center; }
  .mcp-tool-desc { max-width: none; }
}

/* Ensure horizontal scroll on very narrow screens */
.mcp-section { overflow-x: auto; }
</style>
