function ServiceErrorPage_Page (getResourceUrl, reloadListener) {

    var classPrefix = 'ServiceErrorPage_Page'

    var text = 'There is a problem at Bazgu. We are fixing it.' +
        ' Reload the page to see if it\'s resolved.'

    var textElement = document.createElement('div')
    textElement.className = classPrefix + '-text'
    textElement.appendChild(document.createTextNode(text))

    var buttonNode = document.createTextNode('Reload')

    var button = document.createElement('button')
    button.className = classPrefix + '-button'
    button.appendChild(buttonNode)
    button.addEventListener('click', function () {
        button.disabled = true
        buttonNode.nodeValue = 'Reloading...'
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
