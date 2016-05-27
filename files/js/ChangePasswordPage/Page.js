function ChangePasswordPage_Page (backListener, closeListener) {

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

    var frameElement = document.createElement('div')
    frameElement.className = classPrefix + '-frame'
    frameElement.appendChild(closeButton.element)
    frameElement.appendChild(backButton.element)
    frameElement.appendChild(titleElement)
    frameElement.appendChild(form)

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(frameElement)
    element.addEventListener('click', function (e) {
        if (e.button !== 0) return
        if (e.target === element) closeListener()
    })

    return { element: element }

}
