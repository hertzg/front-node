function ContactRequestPage_Fields (profile) {

    var fullNameItem = ContactRequestPage_FullNameItem(profile)

    var emailItem = ContactRequestPage_EmailItem(profile)

    var phoneItem = ContactRequestPage_PhoneItem(profile)

    var emptyElement = document.createElement('div')
    emptyElement.className = 'ContactRequestPage_Fields-empty'
    emptyElement.appendChild(document.createTextNode('No more information available'))

    var emptyClassList = emptyElement.classList
    if (profile.fullName !== '' || profile.email !== '' || profile.phone !== '') {
        emptyClassList.add('hidden')
    }

    var element = document.createElement('div')
    element.className = 'ContactRequestPage_Fields'
    element.appendChild(fullNameItem.element)
    element.appendChild(emailItem.element)
    element.appendChild(phoneItem.element)
    element.appendChild(emptyElement)

    return {
        element: element,
        edit: function (profile) {

            fullNameItem.edit(profile)
            emailItem.edit(profile)
            phoneItem.edit(profile)

            if (profile.fullName === '' && profile.email === '' && profile.phone === '') {
                emptyClassList.remove('hidden')
            } else {
                emptyClassList.add('hidden')
            }

        },
    }

}
