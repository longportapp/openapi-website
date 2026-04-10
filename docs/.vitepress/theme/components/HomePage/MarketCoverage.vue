<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import IconComponent from './IconComponent.vue'

const { t } = useI18n()

const markets = [
  {
    key: 'HK',
    icon: 'market_round_HK',
    nameKey: 'home.market.hk',
    products: [
      { nameKey: 'home.market.stocks', trade: true, quotes: true },
      { nameKey: 'home.market.etf', trade: true, quotes: true },
      { nameKey: 'home.market.warrant', trade: true, quotes: true },
    ],
  },
  {
    key: 'US',
    icon: 'market_round_US',
    nameKey: 'home.market.us',
    products: [
      { nameKey: 'home.market.stocks', trade: true, quotes: true },
      { nameKey: 'home.market.etf', trade: true, quotes: true },
      { nameKey: 'home.market.options', trade: true, quotes: true },
    ],
  },
  {
    key: 'CN',
    icon: 'market_round_CN',
    nameKey: 'home.market.cn',
    products: [
      { nameKey: 'home.market.stocks', trade: true, quotes: true },
      { nameKey: 'home.market.etf', trade: true, quotes: true },
    ],
  },
]

const sdks = ['Python', 'Node.js', 'Rust', 'Go', 'Java', 'C++']
</script>

<template>
  <section class="homepage-section">
    <div class="homepage-container">
      <div class="mc-header reveal">
        <h2 class="mc-main-title">{{ t('home.marketCoverage.title') }}</h2>
        <p class="mc-subtitle">{{ t('home.marketCoverage.subtitle') }}</p>
      </div>

      <!-- Market matrix -->
      <div class="mc-matrix reveal">
        <div v-for="m in markets" :key="m.key" class="mc-market">
          <div class="mc-market-header">
            <IconComponent :type="m.icon" class-name="mc-flag" />
            <span class="mc-market-name">{{ t(m.nameKey) }}</span>
          </div>
          <table class="mc-table">
            <thead>
              <tr>
                <th>{{ t('home.market.product') }}</th>
                <th>{{ t('home.market.trade') }}</th>
                <th>{{ t('home.market.quotes') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in m.products" :key="p.nameKey">
                <td>{{ t(p.nameKey) }}</td>
                <td><span v-if="p.trade" class="mc-dot" /></td>
                <td><span v-if="p.quotes" class="mc-dot" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- SDK row -->
      <div class="mc-sdk-row reveal reveal-d1">
        <span class="mc-sdk-label">SDK</span>
        <span v-for="sdk in sdks" :key="sdk" class="mc-sdk">{{ sdk }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mc-header { text-align: center; margin-bottom: 40px; }

.mc-main-title {
  font-size: var(--text-xl, 1.75rem);
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

/* Market matrix */
.mc-matrix {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.mc-market {
  background: var(--home-bg-color-1);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 20px;
}

.mc-market-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

:deep(.mc-flag) {
  width: 28px;
  height: 28px;
}

.mc-market-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color-1);
}

.mc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.mc-table th {
  text-align: left;
  font-weight: 500;
  color: var(--text-color-3);
  padding: 6px 0;
  border-bottom: 1px solid var(--border-color);
  font-size: 12px;
}

.mc-table td {
  padding: 8px 0;
  color: var(--text-color-1);
}

.mc-table td:not(:first-child),
.mc-table th:not(:first-child) {
  text-align: center;
  width: 60px;
}

.mc-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--brand-color);
}

/* SDK row */
.mc-sdk-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.mc-sdk-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-color-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
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

@media (max-width: 768px) {
  .mc-matrix { grid-template-columns: 1fr; }
}
</style>
