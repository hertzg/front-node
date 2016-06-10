function PublicProfilePage_Page (session, username, profile,
    addContactListener, backListener, closeListener, signOutListener) {

    function showError (_error) {

        button.disabled = false

        error = _error
        frameElement.insertBefore(error.element, button)
        button.focus()

    }

    var error = null

    var backButton = BackButton(backListener)

    var closeButton = CloseButton(closeListener)

    var classPrefix = 'PublicProfilePage_Page'

    var titleElement = document.createElement('div')
    titleElement.className = classPrefix + '-title'
    titleElement.appendChild(document.createTextNode(username))

    var button = document.createElement('button')
    button.className = classPrefix + '-button'
    button.appendChild(document.createTextNode('Add Contact'))
    button.addEventListener('keydown', function (e) {
        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
        if (e.keyCode === 27) {
            e.preventDefault()
            closeListener()
        }
    })
    button.addEventListener('click', function () {

        if (error !== null) {
            frameElement.removeChild(error.element)
            error = null
        }

        var url = 'data/addContact' +
            '?token=' + encodeURIComponent(session.token) +
            '&username=' + encodeURIComponent(username) +
            '&fullName=' + encodeURIComponent(profile.fullName) +
            '&email=' + encodeURIComponent(profile.email) +
            '&phone=' + encodeURIComponent(profile.phone)

        button.disabled = true

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

            if (response === 'INVALID_TOKEN') {
                signOutListener()
                return
            }

            if (response === 'CONTACT_ALREADY_ADDED') {
                closeListener()
                return
            }

            addContactListener(response)

        }

    })

    var fields = PublicProfilePage_Fields(profile)

    var frameElement = document.createElement('div')
    frameElement.className = classPrefix + '-frame'
    frameElement.appendChild(backButton.element)
    frameElement.appendChild(closeButton.element)
    frameElement.appendChild(titleElement)
    frameElement.appendChild(fields.element)
    frameElement.appendChild(button)

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
            button.focus()
        },
    }

}
