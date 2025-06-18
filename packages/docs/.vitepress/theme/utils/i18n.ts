// 从路径中取得当前语言

const supportedLanguages = ['en', 'zh-CN', 'zh-HK']

export function getCurrentLanguage() {
  // 检查是否在浏览器环境中
  if (typeof window === 'undefined') {
    return 'en' // 在服务端渲染时返回默认语言
  }

  const path = window.location.pathname
  const lang = path.split('/')[1]

  if (supportedLanguages.includes(lang)) {
    return lang
  }
  return 'en'
}
