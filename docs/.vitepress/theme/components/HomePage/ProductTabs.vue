<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import CopyButton from './CopyButton.vue'

interface TabItem {
  key: string
  label: string
  command: string
}

const props = defineProps<{ tabs: TabItem[] }>()

const activeTab = ref(props.tabs[0]?.key || '')
const tabsRef = ref<HTMLElement | null>(null)
const indicatorStyle = ref({ width: '0px', left: '0px' })

function updateIndicator() {
  if (!tabsRef.value) return
  const activeEl = tabsRef.value.querySelector<HTMLElement>(`[data-tab="${activeTab.value}"]`)
  if (!activeEl) return
  const parentRect = tabsRef.value.getBoundingClientRect()
  const rect = activeEl.getBoundingClientRect()
  indicatorStyle.value = {
    width: `${rect.width}px`,
    left: `${rect.left - parentRect.left}px`,
  }
}

function switchTo(key: string) {
  activeTab.value = key
}

watch(activeTab, () => nextTick(updateIndicator))
onMounted(() => nextTick(updateIndicator))

const activeCommand = computed(() => {
  return props.tabs.find((t) => t.key === activeTab.value)?.command || ''
})
</script>

<template>
  <div>
    <div ref="tabsRef" class="product-tabs">
      <div class="product-tabs__indicator" :style="indicatorStyle" />
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :data-tab="tab.key"
        class="product-tabs__tab"
        :class="{ 'product-tabs__tab--active': activeTab === tab.key }"
        @click="switchTo(tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="product-tabs__code">
      <CopyButton :text="activeCommand" />
      <div
        v-for="tab in tabs"
        :key="tab.key"
        class="product-tabs__content"
        :class="{ 'product-tabs__content--active': activeTab === tab.key }"
      >
        <span class="product-tabs__prompt">$</span>
        <span>{{ tab.command }}</span>
        <span v-if="activeTab === tab.key" class="typing-cursor" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-tabs {
  display: inline-flex;
  gap: 3px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 9px;
  padding: 3px;
  margin-bottom: 24px;
  position: relative;
}

.dark .product-tabs {
  background: rgba(255, 255, 255, 0.06);
}

.product-tabs__indicator {
  position: absolute;
  height: calc(100% - 6px);
  top: 3px;
  background: var(--brand-color);
  border-radius: 7px;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 8px rgba(0, 184, 184, 0.3);
}

.product-tabs__tab {
  padding: 9px 22px;
  border-radius: 7px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  border: none;
  background: transparent;
  color: var(--text-color-2);
  font-family: inherit;
  position: relative;
  z-index: 1;
}

.product-tabs__tab--active {
  color: #fff;
}

.product-tabs__tab:not(.product-tabs__tab--active):hover {
  color: var(--text-color-1);
}

.product-tabs__code {
  max-width: 620px;
  margin: 0 auto 32px;
  background: var(--home-bg-color-1);
  border-radius: 10px;
  padding: 20px 24px;
  text-align: left;
  position: relative;
  font-family: 'SF Mono', 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
  font-size: 13.5px;
  line-height: 1.8;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  color: var(--text-color-1);
}

.dark .product-tabs__code {
  background: var(--home-bg-color-1);
}

.product-tabs__code::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 184, 184, 0.4), transparent);
}

.product-tabs__prompt {
  color: var(--text-color-3);
  user-select: none;
  margin-right: 8px;
}

.product-tabs__content {
  display: none;
  white-space: pre-wrap;
  word-break: break-all;
}

.product-tabs__content--active {
  display: block;
  animation: tab-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
