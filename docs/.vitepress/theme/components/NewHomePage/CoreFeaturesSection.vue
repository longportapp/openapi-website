<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import StyleToggle from './StyleToggle.vue'
import GlowBorder from '../inspira/GlowBorder.vue'
import GlowingEffect from '../inspira/GlowingEffect.vue'

const { t } = useI18n()
const effectStyle = ref<'Glow Border' | 'Glowing'>('Glow Border')
const layoutStyle = ref<'Grid' | 'List' | 'Focus'>('Grid')

const icons = {
  cli: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
  skill: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 014 4v1a1 1 0 001 1h1a4 4 0 010 8h-1a1 1 0 00-1 1v1a4 4 0 01-8 0v-1a1 1 0 00-1-1H6a4 4 0 010-8h1a1 1 0 001-1V6a4 4 0 014-4z"/><circle cx="12" cy="12" r="2"/></svg>`,
  mcp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m-7-3.5l5.2-3m1.6-1l5.2-3M5 6.5l5.2 3m1.6 1l5.2 3"/></svg>`,
  sdk: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/></svg>`,
  paper: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`,
  llm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
}

const tags: Record<string, string[]> = {
  cli: ['TUI', '--format json'],
  skill: ['AI Agent'],
  mcp: ['OAuth 2.1', 'Hosted'],
  sdk: ['Python', 'Rust', 'Go', '+ 4'],
  paper: ['Sandbox', 'Zero Cost'],
  llm: ['llms.txt', 'RAG'],
}

const links: Record<string, string> = {
  cli: '/docs/cli', skill: '/skill', mcp: '/docs/mcp',
  sdk: '/sdk', paper: '/docs/getting-started', llm: '/docs/llm',
}

const products = ['cli', 'skill', 'mcp', 'sdk', 'paper', 'llm']

// Focus layout state
const focusKey = ref('cli')
</script>

<template>
  <section class="core-section">
    <div class="core-header">
      <h2 class="core-title">{{ $t('core.title') }}</h2>
      <p class="core-subtitle">{{ $t('core.subtitle') }}</p>
      <div class="core-toggles">
        <StyleToggle v-model="layoutStyle" :options="['Grid', 'List', 'Focus']" />
        <StyleToggle v-model="effectStyle" :options="['Glow Border', 'Glowing']" />
      </div>
    </div>

    <!-- ===== V1: Grid ===== -->
    <div v-if="layoutStyle === 'Grid'" class="core-grid">
      <a v-for="key in products" :key="key" :href="links[key]" class="core-card">
        <ClientOnly>
          <GlowBorder v-if="effectStyle === 'Glow Border'" :border-radius="12" :color="['var(--brand-color)', 'var(--cyan-60)']" :border-width="2" :duration="8" />
          <GlowingEffect v-else :spread="30" :proximity="80" :border-width="2" />
        </ClientOnly>
        <div class="core-card-inner">
          <div class="core-card-top">
            <span class="core-icon" v-html="icons[key as keyof typeof icons]" />
            <span class="core-card-title">{{ $t(`core.${key}.title`) }}</span>
          </div>
          <p class="core-card-desc">{{ $t(`core.${key}.desc`) }}</p>
          <div class="core-tags">
            <span v-for="tag in tags[key]" :key="tag" class="core-tag">{{ tag }}</span>
          </div>
        </div>
      </a>
    </div>

    <!-- ===== V2: List ===== -->
    <div v-else-if="layoutStyle === 'List'" class="core-list">
      <a v-for="key in products" :key="key" :href="links[key]" class="core-list-item">
        <ClientOnly>
          <GlowBorder v-if="effectStyle === 'Glow Border'" :border-radius="12" :color="['var(--brand-color)', 'var(--cyan-60)']" :border-width="2" :duration="8" />
          <GlowingEffect v-else :spread="30" :proximity="80" :border-width="2" />
        </ClientOnly>
        <div class="core-list-inner">
          <div class="core-list-left">
            <span class="core-icon" v-html="icons[key as keyof typeof icons]" />
            <span class="core-list-title">{{ $t(`core.${key}.title`) }}</span>
          </div>
          <p class="core-list-desc">{{ $t(`core.${key}.desc`) }}</p>
          <div class="core-list-right">
            <div class="core-tags">
              <span v-for="tag in tags[key]" :key="tag" class="core-tag">{{ tag }}</span>
            </div>
            <svg class="core-list-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </div>
        </div>
      </a>
    </div>

    <!-- ===== V3: Focus ===== -->
    <div v-else class="core-focus">
      <div class="core-focus-tabs">
        <button
          v-for="key in products"
          :key="key"
          class="core-focus-tab"
          :class="{ active: focusKey === key }"
          @click="focusKey = key"
        >
          <span class="core-icon-sm" v-html="icons[key as keyof typeof icons]" />
          <span>{{ $t(`core.${key}.title`) }}</span>
        </button>
      </div>
      <a :href="links[focusKey]" class="core-focus-card">
        <ClientOnly>
          <GlowBorder v-if="effectStyle === 'Glow Border'" :border-radius="12" :color="['var(--brand-color)', 'var(--cyan-60)']" :border-width="2" :duration="8" />
          <GlowingEffect v-else :spread="30" :proximity="80" :border-width="2" />
        </ClientOnly>
        <Transition name="core-focus-fade" mode="out-in">
          <div :key="focusKey" class="core-focus-inner">
            <div class="core-focus-top">
              <span class="core-icon-lg" v-html="icons[focusKey as keyof typeof icons]" />
              <div>
                <h3 class="core-focus-title">{{ $t(`core.${focusKey}.title`) }}</h3>
                <div class="core-tags">
                  <span v-for="tag in tags[focusKey]" :key="tag" class="core-tag">{{ tag }}</span>
                </div>
              </div>
            </div>
            <p class="core-focus-desc">{{ $t(`core.${focusKey}.desc`) }}</p>
            <span class="core-focus-link">
              Learn more
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </div>
        </Transition>
      </a>
    </div>
  </section>
</template>

<style scoped>
.core-section { padding: 4rem 0; background: var(--vp-c-bg); }
.core-header { text-align: center; margin-bottom: 2.5rem; padding: 0 1.5rem; }
.core-title { font-size: 2rem; font-weight: 700; color: var(--vp-c-text-1); letter-spacing: -0.02em; }
.core-subtitle { margin-top: 0.5rem; font-size: 1.05rem; color: var(--vp-c-text-2); }
.core-toggles { margin-top: 1rem; display: flex; justify-content: center; gap: 0.5rem; flex-wrap: wrap; }

/* Shared */
.core-icon { display: flex; width: 1.25rem; height: 1.25rem; color: var(--brand-color); flex-shrink: 0; }
.core-icon :deep(svg) { width: 100%; height: 100%; }
.core-icon-sm { display: flex; width: 1rem; height: 1rem; color: inherit; flex-shrink: 0; }
.core-icon-sm :deep(svg) { width: 100%; height: 100%; }
.core-icon-lg { display: flex; width: 2rem; height: 2rem; color: var(--brand-color); flex-shrink: 0; }
.core-icon-lg :deep(svg) { width: 100%; height: 100%; }

.core-tags { display: flex; flex-wrap: wrap; gap: 0.25rem; }
.core-tag { padding: 0.1rem 0.4rem; border-radius: 0.25rem; font-size: 0.65rem; font-weight: 600; font-family: var(--vp-font-family-mono); background: color-mix(in srgb, var(--brand-color) 10%, transparent); color: var(--brand-color); }

/* Glow effects visibility */
.core-card :deep(.glow-border),
.core-list-item :deep(.glow-border),
.core-focus-card :deep(.glow-border) { opacity: 0; transition: opacity 0.3s; }
.core-card:hover :deep(.glow-border),
.core-list-item:hover :deep(.glow-border),
.core-focus-card:hover :deep(.glow-border) { opacity: 1; }

/* ===== V1: Grid ===== */
.core-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; max-width: 56rem; margin: 0 auto; padding: 0 1.5rem; }
@media (max-width: 768px) { .core-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .core-grid { grid-template-columns: 1fr; } }

.core-card {
  position: relative; border-radius: 0.75rem; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); text-decoration: none !important; overflow: hidden;
  transition: transform 0.25s, box-shadow 0.25s;
}
.core-card:hover { transform: translateY(-3px); box-shadow: 0 6px 20px color-mix(in srgb, var(--brand-color) 6%, transparent); }

.core-card-inner { position: relative; z-index: 1; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; min-height: 11rem; }
.core-card-top { display: flex; align-items: center; gap: 0.5rem; }
.core-card-title { font-size: 1rem; font-weight: 700; color: var(--vp-c-text-1); }
.core-card-desc { font-size: 0.85rem; line-height: 1.5; color: var(--vp-c-text-2); margin: 0; flex: 1; }

/* ===== V2: List ===== */
.core-list { display: flex; flex-direction: column; gap: 0.625rem; max-width: 56rem; margin: 0 auto; padding: 0 1.5rem; }

.core-list-item {
  position: relative; border-radius: 0.75rem; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); text-decoration: none !important; overflow: hidden;
  transition: transform 0.25s, box-shadow 0.25s;
}
.core-list-item:hover { transform: translateX(4px); box-shadow: 0 4px 16px color-mix(in srgb, var(--brand-color) 6%, transparent); }

.core-list-inner { position: relative; z-index: 1; padding: 1rem 1.25rem; display: flex; align-items: center; gap: 1.25rem; }
.core-list-left { display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0; min-width: 7rem; }
.core-list-title { font-size: 0.95rem; font-weight: 700; color: var(--vp-c-text-1); white-space: nowrap; }
.core-list-desc { font-size: 0.85rem; line-height: 1.4; color: var(--vp-c-text-2); margin: 0; flex: 1; }
.core-list-right { display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0; }
.core-list-arrow { color: var(--brand-color); opacity: 0; transform: translateX(-4px); transition: all 0.2s; }
.core-list-item:hover .core-list-arrow { opacity: 1; transform: translateX(0); }

@media (max-width: 640px) {
  .core-list-inner { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
  .core-list-right { width: 100%; justify-content: space-between; }
}

/* ===== V3: Focus ===== */
.core-focus { max-width: 56rem; margin: 0 auto; padding: 0 1.5rem; }

.core-focus-tabs { display: flex; gap: 0.25rem; margin-bottom: 1rem; overflow-x: auto; padding-bottom: 0.25rem; }

.core-focus-tab {
  display: flex; align-items: center; gap: 0.375rem;
  padding: 0.4rem 0.875rem; border-radius: 9999px;
  font-size: 0.8rem; font-weight: 600; color: var(--vp-c-text-3);
  background: transparent; border: 1px solid var(--vp-c-divider);
  cursor: pointer; white-space: nowrap; transition: all 0.2s;
}
.core-focus-tab:hover { color: var(--vp-c-text-2); border-color: var(--vp-c-text-3); }
.core-focus-tab.active { color: var(--brand-color); border-color: var(--brand-color); background: color-mix(in srgb, var(--brand-color) 6%, transparent); }
.core-focus-tab.active .core-icon-sm { color: var(--brand-color); }

.core-focus-card {
  position: relative; border-radius: 0.75rem; border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg); text-decoration: none !important; overflow: hidden;
  transition: box-shadow 0.25s;
}
.core-focus-card:hover { box-shadow: 0 6px 20px color-mix(in srgb, var(--brand-color) 6%, transparent); }

.core-focus-inner { position: relative; z-index: 1; padding: 2rem; display: flex; flex-direction: column; gap: 1rem; }
.core-focus-top { display: flex; align-items: center; gap: 1rem; }
.core-focus-title { font-size: 1.5rem; font-weight: 700; color: var(--vp-c-text-1); margin: 0 0 0.375rem; }
.core-focus-desc { font-size: 1rem; line-height: 1.7; color: var(--vp-c-text-2); margin: 0; max-width: 36rem; }
.core-focus-link { display: inline-flex; align-items: center; gap: 0.375rem; font-size: 0.85rem; font-weight: 600; color: var(--brand-color); transition: gap 0.2s; }
.core-focus-card:hover .core-focus-link { gap: 0.625rem; }

.core-focus-fade-enter-active, .core-focus-fade-leave-active { transition: opacity 0.2s, transform 0.2s; }
.core-focus-fade-enter-from { opacity: 0; transform: translateY(8px); }
.core-focus-fade-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
