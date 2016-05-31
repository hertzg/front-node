function WorkPage_SidePanel_Panel (username, session, getResourceUrl,
    accountListener, signOutListener, addContactListener, contactSelectListener,
    contactDeselectListener, contactProfileListener, contactRemoveListener) {

    var classPrefix = 'WorkPage_SidePanel_Panel'

    var addContactButton = document.createElement('div')
    addContactButton.className = classPrefix + '-addContactButton'
    addContactButton.appendChild(document.createTextNode('Add Contact'))
    addContactButton.addEventListener('click', addContactListener)

    var title = WorkPage_SidePanel_Title(username, session, accountListener, signOutListener)

    var contactList = WorkPage_SidePanel_ContactList(session, getResourceUrl, function (contact) {
        contactSelectListener(contact)
        classList.add('chatOpen')
    }, function (contact) {
        contactDeselectListener(contact)
        classList.remove('chatOpen')
    }, contactProfileListener, contactRemoveListener)

    var element = document.createElement('div')
    element.className = classPrefix
    element.style.backgroundImage = 'url(' + getResourceUrl('img/light-grass.svg') + ')'
    element.appendChild(addContactButton)
    element.appendChild(title.element)
    element.appendChild(contactList.element)

    var classList = element.classList

    return {
        addContact: contactList.addContact,
        editProfile: title.editProfile,
        element: element,
        getContact: contactList.getContact,
        removeContact: contactList.removeContact,
    }

}
