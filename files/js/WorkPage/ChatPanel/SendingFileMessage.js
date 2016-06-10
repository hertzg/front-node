function WorkPage_ChatPanel_SendingFileMessage (session,
    contactUsername, name, size, sentListener, signOutListener,
    crashListener, serviceErrorListener) {

    var element = document.createElement('div')
    element.className = 'WorkPage_ChatPanel_SendingFileMessage'
    element.appendChild(document.createTextNode(name + ' - ' + size))

    var url = 'data/sendFileMessage' +
        '?token=' + encodeURIComponent(session.token) +
        '&username=' + encodeURIComponent(contactUsername) +
        '&name=' + encodeURIComponent(name) +
        '&size=' + encodeURIComponent(size)

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
