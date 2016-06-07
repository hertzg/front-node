function WorkPage_ChatPanel_Messages (session, username,
    closeListener, signOutListener, crashListener, serviceErrorListener) {

    function Day (time) {
        return Math.floor(time / (1000 * 60 * 60 * 24))
    }

    function Minute (time) {
        return Math.floor(time / (1000 * 60))
    }

    function addMessage (direction, message, time) {

        var day = Day(time)
        if (lastDay !== day) {
            var separator = WorkPage_ChatPanel_DaySeparator(time)
            doneMessagesElement.appendChild(separator.element)
            lastDay = day
        }

        doneMessagesElement.appendChild(message.element)
        sendingMessagesClassList.add('notFirst')

    }

    function addSentTextMessage (text, time) {
        var minute = Minute(time)
        if (canMerge('sent', minute)) {
            lastMessage.addText(text)
        } else {
            var message = WorkPage_ChatPanel_SentTextMessage(text, time)
            addMessage('sent', message, time)
            lastMessage = message
            lastDirection = 'sent'
            lastMinute = minute
        }
        scrollDown()
    }

    function canMerge (direction, minute) {
        return lastMessage !== null &&
            lastDirection === direction && lastMinute === minute
    }

    function scrollDown () {
        contentElement.scrollTop = contentElement.scrollHeight
    }

    var lastMessage = null,
        lastDirection = null,
        lastMinute = null,
        lastDay = null

    var classPrefix = 'WorkPage_ChatPanel_Messages'

    var doneMessagesElement = document.createElement('div')
    doneMessagesElement.className = classPrefix + '-doneMessages'

    var sendingMessagesElement = document.createElement('div')
    sendingMessagesElement.className = classPrefix + '-sendingMessages hidden'

    var sendingMessagesClassList = sendingMessagesElement.classList

    var contentElement = document.createElement('div')
    contentElement.className = classPrefix + '-content'
    contentElement.appendChild(doneMessagesElement)
    contentElement.appendChild(sendingMessagesElement)

    var typePanel = WorkPage_ChatPanel_TypePanel(function (text) {

        var sendingTextMessage = WorkPage_ChatPanel_SendingTextMessage(session, username, text, function (time) {
            sendingMessagesElement.removeChild(sendingTextMessage.element)
            if (sendingMessagesElement.childNodes.length === 0) {
                sendingMessagesClassList.add('hidden')
            }
            addSentTextMessage(text, time)
        }, signOutListener, crashListener, serviceErrorListener)

        sendingMessagesElement.appendChild(sendingTextMessage.element)
        if (sendingMessagesElement.childNodes.length === 1) {
            sendingMessagesClassList.remove('hidden')
        }
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
            var minute = Minute(time)
            if (canMerge('received', minute)) {
                lastMessage.addText(text)
            } else {
                var message = WorkPage_ChatPanel_ReceivedTextMessage(text, time)
                addMessage('received', message, time)
                lastMessage = message
                lastDirection = 'received'
                lastMinute = minute
            }
            scrollDown()
        },
    }

}
