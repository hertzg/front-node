function AccountPage_Page (getResourceUrl,
    username, session, editProfileListener,
    changePasswordListener, closeListener, signOutListener) {

    function checkChanges () {
        saveChangesButton.disabled =
            fullNameItem.getValue() === profile.fullName &&
            fullNameItem.getPrivacyValue() === profile.fullNamePrivacy &&
            emailItem.getValue() === profile.email &&
            emailItem.getPrivacyValue() === profile.emailPrivacy &&
            phoneItem.getValue() === profile.phone &&
            phoneItem.getPrivacyValue() === profile.phonePrivacy
    }

    function showError (_error) {

        fullNameItem.enable()
        emailItem.enable()
        phoneItem.enable()
        saveChangesButton.disabled = false
        saveChangesNode.nodeValue = 'Save Changes'

        error = _error
        form.insertBefore(error.element, fullNameItem.element)
        saveChangesButton.focus()

    }

    var error = null

    var classPrefix = 'AccountPage_Page'

    var closeButton = CloseButton(closeListener)

    var titleElement = document.createElement('div')
    titleElement.className = classPrefix + '-title'
    titleElement.appendChild(document.createTextNode(username))

    var profile = session.profile

    var fullNameItem = AccountPage_FullNameItem(getResourceUrl,
        profile, checkChanges, closeListener)

    var emailItem = AccountPage_EmailItem(getResourceUrl,
        profile, checkChanges, closeListener)

    var phoneItem = AccountPage_PhoneItem(getResourceUrl,
        profile, checkChanges, closeListener)

    var saveChangesNode = document.createTextNode('Save Changes')

    var saveChangesButton = document.createElement('button')
    saveChangesButton.disabled = true
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

        if (error !== null) {
            form.removeChild(error.element)
            error = null
        }

        var fullName = fullNameItem.getValue(),
            fullNamePrivacy = fullNameItem.getPrivacyValue(),
            email = emailItem.getValue(),
            emailPrivacy = emailItem.getPrivacyValue(),
            phone = phoneItem.getValue(),
            phonePrivacy = phoneItem.getPrivacyValue()

        fullNameItem.disable()
        emailItem.disable()
        phoneItem.disable()
        saveChangesButton.disabled = true
        saveChangesNode.nodeValue = 'Saving...'

        var url = 'data/editProfile' +
            '?token=' + encodeURIComponent(session.token) +
            '&fullName=' + encodeURIComponent(fullName) +
            '&fullNamePrivacy=' + encodeURIComponent(fullNamePrivacy) +
            '&email=' + encodeURIComponent(email) +
            '&emailPrivacy=' + encodeURIComponent(emailPrivacy) +
            '&phone=' + encodeURIComponent(phone) +
            '&phonePrivacy=' + encodeURIComponent(phonePrivacy)

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

            if (response !== true) {
                showError(CrashError())
                return
            }

            editProfileListener({
                fullName: fullName,
                fullNamePrivacy: fullNamePrivacy,
                email: email,
                emailPrivacy: emailPrivacy,
                phone: phone,
                phonePrivacy: phonePrivacy,
            })

        }

    })

    var changePasswordButton = document.createElement('button')
    changePasswordButton.className = classPrefix + '-changePasswordButton'
    changePasswordButton.appendChild(document.createTextNode('Change Password'))
    changePasswordButton.addEventListener('click', changePasswordListener)

    var frameElement = document.createElement('div')
    frameElement.className = classPrefix + '-frame'
    frameElement.appendChild(closeButton.element)
    frameElement.appendChild(titleElement)
    frameElement.appendChild(form)
    frameElement.appendChild(changePasswordButton)

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
        focus: fullNameItem.focus,
        editProfile: function (_profile) {
            profile = _profile
            checkChanges()
        }
        ,
    }

}
