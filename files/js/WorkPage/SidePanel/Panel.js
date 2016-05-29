function WorkPage_SidePanel_Panel (username, session, getResourceUrl,
    accountListener, signOutListener, contactSelectListener,
    contactDeselectListener, contactProfileListener, contactRemoveListener) {

    var title = WorkPage_SidePanel_Title(username, session, accountListener, signOutListener)

    var contactList = WorkPage_SidePanel_ContactList(getResourceUrl, function (contact) {
        contactSelectListener(contact)
        classList.add('chatOpen')
    }, function (contact) {
        contactDeselectListener(contact)
        classList.remove('chatOpen')
    }, contactProfileListener, contactRemoveListener)

    var element = document.createElement('div')
    element.className = 'WorkPage_SidePanel_Panel'
    element.style.backgroundImage = 'url(' + getResourceUrl('img/light-grass.svg') + ')'
    element.appendChild(title.element)
    element.appendChild(contactList.element)

    var classList = element.classList

    return { element: element }

}
