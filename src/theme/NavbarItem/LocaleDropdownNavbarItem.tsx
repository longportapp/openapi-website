import React, { useEffect } from 'react'
import { LocaleDropdown } from '@site/src/components/locale-dropdown'
import { useBasenameLocale, useDefaultLocale } from '@site/src/utils'


export default () => {
  const pathLocale = useBasenameLocale()
  const locale = useDefaultLocale()

  useEffect(() => {
    // 默认为中文，cookie 中有别的语言设置，进行跳转
    if (!pathLocale) {
      if (locale !== 'zh-CN') {
        const url = new URL(location.href)
        url.pathname = `/${locale}${url.pathname}`
        location.href = url.toString()
      }
    }
  }, [])

  return <LocaleDropdown />
}
