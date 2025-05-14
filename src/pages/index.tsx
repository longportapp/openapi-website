import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Loading from '@site/src/components/loading'
import { domainWithLocalPath } from '@site/src/utils/use-locale-prefix'
import React, { useEffect } from 'react'

const IndexPageShouldRedirect = () => {
  const {
    siteConfig: {
      customFields: { isDev },
    },
    i18n: { defaultLocale, currentLocale },
  } = useDocusaurusContext()
  
  useEffect(() => {
    window.location.href = isDev
      ? defaultLocale === currentLocale
        ? '/docs'
        : `/${currentLocale}/docs`
      : domainWithLocalPath(window.location.origin, '')
  }, [])
  return null
}
export default IndexPageShouldRedirect
