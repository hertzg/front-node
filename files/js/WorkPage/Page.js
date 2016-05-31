function WorkPage_Page (username, session, getResourceUrl, signOutListener) {

    function editProfile (data) {
        session.profile = data
        sidePanel.editProfile(data)
    }

    function showAccountPage () {
        var accountPage = AccountPage_Page(username, session, function (data) {
            editProfile(data)
            element.removeChild(accountPage.element)
        }, function () {
            var changePasswordPage = ChangePasswordPage_Page(session, function () {
                element.removeChild(changePasswordPage.element)
                showAccountPage()
            }, function () {
                element.removeChild(changePasswordPage.element)
            })
            element.removeChild(accountPage.element)
            element.appendChild(changePasswordPage.element)
            changePasswordPage.focus()
        }, function () {
            element.removeChild(accountPage.element)
        })
        element.appendChild(accountPage.element)
        accountPage.focus()
    }

    function showAddContactPage () {
        var addContactPage = AddContactPage_Page(username, function (username, data) {
            var publicProfilePage = PublicProfilePage_Page(session, username, data, function (data) {
                element.removeChild(publicProfilePage.element)
                sidePanel.addContact(username, data)
            }, function () {
                element.removeChild(publicProfilePage.element)
                showAddContactPage()
            }, function () {
                element.removeChild(publicProfilePage.element)
            })
            element.removeChild(addContactPage.element)
            element.appendChild(publicProfilePage.element)
        }, function () {
            element.removeChild(addContactPage.element)
        })
        element.appendChild(addContactPage.element)
        addContactPage.focus()
    }

    var classPrefix = 'WorkPage_Page'

    var sidePanel = WorkPage_SidePanel_Panel(username, session, getResourceUrl, showAccountPage, function () {
        var signOutPage = SignOutPage_Page(function () {

            pullMessages.abort()
            element.removeChild(signOutPage.element)
            signOutListener()

            var request = new XMLHttpRequest
            request.open('get', 'data/signOut?token=' + encodeURIComponent(session.token))
            request.send()
            request.onload = function () {

                if (request.status !== 200) {
                    console.log(request.responseText)
                    return
                }

                console.log(JSON.parse(request.response))

            }

        }, function () {
            element.removeChild(signOutPage.element)
        })
        element.appendChild(signOutPage.element)
    }, showAddContactPage, function (contact) {
        var chatPanel = contact.chatPanel
        element.appendChild(chatPanel.element)
        chatPanel.focus()
    }, function (contact) {
        element.removeChild(contact.chatPanel.element)
    }, function (contact) {
        var contactPage = ContactPage_Page(session, contact.username, contact.getData(), function (data) {
            contact.edit(data)
            element.removeChild(contactPage.element)
        }, function () {
            element.removeChild(contactPage.element)
        })
        element.appendChild(contactPage.element)
        contactPage.focus()
    }, function (contact) {
        var removeContactPage = RemoveContactPage_Page(contact.username, session, function () {
            element.removeChild(removeContactPage.element)
            sidePanel.removeContact(contact)
        }, function () {
            element.removeChild(removeContactPage.element)
        })
        element.appendChild(removeContactPage.element)
    })

    var element = document.createElement('div')
    element.className = classPrefix
    element.style.backgroundImage =
        'url(' + getResourceUrl('img/grass.svg') + '),' +
        ' url(' + getResourceUrl('img/clouds.svg') + ')'
    element.appendChild(sidePanel.element)

    var pullMessages = WorkPage_PullMessages(session, function (message) {

        var action = message[0],
            data = message[1]

        if (action === 'addContact') {
            var username = data[0]
            var contact = sidePanel.getContact(username)
            if (contact === undefined) sidePanel.addContact(username, data[1])
            return
        }

        if (action === 'editContact') {
            var contact = sidePanel.getContact(data[0])
            if (contact !== undefined) contact.edit(data[1])
            return
        }

        if (action === 'editProfile') {
            editProfile(data)
            return
        }

        if (action === 'removeContact') {
            var contact = sidePanel.getContact(data)
            if (contact !== undefined) sidePanel.removeContact(contact)
            return
        }

        console.log('message', message)

    })

    return { element: element }

}
