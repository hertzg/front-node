function PublicProfilePage_FullNameItem (profile) {

    var classPrefix = 'PublicProfilePage_Fields-item'

    var labelElement = document.createElement('span')
    labelElement.className = classPrefix + '-label'
    labelElement.appendChild(document.createTextNode('Full name: '))

    var valueElement = document.createElement('span')
    valueElement.className = classPrefix + '-value'
    valueElement.appendChild(document.createTextNode(profile.fullName))

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(labelElement)
    element.appendChild(valueElement)

    return { element: element }

}
