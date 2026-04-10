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
