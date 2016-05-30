function WorkPage_Page (username, session, getResourceUrl, signOutListener) {

    function showAccountPage () {
        var accountPage = AccountPage_Page(username, session, function () {
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
        })
        element.appendChild(accountPage.element)
        accountPage.focus()
    }

    function showAddAccountPage () {
        var addContactPage = AddContactPage_Page(session, function (username, data) {
            var publicProfilePage = PublicProfilePage_Page(session, username, data, function () {
                element.removeChild(publicProfilePage.element)
            }, function () {
                element.removeChild(publicProfilePage.element)
                showAddAccountPage()
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
    }, showAddAccountPage, function (contact) {
        var chatPanel = contact.chatPanel
        element.appendChild(chatPanel.element)
        chatPanel.focus()
    }, function (contact) {
        element.removeChild(contact.chatPanel.element)
    }, function (contact) {
        var contactPage = ContactPage_Page(session, contact.username, contact.data, function () {
            element.removeChild(contactPage.element)
        })
        element.appendChild(contactPage.element)
        contactPage.focus()
    }, function (contact) {
        var removeContactPage = RemoveContactPage_Page(contact.username, function () {
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

    return { element: element }

}
