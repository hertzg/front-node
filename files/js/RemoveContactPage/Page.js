function RemoveContactPage_Page (username, session, removeListener,
    closeListener, signOutListener, crashListener, serviceErrorListener) {

    var classPrefix = 'RemoveContactPage_Page'

    var usernameElement = document.createElement('b')
    usernameElement.className = classPrefix + '-username'
    usernameElement.appendChild(document.createTextNode(username))

    var textElement = document.createElement('div')
    textElement.className = classPrefix + '-text'
    textElement.appendChild(document.createTextNode('Are you sure you want to remove "'))
    textElement.appendChild(usernameElement)
    textElement.appendChild(document.createTextNode('" from your contacts?'))

    var yesButton = document.createElement('button')
    yesButton.className = classPrefix + '-yesButton'
    yesButton.appendChild(document.createTextNode('Remove Contact'))
    yesButton.addEventListener('click', function () {

        yesButton.disabled = true
        noButton.disabled = true

        var url = 'data/removeContact' +
            '?token=' + encodeURIComponent(session.token) +
            '&username=' + encodeURIComponent(username)

        var request = new XMLHttpRequest
        request.open('get', url)
        request.send()
        request.onload = function () {

            if (request.status !== 200) {
                serviceErrorListener()
                return
            }

            try {
                var response = JSON.parse(request.response)
            } catch (e) {
                crashListener()
                return
            }

            if (response === 'INVALID_TOKEN') {
                signOutListener()
                return
            }

            if (response !== true) {
                crashListener()
                return
            }

            removeListener()

        }

    })

    var noButton = document.createElement('button')
    noButton.className = classPrefix + '-noButton'
    noButton.appendChild(document.createTextNode('Cancel'))
    noButton.addEventListener('click', closeListener)

    var frameElement = document.createElement('div')
    frameElement.className = classPrefix + '-frame'
    frameElement.appendChild(textElement)
    frameElement.appendChild(yesButton)
    frameElement.appendChild(noButton)

    var alignerElement = document.createElement('div')
    alignerElement.className = classPrefix + '-aligner'

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(alignerElement)
    element.appendChild(frameElement)
    element.addEventListener('click', function (e) {
        if (e.button !== 0) return
        if (e.target === element) closeListener()
    })

    return {
        element: element,
        focus: function () {
            yesButton.focus()
        },
    }

}
