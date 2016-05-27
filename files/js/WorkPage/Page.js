function WorkPage_Page (data, getResourceUrl, signOutListener) {

    var classPrefix = 'WorkPage_Page'

    var sidePanel = WorkPage_SidePanel_Panel(data, getResourceUrl, function () {
        var accountPage = AccountPage_Page(data, getResourceUrl, function () {
            element.removeChild(accountPage.element)
        }, function () {
            var changePasswordPage = ChangePasswordPage_Page(function () {
                element.removeChild(changePasswordPage.element)
                element.appendChild(accountPage.element)
            }, function () {
                element.removeChild(changePasswordPage.element)
            })
            element.removeChild(accountPage.element)
            element.appendChild(changePasswordPage.element)
        })
        element.appendChild(accountPage.element)
    }, signOutListener, function (contact) {
        var chatPanel = contact.chatPanel
        element.appendChild(chatPanel.element)
        chatPanel.focus()
    }, function (contact) {
        element.removeChild(contact.chatPanel.element)
    })

    var element = document.createElement('div')
    element.className = classPrefix
    element.style.backgroundImage =
        'url(' + getResourceUrl('img/grass.svg') + '),' +
        ' url(' + getResourceUrl('img/clouds.svg') + ')'
    element.appendChild(sidePanel.element)

    return { element: element }

}
