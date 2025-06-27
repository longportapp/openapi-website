export const isServer = () => typeof window === 'undefined'

export function getBasenameLocale() {
  if (isServer()) return undefined
  const invalidLocaleRegexResult = window.location.pathname.match(/^\/(zh-CN|en|zh-HK)\/?/)
  return invalidLocaleRegexResult?.[1] || ''
}

export const localePath = (path: string) => {
  if (isServer()) {
    return path
  }

  if (!path.startsWith('/') && !path.startsWith('./') && !path.startsWith('../')) {
    return path
  }

  const locale = getBasenameLocale()
  return locale ? `/${locale}${path}` : path
}

// 从路径中取得当前语言

const supportedLanguages = ['en', 'zh-CN', 'zh-HK']

export function getCurrentLanguage() {
  const lang = getBasenameLocale() || 'en'
  if (supportedLanguages.includes(lang)) {
    return lang
  }
  return 'en'
}
