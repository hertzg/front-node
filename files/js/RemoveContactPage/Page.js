function RemoveContactPage_Page (username, session,
    removeListener, closeListener, signOutListener) {

    function showError (_error) {

        removeButton.disabled = false
        cancelButton.disabled = false
        removeNode.nodeValue = 'Remove Contact'

        error = _error
        frameElement.insertBefore(error.element, buttonsElement)
        removeButton.focus()

    }

    var error = null

    var classPrefix = 'RemoveContactPage_Page'

    var usernameElement = document.createElement('b')
    usernameElement.className = classPrefix + '-username'
    usernameElement.appendChild(document.createTextNode(username))

    var textElement = document.createElement('div')
    textElement.className = classPrefix + '-text'
    textElement.appendChild(document.createTextNode('Are you sure you want to remove "'))
    textElement.appendChild(usernameElement)
    textElement.appendChild(document.createTextNode('" from your contacts?'))

    var removeNode = document.createTextNode('Remove Contact')

    var removeButton = document.createElement('button')
    removeButton.className = classPrefix + '-removeButton'
    removeButton.appendChild(removeNode)
    removeButton.addEventListener('keydown', function (e) {
        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
        if (e.keyCode === 27) {
            e.preventDefault()
            closeListener()
        }
    })
    removeButton.addEventListener('click', function () {

        if (error !== null) {
            frameElement.removeChild(error.element)
            error = null
        }

        removeButton.disabled = true
        cancelButton.disabled = true
        removeNode.nodeValue = 'Removing...'

        var url = 'data/removeContact' +
            '?token=' + encodeURIComponent(session.token) +
            '&username=' + encodeURIComponent(username)

        var request = new XMLHttpRequest
        request.open('get', url)
        request.send()
        request.onerror = function () {
            showError(ConnectionError())
        }
        request.onload = function () {

            if (request.status !== 200) {
                showError(ServiceError())
                return
            }

            try {
                var response = JSON.parse(request.response)
            } catch (e) {
                showError(CrashError())
                return
            }

            if (response === 'INVALID_TOKEN') {
                signOutListener()
                return
            }

            if (response !== true) {
                showError(CrashError())
                return
            }

            removeListener()

        }

    })

    var cancelButton = document.createElement('button')
    cancelButton.className = classPrefix + '-cancelButton'
    cancelButton.appendChild(document.createTextNode('Cancel'))
    cancelButton.addEventListener('click', closeListener)

    var buttonsElement = document.createElement('div')
    buttonsElement.className = classPrefix + '-buttons'
    buttonsElement.appendChild(removeButton)
    buttonsElement.appendChild(cancelButton)

    var frameElement = document.createElement('div')
    frameElement.className = classPrefix + '-frame'
    frameElement.appendChild(textElement)
    frameElement.appendChild(buttonsElement)

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
            removeButton.focus()
        },
    }

}
