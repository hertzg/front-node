function ContactRequestPage_Page (data, closeListener) {

    var classPrefix = 'ContactRequestPage_Page'

    var fullNameItem = ContactRequestPage_FullNameItem(data)

    var emailItem = ContactRequestPage_EmailItem(data)

    var phoneItem = ContactRequestPage_PhoneItem(data)

    var titleElement = document.createElement('div')
    titleElement.className = classPrefix + '-title'
    titleElement.appendChild(document.createTextNode(data.username))

    var textElement = document.createElement('div')
    textElement.className = classPrefix + '-text'
    textElement.appendChild(document.createTextNode('The user has added you to his/her contacts. Would you like to add him/her to you contacts?'))

    var yesButton = document.createElement('button')
    yesButton.className = classPrefix + '-yesButton'
    yesButton.appendChild(document.createTextNode('Add Contact'))

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

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(frameElement)
    element.addEventListener('click', function (e) {
        if (e.button !== 0) return
        if (e.target === element) closeListener()
    })

    return { element: element }

}
