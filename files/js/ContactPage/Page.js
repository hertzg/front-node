function ContactPage_Page (session, username, data,
    editContactListener, closeListener, signOutListener) {

    function enableItems () {
        fullNameItem.enable()
        emailItem.enable()
        phoneItem.enable()
        saveProfileButton.disabled = false
    }

    var classPrefix = 'ContactPage_Page'

    var closeButton = CloseButton(closeListener)

    var fullNameItem = ContactPage_FullNameItem(data)

    var emailItem = ContactPage_EmailItem(data)

    var phoneItem = ContactPage_PhoneItem(data)

    var titleElement = document.createElement('div')
    titleElement.className = classPrefix + '-title'
    titleElement.appendChild(document.createTextNode(username))

    var saveProfileButton = document.createElement('button')
    saveProfileButton.className = classPrefix + '-saveProfileButton'
    saveProfileButton.appendChild(document.createTextNode('Save Changes'))

    var form = document.createElement('form')
    form.className = classPrefix + '-form'
    form.appendChild(fullNameItem.element)
    form.appendChild(emailItem.element)
    form.appendChild(phoneItem.element)
    form.appendChild(saveProfileButton)
    form.addEventListener('submit', function (e) {

        e.preventDefault()

        var fullName = fullNameItem.getValue()
        var email = emailItem.getValue()
        var phone = phoneItem.getValue()

        fullNameItem.disable()
        emailItem.disable()
        phoneItem.disable()
        saveProfileButton.disabled = true

        var url = 'data/editContact' +
            '?token=' + encodeURIComponent(session.token) +
            '&username=' + encodeURIComponent(username) +
            '&fullName=' + encodeURIComponent(fullName) +
            '&email=' + encodeURIComponent(email) +
            '&phone=' + encodeURIComponent(phone)

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

            var response = JSON.parse(request.responseText)

            if (response === 'INVALID_TOKEN') {
                signOutListener()
                return
            }

            if (response !== true) {
                enableItems()
                console.log(response)
                return
            }

            editContactListener({
                fullName: fullName,
                email: email,
                phone: phone,
            })

        }

    })

    var frameElement = document.createElement('div')
    frameElement.className = classPrefix + '-frame'
    frameElement.appendChild(closeButton.element)
    frameElement.appendChild(titleElement)
    frameElement.appendChild(form)

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(frameElement)
    element.addEventListener('click', function (e) {
        if (e.button !== 0) return
        if (e.target === element) closeListener()
    })

    return {
        element: element,
        focus: fullNameItem.focus,
    }

}
