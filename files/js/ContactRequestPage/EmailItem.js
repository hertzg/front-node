function ContactRequestPage_EmailItem (profile) {

    var value = profile.email

    var classPrefix = 'ContactRequestPage_Field'

    var labelElement = document.createElement('span')
    labelElement.className = classPrefix + '-label'
    labelElement.appendChild(document.createTextNode('Email: '))

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
            value = profile.email
            if (value === '') classList.add('hidden')
            else classList.remove('hidden')
            valueNode.nodeValue = value
        },
    }

}
