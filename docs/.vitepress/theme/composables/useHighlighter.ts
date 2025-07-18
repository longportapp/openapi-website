import { provide } from 'vue'
import { createHighlighter } from 'shiki/bundle/web'

export function useHighlighter() {
  const highlighter = createHighlighter({
    themes: ['vitesse-dark', 'vitesse-light'],
    langs: ['json'],
  })

  // 提供全局的代码高亮器
  provide('highlighter', highlighter)

  return {
    highlighter,
  }
}
