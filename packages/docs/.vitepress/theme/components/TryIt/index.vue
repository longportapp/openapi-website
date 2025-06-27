<template>
  <PlayButton :color="getMethodColor(props.method)" @click="setIsOpen(true)">{{
    $t('vitepress_theme_components_tryit_index_2')
  }}</PlayButton>
  <Dialog :open="isOpen" @close="setIsOpen">
    <!-- The backdrop, rendered as a fixed sibling to the panel container -->
    <div class="fixed z-30 inset-0" aria-hidden="true" />

    <!-- Full-screen scrollable container -->
    <div class="fixed z-50 inset-0 w-screen overflow-y-auto backdrop-blur-sm bg-black/20">
      <!-- Container to center the panel -->
      <div class="flex min-h-full items-center justify-center p-4">
        <!-- The actual dialog panel -->
        <DialogPanel
          class="w-full max-w-[1200px] px-6 pb-6 bg-white dark:bg-[rgb(10,12,16)] rounded-2xl shadow-xl border border-gray-200/70 dark:border-white/10">
          <!-- Header -->
          <div class="py-6">
            <div class="flex items-center justify-between max-w-full">
              <DialogTitle
                class="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2 flex-1 min-w-0">
                <span
                  class="text-base items-center justify-center px-3 py-1 font-medium rounded-xl shadow-none flex-shrink-0"
                  :class="getMethodTextColor(props.method)">
                  {{ props.method }}
                </span>
                <span class="text-gray-700 dark:text-gray-300 overflow-x-auto whitespace-nowrap min-w-0 flex-1">{{
                  props.url
                }}</span>
              </DialogTitle>
              <PlayButton
                class="flex-shrink-0 ml-2"
                :color="getMethodColor(props.method)"
                :loading="isLoading"
                @click="handleSend">
                {{ $t('tryIt.send') }}
              </PlayButton>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2" v-if="props.description">
              {{ props.description }}
            </p>
          </div>
          <div class="flex gap-4 items-start flex-col lg:flex-row">
            <div class="flex-1 w-full lg:w-auto min-w-0 space-y-4">
              <AuthorizationForm @auth-change="onAuthChange" />
              <ParametersForm :parameters="props.parameters" @form-change="onFormChange" />
            </div>
            <div v-if="result || isLoading" class="flex-1 w-full min-w-0">
              <!-- Loading State -->
              <LoadingSpinner v-if="isLoading" />
              <!-- Result Display -->
              <Code v-if="result" :result="result" />
            </div>
          </div>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
</template>
<script setup lang="ts">
import 'vue-i18n'
import type { ParameterRow } from '../../../types'
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, DialogDescription } from '@headlessui/vue'
import ParametersForm from './ParametersForm.vue'
import AuthorizationForm from './AuthorizationForm.vue'
import PlayButton from './PlayButton.vue'
import Code from './Code.vue'
import LoadingSpinner from './LoadingSpinner.vue'
import { type ApiResponse } from '../../utils/http-client'

interface Props {
  method?: string
  url?: string
  description?: string
  parameters?: ParameterRow[]
}

const props = withDefaults(defineProps<Props>(), {
  method: 'GET',
  url: '',
  description: '',
  parameters: () => [],
})

import { request } from '../../utils/request'

const formData = ref<Record<string, any>>({})
const authData = ref<Record<string, any>>({})
const isLoading = ref(false)

const onFormChange = (data: Record<string, any>) => {
  formData.value = data
}

const onAuthChange = (data: Record<string, any>) => {
  authData.value = data
  // 更新本地存储
  if (typeof window !== 'undefined') {
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        window.localStorage.setItem(key, data[key])
      }
    })
  }
}

const result = ref<ApiResponse | undefined>()
const handleSend = async () => {
  if (isLoading.value) return

  // 清除之前的结果，显示加载状态
  result.value = undefined
  isLoading.value = true

  try {
    const method = props.method.toLowerCase()
    const url = props.url

    const localResult = await request[method](url, formData.value)
    result.value = localResult
  } catch (error) {
    console.error('API request failed:', error)
  } finally {
    isLoading.value = false
  }
}

const getMethodColor = (method: string) => {
  switch (method?.toLowerCase()) {
    case 'get':
      return 'bg-green-500'
    case 'post':
      return 'bg-blue-500'
    case 'put':
      return 'bg-orange-500'
    case 'delete':
      return 'bg-red-500'
    case 'patch':
      return 'bg-purple-500'
    default:
      return 'bg-gray-500'
  }
}

const getMethodTextColor = (method: string) => {
  switch (method?.toLowerCase()) {
    case 'get':
      return 'text-green-500 bg-green-400/10'
    case 'post':
      return 'text-blue-500 bg-blue-400/10'
    case 'put':
      return 'text-orange-500 bg-orange-400/10'
    case 'delete':
      return 'text-red-500 bg-red-400/10'
    case 'patch':
      return 'text-purple-500 bg-purple-400/10'
    default:
      return 'text-gray-500 bg-gray-400/10'
  }
}

const isOpen = ref(false)

function setIsOpen(value) {
  isOpen.value = value
}
</script>
