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
        <!-- Markets -->
        <div class="ps-item">
          <div class="ps-num"><span data-count-target="4">0</span></div>
          <div class="ps-title">{{ t('home.stats.marketsTitle') }}</div>
          <div class="ps-tags">
            <span class="ps-tag" style="--dot:#FF3A9D">HK</span>
            <span class="ps-tag" style="--dot:#2A99FE">US</span>
            <span class="ps-tag" style="--dot:#FF3A3A">CN</span>
            <span class="ps-tag" style="--dot:#3AD8FF">SG</span>
          </div>
          <div class="ps-sub">{{ t('home.stats.marketsSub') }}</div>
        </div>

        <!-- SDKs -->
        <div class="ps-item">
          <div class="ps-num"><span data-count-target="6">0</span></div>
          <div class="ps-title">{{ t('home.stats.sdksTitle') }}</div>
          <div class="ps-tags">
            <span class="ps-tag-text">Python</span>
            <span class="ps-tag-text">Node.js</span>
            <span class="ps-tag-text">Rust</span>
            <span class="ps-tag-text">Go</span>
            <span class="ps-tag-text">Java</span>
            <span class="ps-tag-text">C++</span>
          </div>
          <div class="ps-sub">{{ t('home.stats.sdksSub') }}</div>
        </div>

        <!-- CLI Commands -->
        <div class="ps-item">
          <div class="ps-num"><span data-count-target="40">0</span>+</div>
          <div class="ps-title">{{ t('home.stats.commandsTitle') }}</div>
          <div class="ps-tags">
            <span class="ps-tag-text">{{ t('home.stats.cmdQuote') }}</span>
            <span class="ps-tag-text">{{ t('home.stats.cmdTrade') }}</span>
            <span class="ps-tag-text">{{ t('home.stats.cmdFinance') }}</span>
            <span class="ps-tag-text">{{ t('home.stats.cmdScreen') }}</span>
          </div>
          <div class="ps-sub">{{ t('home.stats.commandsSub') }}</div>
        </div>

        <!-- Free -->
        <div class="ps-item">
          <div class="ps-num ps-num--text">{{ t('home.stats.freeValue') }}</div>
          <div class="ps-title">{{ t('home.stats.freeTitle') }}</div>
          <div class="ps-sub ps-sub--wide">{{ t('home.stats.freeSub') }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ps {
  padding: 56px 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  background: var(--home-bg-color-1);
}

.ps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.ps-item { text-align: center; }

.ps-num {
  font-size: 36px;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: var(--brand-color);
  margin-bottom: 4px;
}

.ps-num--text { font-size: 32px; }

.ps-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color-1);
  margin-bottom: 10px;
}

.ps-tags {
  display: flex;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.ps-tag {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
  background: var(--home-bg-color);
  color: var(--text-color-1);
  display: flex;
  align-items: center;
  gap: 4px;
}

.ps-tag::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--dot);
}

.ps-tag-text {
  font-size: 11px;
  font-weight: 500;
  padding: 2px 7px;
  border-radius: 3px;
  background: var(--home-bg-color);
  color: var(--text-color-2);
}

.ps-sub {
  font-size: 12px;
  color: var(--text-color-3);
  line-height: 1.5;
}

.ps-sub--wide {
  margin-top: 10px;
  max-width: 180px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 768px) {
  .ps-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; }
}

@media (max-width: 480px) {
  .ps-grid { grid-template-columns: 1fr; }
}
</style>
