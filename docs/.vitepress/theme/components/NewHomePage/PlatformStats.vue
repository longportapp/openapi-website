<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import NumberTicker from '../inspira/NumberTicker.vue'

const { t } = useI18n()

const stats = computed(() => [
  { value: 4, label: t('stats.ainative'), detail: t('stats.ainative.detail'), suffix: '+', link: '/docs/mcp' },
  { value: 6, label: t('stats.markets'), detail: t('stats.markets.detail'), suffix: '+', link: '/docs/' },
  { value: 7, label: t('stats.sdks'), detail: t('stats.sdks.detail'), suffix: '+', link: '/sdk' },
  { value: 100, label: t('stats.endpoints'), detail: t('stats.endpoints.detail'), suffix: '+', link: '/docs/api' },
])
</script>

<template>
  <section class="stats-section">
    <div class="stats-container">
      <div class="stats-grid">
        <a
          v-for="(stat, index) in stats"
          :key="stat.label"
          :href="stat.link"
          class="stats-item"
        >
          <div class="stats-value">
            <template v-if="stat.value != null">
              <ClientOnly>
                <NumberTicker
                  :value="stat.value"
                  :delay="index * 200"
                  :duration="1500"
                  :decimal-places="0"
                  class="stats-number"
                />
              </ClientOnly>
              <span v-if="stat.suffix" class="stats-suffix">{{ stat.suffix }}</span>
            </template>
            <span v-else class="stats-text-badge">{{ stat.text }}</span>
          </div>
          <div v-if="stat.value != null" class="stats-label">{{ stat.label }}</div>
          <!-- Hover detail -->
          <div class="stats-detail">
            <div class="stats-detail-divider" />
            <span class="stats-detail-text">{{ stat.detail }}</span>
            <span class="stats-detail-cta">
              Learn more
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-section {
  padding: 3rem 0;
  background: linear-gradient(
    180deg,
    var(--vp-c-bg) 0%,
    var(--vp-c-bg-soft) 30%,
    var(--vp-c-bg-soft) 70%,
    var(--vp-c-bg) 100%
  );
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
}

.stats-container {
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stats-item {
  text-align: center;
  position: relative;
  padding: 1rem 1.5rem 1.25rem;
  border-radius: 0.75rem;
  cursor: pointer;
  text-decoration: none !important;
  transition: all 0.3s ease;
}

.stats-item:hover {
  background: color-mix(in srgb, var(--brand-color) 6%, transparent);
}

/* Vertical dividers */
.stats-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 20%;
  height: 60%;
  width: 1px;
  background: var(--vp-c-divider);
  transition: opacity 0.3s;
}

.stats-item:hover::after,
.stats-item:hover + .stats-item::after {
  opacity: 0;
}

@media (max-width: 640px) {
  .stats-item:nth-child(2)::after {
    display: none;
  }
}

.stats-value {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 2px;
}

.stats-number {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--brand-color);
}

.stats-suffix {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--brand-color);
}

.stats-text-badge {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--brand-color);
}

.stats-label {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Hover detail reveal */
.stats-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, opacity 0.35s ease, margin-top 0.35s ease;
  margin-top: 0;
}

.stats-item:hover .stats-detail {
  max-height: 6rem;
  opacity: 1;
  margin-top: 0.75rem;
}

.stats-detail-divider {
  width: 2rem;
  height: 2px;
  background: var(--brand-color);
  border-radius: 1px;
  opacity: 0.6;
}

.stats-detail-text {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  line-height: 1.5;
  letter-spacing: 0.01em;
}

.stats-detail-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--brand-color);
  transition: gap 0.2s;
}

.stats-detail-cta svg {
  transition: transform 0.2s;
}

.stats-item:hover .stats-detail-cta svg {
  transform: translateX(2px);
}
</style>
