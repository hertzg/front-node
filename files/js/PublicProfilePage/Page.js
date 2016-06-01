function PublicProfilePage_Page (session, username, data, addContactListener,
    backListener, closeListener, signOutListener, crashListener) {

    function enableItems () {
        button.disabled = false
    }

    var backButton = BackButton(backListener)

    var closeButton = CloseButton(closeListener)

    var classPrefix = 'PublicProfilePage_Page'

    var fullNameItem = PublicProfilePage_FullNameItem(data)

    var emailItem = PublicProfilePage_EmailItem(data)

    var phoneItem = PublicProfilePage_PhoneItem(data)

    var titleElement = document.createElement('div')
    titleElement.className = classPrefix + '-title'
    titleElement.appendChild(document.createTextNode(username))

    var button = document.createElement('button')
    button.className = classPrefix + '-button'
    button.appendChild(document.createTextNode('Add Contact'))
    button.addEventListener('click', function () {

        var url = 'data/addContact?token=' + encodeURIComponent(session.token) +
            '&username=' + username + '&fullName=' + data.fullName +
            '&email=' + data.email + '&phone=' + data.phone

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

            addContactListener(data)

        }

    })

    var frameElement = document.createElement('div')
    frameElement.className = classPrefix + '-frame'
    frameElement.appendChild(backButton.element)
    frameElement.appendChild(closeButton.element)
    frameElement.appendChild(titleElement)
    frameElement.appendChild(fullNameItem.element)
    frameElement.appendChild(emailItem.element)
    frameElement.appendChild(phoneItem.element)
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

    return { element: element }

}
