function WorkPage_ChatPanel_RestoreMessages (username,
    addSentTextMessage, addReceivedTextMessage) {

    try {
        var messages = localStorage['messages_' + username]
    } catch (e) {
    }

    if (messages === undefined) return

    try {
        messages = JSON.parse(messages)
    } catch (e) {
        return
    }

    messages.forEach(function (message) {
        if (message.direction === 'sent') {
            addSentTextMessage(message.text, message.time)
        } else {
            addReceivedTextMessage(message.text, message.time)
        }
    })

}
