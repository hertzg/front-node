function ContactPage_Page (session, username, profile,
    overrideProfile, overrideProfileListener, closeListener,
    signOutListener, crashListener, serviceErrorListener) {

    var classPrefix = 'ContactPage_Page'

    var closeButton = CloseButton(closeListener)

    var titleElement = document.createElement('div')
    titleElement.className = classPrefix + '-title'
    titleElement.appendChild(document.createTextNode(username))

    var fullNameItem = ContactPage_FullNameItem(profile, overrideProfile, closeListener)

    var emailItem = ContactPage_EmailItem(profile, overrideProfile)

    var phoneItem = ContactPage_PhoneItem(profile, overrideProfile)

    var saveChangesNode = document.createTextNode('Save Changes')

    var saveChangesButton = document.createElement('button')
    saveChangesButton.className = classPrefix + '-saveChangesButton'
    saveChangesButton.appendChild(saveChangesNode)

    var form = document.createElement('form')
    form.className = classPrefix + '-form'
    form.appendChild(fullNameItem.element)
    form.appendChild(emailItem.element)
    form.appendChild(phoneItem.element)
    form.appendChild(saveChangesButton)
    form.addEventListener('submit', function (e) {

        e.preventDefault()

        var fullName = fullNameItem.getValue()
        var email = emailItem.getValue()
        var phone = phoneItem.getValue()

        fullNameItem.disable()
        emailItem.disable()
        phoneItem.disable()
        saveChangesButton.disabled = true
        saveChangesNode.nodeValue = 'Saving...'

        var url = 'data/overrideContactProfile' +
            '?token=' + encodeURIComponent(session.token) +
            '&username=' + encodeURIComponent(username) +
            '&fullName=' + encodeURIComponent(fullName) +
            '&email=' + encodeURIComponent(email) +
            '&phone=' + encodeURIComponent(phone)

        var request = new XMLHttpRequest
        request.open('get', url)
        request.send()
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

            if (response !== true) {
                crashListener()
                return
            }

            overrideProfileListener({
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
