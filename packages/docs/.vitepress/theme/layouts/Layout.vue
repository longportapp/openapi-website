<script setup lang="ts">
import UserAvatar from '../components/UserAvatar/index.vue'
import Layout from './LayoutInner.vue'
import { useThemeToggle, useI18nSync, useHighlighter, useLLMMarkdownLink } from '../composables'

// 使用抽离的 hooks
useThemeToggle()
useI18nSync()
useHighlighter()

const { llmMarkdownLink } = useLLMMarkdownLink()
</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <UserAvatar />
    </template>
    <template #doc-footer-before>
      <a v-if="llmMarkdownLink" :href="llmMarkdownLink" target="_blank" class="text-sm text-[--vp-c-brand-1] italic"
        >LLMs Text</a
      >
    </template>
  </Layout>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}

.VPSidebar .VPSidebarItem.level-0 {
  @apply pb-2.5;
}

.VPSidebar .level-1.is-link {
  @apply -ml-2;
}
</style>
