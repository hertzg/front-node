function WorkPage_Page (username, session, getResourceUrl,
    signOutListener, crashListener, serviceErrorListener) {

    function editProfile (profile) {
        session.profile = profile
        sidePanel.editProfile(profile)
    }

    function showAccountPage () {

        function hideAccountPage () {
            element.removeChild(accountPage.element)
            accountPage = null
        }

        accountPage = AccountPage_Page(getResourceUrl, username, session, function (profile) {
            editProfile(profile)
            hideAccountPage()
            sidePanel.enable()
        }, function () {

            function hideChangePasswordPage () {
                element.removeChild(changePasswordPage.element)
            }

            var changePasswordPage = ChangePasswordPage_Page(session, function () {
                hideChangePasswordPage()
                showAccountPage()
            }, function () {
                hideChangePasswordPage()
                sidePanel.enable()
            }, function () {
                hideChangePasswordPage()
                signOutListener()
            }, function () {
                hideChangePasswordPage()
                crashListener()
            }, function () {
                hideChangePasswordPage()
                serviceErrorListener()
            })
            hideAccountPage()
            element.appendChild(changePasswordPage.element)
            changePasswordPage.focus()

        }, function () {
            hideAccountPage()
            sidePanel.enable()
        }, function () {
            hideAccountPage()
            signOutListener()
        }, function () {
            hideAccountPage()
            crashListener()
        }, function () {
            hideAccountPage()
            serviceErrorListener()
        })
        element.appendChild(accountPage.element)
        accountPage.focus()

    }

    function showAddContactPage () {

        function hideAddContactPage () {
            element.removeChild(addContactPage.element)
        }

        var addContactPage = AddContactPage_Page(username, function (username, profile) {

            function hidePublicProfilePage () {
                element.removeChild(publicProfilePage.element)
            }

            var publicProfilePage = PublicProfilePage_Page(session, username, profile, function (contactData) {
                hidePublicProfilePage()
                sidePanel.addContact(username, contactData)
                sidePanel.enable()
            }, function () {
                hidePublicProfilePage()
                showAddContactPage()
            }, function () {
                hidePublicProfilePage()
                sidePanel.enable()
            }, function () {
                hidePublicProfilePage()
                signOutListener()
            }, function () {
                hidePublicProfilePage()
                crashListener()
            }, function () {
                hidePublicProfilePage()
                serviceErrorListener()
            })
            hideAddContactPage()
            element.appendChild(publicProfilePage.element)
            publicProfilePage.focus()

        }, function () {
            hideAddContactPage()
            sidePanel.enable()
        }, function () {
            hideAddContactPage()
            crashListener()
        }, function () {
            hideAddContactPage()
            serviceErrorListener()
        })
        element.appendChild(addContactPage.element)
        addContactPage.focus()

    }

    var classPrefix = 'WorkPage_Page'

    var sidePanel = WorkPage_SidePanel_Panel(username, session, getResourceUrl, function () {
        sidePanel.disable()
        showAccountPage()
    }, function () {

        function hideSignOutPage () {
            element.removeChild(signOutPage.element)
        }

        var signOutPage = SignOutPage_Page(function () {

            pullMessages.abort()
            hideSignOutPage()
            signOutListener()

            var url = 'data/signOut?token=' + encodeURIComponent(session.token)

            var request = new XMLHttpRequest
            request.open('get', url)
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
            hideSignOutPage()
            sidePanel.enable()
        })
        element.appendChild(signOutPage.element)
        signOutPage.focus()
        sidePanel.disable()

    }, function () {
        sidePanel.disable()
        showAddContactPage()
    }, function (contact) {
        var chatPanel = contact.chatPanel
        element.appendChild(chatPanel.element)
        chatPanel.focus()
    }, function (contact) {
        element.removeChild(contact.chatPanel.element)
    }, function (contact) {

        function hideContactPage () {
            element.removeChild(contactPage.element)
            contactPage = null
        }

        contactPage = ContactPage_Page(session, contact.username, contact.getProfile(), contact.getOverrideProfile(), function (profile) {
            contact.overrideProfile(profile)
            hideContactPage()
            sidePanel.enable()
        }, function () {
            hideContactPage()
            sidePanel.enable()
        }, function () {
            hideContactPage()
            signOutListener()
        }, function () {
            hideContactPage()
            crashListener()
        }, function () {
            hideContactPage()
            serviceErrorListener()
        })
        element.appendChild(contactPage.element)
        contactPage.focus()
        sidePanel.disable()

    }, function (contact) {

        function hideRemoveContactPage () {
            element.removeChild(removeContactPage.element)
        }

        var removeContactPage = RemoveContactPage_Page(contact.username, session, function () {
            hideRemoveContactPage()
            sidePanel.removeContact(contact)
            sidePanel.enable()
        }, function () {
            hideRemoveContactPage()
            sidePanel.enable()
        }, function () {
            hideRemoveContactPage()
            signOutListener()
        }, function () {
            hideRemoveContactPage()
            crashListener()
        }, function () {
            hideRemoveContactPage()
            serviceErrorListener()
        })
        element.appendChild(removeContactPage.element)
        removeContactPage.focus()
        sidePanel.disable()

    }, signOutListener, crashListener, serviceErrorListener)

    var element = document.createElement('div')
    element.className = classPrefix
    element.style.backgroundImage =
        'url(' + getResourceUrl('img/grass.svg') + '),' +
        ' url(' + getResourceUrl('img/clouds.svg') + ')'
    element.appendChild(sidePanel.element)

    var contactRequests = WorkPage_ContactRequests(element, session,
        sidePanel.disable, sidePanel.enable, sidePanel.addContact,
        crashListener, signOutListener, crashListener, serviceErrorListener)
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

            var username = data[0],
                profile = data[1]

            var contact = sidePanel.getContact(username)
            if (contact !== undefined) contact.editProfile(profile)
            if (contactPage !== null && contactPage.username === username) {
                contactPage.editProfile(profile)
            }
            return

        }

        if (action === 'editRequest') {
            contactRequests.edit(data[0], data[1])
            return
        }

        if (action === 'editProfile') {
            editProfile(data)
            if (accountPage !== null) accountPage.editProfile(data)
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

            var username = data[0],
                overrideProfile = data[1]

            var contact = sidePanel.getContact(username)
            if (contact !== undefined) contact.overrideProfile(overrideProfile)
            if (contactPage !== null && contactPage.username === username) {
                contactPage.overrideProfile(overrideProfile)
            }
            return

        }

        if (action === 'receiveTextMessage') {
            sidePanel.receiveTextMessage(data[0], data[1], data[2])
            return
        }

        if (action === 'removeContact') {
            var contact = sidePanel.getContact(data)
            if (contact !== undefined) sidePanel.removeContact(contact)
            return
        }

        if (action === 'sendTextMessage') {
            sidePanel.sendTextMessage(data[0], data[1], data[2])
            return
        }

    }, crashListener, signOutListener, serviceErrorListener)

    var accountPage = null,
        contactPage = null

    return { element: element }

}
