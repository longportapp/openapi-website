import React, { FC, useState, useMemo } from 'react'
import { useBasenameLocale, useDefaultLocale, getRootDomain } from '@site/src/utils'
import Cookies from 'js-cookie'
import Dropdown from './dropdown'

export const LocaleDropdown: FC = () => {
  // 为了方便复制粘贴，就不用组件了
  const items = useMemo(() => {
    return [
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
      {
        label: 'English',
        shortLabel: 'EN',
        value: 'en',
      },
    ]
  }, [])
  const [locale, setLocale] = useState(useDefaultLocale())
  const pathLocale = useBasenameLocale()
  const onChange = (value: string) => {
    Cookies.set('locale', value, {
      domain: getRootDomain(location.hostname),
      expires: 7,
    })
    setLocale(value)
    let pathname = location.pathname
    if (pathLocale) {
      pathname = pathname.replace(`/${pathLocale}`, `/${value}`)
    } else {
      pathname = `/${value}${pathname}`
    }
    pathname = pathname.replace('/zh-CN', '')
    const url = new URL(location.href)
    url.pathname = pathname
    location.href = url.toString()
  }

  return <Dropdown className="hidden-in-mobile-sidebar" items={items} value={locale} onChange={onChange} />
}
