// 从路径中取得当前语言

const supportedLanguages = ['en', 'zh-CN', 'zh-HK']

export function getCurrentLanguage() {
  const path = window.location.pathname
  const lang = path.split('/')[1]

  if (supportedLanguages.includes(lang)) {
    return lang
  }
  return 'en'
}
