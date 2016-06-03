function CrashPage_Page (getResourceUrl, reloadListener) {

    var classPrefix = 'CrashPage_Page'

    var textElement = document.createElement('div')
    textElement.className = classPrefix + '-text'
    textElement.appendChild(document.createTextNode('Something went wrong. Reloading may fix the problem.'))

    var button = document.createElement('button')
    button.className = classPrefix + '-button'
    button.appendChild(document.createTextNode('Reload'))
    button.addEventListener('click', () => {
        button.disabled = true
        reloadListener()
    })

    var frameElement = document.createElement('div')
    frameElement.className = classPrefix + '-frame'
    frameElement.appendChild(textElement)
    frameElement.appendChild(button)

    var alignerElement = document.createElement('div')
    alignerElement.className = classPrefix + '-aligner'

    var element = document.createElement('div')
    element.className = classPrefix
    element.style.backgroundImage =
        'url(' + getResourceUrl('img/grass.svg') + '),' +
        ' url(' + getResourceUrl('img/clouds.svg') + ')'
    element.appendChild(alignerElement)
    element.appendChild(frameElement)

    return { element: element }

}
