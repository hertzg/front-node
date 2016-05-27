function WorkPage_SidePanel_ContactList (getResourceUrl,
    selectListener, deselectListener, profileListener) {

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
        })
        element.appendChild(contact.element)
    }

    var selectedContact = null

    var classPrefix = 'WorkPage_SidePanel_ContactList'

    var emptyElement = document.createElement('div')
    emptyElement.className = classPrefix + '-empty'
    emptyElement.appendChild(document.createTextNode('You have no contacts'))

    var element = document.createElement('div')
    element.className = classPrefix
    add({
        displayName: 'Acle Kahney',
        username: 'acle.kahney',
    })
    add({
        displayName: 'Amos Williams',
        username: 'amos.williams',
    })
    add({
        displayName: 'James Monteith',
        username: 'james.monteith',
    })
    add({
        displayName: 'Jay Postones',
        username: 'jay.postones',
    })
//    element.appendChild(emptyElement)

    return { element: element }

}
