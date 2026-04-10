<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const titleRef = ref<HTMLElement | null>(null)

interface Product {
  key: string
  label: string
  install: string
  desc: string
}

const products: Product[] = [
  { key: 'openapi', label: 'OpenAPI', install: 'pip install longbridge', desc: 'Python SDK — 实时行情、交易执行、6 种语言' },
  { key: 'mcp', label: 'MCP', install: 'claude mcp add --transport http longbridge https://openapi.longbridge.com/mcp', desc: 'AI 工具直连 — Claude、Cursor、Zed、ChatGPT' },
  { key: 'cli', label: 'CLI', install: 'curl -fsSL https://longbridge.sh/install | bash', desc: '40+ 命令 — 行情、交易、财报、选股' },
  { key: 'skill', label: 'SKILL', install: 'npx skills add longbridge/developers -g -y', desc: 'AI 知识库 — 自动识别股票、智能调用分析' },
]

const activeIdx = ref(0)
const active = computed(() => products[activeIdx.value])
const tabsRef = ref<HTMLElement | null>(null)
const indicatorStyle = ref({ width: '0px', left: '0px' })

// Typing
const displayedCmd = ref('')
const showCursor = ref(true)
let timer: ReturnType<typeof setTimeout> | null = null
let autoTimer: ReturnType<typeof setTimeout> | null = null
let userClicked = false

function clear() {
  if (timer) clearTimeout(timer)
  if (autoTimer) clearTimeout(autoTimer)
}

function typeCmd(text: string, cb?: () => void) {
  let i = 0
  displayedCmd.value = ''
  showCursor.value = true
  function step() {
    if (i < text.length) {
      displayedCmd.value = text.slice(0, ++i)
      timer = setTimeout(step, 20 + Math.random() * 12)
    } else {
      cb?.()
    }
  }
  step()
}

function autoNext() {
  autoTimer = setTimeout(() => {
    if (userClicked) { userClicked = false; return }
    activeIdx.value = (activeIdx.value + 1) % products.length
  }, 3500)
}

function switchTo(idx: number) {
  clear()
  userClicked = true
  activeIdx.value = idx
  displayedCmd.value = products[idx].install
  autoTimer = setTimeout(() => { userClicked = false; autoNext() }, 5000)
}

function updateIndicator() {
  if (!tabsRef.value) return
  const el = tabsRef.value.querySelector<HTMLElement>(`[data-idx="${activeIdx.value}"]`)
  if (!el) return
  const pr = tabsRef.value.getBoundingClientRect()
  const r = el.getBoundingClientRect()
  indicatorStyle.value = { width: `${r.width}px`, left: `${r.left - pr.left}px` }
}

watch(activeIdx, () => {
  nextTick(updateIndicator)
  if (!userClicked) {
    clear()
    typeCmd(active.value.install, autoNext)
  }
})

// Copy with animation
const copied = ref(false)
const copyBtnRef = ref<HTMLElement | null>(null)
async function copy() {
  try {
    await navigator.clipboard.writeText(active.value.install)
    copied.value = true
    // Flash the terminal background
    const terminal = copyBtnRef.value?.closest('.hero__terminal')
    terminal?.classList.add('copy-flash')
    setTimeout(() => {
      copied.value = false
      terminal?.classList.remove('copy-flash')
    }, 1500)
  } catch { /* noop */ }
}

onMounted(() => {
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
  timer = setTimeout(() => typeCmd(active.value.install, autoNext), 900)
})

onUnmounted(clear)
</script>

<template>
  <section class="hero">
    <div class="homepage-container">
      <h1 ref="titleRef" class="hero__title">Longbridge Developers</h1>
      <p class="hero__desc hero-fade-up" style="animation-delay:0.5s">{{ t('home.subtitle') }}</p>

      <div class="hero__terminal hero-fade-up" style="animation-delay:0.7s">
        <!-- Tab bar -->
        <div ref="tabsRef" class="ht-bar" role="tablist" aria-label="Products">
          <div class="ht-ind" :style="indicatorStyle" />
          <button
            v-for="(p, i) in products" :key="p.key" :data-idx="i"
            role="tab"
            :aria-selected="activeIdx === i"
            :tabindex="activeIdx === i ? 0 : -1"
            class="ht-tab" :class="{ active: activeIdx === i }"
            @click="switchTo(i)"
          >{{ p.label }}</button>
          <button ref="copyBtnRef" class="ht-copy" :class="{ 'ht-copy--done': copied }" aria-label="Copy install command" @click="copy">
            {{ copied ? $t('api.copied') : $t('api.copy') }}
          </button>
        </div>

        <!-- Install command -->
        <div class="ht-cmd">
          <span class="ht-ps">$</span>
          <span class="ht-text">{{ displayedCmd }}</span>
          <span v-if="showCursor" class="typing-cursor" />
        </div>

        <!-- Product one-liner -->
        <div class="ht-hint">{{ active.desc }}</div>
      </div>

      <div class="hero__cta hero-fade-up" style="animation-delay:0.95s">
        <a href="/docs/getting-started" class="hero__btn hero__btn--pri btn-sweep">{{ t('home.getStarted') }}</a>
        <a href="/docs/api" class="hero__btn hero__btn--sec">{{ t('home.apiReference') }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { text-align: center; padding: 80px 0 48px; }

.hero__title {
  font-size: var(--text-3xl); font-weight: var(--weight-bold); letter-spacing: -0.035em;
  line-height: var(--leading-tight); margin-bottom: 1rem; color: var(--text-color-1);
}

.hero__desc {
  font-size: var(--text-base); color: var(--text-color-2); margin-bottom: 2.25rem;
  white-space: pre-line; line-height: var(--leading-relaxed);
}

/* Terminal */
.hero__terminal {
  max-width: 640px; margin: 0 auto 28px;
  background: var(--code-bg); border-radius: 6px;
  overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.18); text-align: left;
}

/* Tab bar */
.ht-bar {
  display: flex; align-items: center; position: relative;
  padding: 0 12px; border-bottom: 1px solid rgba(255,255,255,0.08);
}

.ht-ind {
  position: absolute; bottom: 0; height: 2px;
  background: var(--brand-color);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.ht-tab {
  padding: 0.625rem 1.125rem; font-size: var(--text-sm); font-weight: var(--weight-semibold);
  border: none; background: none; color: var(--code-dim);
  cursor: pointer; font-family: inherit; transition: color 0.2s;
  position: relative; z-index: 1;
}

.ht-tab.active { color: var(--code-accent); }
.ht-tab:hover { color: var(--code-fg); }

.ht-copy {
  margin-left: auto; padding: 0.25rem 0.75rem; font-size: var(--text-xs); font-weight: var(--weight-medium);
  border: 1px solid rgba(255,255,255,0.12); border-radius: 4px;
  background: transparent; color: var(--code-dim); cursor: pointer;
  font-family: inherit; transition: all 0.2s;
}

.ht-copy:hover { color: var(--code-fg); border-color: rgba(255,255,255,0.25); }

.ht-copy--done {
  color: var(--code-accent) !important;
  border-color: var(--code-accent) !important;
  background: rgba(0, 212, 184, 0.1);
  transform: scale(1.05);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Command area */
.ht-cmd {
  padding: 18px 22px;
  font-family: 'SF Mono', 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
  font-size: 14.5px; line-height: 1.6; color: var(--code-fg);
  display: flex; align-items: center; min-height: 58px;
}

.ht-ps { color: var(--code-accent); user-select: none; margin-right: 10px; font-weight: 700; }
.ht-text { word-break: break-all; }

/* Product hint */
.ht-hint {
  padding: 10px 22px; font-size: 12px; color: var(--code-dim);
  border-top: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
}

/* CTA */
.hero__cta { display: flex; justify-content: center; gap: 12px; }

.hero__btn {
  border-radius: 6px; padding: 12px 28px; font-size: 14.5px; font-weight: 600;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none; display: inline-block;
}

.hero__btn--pri { background: var(--brand-color); color: #fff; }
.hero__btn--pri:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,184,184,0.3); }

.hero__btn--sec { background: transparent; color: var(--brand-color); border: 1.5px solid var(--brand-color); }
.hero__btn--sec:hover { background: var(--brand-5); transform: translateY(-2px); }

@media (max-width: 640px) {
  .hero { padding: 56px 0 36px; }
  .hero__title { font-size: 34px; }
  .hero__desc { font-size: 14px; }
  .hero__cta { flex-direction: column; align-items: center; }
  .ht-cmd { font-size: 12px; padding: 14px 16px; }
  .ht-tab { padding: 8px 12px; font-size: 12px; }
}
</style>
