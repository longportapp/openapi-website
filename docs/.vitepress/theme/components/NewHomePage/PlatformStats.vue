<script setup lang="ts">
import NumberTicker from '../inspira/NumberTicker.vue'

const stats = [
  { value: 6, label: 'Global Markets', suffix: '+' },
  { value: 100, label: 'API Endpoints', suffix: '+' },
  { value: 7, label: 'SDK Languages', suffix: '' },
  { value: 99.9, label: 'SLA Uptime', suffix: '%', decimals: 1 },
]
</script>

<template>
  <section class="stats-section relative z-10">
    <div class="stats-container mx-auto max-w-5xl px-6">
      <div class="stats-grid">
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="stats-item"
        >
          <div class="stats-value">
            <ClientOnly>
              <NumberTicker
                :value="stat.value"
                :delay="index * 200"
                :duration="1500"
                :decimal-places="stat.decimals || 0"
                class="stats-number"
              />
            </ClientOnly>
            <span class="stats-suffix">{{ stat.suffix }}</span>
          </div>
          <div class="stats-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-section {
  padding: 3rem 0;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stats-item {
  text-align: center;
  position: relative;
}

/* Vertical dividers between items */
.stats-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -1rem;
  top: 15%;
  height: 70%;
  width: 1px;
  background: var(--vp-c-divider);
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
  color: var(--vp-c-text-1);
}

.stats-suffix {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.stats-label {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
