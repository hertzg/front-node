function WorkPage_ChatPanel_Panel (username, data,
    getResourceUrl, profileListener, removeListener, closeListener) {

    var title = WorkPage_ChatPanel_Title(username,
        data, profileListener, removeListener)

    var messages = WorkPage_ChatPanel_Messages()

    var closeButton = CloseButton(closeListener)

    var element = document.createElement('div')
    element.className = 'WorkPage_ChatPanel_Panel'
    element.style.backgroundImage = 'url(' + getResourceUrl('img/light-grass.svg') + ')'
    element.appendChild(closeButton.element)
    element.appendChild(title.element)
    element.appendChild(messages.element)

    return {
        element: element,
        focus: messages.focus,
        editContact: title.editContact,
    }

}
