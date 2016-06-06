function WorkPage_Page (username, session, getResourceUrl,
    signOutListener, crashListener, serviceErrorListener) {

    function editProfile (profile) {
        session.profile = profile
        sidePanel.editProfile(profile)
    }

    function showAccountPage () {
        var accountPage = AccountPage_Page(getResourceUrl, username, session, function (profile) {
            editProfile(profile)
            element.removeChild(accountPage.element)
        }, function () {
            var changePasswordPage = ChangePasswordPage_Page(session, function () {
                element.removeChild(changePasswordPage.element)
                showAccountPage()
            }, function () {
                element.removeChild(changePasswordPage.element)
            }, function () {
                element.removeChild(changePasswordPage.element)
                signOutListener()
            }, function () {
                element.removeChild(changePasswordPage.element)
                crashListener()
            }, function () {
                element.removeChild(changePasswordPage.element)
                serviceErrorListener()
            })
            element.removeChild(accountPage.element)
            element.appendChild(changePasswordPage.element)
            changePasswordPage.focus()
        }, function () {
            element.removeChild(accountPage.element)
        }, function () {
            element.removeChild(accountPage.element)
            signOutListener()
        }, function () {
            element.removeChild(accountPage.element)
            crashListener()
        }, function () {
            element.removeChild(accountPage.element)
            serviceErrorListener()
        })
        element.appendChild(accountPage.element)
        accountPage.focus()
    }

    function showAddContactPage () {
        var addContactPage = AddContactPage_Page(username, function (username, profile) {
            var publicProfilePage = PublicProfilePage_Page(session, username, profile, function (contactData) {
                element.removeChild(publicProfilePage.element)
                sidePanel.addContact(username, contactData)
            }, function () {
                element.removeChild(publicProfilePage.element)
                showAddContactPage()
            }, function () {
                element.removeChild(publicProfilePage.element)
            }, function () {
                element.removeChild(publicProfilePage.element)
                signOutListener()
            }, function () {
                element.removeChild(publicProfilePage.element)
                crashListener()
            }, function () {
                element.removeChild(publicProfilePage.element)
                serviceErrorListener()
            })
            element.removeChild(addContactPage.element)
            element.appendChild(publicProfilePage.element)
            publicProfilePage.focus()
        }, function () {
            element.removeChild(addContactPage.element)
        }, function () {
            element.removeChild(addContactPage.element)
            crashListener()
        }, function () {
            element.removeChild(addContactPage.element)
            serviceErrorListener()
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
                    serviceErrorListener()
                    return
                }

                try {
                    var response = JSON.parse(request.response)
                } catch (e) {
                    crashListener()
                    return
                }

                if (response !== true) serviceErrorListener()

            }

        }, function () {
            element.removeChild(signOutPage.element)
        })
        element.appendChild(signOutPage.element)
        signOutPage.focus()
    }, showAddContactPage, function (contact) {
        var chatPanel = contact.chatPanel
        element.appendChild(chatPanel.element)
        chatPanel.focus()
    }, function (contact) {
        element.removeChild(contact.chatPanel.element)
    }, function (contact) {
        var contactPage = ContactPage_Page(session, contact.username, contact.getProfile(), contact.getOverrideProfile(), function (profile) {
            contact.overrideProfile(profile)
            element.removeChild(contactPage.element)
        }, function () {
            element.removeChild(contactPage.element)
        }, function () {
            element.removeChild(contactPage.element)
            signOutListener()
        }, function () {
            element.removeChild(contactPage.element)
            crashListener()
        }, function () {
            element.removeChild(contactPage.element)
            serviceErrorListener()
        })
        element.appendChild(contactPage.element)
        contactPage.focus()
    }, function (contact) {
        var removeContactPage = RemoveContactPage_Page(contact.username, session, function () {
            element.removeChild(removeContactPage.element)
            sidePanel.removeContact(contact)
        }, function () {
            element.removeChild(removeContactPage.element)
        }, function () {
            element.removeChild(removeContactPage.element)
            signOutListener()
        }, function () {
            element.removeChild(removeContactPage.element)
            crashListener()
        }, function () {
            element.removeChild(removeContactPage.element)
            serviceErrorListener()
        })
        element.appendChild(removeContactPage.element)
        removeContactPage.focus()
    }, signOutListener, crashListener, serviceErrorListener)

    var element = document.createElement('div')
    element.className = classPrefix
    element.style.backgroundImage =
        'url(' + getResourceUrl('img/grass.svg') + '),' +
        ' url(' + getResourceUrl('img/clouds.svg') + ')'
    element.appendChild(sidePanel.element)

    var contactRequests = WorkPage_ContactRequests(element,
        session, sidePanel.addContact, crashListener,
        signOutListener, crashListener, serviceErrorListener)
    for (var i in session.requests) {
        contactRequests.add(i, session.requests[i])
    }

    document.title = 'Bazgu'

    var pullMessages = WorkPage_PullMessages(session, function (message) {

        var action = message[0],
            data = message[1]

        if (action === 'addContact') {
            var username = data[0]
            var contact = sidePanel.getContact(username)
            if (contact === undefined) sidePanel.addContact(username, data[1])
            contactRequests.remove(username)
            return
        }

        if (action === 'addRequest') {
            contactRequests.add(data[0], data[1])
            return
        }

        if (action === 'editContactProfile') {
            var contact = sidePanel.getContact(data[0])
            if (contact !== undefined) contact.editProfile(data[1])
            return
        }

        if (action === 'editRequest') {
            contactRequests.edit(data[0], data[1])
            return
        }

        if (action === 'editProfile') {
            editProfile(data)
            return
        }

        if (action === 'ignoreRequest' || action === 'removeRequest') {
            contactRequests.remove(data)
            return
        }

        if (action === 'offline') {
            sidePanel.offline(data)
            return
        }

        if (action === 'online') {
            sidePanel.online(data)
            return
        }

        if (action === 'overrideContactProfile') {
            var contact = sidePanel.getContact(data[0])
            if (contact !== undefined) contact.overrideProfile(data[1])
            return
        }

        if (action === 'receiveTextMessage') {
            sidePanel.receiveTextMessage(data[0], data[1])
            return
        }

        if (action === 'removeContact') {
            var contact = sidePanel.getContact(data)
            if (contact !== undefined) sidePanel.removeContact(contact)
            return
        }

        if (action === 'sendTextMessage') {
            sidePanel.sendTextMessage(data[0], data[1])
            return
        }

    }, crashListener, signOutListener, serviceErrorListener)

    return { element: element }

}
