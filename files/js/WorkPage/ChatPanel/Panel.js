function WorkPage_ChatPanel_Panel (username,
    session, contactUsername, profile, overrideProfile,
    getResourceUrl, profileListener, removeListener, closeListener,
    signOutListener, crashListener, serviceErrorListener) {

    var title = WorkPage_ChatPanel_Title(contactUsername,
        profile, overrideProfile, profileListener, removeListener)

    var messages = WorkPage_ChatPanel_Messages(
        username, session, contactUsername, closeListener,
        signOutListener, crashListener, serviceErrorListener)

    var closeButton = CloseButton(closeListener)

    var element = document.createElement('div')
    element.className = 'WorkPage_ChatPanel_Panel'
    element.style.backgroundImage = 'url(' + getResourceUrl('img/light-grass.svg') + ')'
    element.appendChild(closeButton.element)
    element.appendChild(title.element)
    element.appendChild(messages.element)

    return {
        element: element,
        editContactProfile: title.editContactProfile,
        focus: messages.focus,
        overrideContactProfile: title.overrideContactProfile,
        receiveTextMessage: messages.receiveTextMessage,
        sendTextMessage: messages.sendTextMessage,
    }

}
