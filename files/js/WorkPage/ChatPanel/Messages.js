function WorkPage_ChatPanel_Messages (session, username,
    closeListener, signOutListener, crashListener, serviceErrorListener) {

    function RoundTime (time) {
        return Math.floor(time / (1000 * 60)) * 1000 * 60
    }

    function addMessage (direction, message) {
        doneMessagesElement.appendChild(message.element)
    }

    function addSentTextMessage (text, time) {
        var roundTime = RoundTime(time)
        if (canMerge('sent', roundTime)) {
            lastMessage.addText(text)
        } else {
            var message = WorkPage_ChatPanel_SentTextMessage(text, time)
            addMessage('sent', message)
            lastMessage = message
            lastDirection = 'sent'
            lastRoundTime = roundTime
        }
        scrollDown()
    }

    function canMerge (direction, roundTime) {
        return lastMessage !== null &&
            lastDirection === direction && lastRoundTime === roundTime
    }

    function scrollDown () {
        contentElement.scrollTop = contentElement.scrollHeight
    }

    var lastMessage = null,
        lastDirection = null,
        lastRoundTime = null

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
            addSentTextMessage(text, time)
        }, signOutListener, crashListener, serviceErrorListener)

        sendingMessagesElement.appendChild(sendingTextMessage.element)
        scrollDown()

    }, closeListener)

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(contentElement)
    element.appendChild(typePanel.element)

    return {
        element: element,
        focus: typePanel.focus,
        sendTextMessage: addSentTextMessage,
        receiveTextMessage: function (text, time) {
            var roundTime = RoundTime(time)
            if (canMerge('received', roundTime)) {
                lastMessage.addText(text)
            } else {
                var message = WorkPage_ChatPanel_ReceivedTextMessage(text, time)
                addMessage('received', message)
                lastMessage = message
                lastDirection = 'received'
                lastRoundTime = roundTime
            }
            scrollDown()
        },
    }

}
