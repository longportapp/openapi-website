<template>
  <BaseForm
    :title="$t('authorization.title')"
    :fields="authFields"
    :initial-data="initialAuthData"
    :default-collapsed="true"
    :uischema-options="uischemaOptions"
    @form-change="onAuthChange">
    <template #title-actions>
      <button
        v-if="!initialAuthData"
        class="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg transition-colors duration-200"
        @click="handleCreateClick">
        {{ $t('authorization.createButton') }}
      </button>
    </template>
  </BaseForm>
</template>

<script setup lang="ts">
import BaseForm from './BaseForm.vue'
import { computed } from 'vue'

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

// 定义 mock_app_auth 的类型
interface MockAppAuth {
  access_key_id: string
  access_key_secret: string
  token: string
  expired_at?: string
}

// 从 localStorage 的 mock_app_auth 获取初始数据
const initialAuthData = computed(() => {
  if (typeof window !== 'undefined') {
    try {
      const mockData = window.localStorage.getItem('mock_app_auth')
      if (mockData) {
        const mock = JSON.parse(mockData) as MockAppAuth
        return {
          appKey: mock?.access_key_id || '',
          accessToken: mock?.token || '',
          appSecret: mock?.access_key_secret || '',
        }
      }
    } catch (error) {
      console.warn('Failed to parse mock_app_auth from localStorage:', error)
    }
  }
})

// 处理授权信息变化
const onAuthChange = (data: Record<string, any>) => {
  emit('auth-change', data)
}

// 处理立即创建按钮点击
const handleCreateClick = () => {
  // 这里可以添加创建授权信息的逻辑
  // 比如跳转到创建页面或显示创建弹窗
  window.open('https://open.longbridgeapp.com/', '_blank')
}
</script>
