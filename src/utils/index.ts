import Cookies from 'js-cookie'

export function getBasenameLocale() {
  // TODO: 需要更多条件获取上下文，暂时定死
  const invalidLocaleRegexResult = (typeof window === 'undefined' ? '' : window.location.pathname).match(/^\/(zh-CN|en|zh-HK)\/?/)
  return invalidLocaleRegexResult?.[1]
}
export function getDefaultLocale() {
  const cookieLocale = Cookies.get('locale')

  return getBasenameLocale() || cookieLocale || 'zh-CN'
}
