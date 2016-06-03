function ContactRequestPage_Page (session, username,
    profile, addContactListener, ignoreListener, closeListener,
    signOutListener, crashListener, serviceErrorListener) {

    function disableItems () {
        addContactButton.disabled = true
        ignoreButton.disabled = true
    }

    function enableItems () {
        addContactButton.disabled = false
        ignoreButton.disabled = false
    }

    var classPrefix = 'ContactRequestPage_Page'

    var fullNameItem = ContactRequestPage_FullNameItem(profile)

    var emailItem = ContactRequestPage_EmailItem(profile)

    var phoneItem = ContactRequestPage_PhoneItem(profile)

    var closeButton = CloseButton(closeListener)

    var titleElement = document.createElement('div')
    titleElement.className = classPrefix + '-title'
    titleElement.appendChild(document.createTextNode(username))

    var textElement = document.createElement('div')
    textElement.className = classPrefix + '-text'
    textElement.appendChild(document.createTextNode('The user has added you to his/her contacts. Would you like to add him/her to your contacts?'))

    var addContactButton = document.createElement('button')
    addContactButton.className = classPrefix + '-addContactButton'
    addContactButton.appendChild(document.createTextNode('Add Contact'))
    addContactButton.addEventListener('click', function () {

        disableItems()

        var url = 'data/addContact?token=' + encodeURIComponent(session.token) +
            '&username=' + encodeURIComponent(username) +
            '&fullName=' + encodeURIComponent(profile.fullName) +
            '&email=' + encodeURIComponent(profile.email) +
            '&phone=' + encodeURIComponent(profile.phone)

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

            addContactListener(response)

        }

    })

    var ignoreButton = document.createElement('button')
    ignoreButton.className = classPrefix + '-ignoreButton'
    ignoreButton.appendChild(document.createTextNode('Ignore'))
    ignoreButton.addEventListener('click', function () {

        disableItems()

        var url = 'data/ignoreRequest' +
            '?token=' + encodeURIComponent(session.token) +
            '&username=' + encodeURIComponent(username)

        var request = new XMLHttpRequest
        request.open('get', url)
        request.send()
        request.onerror = enableItems
        request.onload = function () {

            if (request.status !== 200) {
                enableItems()
                console.log(request.responseText)
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

            ignoreListener(response)

        }

    })

    var frameElement = document.createElement('div')
    frameElement.className = classPrefix + '-frame'
    frameElement.appendChild(closeButton.element)
    frameElement.appendChild(titleElement)
    frameElement.appendChild(fullNameItem.element)
    frameElement.appendChild(emailItem.element)
    frameElement.appendChild(phoneItem.element)
    frameElement.appendChild(textElement)
    frameElement.appendChild(addContactButton)
    frameElement.appendChild(ignoreButton)

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

    return { element: element }

}
