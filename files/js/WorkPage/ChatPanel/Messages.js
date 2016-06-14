function WorkPage_ChatPanel_Messages (sentFiles, receivedFiles,
    username, session, contactUsername, closeListener,
    signOutListener, crashListener, serviceErrorListener) {

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

    function addReceivedFileMessage (file, time) {
        var minute = Minute(time)
        if (canMerge('receivedFile', minute)) {
            lastMessage.add(file)
        } else {
            var message = WorkPage_ChatPanel_ReceivedFileMessage(receivedFiles, file, time)
            addMessage('receivedFile', message, time)
            lastMessage = message
            lastDirection = 'receivedFile'
            lastMinute = minute
        }
        scrollDown()
        storeMessage(['receivedFile', file, time])
    }

    function addReceivedTextMessage (text, time) {
        var minute = Minute(time)
        if (canMerge('receivedText', minute)) {
            lastMessage.add(text)
        } else {
            var message = WorkPage_ChatPanel_ReceivedTextMessage(text, time)
            addMessage('receivedText', message, time)
            lastMessage = message
            lastDirection = 'receivedText'
            lastMinute = minute
        }
        scrollDown()
        storeMessage(['receivedText', text, time])
    }

    function addSentFileMessage (file, time) {
        var minute = Minute(time)
        if (canMerge('sentFile', minute)) {
            lastMessage.add(file)
        } else {
            var message = WorkPage_ChatPanel_SentFileMessage(file, time)
            addMessage('sentFile', message, time)
            lastMessage = message
            lastDirection = 'sentFile'
            lastMinute = minute
        }
        scrollDown()
        storeMessage(['sentFile', file, time])
    }

    function addSentTextMessage (text, time) {
        var minute = Minute(time)
        if (canMerge('sentText', minute)) {
            lastMessage.add(text)
        } else {
            var message = WorkPage_ChatPanel_SentTextMessage(text, time)
            addMessage('sentText', message, time)
            lastMessage = message
            lastDirection = 'sentText'
            lastMinute = minute
        }
        scrollDown()
        storeMessage(['sentText', text, time])
    }

    function canMerge (direction, minute) {
        return lastMessage !== null &&
            lastDirection === direction && lastMinute === minute
    }

    function scrollDown () {
        contentElement.scrollTop = contentElement.scrollHeight
    }

    function storeMessage (message) {
        messages.push(message)
        if (messages.length > 1024) messages.shift()
        try {
            localStorage['messages_' + username + '$' + contactUsername] = JSON.stringify(messages)
        } catch (e) {
        }
    }

    var lastMessage = null,
        lastDirection = null,
        lastMinute = null,
        lastDay = null

    var messages = []

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

        var sendingTextMessage = WorkPage_ChatPanel_SendingTextMessage(session, contactUsername, text, function (time) {
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

    }, function (files) {
        for (var i = 0; i < files.length; i++) {
            ;(function (readableFile) {

                var file = {
                    name: readableFile.name,
                    size: readableFile.size,
                }

                var sendingFileMessage = WorkPage_ChatPanel_SendingFileMessage(session, contactUsername, file, function (response) {
                    sendingMessagesElement.removeChild(sendingFileMessage.element)
                    if (sendingMessagesElement.childNodes.length === 0) {
                        sendingMessagesClassList.add('hidden')
                    }
                    addSentFileMessage(file, response.time)
                    sentFiles.add(response.token, function () {
                        console.log('feed sent', file.token)
                    })
                }, signOutListener, crashListener, serviceErrorListener)

                sendingMessagesElement.appendChild(sendingFileMessage.element)
                if (sendingMessagesElement.childNodes.length === 1) {
                    sendingMessagesClassList.remove('hidden')
                }
                scrollDown()

            })(files[i])
        }
        scrollDown()
    }, closeListener)

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(contentElement)
    element.appendChild(typePanel.element)

    WorkPage_ChatPanel_RestoreMessages(username, contactUsername,
        addReceivedFileMessage, addReceivedTextMessage,
        addSentFileMessage, addSentTextMessage)

    return {
        disable: typePanel.disable,
        enable: typePanel.enable,
        element: element,
        receiveFileMessage: addReceivedFileMessage,
        receiveTextMessage: addReceivedTextMessage,
        sendFileMessage: addSentFileMessage,
        sendTextMessage: addSentTextMessage,
        focus: function () {
            typePanel.focus()
            scrollDown()
        },
    }

}
