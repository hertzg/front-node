function WorkPage_ChatPanel_Messages (session, username) {

    var classPrefix = 'WorkPage_ChatPanel_Messages'

    var contentElement = document.createElement('div')
    contentElement.className = classPrefix + '-content'

    var typePanel = WorkPage_ChatPanel_TypePanel(function (text) {

        var message = WorkPage_ChatPanel_SentMessage(text)
        message.send(session, username)

        contentElement.appendChild(message.element)
        contentElement.scrollTop = contentElement.scrollHeight

    })

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(contentElement)
    element.appendChild(typePanel.element)

    return {
        element: element,
        focus: typePanel.focus,
        receiveTextMessage: function (text) {
            var message = WorkPage_ChatPanel_ReceivedMessage(text)
            contentElement.appendChild(message.element)
            contentElement.scrollTop = contentElement.scrollHeight
        },
        sendTextMessage: function (text) {
            var message = WorkPage_ChatPanel_SentMessage(text)
            contentElement.appendChild(message.element)
            contentElement.scrollTop = contentElement.scrollHeight
        },
    }

}
