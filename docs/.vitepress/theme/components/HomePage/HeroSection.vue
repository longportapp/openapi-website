<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const titleRef = ref<HTMLElement | null>(null)

interface Product {
  key: string
  label: string
  command: string
}

const products: Product[] = [
  { key: 'openapi', label: 'OpenAPI', command: 'pip install longbridge' },
  { key: 'mcp', label: 'MCP', command: 'claude mcp add --transport http longbridge https://openapi.longbridge.com/mcp' },
  { key: 'cli', label: 'CLI', command: 'curl -fsSL https://longbridge.sh/install | bash' },
  { key: 'skill', label: 'SKILL', command: 'npx skills add longbridge/developers -g -y' },
]

const activeIdx = ref(0)
const active = computed(() => products[activeIdx.value])
const tabsRef = ref<HTMLElement | null>(null)
const indicatorStyle = ref({ width: '0px', left: '0px' })

// Typing
const displayedCmd = ref(products[0].command)
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
      timer = setTimeout(step, 20 + Math.random() * 15)
    } else {
      showCursor.value = true
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
  // Instant show on click
  displayedCmd.value = products[idx].command
  showCursor.value = true
  // Resume auto-cycle after pause
  autoTimer = setTimeout(() => {
    userClicked = false
    autoNext()
  }, 5000)
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
    typeCmd(active.value.command, autoNext)
  }
})

// Copy
const copied = ref(false)
async function copy() {
  try {
    await navigator.clipboard.writeText(active.value.command)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1500)
  } catch { /* noop */ }
}

onMounted(() => {
  // Title blur-in
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
  // Start typing first command after title animation
  timer = setTimeout(() => typeCmd(active.value.command, autoNext), 900)
})

onUnmounted(clear)
</script>

<template>
  <section class="hero">
    <div class="homepage-container">
      <h1 ref="titleRef" class="hero__title">Longbridge Developers</h1>
      <p class="hero__sub hero-fade-up" style="animation-delay:0.5s">{{ t('home.subtitle') }}</p>

      <div class="hero__term hero-fade-up" style="animation-delay:0.7s">
        <!-- Tabs -->
        <div ref="tabsRef" class="ht-bar">
          <div class="ht-ind" :style="indicatorStyle" />
          <button
            v-for="(p, i) in products" :key="p.key" :data-idx="i"
            class="ht-tab" :class="{ active: activeIdx === i }"
            @click="switchTo(i)"
          >{{ p.label }}</button>
          <button class="ht-copy" @click="copy">{{ copied ? $t('api.copied') : $t('api.copy') }}</button>
        </div>
        <!-- Command -->
        <div class="ht-cmd">
          <span class="ht-ps">$</span>
          <span class="ht-text">{{ displayedCmd }}</span>
          <span v-if="showCursor" class="typing-cursor" />
        </div>
      </div>

      <div class="hero__cta hero-fade-up" style="animation-delay:0.95s">
        <a href="/docs/getting-started" class="hero__btn hero__btn--pri">{{ t('home.getStarted') }}</a>
        <a href="/docs/api" class="hero__btn hero__btn--sec">{{ t('home.apiReference') }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 80px 0 48px;
}
.hero__title {
  font-size: 50px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
  color: var(--text-color-1);
}
.hero__sub {
  font-size: 17px;
  color: var(--text-color-1-supplement);
  margin-bottom: 36px;
  white-space: pre-line;
  line-height: 1.6;
}

/* ===== Terminal ===== */
.hero__term {
  max-width: 660px;
  margin: 0 auto 32px;
  background: var(--home-bg-color-1);
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0,0,0,0.08);
  overflow: hidden;
}
.dark .hero__term { box-shadow: 0 2px 20px rgba(0,0,0,0.3); }

/* Tab bar */
.ht-bar {
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 1px solid var(--border-color);
  padding: 0 12px;
}
.ht-ind {
  position: absolute;
  bottom: 0;
  height: 2px;
  background: var(--brand-color);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.ht-tab {
  padding: 10px 16px;
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
.ht-tab.active { color: var(--brand-color); }
.ht-tab:hover { color: var(--text-color-1); }
.ht-copy {
  margin-left: auto;
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: transparent;
  color: var(--text-color-3);
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
}
.ht-copy:hover { color: var(--text-color-1); border-color: var(--text-color-3); }

/* Command area */
.ht-cmd {
  padding: 20px 24px;
  font-family: 'SF Mono', 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--text-color-1);
  text-align: left;
  min-height: 62px;
  display: flex;
  align-items: center;
}
.ht-ps {
  color: var(--brand-color);
  user-select: none;
  margin-right: 10px;
  font-weight: 700;
}
.ht-text {
  word-break: break-all;
}

/* CTA */
.hero__cta { display: flex; justify-content: center; gap: 12px; }
.hero__btn {
  border-radius: 6px; padding: 12px 28px; font-size: 14.5px; font-weight: 600;
  cursor: pointer; transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none; display: inline-block;
}
.hero__btn--pri { background: var(--brand-color); color: #fff; }
.hero__btn--pri:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,184,184,0.3); }
.hero__btn--sec { background: transparent; color: var(--brand-color); border: 1.5px solid var(--brand-color); }
.hero__btn--sec:hover { background: var(--brand-5); transform: translateY(-2px); }

@media (max-width: 640px) {
  .hero { padding: 56px 0 36px; }
  .hero__title { font-size: 34px; }
  .hero__sub { font-size: 15px; }
  .hero__cta { flex-direction: column; align-items: center; }
  .ht-cmd { font-size: 12.5px; padding: 16px 18px; }
}
</style>
