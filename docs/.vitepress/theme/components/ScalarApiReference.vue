<script setup lang="ts">
import { ApiReference } from '@scalar/api-reference'
import '@scalar/api-reference/style.css'
import { useData } from 'vitepress'
import { computed, onMounted, ref } from 'vue'
import spec from '../../../../openapi.yaml?raw'

const { isDark } = useData()

const redirectUri = ref('')
onMounted(() => {
  redirectUri.value = window.location.origin + window.location.pathname
})

const configuration = computed(() => ({
  content: spec,
  darkMode: isDark.value,
  authentication: {
    securitySchemes: {
      oauth2: {
        flows: {
          authorizationCode: {
            'x-usePkce': 'SHA-256',
            'x-scalar-redirect-uri': redirectUri.value,
          },
        },
      },
    },
  },
}))
</script>

<template>
  <div class="scalar-wrapper">
    <ApiReference :configuration="configuration" />
  </div>
</template>

<style>
.scalar-wrapper {
  height: calc(100vh - var(--vp-nav-height));
  overflow: hidden;
}

/* Ensure Scalar fills the wrapper */
.scalar-wrapper .scalar-app,
.scalar-wrapper > div {
  height: 100%;
}
</style>
