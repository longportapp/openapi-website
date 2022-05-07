import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Cookies from 'js-cookie';

export function getValidLocale(locale: string) {
  if (/(zh-CN|en|zh-HK)/.test(locale)) {
    return locale;
  }

  return 'zh-CN';
}

export function useBasenameLocale() {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  if (typeof window === 'undefined') {
    return currentLocale;
  }
  const invalidLocaleRegexResult = window.location.pathname.match(/^\/(zh-CN|en|zh-HK)\/?/);
  return invalidLocaleRegexResult?.[1];
}
export function useDefaultLocale() {
  const cookieLocale = Cookies.get('locale');

  return getValidLocale(useBasenameLocale() || cookieLocale || 'zh-CN');
}
export function getRootDomain(hostname: string) {
  const siteArr = hostname.split('.');
  // 取最后两个
  const rootDomain = siteArr.slice(-2).join('.');

  return rootDomain;
}
