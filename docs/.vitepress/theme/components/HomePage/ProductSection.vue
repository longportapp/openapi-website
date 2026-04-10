<script setup lang="ts">
defineProps<{
  reverse?: boolean
  accent?: string
}>()
</script>

<template>
  <section class="homepage-section" :class="{ 'homepage-section--alt': !reverse }">
    <div
      class="homepage-container product-section-grid"
      :class="{ 'product-section-grid--reverse': reverse }"
    >
      <div class="reveal">
        <slot name="content" />
      </div>
      <div class="reveal reveal-d2">
        <slot name="visual" />
      </div>
    </div>
  </section>
</template>
