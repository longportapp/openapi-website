import { isServer } from './i18n'

export const logoLink = () => {
  return {
    link: `https://longbridge.${!isServer() && location.host.includes('cn') ? 'cn' : 'com'}`,
    target: '_self',
  }
}
