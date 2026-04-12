<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BorderBeam from '../inspira/BorderBeam.vue'

const { t } = useI18n()

const icons = {
  quote: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  trade: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>`,
  derivatives: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8l-2 4h12l-2-4z"/></svg>`,
  research: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  content: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2"/><line x1="10" y1="6" x2="18" y2="6"/><line x1="10" y1="10" x2="18" y2="10"/><line x1="10" y1="14" x2="14" y2="14"/></svg>`,
}

const caps = [
  {
    key: 'quote', link: '/docs/quote/overview',
    endpoints: ['quote', 'depth', 'brokers', 'trades', 'kline', 'intraday', 'capital-flow', 'option-chain'],
    protocols: ['WebSocket', 'HTTP'],
    pushEvents: ['PushQuote', 'PushDepth', 'PushBrokers', 'PushTrades'],
    count: 20,
  },
  {
    key: 'trade', link: '/docs/trade/overview',
    endpoints: ['submit', 'replace', 'withdraw', 'today-orders', 'history-orders', 'executions'],
    protocols: ['WebSocket', 'REST'],
    pushEvents: ['OrderChanged'],
    count: 11,
  },
  {
    key: 'derivatives', link: '/docs/cli/derivatives/option',
    endpoints: ['option-quote', 'option-chain', 'warrant-quote', 'warrant-filter', 'issuer'],
    protocols: ['HTTP'],
    pushEvents: [],
    count: 5,
  },
  {
    key: 'research', link: '/docs/cli/fundamentals/financial-report',
    endpoints: ['financial-report', 'valuation', 'dividend', 'forecast-eps', 'consensus', 'institution-rating'],
    protocols: ['HTTP'],
    pushEvents: [],
    count: 6,
  },
  {
    key: 'content', link: '/docs/content/news',
    endpoints: ['news', 'topics', 'topic-detail', 'topic-replies', 'create-topic'],
    protocols: ['REST'],
    pushEvents: [],
    count: 8,
  },
]

function handleSpotlight(e: MouseEvent) {
  const card = (e.currentTarget as HTMLElement)
  const rect = card.getBoundingClientRect()
  card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  card.style.setProperty('--my', `${e.clientY - rect.top}px`)
}
</script>

<template>
  <section class="cap-section">
    <div class="cap-header">
      <h2 class="cap-title">{{ $t('cap.title') }}</h2>
      <p class="cap-subtitle">{{ $t('cap.subtitle') }}</p>
    </div>

    <div class="cap-grid">
      <a
        v-for="(cap, index) in caps"
        :key="cap.key"
        :href="cap.link"
        class="cap-card"
        :class="{ 'cap-col-4': index < 2, 'cap-col-2': index >= 2 }"
        :style="{ '--delay': `${index * 0.08}s` }"
        @mousemove="handleSpotlight"
      >
        <!-- Spotlight glow -->
        <div class="cap-spotlight" />

        <div class="cap-inner">
          <div class="cap-top">
            <span class="cap-icon" v-html="icons[cap.key as keyof typeof icons]" />
            <span class="cap-name">{{ $t(`cap.${cap.key}`) }}</span>
            <span class="cap-count">{{ cap.count }} endpoints</span>
          </div>

          <p class="cap-desc">{{ $t(`cap.${cap.key}.desc`) }}</p>

          <div class="cap-meta">
            <div class="cap-badges">
              <span v-for="p in cap.protocols" :key="p" class="cap-badge" :class="{ 'cap-badge-ws': p === 'WebSocket' }">{{ p }}</span>
            </div>
            <div v-if="cap.pushEvents.length" class="cap-push">
              <span class="cap-push-label">Push:</span>
              <span v-for="e in cap.pushEvents" :key="e" class="cap-push-tag">{{ e }}</span>
            </div>
          </div>

          <!-- Expand: endpoints on hover -->
          <div class="cap-expand">
            <div class="cap-expand-divider" />
            <div class="cap-endpoints">
              <code v-for="ep in cap.endpoints" :key="ep" class="cap-ep">{{ ep }}</code>
            </div>
          </div>
        </div>

        <ClientOnly>
          <BorderBeam :size="150" :duration="12" :delay="index * 2" color-from="var(--brand-color)" color-to="var(--cyan-60)" :border-width="1.5" />
        </ClientOnly>
      </a>
    </div>
  </section>
</template>

<style scoped>
.cap-section {
  padding: 4rem 0;
  background: var(--vp-c-bg-soft);
}

.cap-header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding: 0 1.5rem;
}

.cap-title { font-size: 2rem; font-weight: 700; color: var(--vp-c-text-1); letter-spacing: -0.02em; }
.cap-subtitle { margin-top: 0.5rem; font-size: 1.05rem; color: var(--vp-c-text-2); }

.cap-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.875rem;
  max-width: 56rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.cap-col-4 { grid-column: span 3; }
.cap-col-2 { grid-column: span 2; }

/* Card: Spotlight + Expand combined */
.cap-card {
  position: relative;
  border-radius: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  text-decoration: none !important;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  opacity: 0;
  transform: translateY(16px);
  animation: cap-in 0.4s ease forwards;
  animation-delay: var(--delay);
}

.cap-card:hover {
  transform: translateY(-3px);
  border-color: var(--brand-color);
  box-shadow: 0 6px 20px color-mix(in srgb, var(--brand-color) 6%, transparent);
}

@keyframes cap-in {
  to { opacity: 1; transform: translateY(0); }
}

/* Spotlight layer */
.cap-spotlight {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.3s;
  background: radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--brand-color) 8%, transparent), transparent 60%);
  pointer-events: none;
}

.cap-card:hover .cap-spotlight { opacity: 1; }

.cap-inner {
  position: relative;
  z-index: 1;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  height: 100%;
}

.cap-top { display: flex; align-items: center; gap: 0.5rem; }
.cap-icon { display: flex; width: 1.25rem; height: 1.25rem; color: var(--brand-color); flex-shrink: 0; }
.cap-icon :deep(svg) { width: 100%; height: 100%; }
.cap-name { font-size: 1rem; font-weight: 700; color: var(--vp-c-text-1); }
.cap-count { margin-left: auto; font-size: 0.7rem; font-weight: 600; color: var(--vp-c-text-3); white-space: nowrap; }
.cap-desc { font-size: 0.85rem; line-height: 1.5; color: var(--vp-c-text-2); margin: 0; }

.cap-meta { display: flex; flex-direction: column; gap: 0.375rem; margin-top: auto; }
.cap-badges { display: flex; gap: 0.25rem; flex-wrap: wrap; }
.cap-badge { padding: 0.1rem 0.4rem; border-radius: 0.25rem; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; background: var(--vp-c-bg-soft); color: var(--vp-c-text-3); }
.cap-badge-ws { background: color-mix(in srgb, var(--brand-color) 10%, transparent); color: var(--brand-color); }
.cap-push { display: flex; align-items: center; gap: 0.25rem; flex-wrap: wrap; }
.cap-push-label { font-size: 0.65rem; font-weight: 600; color: var(--vp-c-text-3); }
.cap-push-tag { font-size: 0.6rem; font-family: var(--vp-font-family-mono); color: var(--vp-c-text-2); background: var(--vp-c-bg-soft); padding: 0.1rem 0.3rem; border-radius: 0.2rem; }

/* Expand on hover */
.cap-expand {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, opacity 0.3s ease, margin-top 0.3s ease;
  margin-top: 0;
}

.cap-card:hover .cap-expand {
  max-height: 8rem;
  opacity: 1;
  margin-top: 0.625rem;
}

.cap-expand-divider {
  width: 2rem;
  height: 2px;
  background: var(--brand-color);
  border-radius: 1px;
  opacity: 0.5;
  margin-bottom: 0.5rem;
}

.cap-endpoints { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.cap-ep { font-size: 0.7rem; font-family: var(--vp-font-family-mono); padding: 0.15rem 0.4rem; border-radius: 0.25rem; background: var(--vp-c-bg-soft); color: var(--brand-color); font-weight: 500; }

/* Responsive */
@media (max-width: 768px) {
  .cap-grid { grid-template-columns: 1fr; }
  .cap-col-4, .cap-col-2 { grid-column: span 1; }
}
</style>
