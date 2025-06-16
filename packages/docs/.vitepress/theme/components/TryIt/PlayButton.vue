<template>
  <button
    :class="[
      'ml-2 inline-flex items-center justify-center px-3 py-1 text-white font-medium rounded-xl cursor-pointer disabled:opacity-70 hover:opacity-80 gap- shadow-none',
      color,
      customClass,
    ]"
    @click="$emit('click')"
    :disabled="disabled">
    <span class="text-base font-normal">
      <slot>Try it</slot>
    </span>
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
      <path
        d="M5 3.5C5 3.22386 5.22386 3 5.5 3C5.59721 3 5.69275 3.02799 5.77727 3.08062L13.7773 8.5806C14.0512 8.7641 14.0512 9.2359 13.7773 9.4194L5.77727 14.9194C5.69275 14.972 5.59721 15 5.5 15C5.22386 15 5 14.7761 5 14.5V3.5Z"
        fill="white"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from 'vue'

const props = withDefaults(
  defineProps<{
    color?: string
    customClass?: string
    disabled?: boolean
  }>(),
  {
    color: 'bg-blue-500',
    customClass: '',
    disabled: false,
  }
)

defineEmits(['click'])
</script>
