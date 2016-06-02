function WorkPage_Page (username, session,
    getResourceUrl, signOutListener, crashListener) {

    function editProfile (profile) {
        session.profile = profile
        sidePanel.editProfile(profile)
    }

    function showAccountPage () {
        var accountPage = AccountPage_Page(username, session, function (profile) {
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
            })
            element.removeChild(addContactPage.element)
            element.appendChild(publicProfilePage.element)
            publicProfilePage.focus()
        }, function () {
            element.removeChild(addContactPage.element)
        }, function () {
            element.removeChild(addContactPage.element)
            crashListener()
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
        signOutPage.focus()
    }, showAddContactPage, function (contact) {
        var chatPanel = contact.chatPanel
        element.appendChild(chatPanel.element)
        chatPanel.focus()
    }, function (contact) {
        element.removeChild(contact.chatPanel.element)
    }, function (contact) {
        var contactPage = ContactPage_Page(session, contact.username, contact.getProfile(), function (profile) {
            contact.edit(profile)
            element.removeChild(contactPage.element)
        }, function () {
            element.removeChild(contactPage.element)
        }, function () {
            element.removeChild(contactPage.element)
            signOutListener()
        }, function () {
            element.removeChild(contactPage.element)
            crashListener()
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
        })
        element.appendChild(removeContactPage.element)
        removeContactPage.focus()
    })

    var element = document.createElement('div')
    element.className = classPrefix
    element.style.backgroundImage =
        'url(' + getResourceUrl('img/grass.svg') + '),' +
        ' url(' + getResourceUrl('img/clouds.svg') + ')'
    element.appendChild(sidePanel.element)

    var contactRequests = WorkPage_ContactRequests(element,
        session, sidePanel.addContact, crashListener)
    for (var i in session.requests) {
        contactRequests.add(i, session.requests[i])
    }

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

        if (action === 'removeRequest') {
            contactRequests.remove(data)
            return
        }

    }, crashListener)

    return { element: element }

}
