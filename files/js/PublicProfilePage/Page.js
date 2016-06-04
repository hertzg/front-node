function PublicProfilePage_Page (session, username,
    profile, addContactListener, backListener, closeListener,
    signOutListener, crashListener, serviceErrorListener) {

    function enableItems () {
        button.disabled = false
    }

    var backButton = BackButton(backListener)

    var closeButton = CloseButton(closeListener)

    var classPrefix = 'PublicProfilePage_Page'

    var titleElement = document.createElement('div')
    titleElement.className = classPrefix + '-title'
    titleElement.appendChild(document.createTextNode(username))

    var button = document.createElement('button')
    button.className = classPrefix + '-button'
    button.appendChild(document.createTextNode('Add Contact'))
    button.addEventListener('click', function () {

        var url = 'data/addContact?token=' + encodeURIComponent(session.token) +
            '&username=' + encodeURIComponent(username) +
            '&fullName=' + encodeURIComponent(profile.fullName) +
            '&email=' + encodeURIComponent(profile.email) +
            '&phone=' + encodeURIComponent(profile.phone)

        button.disabled = true

        var request = new XMLHttpRequest
        request.open('get', url)
        request.send()
        request.onerror = enableItems
        request.onload = function () {

            if (request.status !== 200) {
                serviceErrorListener()
                return
            }

            try {
                var response = JSON.parse(request.responseText)
            } catch (e) {
                crashListener()
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

    var frameElement = document.createElement('div')
    frameElement.className = classPrefix + '-frame'
    frameElement.appendChild(backButton.element)
    frameElement.appendChild(closeButton.element)
    frameElement.appendChild(titleElement)
    if (profile.fullName !== '') {
        var fullNameItem = PublicProfilePage_FullNameItem(profile)
        frameElement.appendChild(fullNameItem.element)
    }
    if (profile.email !== '') {
        var emailItem = PublicProfilePage_EmailItem(profile)
        frameElement.appendChild(emailItem.element)
    }
    if (profile.phone !== '') {
        var phoneItem = PublicProfilePage_PhoneItem(profile)
        frameElement.appendChild(phoneItem.element)
    }
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
