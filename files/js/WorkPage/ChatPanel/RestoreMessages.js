function WorkPage_ChatPanel_RestoreMessages (
    username, contactUsername, addReceivedFileMessage,
    addReceivedTextMessage, addSentFileMessage, addSentTextMessage) {

    try {
        var messages = localStorage['messages_' + username + '$' + contactUsername]
    } catch (e) {
    }

    if (messages === undefined) return

    try {
        messages = JSON.parse(messages)
    } catch (e) {
        return
    }

    messages.forEach(function (message) {
        var type = message[0]
        if (type === 'receivedFile') {
            addReceivedFileMessage(message[1], message[2])
        } else if (type === 'receivedText') {
            addReceivedTextMessage(message[1], message[2])
        } else if (type === 'sentFile') {
            addSentFileMessage(message[1], message[2])
        } else {
            addSentTextMessage(message[1], message[2])
        }
    })

}
