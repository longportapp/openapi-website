/**
 * Longbridge OpenAPI 使用示例
 * 演示如何使用 HTTP API 和 WebSocket 客户端
 */

import { createApiClient, type ApiConfig, type ApiResponse } from './http-client'

// ==================== 配置示例 ====================

const apiConfig: ApiConfig = {
  appKey: process.env.APP_KEY!,
  accessToken: process.env.ACCESS_TOKEN!,
  appSecret: process.env.APP_SECRET!,
  // 可选配置
  baseUrl: 'https://openapi.longportapp.com', // 默认值
  timeout: 30000, // 30 秒超时，默认值
}

// ==================== HTTP API 使用示例 ====================

async function httpApiExamples() {
  // 创建 API 客户端
  const apiClient = createApiClient(apiConfig)

  try {
    // 1. 测试连接
    console.log('=== 测试连接 ===')
    const testResult = await apiClient.test()
    console.log('测试结果：', testResult)

    // 2. GET 请求示例 - 获取股票持仓
    console.log('=== 获取股票持仓 ===')
    const stockPositions = await apiClient.get('/v1/asset/stock', {
      symbol: '700.HK',
    })
    console.log('股票持仓：', stockPositions)

    // 3. GET 请求示例 - 获取多只股票
    console.log('=== 获取多只股票持仓 ===')
    const multipleStocks = await apiClient.get('/v1/asset/stock', {
      symbol: ['700.HK', 'BABA.US'],
    })
    console.log('多只股票持仓：', multipleStocks)

    // 4. POST 请求示例 - 委托下单
    console.log('=== 委托下单 ===')
    const orderResult = await apiClient.post('/v1/trade/order', {
      side: 'Buy',
      symbol: '700.HK',
      order_type: 'LO',
      submitted_price: '50',
      submitted_quantity: '200',
      time_in_force: 'Day',
      remark: 'Hello from TypeScript API',
    })
    console.log('下单结果：', orderResult)

    // 5. 带泛型的类型安全示例
    interface StockPosition {
      symbol: string
      quantity: number
      market_value: number
      cost_price: number
    }

    const typedResult = await apiClient.get<StockPosition[]>('/v1/asset/stock')
    if (typedResult.code === 0 && typedResult.data) {
      console.log('/v1/asset/stock', typedResult.data)
    }

    // 6. 错误处理示例
    console.log('=== 错误处理示例 ===')
    try {
      await apiClient.get('/v1/invalid/endpoint')
    } catch (error) {
      console.error('API 调用失败：', error)
    }
  } catch (error) {
    console.error('HTTP API 示例执行失败：', error)
  }
}

// ==================== React/Vue 组件中的使用示例 ====================

// React Hook 示例
export function useApiClient() {
  const apiClient = createApiClient(apiConfig)
  return apiClient
}

// ==================== 工具函数示例 ====================

/**
 * 检查 API 响应是否成功
 */
export function isApiSuccess<T>(response: ApiResponse<T>): response is ApiResponse<T> & { data: T } {
  return response.code === 0 && response.data !== undefined
}

/**
 * 处理 API 错误
 */
export function handleApiError(response: ApiResponse): never {
  throw new Error(`API 错误 [${response.code}]: ${response.msg}`)
}

/**
 * 安全调用 API 的包装器
 */
export async function safeApiCall<T>(apiCall: () => Promise<ApiResponse<T>>): Promise<T | null> {
  try {
    const response = await apiCall()
    if (isApiSuccess(response)) {
      return response.data
    } else {
      console.error('API 调用失败：', response)
      return null
    }
  } catch (error) {
    console.error('API 调用异常：', error)
    return null
  }
}

// ==================== 导出示例函数 ====================

httpApiExamples()
