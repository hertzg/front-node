function WorkPage_SidePanel_Panel (getResourceUrl, accountListener, signOutListener) {

    var title = WorkPage_SidePanel_Title(accountListener, signOutListener)

    var contactList = WorkPage_SidePanel_ContactList(getResourceUrl)

    var element = document.createElement('div')
    element.className = 'WorkPage_SidePanel_Panel'
    element.appendChild(title.element)
    element.appendChild(contactList.element)

    return { element: element }

}
