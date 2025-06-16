<template>
  <PlayButton :color="getMethodColor(props.method)" @click="setIsOpen(true)"> Try it </PlayButton>
  <Dialog :open="isOpen" @close="setIsOpen">
    <!-- The backdrop, rendered as a fixed sibling to the panel container -->
    <div class="fixed z-30 inset-0" aria-hidden="true" />

    <!-- Full-screen scrollable container -->
    <div class="fixed z-50 inset-0 w-screen overflow-y-auto backdrop-blur-sm bg-black/20">
      <!-- Container to center the panel -->
      <div class="flex min-h-full items-center justify-center p-4">
        <!-- The actual dialog panel -->
        <DialogPanel
          class="w-full max-w-[calc(100vw-64px)] px-6 pb-6 bg-white dark:bg-[rgb(10,12,16)] rounded-2xl shadow-xl border border-gray-200/70 dark:border-white/10">
          <!-- Header -->
          <div class="py-6">
            <div class="flex items-center justify-between">
              <DialogTitle class="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <span
                  class="text-base items-center justify-center px-3 py-1 font-medium rounded-xl cursor-pointer disabled:opacity-70 hover:opacity-80 shadow-none"
                  :class="getMethodTextColor(props.method)">
                  {{ props.method }}
                </span>
                <span class="text-gray-700 dark:text-gray-300">{{ props.url }}</span>
              </DialogTitle>
              <PlayButton :color="getMethodColor(props.method)" @click="handleSend"> Send </PlayButton>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2" v-if="props.description">
              {{ props.description }}
            </p>
          </div>
          <div class="flex gap-4 items-start">
            <div class="flex-auto">
              <ParametersForm :parameters="props.parameters" @form-change="onFormChange" />
            </div>
            <div v-if="result" class="flex-auto overflow-hidden">
              <Code :result="result" />
            </div>
          </div>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
</template>
<script setup lang="ts">
import type { ParameterRow } from '../../../types'
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, DialogDescription } from '@headlessui/vue'
import ParametersForm from './ParametersForm.vue'
import PlayButton from './PlayButton.vue'
import Code from './Code.vue'
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

console.log(JSON.stringify(props.parameters, null, 2))

import { request } from '../../utils/request'

const formData = ref<Record<string, any>>({})

const onFormChange = (data: Record<string, any>) => {
  formData.value = data
}

const result = ref<ApiResponse | undefined>()
const handleSend = async () => {
  const method = props.method.toLowerCase()
  const url = props.url

  const localResult = await request[method](url, formData.value)
  result.value = localResult
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
      return 'text-green-500 bg-green-100'
    case 'post':
      return 'text-blue-500 bg-blue-100'
    case 'put':
      return 'text-orange-500 bg-orange-100'
    case 'delete':
      return 'text-red-500 bg-red-100'
    case 'patch':
      return 'text-purple-500 bg-purple-100'
    default:
      return 'text-gray-500 bg-gray-100'
  }
}

const isOpen = ref(false)

function setIsOpen(value) {
  isOpen.value = value
}
</script>
