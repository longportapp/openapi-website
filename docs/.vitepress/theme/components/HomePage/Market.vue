<template>
  <div class="market-com">
    <div>
      <div class="market-header">
        <IconComponent :type="icon" class="market-icon" />
        <div class="market-info">
          <span class="market-name">{{ name }}</span>
          <span v-if="!isEn && enName" class="market-en-name">{{ enName }}</span>
        </div>
      </div>
      <div class="market-table-wrapper">
        <table>
          <colgroup>
            <col width="120px" />
            <col width="80px" />
            <col width="80px" />
          </colgroup>
          <thead>
            <tr>
              <th>{{ $t('gymqj97uGGjyXSp99hh-o') }}</th>
              <th>{{ $t('u7PCsvYbglQ4mhmnQhK3N') }}</th>
              <th>{{ $t('pABA78lHD--FSi39tpzwf') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.name">
              <td>{{ item.name }}</td>
              <td class="support-dot">
                <IconComponent type="support-dot" />
              </td>
              <td class="support-dot">
                <IconComponent type="support-dot" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import IconComponent from './IconComponent.vue'

interface Props {
  name: string
  enName?: string
  icon: string
  data: {
    name: string
    supportTrade?: boolean
    supportMarket?: boolean
  }[]
}

defineProps<Props>()

const { locale } = useI18n()
const isEn = computed(() => locale.value === 'en')
</script>

<style scoped>
.market-com {
  background-color: var(--home-bg-color-1);
  border-radius: 0.5rem;
  padding: 2rem;
  margin-top: 1.5rem;
  display: inline-block;
}

.market-header {
  display: flex;
  align-items: center;
}

.market-icon {
  font-size: 3rem;
}

.market-info {
  display: flex;
  flex-direction: column;
  margin-left: 1.25rem;
}

.market-name {
  font-size: 1.125rem;
  font-weight: 600;
}

.market-en-name {
  color: var(--text-color-2);
}

.market-table-wrapper {
  margin-top: 1.25rem;
}

table {
  display: table;
}

table tr,
table th,
table thead,
table td {
  background: transparent;
  border: none;
}

table th {
  color: var(--text-color-2);
  text-align: left;
  font-weight: normal;
}

table td {
  color: var(--text-color-1-supplement);
}

table th,
table td {
  padding: 0.5rem;
}

table th:not(:first-child),
table td:not(:first-child) {
  text-align: center;
}

.support-dot {
  text-align: center;
}

@media (min-width: 768px) {
  .market-com {
    flex: 1;
    margin-right: 3rem;
    margin-top: 0;
  }
  
  .market-com:last-child {
    margin-right: 0;
  }
}
</style> 