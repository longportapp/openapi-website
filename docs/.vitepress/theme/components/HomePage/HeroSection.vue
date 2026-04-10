<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import CopyButton from './CopyButton.vue'

const { t } = useI18n()
const titleRef = ref<HTMLElement | null>(null)

interface ProductTab {
  key: string
  label: string
  install: string
  showcase: string
}

const products: ProductTab[] = [
  {
    key: 'openapi',
    label: 'OpenAPI',
    install: 'pip install longbridge',
    showcase: 'ctx.quote(["TSLA.US", "700.HK", "AAPL.US"])',
  },
  {
    key: 'mcp',
    label: 'MCP',
    install: 'claude mcp add --transport http longbridge https://openapi.longbridge.com/mcp',
    showcase: 'claude mcp add longbridge https://openapi.longbridge.com/mcp',
  },
  {
    key: 'cli',
    label: 'CLI',
    install: 'curl -fsSL https://longbridge.sh/install | bash',
    showcase: 'longbridge quote TSLA.US AAPL.US NVDA.US',
  },
  {
    key: 'skill',
    label: 'SKILL',
    install: 'npx skills add longbridge/developers -g -y',
    showcase: 'npx skills add longbridge/developers -g -y',
  },
]

const activeIdx = ref(0)
const activeProduct = computed(() => products[activeIdx.value])
const tabsRef = ref<HTMLElement | null>(null)
const indicatorStyle = ref({ width: '0px', left: '0px' })

// Typing state
const displayedText = ref('')
const isTyping = ref(true)
let typingTimer: ReturnType<typeof setTimeout> | null = null
let autoSwitchTimer: ReturnType<typeof setTimeout> | null = null

function updateIndicator() {
  if (!tabsRef.value) return
  const el = tabsRef.value.querySelector<HTMLElement>(`[data-idx="${activeIdx.value}"]`)
  if (!el) return
  const pr = tabsRef.value.getBoundingClientRect()
  const r = el.getBoundingClientRect()
  indicatorStyle.value = { width: `${r.width}px`, left: `${r.left - pr.left}px` }
}

function clearTimers() {
  if (typingTimer) clearTimeout(typingTimer)
  if (autoSwitchTimer) clearTimeout(autoSwitchTimer)
}

function typeText(text: string, onDone: () => void) {
  let i = 0
  displayedText.value = ''
  isTyping.value = true

  function step() {
    if (i < text.length) {
      displayedText.value = text.slice(0, ++i)
      typingTimer = setTimeout(step, 25 + Math.random() * 15)
    } else {
      isTyping.value = false
      onDone()
    }
  }
  step()
}

function startAutoPlay() {
  clearTimers()
  const cmd = activeProduct.value.showcase
  typeText(cmd, () => {
    autoSwitchTimer = setTimeout(() => {
      activeIdx.value = (activeIdx.value + 1) % products.length
    }, 3000)
  })
}

function switchTo(idx: number) {
  clearTimers()
  activeIdx.value = idx
}

watch(activeIdx, () => {
  nextTick(updateIndicator)
  startAutoPlay()
})

onMounted(() => {
  // Title blur animation
  if (titleRef.value) {
    const text = titleRef.value.textContent || ''
    titleRef.value.innerHTML = ''
    ;[...text].forEach((char, i) => {
      const span = document.createElement('span')
      span.className = 'hero-char'
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.animationDelay = `${i * 0.03}s`
      titleRef.value!.appendChild(span)
    })
  }

  nextTick(updateIndicator)
  setTimeout(startAutoPlay, 1000)
})

onUnmounted(clearTimers)
</script>

<template>
  <section class="hero-section">
    <div class="homepage-container">
      <h1 ref="titleRef" class="hero-title">Longbridge Developers</h1>
      <p class="hero-sub hero-fade-up" style="animation-delay: 0.5s">{{ t('home.subtitle') }}</p>

      <!-- Unified terminal: tabs + typing + install -->
      <div class="hero-terminal hero-fade-up" style="animation-delay: 0.7s">
        <!-- Tabs -->
        <div ref="tabsRef" class="ht-tabs">
          <div class="ht-indicator" :style="indicatorStyle" />
          <button
            v-for="(p, i) in products"
            :key="p.key"
            :data-idx="i"
            class="ht-tab"
            :class="{ 'ht-tab--active': activeIdx === i }"
            @click="switchTo(i)"
          >{{ p.label }}</button>
        </div>

        <!-- Showcase typing line -->
        <div class="ht-showcase">
          <span class="ht-prompt">$</span>
          <span class="ht-typed">{{ displayedText }}</span>
          <span class="typing-cursor" />
        </div>

        <!-- Install command -->
        <div class="ht-install">
          <CopyButton :text="activeProduct.install" />
          <span class="ht-label">Install</span>
          <div class="ht-cmd">
            <span class="ht-prompt">$</span>
            <span>{{ activeProduct.install }}</span>
          </div>
        </div>
      </div>

      <div class="hero-cta hero-fade-up" style="animation-delay: 0.95s">
        <a href="/docs/getting-started" class="hero-btn hero-btn--primary">{{ t('home.getStarted') }}</a>
        <a href="/docs/api" class="hero-btn hero-btn--secondary">{{ t('home.apiReference') }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  text-align: center;
  padding: 80px 0 48px;
}

.hero-title {
  font-size: 50px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
  color: var(--text-color-1);
}

.hero-sub {
  font-size: 17px;
  color: var(--text-color-1-supplement);
  margin-bottom: 36px;
  white-space: pre-line;
  line-height: 1.6;
}

/* ===== Unified terminal ===== */
.hero-terminal {
  max-width: 660px;
  margin: 0 auto 32px;
  background: var(--home-bg-color-1);
  border-radius: 10px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: left;
}

.dark .hero-terminal {
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
}

/* Tabs row */
.ht-tabs {
  display: flex;
  position: relative;
  border-bottom: 1px solid var(--border-color);
  background: rgba(0, 0, 0, 0.02);
}

.dark .ht-tabs {
  background: rgba(255, 255, 255, 0.03);
}

.ht-indicator {
  position: absolute;
  bottom: 0;
  height: 2px;
  background: var(--brand-color);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.ht-tab {
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  background: none;
  color: var(--text-color-3);
  cursor: pointer;
  font-family: inherit;
  transition: color 0.2s;
  position: relative;
  z-index: 1;
}

.ht-tab--active {
  color: var(--brand-color);
}

.ht-tab:hover {
  color: var(--text-color-1);
}

/* Showcase typing area */
.ht-showcase {
  padding: 18px 20px;
  font-family: 'SF Mono', 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-color-1);
  min-height: 54px;
  display: flex;
  align-items: center;
}

/* Install section */
.ht-install {
  border-top: 1px solid var(--border-color);
  padding: 14px 20px;
  position: relative;
  background: rgba(0, 0, 0, 0.015);
}

.dark .ht-install {
  background: rgba(255, 255, 255, 0.02);
}

.ht-label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-color-3);
  margin-bottom: 6px;
}

.ht-cmd {
  font-family: 'SF Mono', 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
  font-size: 13px;
  color: var(--text-color-1);
  word-break: break-all;
  line-height: 1.6;
}

.ht-prompt {
  color: var(--brand-color);
  user-select: none;
  margin-right: 8px;
  font-weight: 600;
}

.ht-typed {
  white-space: nowrap;
  overflow: hidden;
}

/* CTA */
.hero-cta {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.hero-btn {
  border-radius: 6px;
  padding: 12px 28px;
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  display: inline-block;
}

.hero-btn--primary {
  background: var(--brand-color);
  color: #fff;
}

.hero-btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 184, 184, 0.3);
}

.hero-btn--secondary {
  background: transparent;
  color: var(--brand-color);
  border: 1.5px solid var(--brand-color);
}

.hero-btn--secondary:hover {
  background: var(--brand-5);
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .hero-section { padding: 56px 0 36px; }
  .hero-title { font-size: 34px; }
  .hero-sub { font-size: 15px; }
  .hero-cta { flex-direction: column; align-items: center; }
  .ht-showcase { font-size: 12px; }
  .ht-cmd { font-size: 11.5px; }
}
</style>
