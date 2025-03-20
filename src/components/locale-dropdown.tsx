import React, { FC, useMemo } from 'react'
import { useBasenameLocale, useDefaultLocale } from '@site/src/utils'
import { loadHighlight } from '@site/src/utils/highlight'
import Dropdown from './dropdown'
import useIsBrowser from '@docusaurus/useIsBrowser'

let prePath = ''

export const LocaleDropdown: FC = () => {
  const items = useMemo(() => {
    return [
      {
        label: 'English',
        shortLabel: 'EN',
        value: 'en',
      },
      {
        label: '简体中文',
        shortLabel: '简',
        value: 'zh-CN',
      },
      {
        label: '繁体中文',
        shortLabel: '繁',
        value: 'zh-HK',
      },
    ]
  }, [])

  const locale = useDefaultLocale()
  const pathLocale = useBasenameLocale()
  const onChange = (value: string) => {
    let pathname = location.pathname
    if (pathLocale) {
      pathname = pathname.replace(`/${pathLocale}`, `/${value}`)
    } else {
      pathname = `/${value}${pathname}`
    }
    pathname = pathname.replace('/en', '')
    const url = new URL(location.href)
    url.pathname = pathname
    location.href = url.toString()
  }

  const isBrowser = useIsBrowser()
  if (isBrowser && prePath !== location.pathname) {
    loadHighlight()
    prePath = location.pathname
  }

  return <Dropdown className="navbar__item hidden-in-mobile-sidebar" items={items} value={locale} onChange={onChange} />
}
