<template>
  <div class="rounded-lg p-4 my-4 border-l-4 transition-colors duration-200" :class="containerClasses">
    <div v-if="title" class="flex items-center mb-2 font-semibold">
      <span class="mr-2 text-base">{{ getIcon(type) }}</span>
      <span class="text-sm uppercase tracking-wider">{{ title }}</span>
    </div>
    <div class="leading-relaxed prose prose-sm max-w-none">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'tip' | 'warning' | 'danger' | 'info' | 'caution' | 'success'
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'tip',
  title: '',
})

const containerClasses = computed(() => {
  const typeClasses = {
    tip: 'bg-sky-50 dark:bg-sky-950/20 border-l-sky-500 text-sky-900 dark:text-sky-100',
    warning: 'bg-amber-50 dark:bg-amber-950/20 border-l-amber-500 text-amber-900 dark:text-amber-100',
    danger: 'bg-red-50 dark:bg-red-950/20 border-l-red-500 text-red-900 dark:text-red-100',
    info: 'bg-emerald-50 dark:bg-emerald-950/20 border-l-emerald-500 text-emerald-900 dark:text-emerald-100',
    caution: 'bg-orange-50 dark:bg-orange-950/20 border-l-orange-500 text-orange-900 dark:text-orange-100',
    success: 'bg-green-50 dark:bg-green-950/20 border-l-green-500 text-green-900 dark:text-green-100',
  }
  return typeClasses[props.type]
})

function getIcon(type: string): string {
  const icons = {
    tip: '💡',
    warning: '⚠️',
    danger: '❌',
    info: 'ℹ️',
    caution: '⚠️',
    success: '✅',
  }
  return icons[type as keyof typeof icons] || '💡'
}
</script>

<style scoped>
/* 确保嵌套内容的最后一个段落没有底部边距 */
.prose :deep(p:last-child) {
  @apply mb-0;
}

/* 确保代码块在容器内有合适的样式 */
.prose :deep(pre) {
  @apply my-3;
}

/* 确保列表项有合适的间距 */
.prose :deep(li) {
  @apply my-1;
}
</style>
