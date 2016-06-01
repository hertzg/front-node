function WorkPage_SidePanel_Contact (getResourceUrl, username, profile,
    selectListener, deselectListener, profileListener, removeListener) {

    function deselect () {
        classList.remove('selected')
        element.removeEventListener('click', deselectAndCallListener)
        element.addEventListener('click', select)
    }

    function deselectAndCallListener () {
        deselect()
        deselectListener()
    }

    function select () {
        classList.add('selected')
        element.removeEventListener('click', select)
        element.addEventListener('click', deselectAndCallListener)
        selectListener()
    }

    var chatPanel = WorkPage_ChatPanel_Panel(username, profile, getResourceUrl,
        profileListener, removeListener, deselectAndCallListener)

    var node = document.createTextNode(profile.fullName || username)

    var element = document.createElement('div')
    element.className = 'WorkPage_SidePanel_Contact offline'
    element.style.backgroundImage = 'url(' + getResourceUrl('img/user-' + (profile.online ? 'online' : 'offline') + '.svg') + ')'
    element.appendChild(node)
    element.addEventListener('click', select)

    var classList = element.classList

    return {
        chatPanel: chatPanel,
        deselect: deselect,
        element: element,
        username: username,
        edit: function (_profile) {
            profile = _profile
            node.nodeValue = profile.fullName || username
            chatPanel.editContact(profile)
        },
        getProfile: function () {
            return profile
        },
    }

}
