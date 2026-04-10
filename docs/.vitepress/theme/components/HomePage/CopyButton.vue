<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ text: string }>()

const copied = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(props.text)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1500)
  } catch {
    // Fallback: noop in SSR
  }
}
</script>

<template>
  <button
    class="copy-btn"
    :class="{ 'copy-btn--copied': copied }"
    @click="copy"
  >
    {{ copied ? $t('api.copied') : $t('api.copy') }}
  </button>
</template>

<style scoped>
.copy-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-color-3);
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 11px;
  font-family: inherit;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.copy-btn--copied {
  color: var(--brand-color);
}
</style>
