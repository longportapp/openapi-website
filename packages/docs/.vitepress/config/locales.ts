import type { DefaultTheme, LocaleConfig } from 'vitepress'
import { enConfig } from '../locales/en'
import { zhCNConfig } from '../locales/zh-CN'

export const localesConfig: LocaleConfig<DefaultTheme.Config> = {
  'zh-CN': {
    label: '简体中文',
    lang: 'zh-CN',
    ...zhCNConfig,
  },
  root: {
    label: 'English',
    lang: 'en-US',
    ...enConfig,
  },
}
