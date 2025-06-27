import { createApiClient, type ApiConfig } from './http-client'

export interface DynamicAuthConfig {
  appKey: string
  accessToken: string
  appSecret: string
}

/**
 * 创建动态 Request 客户端
 * 支持动态传入认证参数
 *
 * @param authConfig 认证配置信息
 * @param options 可选的额外配置
 * @returns API 客户端实例
 *
 * @example
 * ```typescript
 * // 创建动态客户端
 * const dynamicClient = createDynamicRequest({
 *   appKey: 'your-app-key',
 *   accessToken: 'your-access-token',
 *   appSecret: 'your-app-secret'
 * })
 *
 * // 使用客户端发送请求
 * const response = await dynamicClient.get('/v1/asset/account')
 * ```
 */
export function createDynamicRequest(
  authConfig: DynamicAuthConfig,
  options?: Partial<Pick<ApiConfig, 'baseUrl' | 'timeout'>>
) {
  const config: ApiConfig = {
    appKey: authConfig.appKey,
    accessToken: authConfig.accessToken,
    appSecret: authConfig.appSecret,
    baseUrl:
      options?.baseUrl ||
      (import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE_URL || 'https://openapi.longportapp.com'),
    timeout: options?.timeout || 30000,
  }

  return createApiClient(config)
}

/**
 * 快速创建 Request 方法
 * 更简洁的 API，直接传入认证参数即可使用
 *
 * @param appKey 应用密钥
 * @param accessToken 访问令牌
 * @param appSecret 应用密钥
 * @param options 可选的额外配置
 * @returns API 客户端实例
 *
 * @example
 * ```typescript
 * // 直接传入参数创建客户端
 * const client = createQuickRequest('key', 'token', 'secret')
 *
 * // 发送请求
 * const response = await client.post('/v1/trade/order', { symbol: 'AAPL.US' })
 * ```
 */
export function createQuickRequest(
  appKey: string,
  accessToken: string,
  appSecret: string,
  options?: Partial<Pick<ApiConfig, 'baseUrl' | 'timeout'>>
) {
  return createDynamicRequest({ appKey, accessToken, appSecret }, options)
}
