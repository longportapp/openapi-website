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
  let path = domainWithLocalPath('https://open.longportapp.com', '')

  // local dev should redirect to /docs
  if (isDev) {
    path = defaultLocale === currentLocale ? '/docs' : `/${currentLocale}/docs`
  }

  useEffect(() => {
    window.location.href = path
  }, [])
  return null
}
export default IndexPageShouldRedirect
