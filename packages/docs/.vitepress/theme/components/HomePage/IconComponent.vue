<template>
  <span :class="['lb-icon', className]" v-bind="$attrs">
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="iconHref"></use>
    </svg>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type: string
  className?: string
}

const props = defineProps<Props>()

const iconHref = computed(() => `#icon-${props.type}`)
</script>

<style scoped>
.lb-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style> 