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
    await loadScript('https://assets.lbctrl.com/uploads/98caf63d-9898-4b20-a7ec-85c2af21e517/index.umd.js')
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
