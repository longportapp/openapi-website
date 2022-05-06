import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// SDK with en locale -> en/sdk
// SDK with zh-CN locale -> SDK
export default function useLocalePrefix(path: string) {
  // normalize path
  let rawPath = path;
  if (path.startsWith('/')) {
    rawPath = path
      .split('/')
      .slice(1, path.split('/').length)
      .join('/');
  }

  // get locale from context
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  // compose locale prefix
  return currentLocale === 'zh-CN' ? rawPath : `${currentLocale}/${rawPath}`;
}

export const domainWithLocalPath = (domain: string, path: string) => {
  const localPath = useLocalePrefix(path);
  return [domain, localPath].join('/');
};
