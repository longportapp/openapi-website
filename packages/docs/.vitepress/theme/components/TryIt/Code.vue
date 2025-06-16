<template>
  <div
    v-if="props.result"
    class="w-full rounded-xl border p-0.5 bg-gray-50 dark:bg-white/5 border-gray-950/10 dark:border-white/10">
    <!-- Header Bar -->
    <div class="flex w-full px-2 py-1 space-x-3 items-center rounded-t-2xl">
      <div class="flex flex-1 space-x-4 items-center">
        <div class="flex space-x-2 items-center">
          <!-- Status Icon -->
          <div class="w-3.5 h-3.5 rounded-full" :class="getStatusIconClass()"></div>
          <!-- Status Text -->
          <div class="text-xs text-gray-800 dark:text-gray-200 font-medium">
            {{ getStatusText() }}
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-2 items-center">
        <!-- Download Button -->
        <button
          @click="downloadResponse"
          class="group h-7 w-7 flex items-center justify-center cursor-pointer relative hover:bg-gray-100 dark:hover:bg-white/5 rounded-md transition-colors"
          title="download">
          <svg
            class="w-4 h-4 bg-gray-400 group-hover:bg-gray-500 dark:bg-white/40 dark:group-hover:bg-white/60"
            style="
              mask-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMgMTNIMTMiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik04IDNWMTFNOCAxMUwxMSA4TTggMTFMNSA4IiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K');
              mask-repeat: no-repeat;
              mask-position: center center;
            "></svg>
        </button>

        <!-- Copy Button -->
        <div class="relative">
          <button
            @click="copyResponse"
            class="h-7 w-7 flex items-center justify-center rounded-md backdrop-blur group/copy-button hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            :title="copySuccess ? '已复制' : '复制代码'">
            <svg
              v-if="!copySuccess"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 text-gray-400 group-hover/copy-button:text-gray-500 dark:text-white/40 dark:group-hover/copy-button:text-white/60">
              <path
                d="M14.25 5.25H7.25C6.14543 5.25 5.25 6.14543 5.25 7.25V14.25C5.25 15.3546 6.14543 16.25 7.25 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V7.25C16.25 6.14543 15.3546 5.25 14.25 5.25Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round" />
              <path
                d="M2.80103 11.998L1.77203 5.07397C1.61003 3.98097 2.36403 2.96397 3.45603 2.80197L10.38 1.77297C11.313 1.63397 12.19 2.16297 12.528 3.00097"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            <svg
              v-else
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 text-green-500">
              <path
                d="M15 4.5L7.5 12L3 7.5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Code Content -->
    <div class="rounded-[14px] dark:bg-[#121212] bg-white">
      <div class="overflow-auto h-full">
        <div
          class="px-3 py-3.5 h-[30vh] whitespace-pre border-gray-200 dark:border-gray-700 dark:text-gray-300 font-mono text-xs leading-5">
          <div v-html="highlightHtml"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, inject } from 'vue'
import { createHighlighter } from 'shiki/bundle/web'
import { type ApiResponse } from '../../utils/http-client'

interface Props {
  result?: ApiResponse
}

const props = withDefaults(defineProps<Props>(), {
  result: undefined,
})

const highlightHtml = ref('')
const copySuccess = ref(false)

const highlighterPromise = inject<ReturnType<typeof createHighlighter>>('highlighter')

const highlightJson = async () => {
  const highlighter = await highlighterPromise
  if (props.result?.response) {
    const code = JSON.stringify(props.result.response, null, 2)
    highlightHtml.value =
      highlighter?.codeToHtml(code, {
        lang: 'json',
        theme: document.documentElement.classList.contains('dark') ? 'vitesse-dark' : 'vitesse-light',
      }) || ''
  } else {
    highlightHtml.value = ''
  }
}

const getStatusIconClass = () => {
  if (!props.result) return 'bg-gray-400'

  const status = props.result.status
  if (status >= 200 && status < 300) {
    return 'bg-green-500'
  } else if (status >= 400 && status < 500) {
    return 'bg-red-500'
  } else if (status >= 500) {
    return 'bg-red-600'
  } else {
    return 'bg-yellow-500'
  }
}

const getStatusText = () => {
  if (!props.result) return ''
  return `${props.result.status} - ${props.result.statusText}`
}

const copyResponse = async () => {
  if (!props.result?.response) return

  try {
    const jsonText = JSON.stringify(props.result.response, null, 2)
    await navigator.clipboard.writeText(jsonText)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败：', err)
  }
}

const downloadResponse = () => {
  if (!props.result?.response) return

  try {
    const jsonText = JSON.stringify(props.result.response, null, 2)
    const blob = new Blob([jsonText], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'api-response.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('下载失败：', err)
  }
}

// 首次加载
onMounted(highlightJson)

watch(() => props.result, highlightJson, { deep: true })
</script>
