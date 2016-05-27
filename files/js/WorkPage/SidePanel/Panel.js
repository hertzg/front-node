function WorkPage_SidePanel_Panel (data, getResourceUrl, accountListener,
    signOutListener, contactSelectListener, contactDeselectListener, contactProfileListener) {

    var title = WorkPage_SidePanel_Title(data, accountListener, signOutListener)

    var contactList = WorkPage_SidePanel_ContactList(getResourceUrl, function (contact) {
        contactSelectListener(contact)
        classList.add('chatOpen')
    }, function (contact) {
        contactDeselectListener(contact)
        classList.remove('chatOpen')
    }, contactProfileListener)

    var element = document.createElement('div')
    element.className = 'WorkPage_SidePanel_Panel'
    element.appendChild(title.element)
    element.appendChild(contactList.element)

    var classList = element.classList

    return { element: element }

}
