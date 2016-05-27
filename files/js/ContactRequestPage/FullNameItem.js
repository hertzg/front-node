function ContactRequestPage_FullNameItem (data) {

    var classPrefix = 'ContactRequestPage_Field'

    var labelElement = document.createElement('span')
    labelElement.className = classPrefix + '-label'
    labelElement.appendChild(document.createTextNode('Full name: '))

    var valueElement = document.createElement('span')
    valueElement.className = classPrefix + '-value'
    valueElement.appendChild(document.createTextNode(data.fullName))

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(labelElement)
    element.appendChild(valueElement)

    return { element: element }

}
