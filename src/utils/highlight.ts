export const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src
    document.body.appendChild(script)
    script.onload = resolve
    script.onerror = reject
  })
}

let highlightIsLoaded = false
export const loadHighlight = async () => {
  if (!highlightIsLoaded) {
    await loadScript('https://assets.lbkrs.com/uploads/4a9226b9-d604-438f-a485-ef62d34bc4d3/highlight.js')
  }
  highlightIsLoaded = true
  const xHighlights = document.querySelectorAll('.doc-highlight')
  xHighlights.forEach((xHighlight) => {
    document.body.removeChild(xHighlight)
  })

  setTimeout(() => {
    const newHighlightDom = document.createElement('x-highlight')
    newHighlightDom.setAttribute('container', `[class^='docMainContainer']`)
    newHighlightDom.className = 'doc-highlight'

    document.body.appendChild(newHighlightDom)
  }, 0)
}
