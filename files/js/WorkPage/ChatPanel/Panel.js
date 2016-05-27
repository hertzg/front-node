function WorkPage_ChatPanel_Panel (data, profileListener, removeListener, closeListener) {

    var title = WorkPage_ChatPanel_Title(data, profileListener, removeListener)

    var messages = WorkPage_ChatPanel_Messages()

    var closeButton = CloseButton(closeListener)

    var element = document.createElement('div')
    element.className = 'WorkPage_ChatPanel_Panel'
    element.appendChild(closeButton.element)
    element.appendChild(title.element)
    element.appendChild(messages.element)

    return {
        element: element,
        focus: messages.focus,
    }

}
