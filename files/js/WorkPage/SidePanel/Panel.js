function WorkPage_SidePanel_Panel (sentFiles, receivedFiles, username, session, getResourceUrl,
    accountListener, confirmSignOutListener, addContactListener, contactSelectListener,
    contactDeselectListener, contactProfileListener, contactRemoveListener,
    signOutListener, crashListener, serviceErrorListener) {

    var classPrefix = 'WorkPage_SidePanel_Panel'

    var addContactButton = document.createElement('button')
    addContactButton.className = classPrefix + '-addContactButton'
    addContactButton.appendChild(document.createTextNode('Add Contact'))
    addContactButton.addEventListener('click', addContactListener)

    var title = WorkPage_SidePanel_Title(username,
        session, accountListener, confirmSignOutListener)

    var contactList = WorkPage_SidePanel_ContactList(sentFiles, receivedFiles, username, session, getResourceUrl, function (contact) {
        contactSelectListener(contact)
        classList.add('chatOpen')
    }, function (contact) {
        contactDeselectListener(contact)
        classList.remove('chatOpen')
    }, contactProfileListener, contactRemoveListener,
        signOutListener, crashListener, serviceErrorListener)

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
        offline: contactList.offline,
        online: contactList.online,
        receiveFileMessage: contactList.receiveFileMessage,
        receiveTextMessage: contactList.receiveTextMessage,
        removeContact: contactList.removeContact,
        sendFileMessage: contactList.sendFileMessage,
        sendTextMessage: contactList.sendTextMessage,
        disable: function () {
            addContactButton.disabled = true
            title.disable()
        },
        enable: function () {
            addContactButton.disabled = false
            title.enable()
        },
    }

}
