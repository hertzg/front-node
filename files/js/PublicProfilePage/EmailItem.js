function PublicProfilePage_EmailItem (profile) {

    var classPrefix = 'PublicProfilePage_Field'

    var labelElement = document.createElement('span')
    labelElement.className = classPrefix + '-label'
    labelElement.appendChild(document.createTextNode('Email: '))

    var valueElement = document.createElement('span')
    valueElement.className = classPrefix + '-value'
    valueElement.appendChild(document.createTextNode(profile.email))

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(labelElement)
    element.appendChild(valueElement)

    return { element: element }

}
