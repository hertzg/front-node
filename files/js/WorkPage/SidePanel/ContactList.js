function WorkPage_SidePanel_ContactList (session, getResourceUrl,
    selectListener, deselectListener, profileListener, removeListener) {

    function add (username, data) {
        var contact = WorkPage_SidePanel_Contact(getResourceUrl, username, data, function () {
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

    ;(function () {
        var empty = true
        var contacts = session.user.contacts
        for (var i in contacts) {
            empty = false
            add(i, contacts[i])
        }
        if (empty) contentElement.appendChild(emptyElement)
    })()

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(contentElement)

    return { element: element }

}
