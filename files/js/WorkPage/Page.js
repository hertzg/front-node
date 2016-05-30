function WorkPage_Page (username, session, getResourceUrl, signOutListener) {

    var classPrefix = 'WorkPage_Page'

    var sidePanel = WorkPage_SidePanel_Panel(username, session, getResourceUrl, function () {
        var accountPage = AccountPage_Page(username, session, function () {
            element.removeChild(accountPage.element)
        }, function () {
            var changePasswordPage = ChangePasswordPage_Page(session, function () {
                element.removeChild(changePasswordPage.element)
                element.appendChild(accountPage.element)
            }, function () {
                element.removeChild(changePasswordPage.element)
            })
            element.removeChild(accountPage.element)
            element.appendChild(changePasswordPage.element)
            changePasswordPage.focus()
        })
        element.appendChild(accountPage.element)
        accountPage.focus()
    }, function () {
        var signOutPage = SignOutPage_Page(function () {

            element.removeChild(signOutPage.element)
            signOutListener()

            var request = new XMLHttpRequest
            request.open('get', 'data/signOut?token=' + encodeURIComponent(session.token))
            request.send()
            request.onload = function () {
                console.log(JSON.parse(request.response))
            }

        }, function () {
            element.removeChild(signOutPage.element)
        })
        element.appendChild(signOutPage.element)
    }, function () {
        var addContactPage = AddContactPage_Page(session, function () {
            element.removeChild(addContactPage.element)
        })
        element.appendChild(addContactPage.element)
        addContactPage.focus()
    }, function (contact) {
        var chatPanel = contact.chatPanel
        element.appendChild(chatPanel.element)
        chatPanel.focus()
    }, function (contact) {
        element.removeChild(contact.chatPanel.element)
    }, function (contact) {
        var contactPage = ContactPage_Page(contact.data, function () {
            element.removeChild(contactPage.element)
        })
        element.appendChild(contactPage.element)
    }, function (contact) {
        var removeContactPage = RemoveContactPage_Page(contact.data, function () {
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
