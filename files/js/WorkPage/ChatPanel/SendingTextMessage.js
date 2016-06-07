function WorkPage_ChatPanel_SendingTextMessage (session, contactUsername, text,
    sentListener, signOutListener, crashListener, serviceErrorListener) {

    var element = document.createElement('div')
    element.className = 'WorkPage_ChatPanel_SendingTextMessage'
    element.appendChild(document.createTextNode(text))

    var url = 'data/sendTextMessage' +
        '?token=' + encodeURIComponent(session.token) +
        '&username=' + encodeURIComponent(contactUsername) +
        '&text=' + encodeURIComponent(text)

    var request = new XMLHttpRequest
    request.open('get', url)
    request.send()
    request.onerror = function () {
        classList.add('failed')
    }
    request.onload = function () {

        if (request.status !== 200) {
            serviceErrorListener()
            return
        }

        try {
            var response = JSON.parse(request.responseText)
        } catch (e) {
            crashListener()
            return
        }

        if (response === 'INVALID_TOKEN') {
            signOutListener()
            return
        }

        sentListener(response)

    }

    return { element: element }

}
