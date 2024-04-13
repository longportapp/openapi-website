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
    await loadScript('https://assets.lbkrs.com/uploads/e6eebe73-a777-4dc5-b682-a80db1af5554/highlight.js')
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
