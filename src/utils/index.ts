import Cookies from 'js-cookie'

export function getBasenameLocale() {
  const invalidLocaleRegexResult = window.location.pathname.match(/^\/(zh-CN|en|zh-HK)\/?/)
  return invalidLocaleRegexResult?.[1]
}
export function getDefaultLocale() {
  const cookieLocale = Cookies.get('locale')

  return getBasenameLocale() || cookieLocale || 'zh-CN'
}
