function WorkPage_SidePanel_ContactList (session, getResourceUrl,
    selectListener, deselectListener, profileListener, removeListener) {

    function addContact (username, contactData) {
        var contact = WorkPage_SidePanel_Contact(getResourceUrl, session, username, contactData, function () {
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
        contacts[username] = contact
        numContacts++
    }

    var numContacts = 0
    var contacts = Object.create(null)

    var selectedContact = null

    var classPrefix = 'WorkPage_SidePanel_ContactList'

    var emptyElement = document.createElement('div')
    emptyElement.className = classPrefix + '-empty'
    emptyElement.appendChild(document.createTextNode('You have no contacts'))

    var contentElement = document.createElement('div')
    contentElement.className = classPrefix + '-content'
    ;(function () {
        var contacts = session.contacts
        for (var i in contacts) addContact(i, contacts[i])
    })()
    if (numContacts === 0) contentElement.appendChild(emptyElement)

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(contentElement)

    return {
        element: element,
        addContact: function (username, contactData) {
            if (numContacts === 0) contentElement.removeChild(emptyElement)
            addContact(username, contactData)
        },
        getContact: function (username) {
            return contacts[username]
        },
        offline: function (username) {
            var contact = contacts[username]
            if (contact === undefined) return
            contact.offline()
        },
        online: function (username) {
            var contact = contacts[username]
            if (contact === undefined) return
            contact.online()
        },
        receiveTextMessage: function (username, text) {

            var contact = contacts[username]
            if (contact === undefined) return

            contact.receiveTextMessage(text)

            if (selectedContact === null) {
                selectedContact = contact
                selectListener(contact)
            }

        },
        removeContact: function (contact) {
            if (contact === selectedContact) {
                selectedContact.deselect()
                deselectListener(selectedContact)
                selectedContact = null
            }
            contentElement.removeChild(contact.element)
            delete contacts[contact.username]
            numContacts--
            if (numContacts === 0) contentElement.appendChild(emptyElement)
        },
        sendTextMessage: function (username, text) {

            var contact = contacts[username]
            if (contact === undefined) return

            contact.sendTextMessage(text)

            if (selectedContact === null) {
                selectedContact = contact
                selectListener(contact)
            }

        },
    }

}
