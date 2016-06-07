function WorkPage_ChatPanel_Messages (session, username,
    closeListener, signOutListener, crashListener, serviceErrorListener) {

    var classPrefix = 'WorkPage_ChatPanel_Messages'

    var doneMessagesElement = document.createElement('div')
    doneMessagesElement.className = classPrefix + '-doneMessages'

    var sendingMessagesElement = document.createElement('div')
    sendingMessagesElement.className = classPrefix + '-sendingMessages'

    var contentElement = document.createElement('div')
    contentElement.className = classPrefix + '-content'
    contentElement.appendChild(doneMessagesElement)
    contentElement.appendChild(sendingMessagesElement)

    var typePanel = WorkPage_ChatPanel_TypePanel(function (text) {

        var sendingMessage = WorkPage_ChatPanel_SendingMessage(session, username, text, function () {
            var sentMessage = WorkPage_ChatPanel_SentMessage(text)
            sendingMessagesElement.removeChild(sendingMessage.element)
            doneMessagesElement.appendChild(sentMessage.element)
        }, signOutListener, crashListener, serviceErrorListener)

        sendingMessagesElement.appendChild(sendingMessage.element)
        contentElement.scrollTop = contentElement.scrollHeight

    }, closeListener)

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(contentElement)
    element.appendChild(typePanel.element)

    return {
        element: element,
        focus: typePanel.focus,
        receiveTextMessage: function (text) {
            var message = WorkPage_ChatPanel_ReceivedMessage(text)
            doneMessagesElement.appendChild(message.element)
            contentElement.scrollTop = contentElement.scrollHeight
        },
        sendTextMessage: function (text) {
            var message = WorkPage_ChatPanel_SentMessage(text)
            doneMessagesElement.appendChild(message.element)
            contentElement.scrollTop = contentElement.scrollHeight
        },
    }

}
