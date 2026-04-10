# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current marketing-style homepage with a developer-first product platform page showcasing 4 products (OpenAPI, MCP, CLI, SKILL) with actionable install commands, rich product descriptions, and code examples.

**Architecture:** The homepage is a custom VitePress page using `layout: home` with a `<HomePage />` Vue component. We replace all child components of `HomePage/index.vue` with new sections: HeroSection, PlatformStats, ProductSection (x4), GetStarted, MarketCoverage, and an updated Footer. All text uses vue-i18n keys for 3 locales. Styling uses existing CSS variables from `css-var.scss` (maps to LBUS tokens) plus new homepage-specific variables. Animations use CSS + Intersection Observer via a `useScrollReveal` composable.

**Tech Stack:** VitePress 2.0, Vue 3 Composition API, UnoCSS (presetWind3), vue-i18n, CSS custom properties, Intersection Observer API

**Spec:** `docs/superpowers/specs/2026-04-10-homepage-redesign-design.md`
**Demo:** `docs/superpowers/specs/homepage-demo.html`

---

## File Structure

### New files

| File | Responsibility |
|------|---------------|
| `docs/.vitepress/theme/components/HomePage/HeroSection.vue` | Title, subtitle, product tab switcher, code block, CTA buttons |
| `docs/.vitepress/theme/components/HomePage/ProductTabs.vue` | Tab switcher with sliding indicator + code content per tab |
| `docs/.vitepress/theme/components/HomePage/CopyButton.vue` | Reusable copy-to-clipboard button for code blocks |
| `docs/.vitepress/theme/components/HomePage/PlatformStats.vue` | Stats bar (4 markets, 6 SDKs, 40+ commands, free) with count-up animation |
| `docs/.vitepress/theme/components/HomePage/ProductSection.vue` | Full-width product section (content left + visual right, reversible) |
| `docs/.vitepress/theme/components/HomePage/CodeBlockTabs.vue` | Multi-language code block with tab switcher (for OpenAPI section) |
| `docs/.vitepress/theme/components/HomePage/TerminalPreview.vue` | Terminal-style output preview (for CLI section) |
| `docs/.vitepress/theme/components/HomePage/McpShowcase.vue` | MCP endpoint + supported tools display (for MCP section) |
| `docs/.vitepress/theme/components/HomePage/GetStarted.vue` | 4-card quick-start grid linking to each product's docs |
| `docs/.vitepress/theme/components/HomePage/MarketCoverage.vue` | Market cards + SDK pills + stats |
| `docs/.vitepress/theme/composables/useScrollReveal.ts` | Intersection Observer composable for scroll-triggered animations |
| `docs/.vitepress/theme/composables/useCountUp.ts` | Number count-up animation composable |
| `docs/.vitepress/theme/style/homepage.scss` | All homepage-specific styles (animations, layout, sections) |

### Modified files

| File | Changes |
|------|---------|
| `docs/.vitepress/theme/components/HomePage/index.vue` | Replace old imports with new section components |
| `docs/.vitepress/theme/components/HomePage/Footer.vue` | Update right-side links to OpenAPI/MCP/CLI/SKILL |
| `docs/.vitepress/theme/style/index.css` | Import new `homepage.scss` |
| `docs/.vitepress/theme/locales/en.json` | Add ~40 new i18n keys for homepage content |
| `docs/.vitepress/theme/locales/zh-CN.json` | Add ~40 new i18n keys (Chinese translations) |
| `docs/.vitepress/theme/locales/zh-HK.json` | Add ~40 new i18n keys (Traditional Chinese translations) |
| `docs/en/index.md` | Remove VitePress hero/features frontmatter, keep only `<HomePage/>` |
| `docs/zh-CN/index.md` | Same frontmatter changes |
| `docs/zh-HK/index.md` | Same frontmatter changes |

### Removed files (after migration)

| File | Reason |
|------|--------|
| `docs/.vitepress/theme/components/HomePage/HomeFeatures.vue` | Replaced by ProductSection |
| `docs/.vitepress/theme/components/HomePage/FeatureItem.vue` | Replaced by ProductSection |
| `docs/.vitepress/theme/components/HomePage/Markets.vue` | Replaced by MarketCoverage |
| `docs/.vitepress/theme/components/HomePage/Market.vue` | Replaced by MarketCoverage |

---

## Task 1: Homepage stylesheet and CSS variables

**Files:**
- Create: `docs/.vitepress/theme/style/homepage.scss`
- Modify: `docs/.vitepress/theme/style/index.css`

- [ ] **Step 1: Create homepage.scss with LBUS-aligned CSS variables and animation keyframes**

```scss
/* docs/.vitepress/theme/style/homepage.scss */

/* ===== Homepage layout ===== */
.homepage-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.homepage-section {
  padding: 80px 0;
}

.homepage-section--alt {
  background-color: var(--home-bg-color);
}

.homepage-section--white {
  background-color: var(--home-bg-color-1);
}

/* ===== Scroll reveal ===== */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-d1 { transition-delay: 0.08s; }
.reveal-d2 { transition-delay: 0.16s; }
.reveal-d3 { transition-delay: 0.24s; }
.reveal-d4 { transition-delay: 0.32s; }

/* ===== Hero animations ===== */
.hero-char {
  display: inline-block;
  opacity: 0;
  filter: blur(8px);
  animation: blur-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes blur-in {
  to { opacity: 1; filter: blur(0); }
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-fade-up {
  opacity: 0;
  animation: fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* ===== Tab content transition ===== */
@keyframes tab-fade-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.tab-content-enter {
  animation: tab-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* ===== Typing cursor ===== */
.typing-cursor {
  display: inline-block;
  width: 2px;
  height: 1.1em;
  background: var(--brand-color);
  margin-left: 2px;
  animation: blink 1s step-end infinite;
  vertical-align: text-bottom;
}

@keyframes blink {
  50% { opacity: 0; }
}

/* ===== Code block base ===== */
.homepage-code {
  background: var(--home-bg-color-1);
  border-radius: 6px;
  font-family: 'SF Mono', 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
}

.dark .homepage-code {
  background: var(--home-bg-color-1);
}

/* ===== Product section layout ===== */
.product-section-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.product-section-grid--reverse {
  direction: rtl;
}

.product-section-grid--reverse > * {
  direction: ltr;
}

@media (max-width: 900px) {
  .product-section-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .product-section-grid--reverse {
    direction: ltr;
  }
}

/* ===== Reduce motion ===== */
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; }
  .hero-char { opacity: 1; filter: none; animation: none; }
  .hero-fade-up { opacity: 1; animation: none; }
}
```

- [ ] **Step 2: Import homepage.scss in index.css**

Add this line to the end of `docs/.vitepress/theme/style/index.css`:

```css
@import './homepage.scss';
```

- [ ] **Step 3: Verify the dev server loads the new styles**

Run: `bun run dev`
Expected: Dev server starts without errors. No visible changes yet (new classes aren't used).

- [ ] **Step 4: Commit**

```bash
git add docs/.vitepress/theme/style/homepage.scss docs/.vitepress/theme/style/index.css
git commit -m "feat(homepage): add homepage stylesheet with LBUS-aligned variables and animations"
```

---

## Task 2: Scroll reveal and count-up composables

**Files:**
- Create: `docs/.vitepress/theme/composables/useScrollReveal.ts`
- Create: `docs/.vitepress/theme/composables/useCountUp.ts`
- Modify: `docs/.vitepress/theme/composables/index.ts`

- [ ] **Step 1: Create useScrollReveal composable**

```typescript
// docs/.vitepress/theme/composables/useScrollReveal.ts
import { onMounted, onUnmounted, type Ref } from 'vue'

export function useScrollReveal(containerRef: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!containerRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' },
    )

    containerRef.value.querySelectorAll('.reveal').forEach((el) => {
      observer?.observe(el)
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
```

- [ ] **Step 2: Create useCountUp composable**

```typescript
// docs/.vitepress/theme/composables/useCountUp.ts
import { onMounted, onUnmounted, type Ref } from 'vue'

export function useCountUp(containerRef: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!containerRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const target = parseInt(el.dataset.target || '0', 10)
          if (!target) return

          let current = 0
          const duration = 1000
          const step = target / (duration / 16)
          const interval = setInterval(() => {
            current += step
            if (current >= target) {
              current = target
              clearInterval(interval)
            }
            el.textContent = String(Math.floor(current))
          }, 16)

          observer?.unobserve(el)
        })
      },
      { threshold: 0.5 },
    )

    containerRef.value.querySelectorAll<HTMLElement>('[data-count-target]').forEach((el) => {
      observer?.observe(el)
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
```

- [ ] **Step 3: Export from composables index**

Add to `docs/.vitepress/theme/composables/index.ts`:

```typescript
export { useScrollReveal } from './useScrollReveal'
export { useCountUp } from './useCountUp'
```

- [ ] **Step 4: Commit**

```bash
git add docs/.vitepress/theme/composables/useScrollReveal.ts docs/.vitepress/theme/composables/useCountUp.ts docs/.vitepress/theme/composables/index.ts
git commit -m "feat(homepage): add useScrollReveal and useCountUp composables"
```

---

## Task 3: CopyButton component

**Files:**
- Create: `docs/.vitepress/theme/components/HomePage/CopyButton.vue`

- [ ] **Step 1: Create CopyButton.vue**

```vue
<!-- docs/.vitepress/theme/components/HomePage/CopyButton.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ text: string }>()

const copied = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(props.text)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1500)
  } catch {
    // Fallback: noop in SSR
  }
}
</script>

<template>
  <button
    class="copy-btn"
    :class="{ 'copy-btn--copied': copied }"
    @click="copy"
  >
    {{ copied ? $t('api.copied') : $t('api.copy') }}
  </button>
</template>

<style scoped>
.copy-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-color-3);
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 11px;
  font-family: inherit;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.copy-btn--copied {
  color: var(--brand-color);
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add docs/.vitepress/theme/components/HomePage/CopyButton.vue
git commit -m "feat(homepage): add CopyButton component"
```

---

## Task 4: ProductTabs component (Hero tab switcher)

**Files:**
- Create: `docs/.vitepress/theme/components/HomePage/ProductTabs.vue`

- [ ] **Step 1: Create ProductTabs.vue**

```vue
<!-- docs/.vitepress/theme/components/HomePage/ProductTabs.vue -->
<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import CopyButton from './CopyButton.vue'

interface TabItem {
  key: string
  label: string
  command: string
}

const props = defineProps<{ tabs: TabItem[] }>()

const activeTab = ref(props.tabs[0]?.key || '')
const tabsRef = ref<HTMLElement | null>(null)
const indicatorStyle = ref({ width: '0px', left: '0px' })

function updateIndicator() {
  if (!tabsRef.value) return
  const activeEl = tabsRef.value.querySelector<HTMLElement>(`[data-tab="${activeTab.value}"]`)
  if (!activeEl) return
  const parentRect = tabsRef.value.getBoundingClientRect()
  const rect = activeEl.getBoundingClientRect()
  indicatorStyle.value = {
    width: `${rect.width}px`,
    left: `${rect.left - parentRect.left}px`,
  }
}

function switchTo(key: string) {
  activeTab.value = key
}

watch(activeTab, () => nextTick(updateIndicator))
onMounted(() => nextTick(updateIndicator))

const activeCommand = computed(() => {
  return props.tabs.find((t) => t.key === activeTab.value)?.command || ''
})
</script>

<script lang="ts">
import { computed } from 'vue'
</script>

<template>
  <div>
    <!-- Tab bar -->
    <div ref="tabsRef" class="product-tabs">
      <div class="product-tabs__indicator" :style="indicatorStyle" />
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :data-tab="tab.key"
        class="product-tabs__tab"
        :class="{ 'product-tabs__tab--active': activeTab === tab.key }"
        @click="switchTo(tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Code block -->
    <div class="product-tabs__code">
      <CopyButton :text="activeCommand" />
      <div
        v-for="tab in tabs"
        :key="tab.key"
        class="product-tabs__content"
        :class="{ 'product-tabs__content--active': activeTab === tab.key }"
      >
        <span class="product-tabs__prompt">$</span>
        <span>{{ tab.command }}</span>
        <span v-if="activeTab === tab.key" class="typing-cursor" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-tabs {
  display: inline-flex;
  gap: 3px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 9px;
  padding: 3px;
  margin-bottom: 24px;
  position: relative;
}

.dark .product-tabs {
  background: rgba(255, 255, 255, 0.06);
}

.product-tabs__indicator {
  position: absolute;
  height: calc(100% - 6px);
  top: 3px;
  background: var(--brand-color);
  border-radius: 7px;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 8px rgba(0, 184, 184, 0.3);
}

.product-tabs__tab {
  padding: 9px 22px;
  border-radius: 7px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  border: none;
  background: transparent;
  color: var(--text-color-2);
  font-family: inherit;
  position: relative;
  z-index: 1;
}

.product-tabs__tab--active {
  color: #fff;
}

.product-tabs__tab:not(.product-tabs__tab--active):hover {
  color: var(--text-color-1);
}

.product-tabs__code {
  max-width: 620px;
  margin: 0 auto 32px;
  background: var(--home-bg-color-1);
  border-radius: 10px;
  padding: 20px 24px;
  text-align: left;
  position: relative;
  font-family: 'SF Mono', 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
  font-size: 13.5px;
  line-height: 1.8;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  color: var(--text-color-1);
}

.dark .product-tabs__code {
  background: var(--home-bg-color-1);
}

.product-tabs__code::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 184, 184, 0.4), transparent);
}

.product-tabs__prompt {
  color: var(--text-color-3);
  user-select: none;
  margin-right: 8px;
}

.product-tabs__content {
  display: none;
  white-space: pre-wrap;
  word-break: break-all;
}

.product-tabs__content--active {
  display: block;
  animation: tab-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add docs/.vitepress/theme/components/HomePage/ProductTabs.vue
git commit -m "feat(homepage): add ProductTabs component with sliding indicator"
```

---

## Task 5: HeroSection component

**Files:**
- Create: `docs/.vitepress/theme/components/HomePage/HeroSection.vue`

- [ ] **Step 1: Create HeroSection.vue**

```vue
<!-- docs/.vitepress/theme/components/HomePage/HeroSection.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import ProductTabs from './ProductTabs.vue'

const { t } = useI18n()

const titleRef = ref<HTMLElement | null>(null)

const tabs = [
  { key: 'openapi', label: 'OpenAPI', command: 'pip install longbridge' },
  { key: 'mcp', label: 'MCP', command: 'claude mcp add --transport http longbridge https://openapi.longbridge.com/mcp' },
  { key: 'cli', label: 'CLI', command: 'curl -fsSL https://longbridge.sh/install | bash' },
  { key: 'skill', label: 'SKILL', command: 'npx skills add longbridge/developers -g -y' },
]

onMounted(() => {
  if (!titleRef.value) return
  const text = titleRef.value.textContent || ''
  titleRef.value.innerHTML = ''
  ;[...text].forEach((char, i) => {
    const span = document.createElement('span')
    span.className = 'hero-char'
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.animationDelay = `${i * 0.03}s`
    titleRef.value!.appendChild(span)
  })
})
</script>

<template>
  <section class="hero-section">
    <div class="homepage-container hero-section__inner">
      <h1 ref="titleRef" class="hero-section__title">
        Longbridge Developers
      </h1>
      <p class="hero-section__subtitle hero-fade-up" style="animation-delay: 0.5s">
        {{ t('home.subtitle') }}
      </p>

      <div class="hero-fade-up" style="animation-delay: 0.65s">
        <ProductTabs :tabs="tabs" />
      </div>

      <div class="hero-section__cta hero-fade-up" style="animation-delay: 0.95s">
        <a href="/docs/getting-started" class="hero-section__btn hero-section__btn--primary">
          {{ t('home.getStarted') }}
        </a>
        <a href="/docs/api" class="hero-section__btn hero-section__btn--secondary">
          {{ t('home.apiReference') }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  text-align: center;
  padding: 88px 0 72px;
}

.hero-section__title {
  font-size: 50px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
  color: var(--text-color-1);
}

.hero-section__subtitle {
  font-size: 18px;
  color: var(--text-color-1-supplement);
  margin-bottom: 40px;
}

.hero-section__cta {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.hero-section__btn {
  border-radius: 8px;
  padding: 12px 28px;
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  display: inline-block;
}

.hero-section__btn--primary {
  background: var(--brand-color);
  color: #fff;
  border: none;
}

.hero-section__btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 184, 184, 0.3);
}

.hero-section__btn--secondary {
  background: transparent;
  color: var(--brand-color);
  border: 1.5px solid var(--brand-color);
}

.hero-section__btn--secondary:hover {
  background: rgba(0, 184, 184, 0.06);
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .hero-section { padding: 64px 0 48px; }
  .hero-section__title { font-size: 34px; }
  .hero-section__subtitle { font-size: 16px; }
  .hero-section__cta { flex-direction: column; align-items: center; }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add docs/.vitepress/theme/components/HomePage/HeroSection.vue
git commit -m "feat(homepage): add HeroSection with blur-text animation and product tabs"
```

---

## Task 6: PlatformStats component

**Files:**
- Create: `docs/.vitepress/theme/components/HomePage/PlatformStats.vue`

- [ ] **Step 1: Create PlatformStats.vue**

```vue
<!-- docs/.vitepress/theme/components/HomePage/PlatformStats.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCountUp } from '../../composables/useCountUp'

const { t } = useI18n()
const statsRef = ref<HTMLElement | null>(null)
useCountUp(statsRef)
</script>

<template>
  <section ref="statsRef" class="platform-stats reveal">
    <div class="homepage-container">
      <div class="platform-stats__grid">
        <div class="platform-stats__item">
          <div class="platform-stats__value">
            <span class="platform-stats__num" data-count-target="4">0</span>
          </div>
          <div class="platform-stats__label">{{ t('home.stats.markets') }}</div>
        </div>
        <div class="platform-stats__item">
          <div class="platform-stats__value">
            <span class="platform-stats__num" data-count-target="6">0</span>
          </div>
          <div class="platform-stats__label">{{ t('home.stats.sdks') }}</div>
        </div>
        <div class="platform-stats__item">
          <div class="platform-stats__value">
            <span class="platform-stats__num" data-count-target="40">0</span>+
          </div>
          <div class="platform-stats__label">{{ t('home.stats.commands') }}</div>
        </div>
        <div class="platform-stats__item">
          <div class="platform-stats__value">{{ t('home.stats.freeValue') }}</div>
          <div class="platform-stats__label">{{ t('home.stats.freeLabel') }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.platform-stats {
  padding: 48px 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  background: var(--home-bg-color-1);
}

.platform-stats__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  text-align: center;
}

.platform-stats__value {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-color-1);
}

.platform-stats__num {
  color: var(--brand-color);
}

.platform-stats__label {
  font-size: 13px;
  color: var(--text-color-2);
  margin-top: 4px;
}

@media (max-width: 640px) {
  .platform-stats__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add docs/.vitepress/theme/components/HomePage/PlatformStats.vue
git commit -m "feat(homepage): add PlatformStats with count-up animation"
```

---

## Task 7: ProductSection, CodeBlockTabs, TerminalPreview, McpShowcase components

**Files:**
- Create: `docs/.vitepress/theme/components/HomePage/ProductSection.vue`
- Create: `docs/.vitepress/theme/components/HomePage/CodeBlockTabs.vue`
- Create: `docs/.vitepress/theme/components/HomePage/TerminalPreview.vue`
- Create: `docs/.vitepress/theme/components/HomePage/McpShowcase.vue`

- [ ] **Step 1: Create ProductSection.vue**

This is the reusable full-width section container (content left + slot right, reversible).

```vue
<!-- docs/.vitepress/theme/components/HomePage/ProductSection.vue -->
<script setup lang="ts">
defineProps<{
  reverse?: boolean
  accent: string
}>()
</script>

<template>
  <section class="homepage-section" :class="{ 'homepage-section--alt': !reverse }">
    <div
      class="homepage-container product-section-grid"
      :class="{ 'product-section-grid--reverse': reverse }"
    >
      <div class="reveal">
        <slot name="content" />
      </div>
      <div class="reveal reveal-d2">
        <slot name="visual" />
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Create CodeBlockTabs.vue**

Multi-language code block with tabs (used for OpenAPI section).

```vue
<!-- docs/.vitepress/theme/components/HomePage/CodeBlockTabs.vue -->
<script setup lang="ts">
import { ref } from 'vue'

interface CodeTab {
  key: string
  label: string
  code: string
}

defineProps<{ tabs: CodeTab[] }>()

const activeTab = ref('')
</script>

<script lang="ts">
export default { inheritAttrs: false }
</script>

<template>
  <div class="cbt">
    <div class="cbt__tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="cbt__tab"
        :class="{ 'cbt__tab--active': (activeTab || tabs[0]?.key) === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="cbt__body">
      <pre
        v-for="tab in tabs"
        :key="tab.key"
        v-show="(activeTab || tabs[0]?.key) === tab.key"
        class="cbt__pre"
      ><code v-html="tab.code" /></pre>
    </div>
  </div>
</template>

<style scoped>
.cbt {
  background: var(--home-bg-color-1);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

.dark .cbt {
  background: var(--home-bg-color-1);
}

.cbt__tabs {
  display: flex;
  gap: 0;
  padding: 0 16px;
  background: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid var(--border-color);
}

.dark .cbt__tabs {
  background: rgba(255, 255, 255, 0.03);
}

.cbt__tab {
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-color-3);
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.cbt__tab--active {
  color: var(--text-color-1);
  border-bottom-color: var(--brand-color);
}

.cbt__tab:hover {
  color: var(--text-color-1);
}

.cbt__body {
  padding: 20px;
  overflow-x: auto;
}

.cbt__pre {
  margin: 0;
  font-family: 'SF Mono', 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12.5px;
  line-height: 1.8;
  color: var(--text-color-1);
}
</style>
```

- [ ] **Step 3: Create TerminalPreview.vue**

Terminal-style output (used for CLI section).

```vue
<!-- docs/.vitepress/theme/components/HomePage/TerminalPreview.vue -->
<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <div class="terminal">
    <div class="terminal__header">
      <span class="terminal__dot terminal__dot--red" />
      <span class="terminal__dot terminal__dot--yellow" />
      <span class="terminal__dot terminal__dot--green" />
      <span class="terminal__title">{{ title || 'terminal' }}</span>
    </div>
    <div class="terminal__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.terminal {
  background: var(--home-bg-color-1);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

.dark .terminal {
  background: var(--home-bg-color-1);
}

.terminal__header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid var(--border-color);
}

.dark .terminal__header {
  background: rgba(255, 255, 255, 0.05);
}

.terminal__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.terminal__dot--red { background: #ff5f57; }
.terminal__dot--yellow { background: #febc2e; }
.terminal__dot--green { background: #28c840; }

.terminal__title {
  font-size: 12px;
  color: var(--text-color-3);
  margin-left: 8px;
  font-family: 'SF Mono', ui-monospace, monospace;
}

.terminal__body {
  padding: 16px 20px;
  font-family: 'SF Mono', 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12px;
  color: var(--text-color-1);
  line-height: 1.9;
  overflow-x: auto;
}
</style>
```

- [ ] **Step 4: Create McpShowcase.vue**

MCP endpoint + supported tools (used for MCP section).

```vue
<!-- docs/.vitepress/theme/components/HomePage/McpShowcase.vue -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const tools = ['Claude Code', 'Cursor', 'Zed', 'ChatGPT', 'Codex', 'Cherry Studio']
const endpoint = 'https://openapi.longbridge.com/mcp'
const setupCmd = `claude mcp add --transport http longbridge ${endpoint}`
</script>

<template>
  <div class="mcp-showcase">
    <div class="mcp-showcase__label">MCP Endpoint</div>
    <div class="mcp-showcase__url">{{ endpoint }}</div>

    <div class="mcp-showcase__label" style="margin-top: 16px">{{ t('home.mcp.supportedTools') }}</div>
    <div class="mcp-showcase__tools">
      <span v-for="tool in tools" :key="tool" class="mcp-showcase__tool">{{ tool }}</span>
    </div>

    <div class="mcp-showcase__label">Quick Setup</div>
    <div class="mcp-showcase__cmd">$ {{ setupCmd }}</div>
  </div>
</template>

<style scoped>
.mcp-showcase {
  background: var(--home-bg-color-1);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.mcp-showcase__label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-color-3);
  margin-bottom: 8px;
}

.mcp-showcase__url {
  font-family: 'SF Mono', ui-monospace, monospace;
  font-size: 14px;
  color: var(--brand-color);
  font-weight: 600;
  background: var(--brand-5);
  padding: 10px 14px;
  border-radius: 6px;
  margin-bottom: 16px;
  word-break: break-all;
}

.mcp-showcase__tools {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.mcp-showcase__tool {
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 6px;
  background: var(--front-bg-color);
  color: var(--text-color-2);
  transition: all 0.2s;
  cursor: default;
}

.mcp-showcase__tool:hover {
  color: var(--brand-color);
  background: var(--brand-5);
}

.mcp-showcase__cmd {
  font-family: 'SF Mono', ui-monospace, monospace;
  font-size: 12px;
  color: var(--text-color-2);
  background: var(--front-bg-color);
  padding: 10px 14px;
  border-radius: 6px;
  word-break: break-all;
}
</style>
```

- [ ] **Step 5: Commit**

```bash
git add docs/.vitepress/theme/components/HomePage/ProductSection.vue docs/.vitepress/theme/components/HomePage/CodeBlockTabs.vue docs/.vitepress/theme/components/HomePage/TerminalPreview.vue docs/.vitepress/theme/components/HomePage/McpShowcase.vue
git commit -m "feat(homepage): add ProductSection, CodeBlockTabs, TerminalPreview, McpShowcase"
```

---

## Task 8: GetStarted and MarketCoverage components

**Files:**
- Create: `docs/.vitepress/theme/components/HomePage/GetStarted.vue`
- Create: `docs/.vitepress/theme/components/HomePage/MarketCoverage.vue`

- [ ] **Step 1: Create GetStarted.vue**

4-card quick-start grid linking to each product's docs page.

```vue
<!-- docs/.vitepress/theme/components/HomePage/GetStarted.vue -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const products = [
  { name: 'OpenAPI', cmd: 'pip install longbridge', link: '/docs/getting-started', color: 'var(--brand-color)' },
  { name: 'MCP', cmd: 'claude mcp add longbridge ...', link: '/docs/mcp', color: '#8b5cf6' },
  { name: 'CLI', cmd: 'curl -fsSL .../install | bash', link: '/docs/cli', color: '#f59e0b' },
  { name: 'SKILL', cmd: 'npx skills add longbridge/...', link: '/skill', color: '#ec4899' },
]
</script>

<template>
  <section class="homepage-section homepage-section--white">
    <div class="homepage-container">
      <div class="gs-header reveal">
        <h2 class="gs-title">{{ t('home.getStarted') }}</h2>
      </div>
      <div class="gs-grid">
        <a
          v-for="(p, i) in products"
          :key="p.name"
          :href="p.link"
          class="gs-card reveal"
          :class="`reveal-d${i + 1}`"
        >
          <div class="gs-name">{{ p.name }}</div>
          <div class="gs-cmd">{{ p.cmd }}</div>
          <span class="gs-link" :style="{ color: p.color }">Quick Start &rarr;</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gs-header { text-align: center; margin-bottom: 40px; }

.gs-title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-color-1);
}

.gs-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.gs-card {
  background: var(--home-bg-color);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 24px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  display: block;
}

.gs-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: rgba(0, 184, 184, 0.2);
}

.gs-name {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-color-1);
}

.gs-cmd {
  font-family: 'SF Mono', ui-monospace, monospace;
  font-size: 11.5px;
  color: var(--text-color-3);
  background: var(--front-bg-color);
  padding: 6px 10px;
  border-radius: 5px;
  margin-bottom: 12px;
  word-break: break-all;
}

.gs-link {
  font-size: 13px;
  font-weight: 600;
}

@media (max-width: 900px) {
  .gs-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .gs-grid { grid-template-columns: 1fr; }
}
</style>
```

- [ ] **Step 2: Create MarketCoverage.vue**

Market cards + SDK pills.

```vue
<!-- docs/.vitepress/theme/components/HomePage/MarketCoverage.vue -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import IconComponent from './IconComponent.vue'

const { t } = useI18n()

const markets = [
  { key: 'HK', icon: 'market_round_HK', color: '#FF3A9D', nameKey: 'home.market.hk', productsKey: 'home.market.hkProducts' },
  { key: 'US', icon: 'market_round_US', color: '#2A99FE', nameKey: 'home.market.us', productsKey: 'home.market.usProducts' },
  { key: 'CN', icon: 'market_round_CN', color: '#FF3A3A', nameKey: 'home.market.cn', productsKey: 'home.market.cnProducts' },
  { key: 'SG', icon: 'market_round_SG', color: '#3AD8FF', nameKey: 'home.market.sg', productsKey: 'home.market.sgProducts' },
]

const sdks = ['Python', 'Node.js', 'Rust', 'Go', 'Java', 'C++']
</script>

<template>
  <section class="homepage-section">
    <div class="homepage-container">
      <div class="mc-header reveal">
        <h2 class="mc-title">{{ t('home.marketCoverage.title') }}</h2>
        <p class="mc-subtitle">{{ t('home.marketCoverage.subtitle') }}</p>
      </div>
      <div class="mc-grid reveal">
        <div v-for="m in markets" :key="m.key" class="mc-card">
          <IconComponent :type="m.icon" class-name="mc-icon" />
          <div class="mc-name">{{ t(m.nameKey) }}</div>
          <div class="mc-products">{{ t(m.productsKey) }}</div>
        </div>
      </div>
      <div class="mc-sdks reveal reveal-d1">
        <span v-for="sdk in sdks" :key="sdk" class="mc-sdk">{{ sdk }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mc-header { text-align: center; margin-bottom: 40px; }

.mc-title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-color-1);
  margin-bottom: 8px;
}

.mc-subtitle {
  font-size: 15px;
  color: var(--text-color-2);
  max-width: 520px;
  margin: 0 auto;
}

.mc-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.mc-card {
  background: var(--home-bg-color-1);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.mc-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.mc-icon {
  width: 36px;
  height: 36px;
  margin: 0 auto 8px;
}

.mc-name { font-size: 14px; font-weight: 700; margin-bottom: 4px; color: var(--text-color-1); }
.mc-products { font-size: 12px; color: var(--text-color-3); }

.mc-sdks {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.mc-sdk {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-color-2);
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background: var(--home-bg-color-1);
  transition: all 0.2s;
}

.mc-sdk:hover {
  border-color: var(--brand-color);
  color: var(--brand-color);
  background: var(--brand-5);
}

@media (max-width: 640px) {
  .mc-grid { grid-template-columns: 1fr; }
}

@media (max-width: 900px) and (min-width: 641px) {
  .mc-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
```

- [ ] **Step 3: Commit**

```bash
git add docs/.vitepress/theme/components/HomePage/GetStarted.vue docs/.vitepress/theme/components/HomePage/MarketCoverage.vue
git commit -m "feat(homepage): add GetStarted and MarketCoverage components"
```

---

## Task 9: i18n keys for all 3 locales

**Files:**
- Modify: `docs/.vitepress/theme/locales/en.json`
- Modify: `docs/.vitepress/theme/locales/zh-CN.json`
- Modify: `docs/.vitepress/theme/locales/zh-HK.json`

- [ ] **Step 1: Add homepage i18n keys to en.json**

Add the following keys to `docs/.vitepress/theme/locales/en.json` (merge with existing content):

```json
{
  "home.subtitle": "Programmatic market data and trading API for quantitative investors.\nBuild trading strategies, AI workflows, and automation systems.",
  "home.getStarted": "Get Started",
  "home.apiReference": "API Reference",
  "home.stats.markets": "Global Markets (HK, US, CN, SG)",
  "home.stats.sdks": "SDK Languages (Python, Node.js, Rust, Go, Java, C++)",
  "home.stats.commands": "CLI Commands (Quotes, Trading, Financials, Community)",
  "home.stats.freeValue": "Free",
  "home.stats.freeLabel": "OpenAPI with zero extra fees, billed only by trading commission",
  "home.openapi.title": "Programmatic Market Data & Trading API",
  "home.openapi.desc": "Access real-time quotes, historical candlesticks, depth data, and execute trades across Hong Kong, US, China, and Singapore markets through a unified API. Supports HTTP REST and WebSocket binary protocol.",
  "home.openapi.feat1.title": "Full Market Coverage",
  "home.openapi.feat1.desc": "HK (stocks, ETFs, warrants, CBBC), US (NYSE, NASDAQ, OPRA options), China Connect, and Singapore. L1/L2 depth, tick-by-tick trades, capital flow, market temperature index.",
  "home.openapi.feat2.title": "Multi-level Trading",
  "home.openapi.feat2.desc": "Limit, market, conditional (price-triggered), and trailing stop-loss/take-profit orders. Full order lifecycle: submit, modify, cancel, query.",
  "home.openapi.feat3.title": "6 Language SDKs",
  "home.openapi.feat3.desc": "Python, Node.js, Rust, Go, Java, C++/C. All support async calls and Protobuf serialization. Built-in rate limiting and auto-delay — ready out of the box.",
  "home.openapi.feat4.title": "Historical Data & Financial Analysis",
  "home.openapi.feat4.desc": "1-minute to monthly candlesticks, historical data retrieval, financial reports, earnings forecasts, institutional ratings, insider trading records.",
  "home.openapi.link": "Explore OpenAPI Docs",
  "home.mcp.title": "Connect AI Agents to Financial Markets",
  "home.mcp.desc": "Hosted HTTP MCP service enabling Claude Code, Cursor, Zed, and other AI coding assistants to access real-time quotes, manage accounts, and execute trades. Standard OAuth 2.1 authorization — no API key configuration needed.",
  "home.mcp.feat1.title": "Zero-config OAuth",
  "home.mcp.feat1.desc": "Standard OAuth 2.1 flow with one-click browser authorization. Credentials are auto-managed and auto-refreshed by the AI client. Revoke anytime in account security settings.",
  "home.mcp.feat2.title": "Full Market & Trading Access",
  "home.mcp.feat2.desc": "AI can query real-time quotes, K-line history, account assets and positions, and execute orders (subject to account permissions and regional restrictions).",
  "home.mcp.feat3.title": "Multi-client Support",
  "home.mcp.feat3.desc": "Works with Claude Code, Claude Desktop, Cursor, Codex, Zed, Cherry Studio. Global and China-accelerated endpoints available.",
  "home.mcp.link": "Explore MCP Docs",
  "home.mcp.supportedTools": "Supported AI Tools",
  "home.cli.title": "AI-native CLI for Markets & Trading",
  "home.cli.desc": "40+ commands covering all Longbridge endpoints. Real-time quotes, financial reports, technical diagnostics, order management, portfolio review — all from your terminal. Supports --format json for AI agent consumption.",
  "home.cli.feat1.title": "Full-featured Market Data",
  "home.cli.feat1.desc": "Real-time quotes, L2 depth, K-line (daily to minute), tick-by-tick trades, capital flow, market temperature. Covers stocks, ETFs, options, warrants.",
  "home.cli.feat2.title": "Deep Financial Analysis",
  "home.cli.feat2.desc": "Financial statements (income, balance sheet, cash flow), valuation metrics (PE/PB/PS/dividend yield), analyst EPS consensus, institutional ratings, SEC Form 4 insider trades.",
  "home.cli.feat3.title": "Cross-market Screening & Technical Diagnosis",
  "home.cli.feat3.desc": "Screen HK, US, CN, SG stocks by market cap, PE, and technical signals. MA, MACD, KDJ, RSI, support/resistance levels on daily to 15-min timeframes. Output in Table, JSON, CSV, or Markdown.",
  "home.cli.link": "Explore CLI Docs",
  "home.skill.title": "AI Financial Knowledge Extension",
  "home.skill.desc": "One command to inject a complete Longbridge knowledge base into Claude, Cursor, and other AI assistants. AI auto-detects stock symbols and market analysis requests, intelligently invoking quotes, financial analysis, screening, and trading. Supports mixed Chinese/English queries.",
  "home.skill.feat1.title": "Smart Auto-trigger",
  "home.skill.feat1.desc": "Mention stock symbols (AAPL.US, 700.HK), market analysis, or portfolio queries to auto-activate. Use /longbridge prefix to force trigger.",
  "home.skill.feat2.title": "Full-stack Investment Analysis",
  "home.skill.feat2.desc": "Cross-market screening (market cap + PE + technical signals), technical diagnosis (MACD/KDJ/RSI/support-resistance), earnings analysis, SEC 13F institutional holdings, Form 4 insider trade monitoring.",
  "home.skill.feat3.title": "Comprehensive Reference",
  "home.skill.feat3.desc": "Includes CLI command reference, Python QuoteContext/TradeContext/ContentContext APIs, Rust SDK docs, all type definitions and enum values.",
  "home.skill.link": "Explore SKILL Docs",
  "home.marketCoverage.title": "Markets & SDKs",
  "home.marketCoverage.subtitle": "Stocks, ETFs, options, warrants, and CBBC across four markets. Open an account to receive HK market LV2 and CN market LV1 quotes for free.",
  "home.market.hk": "Hong Kong",
  "home.market.hkProducts": "Stocks \u00B7 ETFs \u00B7 Warrants \u00B7 CBBC",
  "home.market.us": "United States",
  "home.market.usProducts": "Stocks \u00B7 ETFs \u00B7 Options (OPRA)",
  "home.market.cn": "China Connect",
  "home.market.cnProducts": "Stocks \u00B7 ETFs",
  "home.market.sg": "Singapore",
  "home.market.sgProducts": "Stocks \u00B7 ETFs"
}
```

- [ ] **Step 2: Add homepage i18n keys to zh-CN.json**

Add matching keys with Chinese translations to `docs/.vitepress/theme/locales/zh-CN.json`:

```json
{
  "home.subtitle": "为有研发能力的投资者提供程序化行情交易接口\n助力搭建交易策略分析工具、AI 投研工作流与自动化系统",
  "home.getStarted": "快速开始",
  "home.apiReference": "API 参考",
  "home.stats.markets": "覆盖市场（港股 · 美股 · A 股 · 新加坡）",
  "home.stats.sdks": "SDK 语言（Python · Node.js · Rust · Go · Java · C++）",
  "home.stats.commands": "CLI 命令（行情 · 交易 · 财务 · 社区）",
  "home.stats.freeValue": "免费",
  "home.stats.freeLabel": "OpenAPI 接口零额外费用，仅按交易费率计费",
  "home.openapi.title": "程序化行情交易接口",
  "home.openapi.desc": "通过统一接口获取港股、美股、A 股及新加坡市场的实时行情与历史数据，执行多种订单类型的交易操作。支持 HTTP REST 和 WebSocket 二进制长连接协议，满足从策略回测到实盘交易的完整需求。",
  "home.openapi.feat1.title": "完整市场覆盖",
  "home.openapi.feat1.desc": "港股（股票、ETF、窝轮、牛熊证）、美股（纽交所、纳斯达克、OPRA 期权）、A 股通及新加坡市场。支持 L1/L2 深度行情、逐笔成交、资金流向、市场温度指数。",
  "home.openapi.feat2.title": "多层次交易功能",
  "home.openapi.feat2.desc": "支持限价单、市价单、条件单（到价触发）、跟踪止盈止损等订单类型。完整的订单生命周期管理：下单、改单、撤单、查询。",
  "home.openapi.feat3.title": "6 种语言 SDK",
  "home.openapi.feat3.desc": "Python、Node.js、Rust、Go、Java、C++/C，均支持异步调用、Protobuf 序列化。SDK 内置频率控制与自动延迟机制，开箱即用。",
  "home.openapi.feat4.title": "历史数据与财务分析",
  "home.openapi.feat4.desc": "分钟到月线 K 线、历史行情回溯、财务报表、盈利预测、机构评级、内部人交易记录，支撑技术面与基本面研究。",
  "home.openapi.link": "查看 OpenAPI 文档",
  "home.mcp.title": "让 AI 助手直接调用行情与交易",
  "home.mcp.desc": "托管的 HTTP MCP 服务，让 Claude Code、Cursor、Zed 等 AI 编程助手直接获取实时行情、管理账户、执行交易。采用标准 OAuth 2.1 授权流程，无需手动配置 API 密钥，浏览器一键授权即可开始使用。",
  "home.mcp.feat1.title": "零密钥配置",
  "home.mcp.feat1.desc": "标准 OAuth 2.1 授权流程，一键浏览器授权。凭证由 AI 客户端托管自动刷新，可在账户安全设置中随时撤销。",
  "home.mcp.feat2.title": "完整行情与交易能力",
  "home.mcp.feat2.desc": "AI 可查询实时行情快照、K 线历史、账户资产与持仓，也可执行下单、改单、撤单操作（受账户权限与地区限制）。",
  "home.mcp.feat3.title": "多客户端开箱即用",
  "home.mcp.feat3.desc": "支持 Claude Code、Claude Desktop、Cursor、Codex、Zed、Cherry Studio 等主流 AI 工具。全球节点与中国大陆加速节点可选。",
  "home.mcp.link": "查看 MCP 文档",
  "home.mcp.supportedTools": "支持的 AI 工具",
  "home.cli.title": "AI-native 命令行全功能终端工具",
  "home.cli.desc": "覆盖全部 Longbridge 端点的命令行工具。实时行情查询、财报分析、技术面诊断、订单管理、持仓复盘——一条命令搞定。支持 --format json 结构化输出，AI 代理可直接调用。",
  "home.cli.feat1.title": "全功能行情",
  "home.cli.feat1.desc": "实时报价、L2 盘口深度、K 线（日线到分钟）、逐笔成交、资金流向、市场温度指数。覆盖股票、ETF、期权、窝轮。",
  "home.cli.feat2.title": "深度财务分析",
  "home.cli.feat2.desc": "完整财务报表（利润表、资产负债表、现金流量表）、估值指标对标（PE/PB/PS/股息率）、分析师 EPS 预测共识、机构评级、SEC Form 4 内幕交易记录。",
  "home.cli.feat3.title": "跨市场选股与技术诊断",
  "home.cli.feat3.desc": "港美 A 股叠加市值、PE、技术指标筛选。均线、MACD、KDJ、RSI、支撑压力位诊断，覆盖日线到 15 分钟级别。输出支持 Table、JSON、CSV、Markdown 格式。",
  "home.cli.link": "查看 CLI 文档",
  "home.skill.title": "AI 助手的金融能力扩展包",
  "home.skill.desc": "一条命令为 Claude、Cursor 等 AI 助手注入完整的 Longbridge 知识库。AI 自动识别股票代码和市场分析需求，智能调用行情查询、财务分析、选股诊断和交易执行。支持中英文混合提问。",
  "home.skill.feat1.title": "自动触发的智能识别",
  "home.skill.feat1.desc": "提到股票代码（AAPL.US、700.HK）、市场分析、持仓查询时自动激活。支持 /longbridge 前缀强制触发。",
  "home.skill.feat2.title": "全栈投资分析",
  "home.skill.feat2.desc": "跨市场选股（市值+PE+技术信号叠加）、技术面诊断（MACD/KDJ/RSI/支撑压力位）、财报对标分析、SEC 13F 机构持仓追踪、Form 4 内幕交易监控。",
  "home.skill.feat3.title": "完整知识参考",
  "home.skill.feat3.desc": "包含 CLI 命令全集、Python QuoteContext/TradeContext/ContentContext 三大上下文 API、Rust SDK 文档、全部类型定义与枚举值。",
  "home.skill.link": "查看 SKILL 文档",
  "home.marketCoverage.title": "市场覆盖与 SDK",
  "home.marketCoverage.subtitle": "股票、ETF、期权、窝轮、牛熊证，四大市场统一接口。开户免费获取港股 LV2 及 A 股 LV1 行情数据。",
  "home.market.hk": "香港市场",
  "home.market.hkProducts": "股票 · ETF · 窝轮 · 牛熊证 · 界内证",
  "home.market.us": "美国市场",
  "home.market.usProducts": "股票 · ETF · 期权（OPRA）",
  "home.market.cn": "A 股通",
  "home.market.cnProducts": "股票 · ETF",
  "home.market.sg": "新加坡市场",
  "home.market.sgProducts": "股票 · ETF"
}
```

- [ ] **Step 3: Add homepage i18n keys to zh-HK.json**

Add matching keys with Traditional Chinese translations to `docs/.vitepress/theme/locales/zh-HK.json`. Use Traditional Chinese characters (same content as zh-CN but converted: 简→簡, 获→獲, 设→設, etc.)

- [ ] **Step 4: Commit**

```bash
git add docs/.vitepress/theme/locales/en.json docs/.vitepress/theme/locales/zh-CN.json docs/.vitepress/theme/locales/zh-HK.json
git commit -m "feat(homepage): add i18n keys for all 3 locales"
```

---

## Task 10: Wire up HomePage/index.vue and index.md files

**Files:**
- Modify: `docs/.vitepress/theme/components/HomePage/index.vue`
- Modify: `docs/en/index.md`
- Modify: `docs/zh-CN/index.md`
- Modify: `docs/zh-HK/index.md`
- Modify: `docs/.vitepress/theme/components/HomePage/Footer.vue`

- [ ] **Step 1: Rewrite HomePage/index.vue**

Replace the entire content of `docs/.vitepress/theme/components/HomePage/index.vue`:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '../../composables/useScrollReveal'
import HeroSection from './HeroSection.vue'
import PlatformStats from './PlatformStats.vue'
import ProductSection from './ProductSection.vue'
import CodeBlockTabs from './CodeBlockTabs.vue'
import McpShowcase from './McpShowcase.vue'
import TerminalPreview from './TerminalPreview.vue'
import GetStarted from './GetStarted.vue'
import MarketCoverage from './MarketCoverage.vue'
import Footer from './Footer.vue'

const { t } = useI18n()
const rootRef = ref<HTMLElement | null>(null)
useScrollReveal(rootRef)

const openApiCodeTabs = [
  {
    key: 'python',
    label: 'Python',
    code: `<span style="color:var(--brand-color)">from</span> longbridge.openapi <span style="color:var(--brand-color)">import</span> QuoteContext, Config\n\n<span style="color:var(--text-color-3)"># Initialize with environment variables</span>\nconfig = Config.from_env()\nctx = QuoteContext(config)\n\n<span style="color:var(--text-color-3)"># Get real-time quotes</span>\nresp = ctx.quote([<span style="color:var(--link-text-color)">"TSLA.US"</span>, <span style="color:var(--link-text-color)">"700.HK"</span>])\n<span style="color:var(--brand-color)">for</span> q <span style="color:var(--brand-color)">in</span> resp:\n  print(<span style="color:var(--brand-color)">f</span><span style="color:var(--link-text-color)">"{q.symbol}: {q.last_done}"</span>)`,
  },
  {
    key: 'nodejs',
    label: 'Node.js',
    code: `<span style="color:var(--brand-color)">import</span> { Config, QuoteContext } <span style="color:var(--brand-color)">from</span> <span style="color:var(--link-text-color)">'longbridge'</span>\n\n<span style="color:var(--brand-color)">const</span> config = Config.fromEnv()\n<span style="color:var(--brand-color)">const</span> ctx = <span style="color:var(--brand-color)">await</span> QuoteContext.open(config)\n\n<span style="color:var(--text-color-3)">// Get real-time quotes</span>\n<span style="color:var(--brand-color)">const</span> quotes = <span style="color:var(--brand-color)">await</span> ctx.quote([<span style="color:var(--link-text-color)">"TSLA.US"</span>, <span style="color:var(--link-text-color)">"700.HK"</span>])\nquotes.forEach(q =&gt; {\n  console.log(<span style="color:var(--link-text-color)">\`\${q.symbol}: \${q.lastDone}\`</span>)\n})`,
  },
  {
    key: 'rust',
    label: 'Rust',
    code: `<span style="color:var(--brand-color)">use</span> longbridge::quote::QuoteContext;\n<span style="color:var(--brand-color)">use</span> longbridge::Config;\n\n<span style="color:var(--brand-color)">let</span> config = Config::from_env()?;\n<span style="color:var(--brand-color)">let</span> (ctx, _) = QuoteContext::try_new(config).<span style="color:var(--brand-color)">await</span>?;\n\n<span style="color:var(--text-color-3)">// Get real-time quotes</span>\n<span style="color:var(--brand-color)">let</span> quotes = ctx.quote([<span style="color:var(--link-text-color)">"TSLA.US"</span>, <span style="color:var(--link-text-color)">"700.HK"</span>]).<span style="color:var(--brand-color)">await</span>?;\n<span style="color:var(--brand-color)">for</span> q <span style="color:var(--brand-color)">in</span> quotes {\n  println!(<span style="color:var(--link-text-color)">"{}: {}"</span>, q.symbol, q.last_done);\n}`,
  },
]
</script>

<template>
  <div ref="rootRef">
    <HeroSection />
    <PlatformStats />

    <!-- OpenAPI -->
    <ProductSection accent="brand">
      <template #content>
        <span class="ps-badge ps-badge--brand">OpenAPI</span>
        <h2 class="ps-title">{{ t('home.openapi.title') }}</h2>
        <p class="ps-desc">{{ t('home.openapi.desc') }}</p>
        <ul class="ps-features">
          <li><strong>{{ t('home.openapi.feat1.title') }}</strong> — {{ t('home.openapi.feat1.desc') }}</li>
          <li><strong>{{ t('home.openapi.feat2.title') }}</strong> — {{ t('home.openapi.feat2.desc') }}</li>
          <li><strong>{{ t('home.openapi.feat3.title') }}</strong> — {{ t('home.openapi.feat3.desc') }}</li>
          <li><strong>{{ t('home.openapi.feat4.title') }}</strong> — {{ t('home.openapi.feat4.desc') }}</li>
        </ul>
        <a :href="'/docs/getting-started'" class="ps-link">{{ t('home.openapi.link') }} &rarr;</a>
      </template>
      <template #visual>
        <CodeBlockTabs :tabs="openApiCodeTabs" />
      </template>
    </ProductSection>

    <!-- MCP -->
    <ProductSection accent="purple" reverse>
      <template #content>
        <span class="ps-badge ps-badge--purple">MCP</span>
        <h2 class="ps-title">{{ t('home.mcp.title') }}</h2>
        <p class="ps-desc">{{ t('home.mcp.desc') }}</p>
        <ul class="ps-features">
          <li><strong>{{ t('home.mcp.feat1.title') }}</strong> — {{ t('home.mcp.feat1.desc') }}</li>
          <li><strong>{{ t('home.mcp.feat2.title') }}</strong> — {{ t('home.mcp.feat2.desc') }}</li>
          <li><strong>{{ t('home.mcp.feat3.title') }}</strong> — {{ t('home.mcp.feat3.desc') }}</li>
        </ul>
        <a :href="'/docs/mcp'" class="ps-link">{{ t('home.mcp.link') }} &rarr;</a>
      </template>
      <template #visual>
        <McpShowcase />
      </template>
    </ProductSection>

    <!-- CLI -->
    <ProductSection accent="amber">
      <template #content>
        <span class="ps-badge ps-badge--amber">CLI</span>
        <h2 class="ps-title">{{ t('home.cli.title') }}</h2>
        <p class="ps-desc">{{ t('home.cli.desc') }}</p>
        <ul class="ps-features">
          <li><strong>{{ t('home.cli.feat1.title') }}</strong> — {{ t('home.cli.feat1.desc') }}</li>
          <li><strong>{{ t('home.cli.feat2.title') }}</strong> — {{ t('home.cli.feat2.desc') }}</li>
          <li><strong>{{ t('home.cli.feat3.title') }}</strong> — {{ t('home.cli.feat3.desc') }}</li>
        </ul>
        <a :href="'/docs/cli'" class="ps-link">{{ t('home.cli.link') }} &rarr;</a>
      </template>
      <template #visual>
        <TerminalPreview>
          <!-- Terminal content will be added as raw HTML in the component -->
          <div style="color:var(--text-color-3)">$</div>
          <div>longbridge quote TSLA.US AAPL.US NVDA.US</div>
          <br />
          <table style="width:100%;border-collapse:collapse;font-size:12px">
            <tr style="color:var(--text-color-3)"><td>Symbol</td><td>Last</td><td>Change</td><td>Volume</td></tr>
            <tr><td>TSLA.US</td><td>248.50</td><td style="color:var(--up-color)">+2.18%</td><td style="color:var(--text-color-3)">42.1M</td></tr>
            <tr><td>AAPL.US</td><td>195.20</td><td style="color:var(--down-color)">-0.71%</td><td style="color:var(--text-color-3)">58.3M</td></tr>
            <tr><td>NVDA.US</td><td>875.30</td><td style="color:var(--up-color)">+1.48%</td><td style="color:var(--text-color-3)">31.7M</td></tr>
          </table>
        </TerminalPreview>
      </template>
    </ProductSection>

    <!-- SKILL -->
    <ProductSection accent="pink" reverse>
      <template #content>
        <span class="ps-badge ps-badge--pink">SKILL</span>
        <h2 class="ps-title">{{ t('home.skill.title') }}</h2>
        <p class="ps-desc">{{ t('home.skill.desc') }}</p>
        <ul class="ps-features">
          <li><strong>{{ t('home.skill.feat1.title') }}</strong> — {{ t('home.skill.feat1.desc') }}</li>
          <li><strong>{{ t('home.skill.feat2.title') }}</strong> — {{ t('home.skill.feat2.desc') }}</li>
          <li><strong>{{ t('home.skill.feat3.title') }}</strong> — {{ t('home.skill.feat3.desc') }}</li>
        </ul>
        <a :href="'/skill'" class="ps-link">{{ t('home.skill.link') }} &rarr;</a>
      </template>
      <template #visual>
        <TerminalPreview title="AI Assistant with SKILL">
          <div style="color:var(--text-color-3)">User: <span style="color:var(--link-text-color)">"帮我从美股里筛出市值 500 亿以上、PE 低于 25、近期 MACD 金叉的科技股"</span></div>
          <br />
          <div style="color:var(--up-color)">&#10003; Longbridge SKILL activated</div>
          <br />
          <div style="color:var(--text-color-3)">Found 3 matching securities:</div>
          <div>INTC.US &nbsp;PE: 22.1 &nbsp;<span style="color:var(--up-color)">MACD golden cross (2d ago)</span></div>
          <div>CSCO.US &nbsp;PE: 16.8 &nbsp;<span style="color:var(--up-color)">MACD golden cross (1d ago)</span></div>
          <div>ORCL.US &nbsp;PE: 24.3 &nbsp;<span style="color:var(--up-color)">MACD golden cross (today)</span></div>
        </TerminalPreview>
      </template>
    </ProductSection>

    <GetStarted />
    <MarketCoverage />
    <Footer />
  </div>
</template>

<style>
/* Product section content styles (global, used inside slots) */
.ps-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 6px;
  margin-bottom: 16px;
}

.ps-badge--brand { background: var(--brand-5); color: var(--brand-color); }
.ps-badge--purple { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
.ps-badge--amber { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
.ps-badge--pink { background: rgba(236, 72, 153, 0.1); color: #ec4899; }

.ps-title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
  line-height: 1.2;
  color: var(--text-color-1);
}

.ps-desc {
  font-size: 15px;
  color: var(--text-color-1-supplement);
  margin-bottom: 24px;
  line-height: 1.7;
}

.ps-features {
  list-style: none;
  margin-bottom: 24px;
}

.ps-features li {
  font-size: 14px;
  color: var(--text-color-1-supplement);
  padding: 8px 0;
  line-height: 1.5;
}

.ps-features li strong {
  color: var(--text-color-1);
  font-weight: 600;
}

.ps-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--brand-color);
  text-decoration: none;
  transition: gap 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.ps-link:hover { gap: 10px; }
</style>
```

- [ ] **Step 2: Update index.md files to remove VitePress hero/features**

Replace `docs/en/index.md` with:

```markdown
---
layout: home
titleTemplate: APIs, LLM, MCP, CLI & More
pageClass: longbridge-home-page
---

<HomePage/>
```

Do the same for `docs/zh-CN/index.md` and `docs/zh-HK/index.md` (remove their `hero:` and `features:` frontmatter blocks, keep only the above).

- [ ] **Step 3: Update Footer.vue right-side links**

In `docs/.vitepress/theme/components/HomePage/Footer.vue`, change `rightLinks`:

```typescript
const rightLinks = [
  { href: '/docs/getting-started', label: 'OpenAPI' },
  { href: '/docs/mcp', label: 'MCP' },
  { href: '/docs/cli', label: 'CLI' },
  { href: '/skill', label: 'SKILL' },
]
```

- [ ] **Step 4: Start dev server and verify**

Run: `bun run dev`

Expected: Homepage loads with all new sections. Verify:
1. Hero with blur-text animation and tab switcher works
2. Platform stats with count-up animation triggers on scroll
3. Four product sections render with correct content and code blocks
4. Code tab switching works in OpenAPI section
5. Get Started cards link correctly
6. Market Coverage shows market cards and SDK pills
7. Footer shows updated links
8. Switch to zh-CN locale — all text appears in Chinese
9. Toggle dark mode — all colors adapt correctly

- [ ] **Step 5: Commit**

```bash
git add docs/.vitepress/theme/components/HomePage/index.vue docs/en/index.md docs/zh-CN/index.md docs/zh-HK/index.md docs/.vitepress/theme/components/HomePage/Footer.vue
git commit -m "feat(homepage): wire up all new components and remove old hero/features"
```

---

## Task 11: Remove deprecated components

**Files:**
- Remove: `docs/.vitepress/theme/components/HomePage/HomeFeatures.vue`
- Remove: `docs/.vitepress/theme/components/HomePage/FeatureItem.vue`
- Remove: `docs/.vitepress/theme/components/HomePage/Markets.vue`
- Remove: `docs/.vitepress/theme/components/HomePage/Market.vue`

- [ ] **Step 1: Verify no other files import these components**

Search for imports of `HomeFeatures`, `FeatureItem`, `Markets`, `Market` outside of `HomePage/index.vue` (which we already updated). If any imports exist elsewhere, update them first.

Run: `grep -r "HomeFeatures\|FeatureItem\|Markets\|Market\.vue" docs/.vitepress/theme/ --include="*.vue" --include="*.ts" -l`

Expected: Only `HomePage/index.vue` (already updated) and the files themselves.

- [ ] **Step 2: Delete the files**

```bash
rm docs/.vitepress/theme/components/HomePage/HomeFeatures.vue
rm docs/.vitepress/theme/components/HomePage/FeatureItem.vue
rm docs/.vitepress/theme/components/HomePage/Markets.vue
rm docs/.vitepress/theme/components/HomePage/Market.vue
```

- [ ] **Step 3: Verify dev server still works**

Run: `bun run dev`
Expected: No errors. Homepage renders correctly without the removed components.

- [ ] **Step 4: Commit**

```bash
git add -u docs/.vitepress/theme/components/HomePage/
git commit -m "refactor(homepage): remove deprecated HomeFeatures, FeatureItem, Markets, Market components"
```

---

## Task 12: Final verification and build check

- [ ] **Step 1: Run production build**

Run: `bun run build:canary`
Expected: Build completes without errors.

- [ ] **Step 2: Preview the build**

Run: `bun run preview`
Expected: Homepage loads correctly in production build. All animations work. All links resolve.

- [ ] **Step 3: Test responsive breakpoints**

Open browser DevTools, test at:
- 375px (iPhone SE) — single column layout, hero tabs scrollable
- 768px (iPad) — 2-column product grids
- 1280px (desktop) — full layout, 1200px max-width container

- [ ] **Step 4: Test dark mode**

Toggle theme. All sections should adapt colors via CSS variables. No hardcoded colors visible.

- [ ] **Step 5: Test all 3 locales**

Switch to `/zh-CN/` and `/zh-HK/`. All text should be translated.

- [ ] **Step 6: Commit any fixes**

If any issues found during testing, fix and commit:

```bash
git add -A
git commit -m "fix(homepage): address issues found during final verification"
```
