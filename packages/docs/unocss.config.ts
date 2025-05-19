import { defineConfig, presetWind3, type ExtractorContext, transformerDirectives, presetWind4 } from 'unocss'
import extractorMdc from '@unocss/extractor-mdc'

const customExtractor = {
  name: 'tabs-extractor',
  extract: (ctx: ExtractorContext) => {
    const matches = ctx.code.matchAll(/::: tabs key:[^\s]+{(\.[^}]+)}/g)
    const classes = []
    for (const match of matches) {
      const classPart = match[1] // 提取 {.bg-red} 中的 .bg-red
      if (classPart) {
        classes.push(classPart.slice(1)) // 去掉前面的点，得到 bg-red
      }
    }
    return classes
  },
}

export default defineConfig({
  presets: [presetWind3()],
  extractors: [extractorMdc(), customExtractor],
  transformers: [transformerDirectives()],
})
