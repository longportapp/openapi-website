<template>
  <div>
    <h2 v-if="title && level === 2">{{ title }}</h2>
    <h3 v-else-if="title && level === 3">{{ title }}</h3>
    <h4 v-else-if="title && level === 4">{{ title }}</h4>
    <h5 v-else-if="title && level === 5">{{ title }}</h5>

    <table class="table block">
      <tbody>
        <tr v-for="link in links" :key="link.title">
          <td class="w-25 bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-divider)]">
            <div class="flex items-center gap-2 text-sm text-[var(--vp-c-text-1)]">
              <div class="inline-block w-2 h-2 rounded-sm" :style="{ backgroundColor: link.color }"></div>
              <div>{{ link.title }}</div>
            </div>
          </td>
          <td
            class="whitespace-nowrap overflow-hidden text-ellipsis bg-[var(--vp-c-bg)] border border-[var(--vp-c-divider)]">
            <a :href="link.url" target="_blank" class="text-[var(--vp-c-brand-1)] no-underline">
              {{ link.label }}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  module?: 'quote' | 'trade'
  klass?: 'QuoteContext' | 'TradeContext'
  method: string
  go?: string
  java?: string
  level?: number
  title?: string | boolean
}

const props = withDefaults(defineProps<Props>(), {
  module: 'quote',
  level: 2,
  title: 'SDK Links',
})

const snakeCase = (str: string): string => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}

const camelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

const snakeMethod = computed(() => snakeCase(props.method))
const camelMethod = computed(() => camelCase(props.method))
const capitalizedMethod = computed(() => camelMethod.value.charAt(0).toUpperCase() + camelMethod.value.slice(1))
const getPrefixedMethod = computed(() => `get${capitalizedMethod.value}`)

const methodGo = computed(() => props.go || capitalizedMethod.value)
const methodJava = computed(() => props.java)

const links = computed(() => {
  const baseLinks = [
    {
      title: 'Python',
      color: '#3572a5',
      label: `longport.openapi.${props.klass}.${snakeMethod.value}`,
      url: `https://longportapp.github.io/openapi/python/reference_all/#longport.openapi.${props.klass}.${snakeMethod.value}`,
    },
    {
      title: 'Rust',
      color: '#dea584',
      label: `longport::${props.module}::${props.klass}#${snakeMethod.value}`,
      url: `https://longportapp.github.io/openapi/rust/longport/${props.module}/struct.${props.klass}.html#method.${snakeMethod.value}`,
    },
    {
      title: 'Go',
      color: '#00ADD8',
      label: `${props.klass}.${methodGo.value}`,
      url: `https://pkg.go.dev/github.com/longportapp/openapi-go/${props.module}#${props.klass}.${methodGo.value}`,
    },
    {
      title: 'Node.js',
      color: '#f1e05a',
      label: `${props.klass}#${camelMethod.value}`,
      url: `https://longportapp.github.io/openapi/nodejs/classes/${props.klass}.html#${camelMethod.value.toLowerCase()}`,
    },
  ]

  if (methodJava.value) {
    baseLinks.push({
      title: 'Java',
      color: '#b07219',
      label: `${props.klass}.${getPrefixedMethod.value}`,
      url: `https://longportapp.github.io/openapi/java/com/longport/${props.module}/${props.klass}.html#${methodJava.value}`,
    })
  }

  return baseLinks
})
</script>
