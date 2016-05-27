function WorkPage_SidePanel_ContactList (getResourceUrl) {

    function add (data) {
        var contact = WorkPage_SidePanel_Contact(getResourceUrl, data, function () {
            if (selectedContact !== null) selectedContact.deselect()
            selectedContact = contact
        }, function () {
            selectedContact = null
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
    add({ displayName: 'Acle Kahney' })
    add({ displayName: 'Amos Williams' })
    add({ displayName: 'James Monteith' })
    add({ displayName: 'Jay Postones' })
//    element.appendChild(emptyElement)

    return { element: element }

}
