function ContactRequestPage_PhoneItem (profile) {

    var classPrefix = 'ContactRequestPage_Field'

    var labelElement = document.createElement('span')
    labelElement.className = classPrefix + '-label'
    labelElement.appendChild(document.createTextNode('Phone: '))

    var valueElement = document.createElement('span')
    valueElement.className = classPrefix + '-value'
    valueElement.appendChild(document.createTextNode(profile.phone))

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(labelElement)
    element.appendChild(valueElement)

    return { element: element }

}
