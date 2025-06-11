import { createApiClient, type ApiConfig } from './http-client'

// ==================== 配置示例 ====================

const apiConfig: ApiConfig = {
  appKey: localStorage.getItem('appKey')!,
  accessToken: localStorage.getItem('accessToken')!,
  appSecret: localStorage.getItem('appSecret')!,
  // 可选配置
  baseUrl: import.meta.env.DEV ? '/api' : 'https://openapi.longportapp.com', // 默认值
  timeout: 30000, // 30 秒超时，默认值
}

export const request = createApiClient(apiConfig)
