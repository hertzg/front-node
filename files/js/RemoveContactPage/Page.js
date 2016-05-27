function RemoveContactPage_Page (data, closeListener) {

    var classPrefix = 'RemoveContactPage_Page'

    var usernameElement = document.createElement('b')
    usernameElement.className = classPrefix + '-username'
    usernameElement.appendChild(document.createTextNode(data.username))

    var textElement = document.createElement('div')
    textElement.className = classPrefix + '-text'
    textElement.appendChild(document.createTextNode('Are you sure you want to remove "'))
    textElement.appendChild(usernameElement)
    textElement.appendChild(document.createTextNode('" from your contacts?'))

    var yesButton = document.createElement('button')
    yesButton.className = classPrefix + '-yesButton'
    yesButton.appendChild(document.createTextNode('Remove Contact'))

    var noButton = document.createElement('button')
    noButton.className = classPrefix + '-noButton'
    noButton.appendChild(document.createTextNode('Cancel'))
    noButton.addEventListener('click', closeListener)

    var frameElement = document.createElement('div')
    frameElement.className = classPrefix + '-frame'
    frameElement.appendChild(textElement)
    frameElement.appendChild(yesButton)
    frameElement.appendChild(noButton)

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(frameElement)
    element.addEventListener('click', function (e) {
        if (e.button !== 0) return
        if (e.target === element) closeListener()
    })

    return { element: element }

}
