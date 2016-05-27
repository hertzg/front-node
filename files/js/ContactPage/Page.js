function ContactPage_Page (data, getResourceUrl, closeListener) {

    var classPrefix = 'ContactPage_Page'

    var closeButton = CloseButton(closeListener)

    var fullNameItem = ContactPage_FullNameItem()

    var emailItem = ContactPage_EmailItem()

    var phoneItem = ContactPage_PhoneItem()

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
    form.addEventListener('submit', function () {})

    var frameElement = document.createElement('div')
    frameElement.className = classPrefix + '-frame'
    frameElement.appendChild(closeButton.element)
    frameElement.appendChild(titleElement)
    frameElement.appendChild(form)

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(frameElement)

    return { element: element }

}
