function AccountPage_Page (data, getResourceUrl, closeListener, changePasswordListener) {

    var classPrefix = 'AccountPage_Page'

    var closeButton = CloseButton(closeListener)

    var fullNameItem = AccountPage_FullNameItem()

    var emailItem = AccountPage_EmailItem()

    var phoneItem = AccountPage_PhoneItem()

    var titleElement = document.createElement('div')
    titleElement.className = classPrefix + '-title'
    titleElement.style.backgroundImage = 'url(' + getResourceUrl('img/icon/32.svg') + ')'
    titleElement.appendChild(document.createTextNode(data.username))

    var saveProfileButton = document.createElement('button')
    saveProfileButton.className = classPrefix + '-saveProfileButton'
    saveProfileButton.appendChild(document.createTextNode('Save Changes'))

    var form = document.createElement('form')
    form.className = classPrefix + '-form'
    form.appendChild(fullNameItem.element)
    form.appendChild(emailItem.element)
    form.appendChild(phoneItem.element)
    form.appendChild(saveProfileButton)
    form.addEventListener('submit', function () {
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

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(frameElement)
    element.addEventListener('click', function (e) {
        if (e.button !== 0) return
        if (e.target === element) closeListener()
    })

    return { element: element }

}
