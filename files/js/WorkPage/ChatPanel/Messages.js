function WorkPage_ChatPanel_Messages (session, username,
    closeListener, signOutListener, crashListener, serviceErrorListener) {

    function addMessage (message) {
        doneMessagesElement.appendChild(message.element)
    }

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

        var sendingTextMessage = WorkPage_ChatPanel_SendingTextMessage(session, username, text, function (time) {
            sendingMessagesElement.removeChild(sendingTextMessage.element)
            addMessage(WorkPage_ChatPanel_SentTextMessage(text, time))
        }, signOutListener, crashListener, serviceErrorListener)

        sendingMessagesElement.appendChild(sendingTextMessage.element)
        contentElement.scrollTop = contentElement.scrollHeight

    }, closeListener)

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(contentElement)
    element.appendChild(typePanel.element)

    return {
        element: element,
        focus: typePanel.focus,
        receiveTextMessage: function (text, time) {
            var message = WorkPage_ChatPanel_ReceivedTextMessage(text, time)
            doneMessagesElement.appendChild(message.element)
            contentElement.scrollTop = contentElement.scrollHeight
        },
        sendTextMessage: function (text, time) {
            addMessage(WorkPage_ChatPanel_SentTextMessage(text, time))
            contentElement.scrollTop = contentElement.scrollHeight
        },
    }

}
