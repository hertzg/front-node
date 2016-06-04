function WorkPage_SidePanel_Contact (getResourceUrl,
    session, username, contactData, selectListener,
    deselectListener, profileListener, removeListener) {

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

    var profile = contactData.profile,
        overrideProfile = contactData.overrideProfile

    var chatPanel = WorkPage_ChatPanel_Panel(session,
        username, profile, overrideProfile, getResourceUrl,
        profileListener, removeListener, deselectAndCallListener)

    var node = document.createTextNode(overrideProfile.fullName || profile.fullName || username)

    var element = document.createElement('div')
    element.className = 'WorkPage_SidePanel_Contact offline'
    element.style.backgroundImage = 'url(' + getResourceUrl('img/user-' + (contactData.online ? 'online' : 'offline') + '.svg') + ')'
    element.appendChild(node)
    element.addEventListener('click', select)

    var classList = element.classList

    return {
        chatPanel: chatPanel,
        deselect: deselect,
        element: element,
        receiveTextMessage: chatPanel.receiveTextMessage,
        sendTextMessage: chatPanel.sendTextMessage,
        username: username,
        editProfile: function (_profile) {
            profile = _profile
            node.nodeValue = overrideProfile.fullName || profile.fullName || username
            chatPanel.editContactProfile(profile)
        },
        getOverrideProfile: function () {
            return overrideProfile
        },
        getProfile: function () {
            return profile
        },
        offline: function () {
            element.style.backgroundImage = 'url(' + getResourceUrl('img/user-offline.svg') + ')'
        },
        online: function () {
            element.style.backgroundImage = 'url(' + getResourceUrl('img/user-online.svg') + ')'
        },
        overrideProfile: function (_overrideProfile) {
            overrideProfile = _overrideProfile
            node.nodeValue = overrideProfile.fullName || profile.fullName || username
            chatPanel.overrideContactProfile(overrideProfile)
        },
    }

}
