function WorkPage_SidePanel_ContactList (getResourceUrl,
    selectListener, deselectListener, profileListener, removeListener) {

    function add (data) {
        var contact = WorkPage_SidePanel_Contact(getResourceUrl, data, function () {
            if (selectedContact !== null) {
                selectedContact.deselect()
                deselectListener(selectedContact)
            }
            selectedContact = contact
            selectListener(contact)
        }, function () {
            deselectListener(selectedContact)
            selectedContact = null
        }, function () {
            profileListener(contact)
        }, function () {
            removeListener(contact)
        })
        contentElement.appendChild(contact.element)
    }

    var selectedContact = null

    var classPrefix = 'WorkPage_SidePanel_ContactList'

    var emptyElement = document.createElement('div')
    emptyElement.className = classPrefix + '-empty'
    emptyElement.appendChild(document.createTextNode('You have no contacts'))

    var contentElement = document.createElement('div')
    contentElement.className = classPrefix + '-content'
//    contentElement.appendChild(emptyElement)
    add({
        fullName: 'Acle Kahney',
        username: 'acle.kahney',
        online: true,
    })
    add({
        fullName: 'Amos Williams',
        username: 'amos.williams',
        online: true,
    })
    add({
        fullName: 'James Monteith',
        username: 'james.monteith',
        online: false,
    })
    add({
        fullName: 'Jay Postones',
        username: 'jay.postones',
        online: true,
    })

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(contentElement)

    return { element: element }

}
