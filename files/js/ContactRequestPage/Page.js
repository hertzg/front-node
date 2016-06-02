function ContactRequestPage_Page (session, username,
    profile, addContactListener, closeListener) {

    function enableItems () {
        yesButton.disabled = false
    }

    var classPrefix = 'ContactRequestPage_Page'

    var fullNameItem = ContactRequestPage_FullNameItem(profile)

    var emailItem = ContactRequestPage_EmailItem(profile)

    var phoneItem = ContactRequestPage_PhoneItem(profile)

    var titleElement = document.createElement('div')
    titleElement.className = classPrefix + '-title'
    titleElement.appendChild(document.createTextNode(username))

    var textElement = document.createElement('div')
    textElement.className = classPrefix + '-text'
    textElement.appendChild(document.createTextNode('The user has added you to his/her contacts. Would you like to add him/her to your contacts?'))

    var yesButton = document.createElement('button')
    yesButton.className = classPrefix + '-yesButton'
    yesButton.appendChild(document.createTextNode('Add Contact'))
    yesButton.addEventListener('click', function () {

        var url = 'data/addContact?token=' + encodeURIComponent(session.token) +
            '&username=' + encodeURIComponent(username) +
            '&fullName=' + encodeURIComponent(profile.fullName) +
            '&email=' + encodeURIComponent(profile.email) +
            '&phone=' + encodeURIComponent(profile.phone)

        yesButton.disabled = true

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

            addContactListener(response)

        }

    })

    var noButton = document.createElement('button')
    noButton.className = classPrefix + '-noButton'
    noButton.appendChild(document.createTextNode('Ignore'))
    noButton.addEventListener('click', closeListener)

    var frameElement = document.createElement('div')
    frameElement.className = classPrefix + '-frame'
    frameElement.appendChild(titleElement)
    frameElement.appendChild(fullNameItem.element)
    frameElement.appendChild(emailItem.element)
    frameElement.appendChild(phoneItem.element)
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

    return { element: element }

}
