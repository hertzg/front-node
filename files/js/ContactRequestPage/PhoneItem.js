function ContactRequestPage_PhoneItem (profile) {

    var value = profile.phone

    var classPrefix = 'ContactRequestPage_Fields-item'

    var labelElement = document.createElement('span')
    labelElement.className = classPrefix + '-label'
    labelElement.appendChild(document.createTextNode('Phone: '))

    var valueNode = document.createTextNode(value)

    var valueElement = document.createElement('span')
    valueElement.className = classPrefix + '-value'
    valueElement.appendChild(valueNode)

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(labelElement)
    element.appendChild(valueElement)

    var classList = element.classList
    if (value === '') classList.add('hidden')

    return {
        element: element,
        edit: function (profile) {
            value = profile.phone
            if (value === '') classList.add('hidden')
            else classList.remove('hidden')
            valueNode.nodeValue = value
        },
    }

}
