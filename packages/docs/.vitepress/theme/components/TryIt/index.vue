<template>
  <button
    class="inline-flex items-center justify-center px-3 h-9 text-white font-medium rounded-xl cursor-pointer disabled:opacity-70 hover:opacity-80 gap-1.5 bg-[#2AB673]"
    @click="setIsOpen(true)">
    Try It
  </button>
  <Dialog :open="isOpen" @close="setIsOpen">
    <!-- The backdrop, rendered as a fixed sibling to the panel container -->
    <div class="fixed z-30 inset-0" aria-hidden="true" />

    <!-- Full-screen scrollable container -->
    <div class="fixed z-50 inset-0 w-screen overflow-y-auto backdrop-blur-sm bg-black/20">
      <!-- Container to center the panel -->
      <div class="flex min-h-full items-center justify-center p-4">
        <!-- The actual dialog panel -->
        <DialogPanel class="w-full max-w-2xl bg-white dark:bg-[rgb(37,45,59)] rounded-2xl shadow-xl">
          <!-- Header -->
          <div class="p-6 border-b border-gray-100 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <DialogTitle class="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <span
                  class="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-white"
                  :class="getMethodColor(props.method)">
                  {{ props.method }}
                </span>
                <span class="text-gray-700 dark:text-gray-300">{{ props.url }}</span>
              </DialogTitle>
              <button
                @click="setIsOpen(false)"
                class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2" v-if="props.description">
              {{ props.description }}
            </p>
          </div>

          <!-- Body -->
          <div class="p-6 max-h-96 overflow-y-auto">
            <ParametersForm :parameters="props.parameters" @form-change="onFormChange" />
          </div>

          <!-- Footer -->
          <div class="p-6 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end gap-3">
            <button
              @click="setIsOpen(false)"
              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              Cancel
            </button>
            <button
              @click="handleSend"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-[#2AB673] rounded-lg hover:bg-blue-700 dark:hover:bg-[#25a365] transition-colors flex items-center gap-2">
              <span>Send</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
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

const handleSend = async () => {
  console.log('API Info:', {
    method: props.method,
    url: props.url,
    parameters: props.parameters,
    formData: formData.value,
  })

  // 这里可以实现实际的 API 调用逻辑
  // 例如：
  // try {
  //   const response = await request({
  //     method: props.method,
  //     url: props.url,
  //     data: formData.value
  //   })
  //   console.log('Response:', response)
  // } catch (error) {
  //   console.error('Request failed:', error)
  // }
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

const isOpen = ref(false)

function setIsOpen(value) {
  isOpen.value = value
}
</script>
