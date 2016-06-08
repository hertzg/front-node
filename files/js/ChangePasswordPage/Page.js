function ChangePasswordPage_Page (session, backListener,
    closeListener, signOutListener, crashListener, serviceErrorListener) {

    var classPrefix = 'ChangePasswordPage_Page'

    var closeButton = CloseButton(closeListener)

    var backButton = BackButton(backListener)

    var titleElement = document.createElement('h1')
    titleElement.className = classPrefix + '-title'
    titleElement.appendChild(document.createTextNode('Change Password'))

    var currentPasswordItem = ChangePasswordPage_CurrentPasswordItem(backListener)

    var newPasswordItem = ChangePasswordPage_NewPasswordItem(backListener)

    var repeatNewPasswordItem = ChangePasswordPage_RepeatNewPasswordItem(backListener)

    var buttonNode = document.createTextNode('Save')

    var button = document.createElement('button')
    button.className = classPrefix + '-button'
    button.appendChild(buttonNode)

    var form = document.createElement('form')
    form.className = classPrefix + '-form'
    form.appendChild(currentPasswordItem.element)
    form.appendChild(newPasswordItem.element)
    form.appendChild(repeatNewPasswordItem.element)
    form.appendChild(button)
    form.addEventListener('submit', function (e) {

        e.preventDefault()
        currentPasswordItem.clearError()
        newPasswordItem.clearError()
        repeatNewPasswordItem.clearError()

        var currentPassword = currentPasswordItem.getValue()
        if (currentPassword === null) return

        var newPassword = newPasswordItem.getValue()
        if (newPassword === null) return

        var repeatNewPassword = repeatNewPasswordItem.getValue(newPassword)
        if (repeatNewPassword === null) return

        currentPasswordItem.disable()
        newPasswordItem.disable()
        repeatNewPasswordItem.disable()
        button.disabled = true
        buttonNode.nodeValue = 'Saving...'

        var url = 'data/changePassword' +
            '?token=' + encodeURIComponent(session.token) +
            '&currentPassword=' + encodeURIComponent(currentPassword) +
            '&newPassword=' + encodeURIComponent(newPassword)

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

            if (response === 'INVALID_CURRENT_PASSWORD') {
                currentPasswordItem.enable()
                newPasswordItem.enable()
                repeatNewPasswordItem.enable()
                button.disabled = false
                buttonNode.nodeValue = 'Save'
                currentPasswordItem.showError(function (errorElement) {
                    errorElement.appendChild(document.createTextNode('The password is incorrect.'))
                })
                return
            }

            if (response !== true) {
                crashListener()
                return
            }

            closeListener()

        }

    })

    var frameElement = document.createElement('div')
    frameElement.className = classPrefix + '-frame'
    frameElement.appendChild(closeButton.element)
    frameElement.appendChild(backButton.element)
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
        focus: currentPasswordItem.focus,
    }

}
