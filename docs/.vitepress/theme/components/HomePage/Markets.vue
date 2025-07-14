<template>
  <div class="markets-container">
    <div class="markets">
      <div class="text-center">
        <h3 class="title">{{ $t('_YvIt0iSGu0EGld6cWVqO') }}</h3>
        <span class="sub-title">{{ $t('OG258Y1lxxNYjOsg6gH4K') }}</span>
      </div>
      <div class="market-list">
        <Market
          v-for="market in markets"
          :key="market.name"
          :name="market.name"
          :en-name="market.enName"
          :icon="market.icon"
          :data="market.data"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Market from './Market.vue'

interface IMarketProps {
  name: string
  enName?: string
  icon: string
  data: {
    name: string
    supportTrade?: boolean
    supportMarket?: boolean
  }[]
}

const { t } = useI18n()

const markets = computed((): IMarketProps[] => [
  {
    name: t('kjNmyMdY3qW7IM4SMfPXm'),
    enName: 'HK Market',
    icon: 'market_round_HK',
    data: [
      {
        name: t('JK4uYamM0gon_wJOP7Hn'),
      },
      {
        name: t('ETF'),
      },
      {
        name: t('X0ttVisvS_Xsb4GKz5tux'),
      },
    ],
  },
  {
    name: t('2JEm9E33pUNr1kKiPGi7E'),
    enName: 'US Market',
    icon: 'market_round_US',
    data: [
      {
        name: t('JK4uYamM0gon_wJOP7Hn'),
      },
      {
        name: t('ETF'),
      },
      {
        name: t('NnXaw5QqFz0uQLw3JmkqE'),
      },
    ],
  },
  {
    name: t('5i7gs89W1HrWZNVhWswfZ'),
    enName: 'CN Market',
    icon: 'market_round_CN',
    data: [
      {
        name: t('JK4uYamM0gon_wJOP7Hn'),
      },
      {
        name: t('ETF'),
      },
    ],
  },
])
</script>

<style scoped>
.markets-container {
  background-color: var(--home-bg-color);
  @apply px-12;
}

.markets {
  padding: 60px 0;
}

.markets .title {
  font-size: 1.25rem;
  color: var(--text-color-1);
}

.markets .sub-title {
  font-weight: normal;
  margin-top: 1rem;
  color: var(--text-color-1-supplement);
  display: inline-block;
}

.markets .market-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 768px) {
  .markets {
    padding: 2.5rem 0;
    max-width: 80rem;
    margin: 0 auto;
  }
  
  .markets .title {
    font-size: 1.5rem;
  }
  
  .markets .sub-title {
    font-size: 1rem;
  }
  
  .markets .market-list {
    justify-content: space-between;
    align-items: stretch;
    flex-direction: row;
    margin-top: 3rem;
  }
}
</style> 