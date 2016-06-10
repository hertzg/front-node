function AddContactPage_Page (username, userFoundListener, closeListener) {

    function showError (_error) {

        usernameItem.enable()
        button.disabled = false
        buttonNode.nodeValue = 'Find User'

        error = _error
        form.insertBefore(error.element, button)
        button.focus()

    }

    var error = null

    var classPrefix = 'AddContactPage_Page'

    var closeButton = CloseButton(closeListener)

    var titleElement = document.createElement('h1')
    titleElement.className = classPrefix + '-title'
    titleElement.appendChild(document.createTextNode('Add Contact'))

    var usernameItem = AddContactPage_UsernameItem(username, closeListener)

    var buttonNode = document.createTextNode('Find User')

    var button = document.createElement('button')
    button.className = classPrefix + '-button'
    button.appendChild(buttonNode)

    var form = document.createElement('form')
    form.appendChild(usernameItem.element)
    form.appendChild(button)
    form.addEventListener('submit', function (e) {

        e.preventDefault()
        usernameItem.clearError()

        if (error !== null) {
            form.removeChild(error.element)
            error = null
        }

        var username = usernameItem.getValue()
        if (username === null) return

        usernameItem.disable()
        button.disabled = true
        buttonNode.nodeValue = 'Finding...'

        var url = 'data/publicProfile?username=' + encodeURIComponent(username)

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
                var response = JSON.parse(request.responseText)
            } catch (e) {
                showError(CrashError())
                return
            }

            if (response === 'INVALID_USERNAME') {
                usernameItem.enable()
                button.disabled = false
                buttonNode.nodeValue = 'Find User'
                usernameItem.showError(function (errorElement) {
                    errorElement.appendChild(document.createTextNode('There is no such user.'))
                })
                return
            }

            userFoundListener(username, response)

        }

    })

    var frameElement = document.createElement('div')
    frameElement.className = classPrefix + '-frame'
    frameElement.appendChild(closeButton.element)
    frameElement.appendChild(titleElement)
    frameElement.appendChild(form)

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
        focus: usernameItem.focus,
    }

}
