<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCountUp } from '../../composables/useCountUp'

const { t } = useI18n()
const statsRef = ref<HTMLElement | null>(null)
useCountUp(statsRef)
</script>

<template>
  <section ref="statsRef" class="ps reveal">
    <div class="homepage-container">
      <div class="ps-grid">
        <div class="ps-card">
          <div class="ps-num"><span data-count-target="4">0</span></div>
          <div class="ps-title">{{ t('home.stats.marketsTitle') }}</div>
          <div class="ps-detail">
            <span class="ps-dot" style="--c:#FF3A9D">HK</span>
            <span class="ps-dot" style="--c:#2A99FE">US</span>
            <span class="ps-dot" style="--c:#FF3A3A">CN</span>
            <span class="ps-dot" style="--c:#3AD8FF">SG</span>
          </div>
          <div class="ps-sub">{{ t('home.stats.marketsSub') }}</div>
        </div>

        <div class="ps-card">
          <div class="ps-num"><span data-count-target="6">0</span></div>
          <div class="ps-title">{{ t('home.stats.sdksTitle') }}</div>
          <div class="ps-detail">
            <span class="ps-pill">Python</span>
            <span class="ps-pill">Node.js</span>
            <span class="ps-pill">Rust</span>
            <span class="ps-pill">Go</span>
            <span class="ps-pill">Java</span>
            <span class="ps-pill">C++</span>
          </div>
          <div class="ps-sub">{{ t('home.stats.sdksSub') }}</div>
        </div>

        <div class="ps-card">
          <div class="ps-num"><span data-count-target="40">0</span>+</div>
          <div class="ps-title">{{ t('home.stats.commandsTitle') }}</div>
          <div class="ps-detail">
            <span class="ps-pill">{{ t('home.stats.cmdQuote') }}</span>
            <span class="ps-pill">{{ t('home.stats.cmdTrade') }}</span>
            <span class="ps-pill">{{ t('home.stats.cmdFinance') }}</span>
            <span class="ps-pill">{{ t('home.stats.cmdScreen') }}</span>
          </div>
          <div class="ps-sub">{{ t('home.stats.commandsSub') }}</div>
        </div>

        <div class="ps-card">
          <div class="ps-num ps-num--text">{{ t('home.stats.freeValue') }}</div>
          <div class="ps-title">{{ t('home.stats.freeTitle') }}</div>
          <div class="ps-detail ps-detail--text">
            {{ t('home.stats.freeSub') }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ps {
  padding: 48px 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  background: var(--home-bg-color-1);
}

.ps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.ps-card {
  text-align: center;
  padding: 20px 16px;
  border-radius: 6px;
  background: var(--home-bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ps-num {
  font-size: 36px;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: var(--brand-color);
  line-height: 1;
  margin-bottom: 6px;
}

.ps-num--text { font-size: 30px; }

.ps-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-color-1);
  margin-bottom: 12px;
}

.ps-detail {
  display: flex;
  justify-content: center;
  gap: 5px;
  flex-wrap: wrap;
  min-height: 52px;
  align-items: flex-start;
  align-content: flex-start;
  margin-bottom: 8px;
}

.ps-detail--text {
  font-size: 12px;
  color: var(--text-color-3);
  line-height: 1.5;
  max-width: 160px;
  display: block;
  text-align: center;
}

.ps-dot {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 4px;
  background: var(--home-bg-color-1);
  color: var(--text-color-1);
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.ps-dot::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c);
}

.ps-pill {
  font-size: 11px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: 3px;
  background: var(--home-bg-color-1);
  color: var(--text-color-2);
}

.ps-sub {
  font-size: 11px;
  color: var(--text-color-3);
  line-height: 1.4;
  margin-top: auto;
}

@media (max-width: 768px) {
  .ps-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .ps-grid { grid-template-columns: 1fr; }
}
</style>
