function WorkPage_Page (getResourceUrl, signOutListener) {

    var classPrefix = 'WorkPage_Page'

    var sidePanel = WorkPage_SidePanel_Panel({
        displayName: 'Daniel Tompkins',
    }, getResourceUrl, function () {
        console.log('account')
    }, signOutListener, function (contact) {
        element.appendChild(contact.chatPanel.element)
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
