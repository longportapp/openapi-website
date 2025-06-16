<template>
  <Transition
    name="code-appear"
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 transform translate-y-4 scale-95"
    enter-to-class="opacity-100 transform translate-y-0 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 transform translate-y-0 scale-100"
    leave-to-class="opacity-0 transform translate-y-4 scale-95">
    <div
      v-if="props.result"
      class="w-full rounded-xl border p-0.5 bg-gray-50 dark:bg-white/5 border-gray-950/10 dark:border-white/10">
      <!-- Header Bar -->
      <div class="flex w-full px-2 py-1 space-x-3 items-center rounded-t-2xl animate-slide-in-header">
        <div class="flex flex-1 space-x-4 items-center">
          <div class="flex space-x-2 items-center">
            <!-- Status Icon -->
            <div class="w-3.5 h-3.5 rounded-full animate-pulse-once" :class="getStatusIconClass()"></div>
            <!-- Status Text -->
            <div class="text-xs text-gray-800 dark:text-gray-200 font-medium animate-fade-in-delayed">
              {{ getStatusText() }}
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-2 items-center animate-fade-in-buttons">
          <!-- Download Button -->
          <button
            @click="downloadResponse"
            class="group h-7 w-7 flex items-center justify-center cursor-pointer relative hover:bg-gray-100 dark:hover:bg-white/5 rounded-md transition-all duration-200 hover:scale-110"
            title="download">
            <svg
              class="w-4 h-4 bg-gray-400 group-hover:bg-gray-500 dark:bg-white/40 dark:group-hover:bg-white/60 transition-all duration-200"
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
              class="h-7 w-7 flex items-center justify-center rounded-md backdrop-blur group/copy-button hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-200 hover:scale-110"
              :title="copySuccess ? '已复制' : '复制代码'">
              <Transition
                name="copy-icon"
                enter-active-class="transition-all duration-200"
                enter-from-class="opacity-0 scale-50 rotate-180"
                enter-to-class="opacity-100 scale-100 rotate-0"
                leave-active-class="transition-all duration-200"
                leave-from-class="opacity-100 scale-100 rotate-0"
                leave-to-class="opacity-0 scale-50 rotate-180">
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
              </Transition>
            </button>
          </div>
        </div>
      </div>

      <!-- Code Content -->
      <div class="rounded-[14px] dark:bg-[#121212] bg-white animate-expand-height">
        <div class="h-full">
          <div
            class="px-3 py-3.5 h-[200px] whitespace-pre border-gray-200 dark:border-gray-700 dark:text-gray-300 font-mono text-xs leading-5 animate-type-writer">
            <div v-html="highlightHtml" class="animate-fade-in-content"></div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
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
  console.log(props.result?.response)
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

<style scoped>
/* 自定义动画 */
@keyframes slide-in-header {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-delayed {
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  50% {
    opacity: 0;
    transform: translateX(-5px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in-buttons {
  0% {
    opacity: 0;
    transform: translateX(10px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes expand-height {
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 500px;
    opacity: 1;
  }
}

@keyframes type-writer {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 100%;
    opacity: 1;
  }
}

@keyframes fade-in-content {
  0% {
    opacity: 0;
    filter: blur(2px);
  }
  50% {
    opacity: 0.5;
    filter: blur(1px);
  }
  100% {
    opacity: 1;
    filter: blur(0);
  }
}

@keyframes pulse-once {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
    box-shadow: 0 0 15px currentColor;
  }
  100% {
    transform: scale(1);
  }
}

/* 应用动画类 */
.animate-slide-in-header {
  animation: slide-in-header 0.3s ease-out;
}

.animate-fade-in-delayed {
  animation: fade-in-delayed 0.4s ease-out 0.1s both;
}

.animate-fade-in-buttons {
  animation: fade-in-buttons 0.4s ease-out 0.2s both;
}

.animate-expand-height {
  animation: expand-height 0.4s ease-out 0.15s both;
  overflow: hidden;
}

.animate-type-writer {
  animation: type-writer 0.5s ease-out 0.3s both;
  overflow: hidden;
}

.animate-fade-in-content {
  animation: fade-in-content 0.4s ease-out 0.4s both;
}

.animate-pulse-once {
  animation: pulse-once 0.3s ease-out 0.05s;
}
</style>
