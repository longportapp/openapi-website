<template>
  <button
    class="inline-flex items-center justify-center px-3 h-9 text-white font-medium rounded-xl mouse-pointer disabled:opacity-70 hover:opacity-80 gap-1.5 bg-[#2AB673]"
    @click="test">
    Try It
  </button>
</template>
<script setup lang="ts">
import type { OpenApiInfo, ParameterRow } from '../../types'

interface Props {
  method?: string
  url?: string
  parameters?: ParameterRow[]
}

const props = withDefaults(defineProps<Props>(), {
  method: 'GET',
  url: '',
  parameters: () => [],
})

import { request } from '../utils/request'

const test = async () => {
  console.log('API Info:', {
    method: props.method,
    url: props.url,
    parameters: props.parameters,
  })

  // 这里可以实现实际的 API 调用逻辑
  // 例如：
  // try {
  //   const response = await request({
  //     method: props.method,
  //     url: props.url,
  //     // 根据 parameters 构造请求参数
  //   })
  //   console.log('Response:', response)
  // } catch (error) {
  //   console.error('Request failed:', error)
  // }
}
</script>
