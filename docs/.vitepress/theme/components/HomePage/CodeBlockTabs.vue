<script setup lang="ts">
import { ref } from 'vue'

interface CodeTab {
  key: string
  label: string
  code: string
}

const props = defineProps<{ tabs: CodeTab[] }>()
const activeTab = ref(props.tabs[0]?.key || '')
</script>

<template>
  <div class="cbt">
    <div class="cbt__tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="cbt__tab"
        :class="{ 'cbt__tab--active': activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="cbt__body">
      <pre
        v-for="tab in tabs"
        v-show="activeTab === tab.key"
        :key="tab.key"
        class="cbt__pre"
      ><code v-html="tab.code" /></pre>
    </div>
  </div>
</template>

<style scoped>
.cbt {
  background: var(--code-bg);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.cbt__tabs {
  display: flex;
  gap: 0;
  padding: 0 16px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.cbt__tab {
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 500;
  color: var(--code-dim);
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.cbt__tab--active {
  color: var(--code-fg);
  border-bottom-color: var(--brand-color);
}

.cbt__tab:hover {
  color: var(--code-fg);
}

.cbt__body {
  padding: 20px;
  overflow-x: auto;
}

.cbt__pre {
  margin: 0;
  font-family: 'SF Mono', 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12.5px;
  line-height: 1.8;
  color: var(--code-fg);
}
</style>
