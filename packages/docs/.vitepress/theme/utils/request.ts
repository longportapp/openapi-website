import { createApiClient, type ApiConfig } from './http-client'

// ==================== 配置示例 ====================

const getLocalStorage = (key: string) => {
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
  baseUrl: import.meta.env.DEV ? '/api' : 'https://openapi.longportapp.com', // 默认值
  timeout: 30000, // 30 秒超时，默认值
}

export const request = createApiClient(apiConfig)
