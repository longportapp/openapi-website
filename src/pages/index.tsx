import React, { useEffect } from 'react';
import { domainWithLocalPath } from '@site/src/utils/use-locale-prefix';
import Loading from '@site/src/components/loading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const IndexPageShouldRedirect = () => {
  const {
    siteConfig: {
      customFields: { isDev },
    },
    i18n: { defaultLocale, currentLocale },
  } = useDocusaurusContext();
  let path = domainWithLocalPath('https://open.longbridgeapp.com', '');

  // local dev should redirect to /docs
  if (isDev) {
    path = defaultLocale === currentLocale ? '/docs' : `/${currentLocale}/docs`;
  }

  useEffect(() => {
    window.location.href = path;
  }, []);
  return <Loading />;
};
export default IndexPageShouldRedirect;
