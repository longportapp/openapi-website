<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import IconComponent from './IconComponent.vue'

const { t } = useI18n()

const markets = [
  { key: 'HK', icon: 'market_round_HK', nameKey: 'home.market.hk', productsKey: 'home.market.hkProducts' },
  { key: 'US', icon: 'market_round_US', nameKey: 'home.market.us', productsKey: 'home.market.usProducts' },
  { key: 'CN', icon: 'market_round_CN', nameKey: 'home.market.cn', productsKey: 'home.market.cnProducts' },
  { key: 'SG', icon: 'market_round_SG', nameKey: 'home.market.sg', productsKey: 'home.market.sgProducts' },
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

:deep(.mc-icon) {
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
