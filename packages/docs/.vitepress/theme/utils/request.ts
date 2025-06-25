import { createApiClient, type ApiConfig } from './http-client'

// ==================== 配置示例 ====================

export const getLocalStorage = (key: string) => {
  if (typeof window === 'undefined') {
    return ''
  }
  return window.localStorage.getItem(key)
}

const apiConfig: ApiConfig = {
  appKey: getLocalStorage('appKey')!,
  accessToken: getLocalStorage('accessToken')!,
  appSecret: getLocalStorage('appSecret')!,
  // 可选配置
  baseUrl: import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE_URL || 'https://openapi.longportapp.com', // 支持环境变量配置
  timeout: 30000, // 30 秒超时，默认值
}

export const request = createApiClient(apiConfig)
