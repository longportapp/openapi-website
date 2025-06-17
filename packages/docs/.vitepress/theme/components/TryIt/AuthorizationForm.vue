<template>
  <BaseForm
    :title="$t('authorization.title')"
    :fields="authFields"
    :initial-data="initialAuthData"
    :default-collapsed="true"
    :uischema-options="uischemaOptions"
    @form-change="onAuthChange" />
</template>

<script setup lang="ts">
import BaseForm from './BaseForm.vue'
import { computed } from 'vue'
import { getLocalStorage } from '../../utils/request'

// 定义事件
const emit = defineEmits<{
  'auth-change': [data: Record<string, any>]
}>()

// 授权字段定义
const authFields = computed(() => [
  {
    name: 'appKey',
    type: 'string',
    description: 'Application Key',
    required: true,
  },
  {
    name: 'accessToken',
    type: 'string',
    description: 'Access Token',
    required: true,
  },
  {
    name: 'appSecret',
    type: 'string',
    description: 'Application Secret',
    required: true,
  },
])

const uischemaOptions = computed(() => ({
  accessToken: {
    type: 'password',
  },
  appSecret: {
    type: 'password',
  },
}))

// 从本地存储获取初始数据
const initialAuthData = computed(() => ({
  appKey: getLocalStorage('appKey') || '',
  accessToken: getLocalStorage('accessToken') || '',
  appSecret: getLocalStorage('appSecret') || '',
}))

// 处理授权信息变化
const onAuthChange = (data: Record<string, any>) => {
  emit('auth-change', data)
}
</script>
