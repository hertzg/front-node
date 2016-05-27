function WorkPage_SidePanel_Panel (data, getResourceUrl, accountListener,
    signOutListener, contactSelectListener, contactDeselectListener) {

    var title = WorkPage_SidePanel_Title(data, accountListener, signOutListener)

    var contactList = WorkPage_SidePanel_ContactList(getResourceUrl,
        contactSelectListener, contactDeselectListener)

    var element = document.createElement('div')
    element.className = 'WorkPage_SidePanel_Panel'
    element.appendChild(title.element)
    element.appendChild(contactList.element)

    return { element: element }

}
