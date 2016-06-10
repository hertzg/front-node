function ContactRequestPage_Page (session, username, profile,
    addContactListener, ignoreListener, closeListener, signOutListener) {

    function clearError () {
        if (error === null) return
        frameElement.removeChild(error.element)
        error = null
    }

    function disableItems () {
        addContactButton.disabled = true
        ignoreButton.disabled = true
    }

    function showAddError (error) {
        showError(error)
        addContactNode.nodeValue = 'Add Contact'
        addContactButton.focus()
    }

    function showError (_error) {
        addContactButton.disabled = false
        ignoreButton.disabled = false
        error = _error
        frameElement.insertBefore(error.element, buttonsElement)
    }

    function showIgnoreError (error) {
        showError(error)
        ignoreNode.nodeValue = 'Ignore'
        ignoreButton.focus()
    }

    var error = null

    var classPrefix = 'ContactRequestPage_Page'

    var closeButton = CloseButton(closeListener)

    var titleElement = document.createElement('div')
    titleElement.className = classPrefix + '-title'
    titleElement.appendChild(document.createTextNode(username))

    var text = 'The user has added you to his/her contacts.' +
        ' Would you like to add him/her to your contacts?'

    var textElement = document.createElement('div')
    textElement.className = classPrefix + '-text'
    textElement.appendChild(document.createTextNode(text))

    var addContactNode = document.createTextNode('Add Contact')

    var addContactButton = document.createElement('button')
    addContactButton.className = classPrefix + '-addContactButton'
    addContactButton.appendChild(addContactNode)
    addContactButton.addEventListener('click', function () {

        clearError()
        disableItems()
        addContactNode.nodeValue = 'Adding...'

        var url = 'data/addContact' +
            '?token=' + encodeURIComponent(session.token) +
            '&username=' + encodeURIComponent(username) +
            '&fullName=' + encodeURIComponent(profile.fullName) +
            '&email=' + encodeURIComponent(profile.email) +
            '&phone=' + encodeURIComponent(profile.phone)

        var request = new XMLHttpRequest
        request.open('get', url)
        request.send()
        request.onerror = function () {
            showAddError(ConnectionError())
        }
        request.onload = function () {

            if (request.status !== 200) {
                showAddError(ServiceError())
                return
            }

            try {
                var response = JSON.parse(request.responseText)
            } catch (e) {
                showAddError(CrashError())
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

    var ignoreNode = document.createTextNode('Ignore')

    var ignoreButton = document.createElement('button')
    ignoreButton.className = classPrefix + '-ignoreButton'
    ignoreButton.appendChild(ignoreNode)
    ignoreButton.addEventListener('click', function () {

        clearError()
        disableItems()
        ignoreNode.nodeValue = 'Ignoring...'

        var url = 'data/ignoreRequest' +
            '?token=' + encodeURIComponent(session.token) +
            '&username=' + encodeURIComponent(username)

        var request = new XMLHttpRequest
        request.open('get', url)
        request.send()
        request.onerror = function () {
            showIgnoreError(ConnectionError())
        }
        request.onload = function () {

            if (request.status !== 200) {
                showIgnoreError(ServiceError())
                return
            }

            try {
                var response = JSON.parse(request.responseText)
            } catch (e) {
                showIgnoreError(CrashError())
                return
            }

            if (response === 'INVALID_TOKEN') {
                signOutListener()
                return
            }

            ignoreListener(response)

        }

    })

    var fields = ContactRequestPage_Fields(profile)

    var buttonsElement = document.createElement('div')
    buttonsElement.className = classPrefix + '-buttons'
    buttonsElement.appendChild(addContactButton)
    buttonsElement.appendChild(ignoreButton)

    var frameElement = document.createElement('div')
    frameElement.className = classPrefix + '-frame'
    frameElement.appendChild(closeButton.element)
    frameElement.appendChild(titleElement)
    frameElement.appendChild(fields.element)
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
        edit: function (_profile) {
            profile = _profile
            fields.edit(profile)
        },
    }

}
