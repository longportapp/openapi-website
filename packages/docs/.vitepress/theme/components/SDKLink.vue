<template>
  <div>
    <h2 v-if="title && level === 2">{{ title }}</h2>
    <h3 v-else-if="title && level === 3">{{ title }}</h3>
    <h4 v-else-if="title && level === 4">{{ title }}</h4>
    <h5 v-else-if="title && level === 5">{{ title }}</h5>
    
    <table class="table" style="display: table">
      <tbody>
        <tr v-for="link in links" :key="link.title">
          <td class="bg-gray-50 w-[100px]">
            <div class="flex items-center gap-x-2 text-sm">
              <div
                :style="{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  backgroundColor: link.color,
                  borderRadius: '1px',
                }"
              ></div>
              <div>{{ link.title }}</div>
            </div>
          </td>
          <td
            :style="{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }"
          >
            <a :href="link.url" target="_blank">
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
const capitalizedMethod = computed(() => 
  camelMethod.value.charAt(0).toUpperCase() + camelMethod.value.slice(1)
)
const getPrefixedMethod = computed(() => `get${capitalizedMethod.value}`)

const methodGo = computed(() => props.go || capitalizedMethod.value)
const methodJava = computed(() => props.java)

const links = computed(() => {
  const baseLinks = [
    {
      title: 'Python',
      color: '#3572a5',
      label: `longport.openapi.${props.klass}.${snakeMethod.value}`,
      url: `https://longportapp.github.io/openapi/python/${props.module}_context/#longport.openapi.${props.klass}.${snakeMethod.value}`,
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
      url: `https://longportapp.github.io/openapi/nodejs/classes/${props.klass}.html#${camelMethod.value}`,
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
