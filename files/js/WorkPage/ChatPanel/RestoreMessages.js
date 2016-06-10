function WorkPage_ChatPanel_RestoreMessages (username,
    contactUsername, addSentTextMessage, addReceivedTextMessage) {

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
        if (message[0] === 'sentText') {
            addSentTextMessage(message[1], message[2])
        } else {
            addReceivedTextMessage(message[1], message[2])
        }
    })

}
