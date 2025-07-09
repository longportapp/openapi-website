<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide, ref, watchEffect, onMounted } from 'vue'
import UserAvatar from '../components/UserAvatar/index.vue'
import { createHighlighter } from 'shiki/bundle/web'

const { isDark, lang } = useData()
const i18n = useI18n()
const router = useRoute()

const showTryIt = ref(false)

onMounted(() => {
  const params = new URLSearchParams(router.query)
  console.log(params.get('mode'))
  if (params.get('mode') === 'try-it') {
    showTryIt.value = true
  }

  console.log(showTryIt.value)
})

watchEffect(() => {
  if (lang.value !== i18n.locale.value) {
    i18n.locale.value = lang.value
  }
})

provide('highlighter', createHighlighter({ themes: ['vitesse-dark', 'vitesse-light'], langs: ['json'] }))

const enableTransitions = () =>
  'startViewTransition' in document && window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px at ${x}px ${y}px)`,
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    }
  )
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-after>
      <UserAvatar />
    </template>
    <template #doc-footer-before>
      <a :href="router.path + '.md'" target="_blank" class="text-sm text-[--vp-c-brand-1] italic">LLMs Text</a>
    </template>
  </DefaultTheme.Layout>
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

.VPSidebar .level-1.is-link .VPLink {
  @apply -ml-2;
}
</style>
