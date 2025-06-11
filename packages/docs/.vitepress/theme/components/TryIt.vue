<template>
  <button
    class="flex items-center justify-center px-3 h-9 text-white font-medium rounded-xl mouse-pointer disabled:opacity-70 hover:opacity-80 gap-1.5 bg-[#2AB673]"
    @click="test">
    Try It
  </button>
</template>
<script setup lang="ts">
interface Props {
  method: 'get' | 'post' | 'put' | 'delete'
  path: string
  params: Record<string, any>
}

const props = defineProps<Props>()

import { request } from '../utils/request'

const test = async () => {
  const examples = await request[props.method](props.path, props.params)
  console.log(examples)
}
</script>
