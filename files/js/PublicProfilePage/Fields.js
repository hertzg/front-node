function PublicProfilePage_Fields (profile) {

    var fullNameEmpty = profile.fullName === '',
        emailEmpty = profile.email === '',
        phoneEmpty = profile.phone === ''

    var element = document.createElement('div')
    element.className = 'PublicProfilePage_Fields'
    if (!fullNameEmpty) {
        var fullNameItem = PublicProfilePage_FullNameItem(profile)
        element.appendChild(fullNameItem.element)
    }
    if (!emailEmpty) {
        var emailItem = PublicProfilePage_EmailItem(profile)
        element.appendChild(emailItem.element)
    }
    if (!phoneEmpty) {
        var phoneItem = PublicProfilePage_PhoneItem(profile)
        element.appendChild(phoneItem.element)
    }
    if (fullNameEmpty && emailEmpty && phoneEmpty) {
        var emptyElement = document.createElement('div')
        emptyElement.className = 'PublicProfilePage_Fields-empty'
        emptyElement.appendChild(document.createTextNode('No more information available'))
        element.appendChild(emptyElement)
    }

    return { element: element }

}
