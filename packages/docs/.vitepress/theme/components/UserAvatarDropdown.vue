<script lang="ts" setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

interface DropdownItem {
  title: string
  href?: string
  icon?: string
  onClick?: () => void
  separator?: boolean
}

interface Props {
  list: DropdownItem[]
  align?: 'start' | 'end'
  side?: 'top' | 'bottom'
  open?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  align: 'end',
  side: 'bottom',
  open: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const dropdownRef = ref<HTMLElement>()

const alignmentClasses = computed(() => {
  const base =
    'absolute z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md'

  if (props.side === 'top') {
    return `${base} bottom-full mb-2`
  }

  if (props.align === 'start') {
    return `${base} top-full mt-2 left-0`
  }

  return `${base} top-full mt-2 right-0`
})

const handleItemClick = (item: DropdownItem) => {
  if (item.onClick) {
    item.onClick()
  } else if (item.href) {
    window.open(item.href, '_blank')
  }
  emit('update:open', false)
}

const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    emit('update:open', false)
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('update:open', false)
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div ref="dropdownRef" class="relative inline-block">
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95">
      <div v-show="props.open" :class="alignmentClasses" role="menu" aria-orientation="vertical">
        <template v-for="(item, index) in props.list" :key="index">
          <hr v-if="item.separator" class="-mx-1 my-1 h-px bg-muted" />
          <button
            v-else
            type="button"
            class="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            role="menuitem"
            @click="handleItemClick(item)">
            <div v-if="item.icon" :class="item.icon" class="mr-2 h-4 w-4" />
            <span>{{ item.title }}</span>
          </button>
        </template>
      </div>
    </Transition>
  </div>
</template>
