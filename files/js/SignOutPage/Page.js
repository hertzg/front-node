function SignOutPage_Page (confirmListener, closeListener) {

    var classPrefix = 'SignOutPage_Page'

    var textElement = document.createElement('div')
    textElement.className = classPrefix + '-text'
    textElement.appendChild(document.createTextNode('Are you sure'))
    textElement.appendChild(document.createElement('br'))
    textElement.appendChild(document.createTextNode('you want to sign out?'))

    var yesButton = document.createElement('button')
    yesButton.className = classPrefix + '-yesButton'
    yesButton.appendChild(document.createTextNode('Sign Out'))
    yesButton.addEventListener('click', confirmListener)

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
