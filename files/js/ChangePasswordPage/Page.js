function ChangePasswordPage_Page (session,
    backListener, closeListener, signOutListener) {

    function enableItems () {
        currentPasswordItem.enable()
        newPasswordItem.enable()
        repeatNewPasswordItem.enable()
        button.disabled = false
    }

    var classPrefix = 'ChangePasswordPage_Page'

    var closeButton = CloseButton(closeListener)

    var backButton = BackButton(backListener)

    var titleElement = document.createElement('h1')
    titleElement.className = classPrefix + '-title'
    titleElement.appendChild(document.createTextNode('Change Password'))

    var currentPasswordItem = ChangePasswordPage_CurrentPasswordItem()

    var newPasswordItem = ChangePasswordPage_NewPasswordItem()

    var repeatNewPasswordItem = ChangePasswordPage_RepeatNewPasswordItem()

    var button = document.createElement('button')
    button.className = classPrefix + '-button'
    button.appendChild(document.createTextNode('Save'))

    var form = document.createElement('form')
    form.className = classPrefix + '-form'
    form.appendChild(currentPasswordItem.element)
    form.appendChild(newPasswordItem.element)
    form.appendChild(repeatNewPasswordItem.element)
    form.appendChild(button)
    form.addEventListener('submit', function (e) {

        e.preventDefault()

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

        var url = 'data/changePassword' +
            '?token=' + encodeURIComponent(session.token) +
            '&currentPassword=' + encodeURIComponent(currentPassword) +
            '&newPassword=' + encodeURIComponent(newPassword)

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

            if (response === 'INVALID_CURRENT_PASSWORD') {
                enableItems()
                currentPasswordItem.showError(function (errorElement) {
                    errorElement.appendChild(document.createTextNode('The password is incorrect.'))
                })
                return
            }

            if (response !== true) {
                enableItems()
                console.log(response)
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
