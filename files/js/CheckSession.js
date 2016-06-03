function CheckSession (readyListener, signInListener, crashListener, serviceErrorListener) {

    var username, token
    try {
        username = localStorage.username
        token = localStorage.token
    } catch (e) {
    }

    if (username === undefined) {
        readyListener()
        return
    }

    var url = 'data/restoreSession?username=' + encodeURIComponent(username) +
        '&token=' + encodeURIComponent(token)

    var request = new XMLHttpRequest
    request.open('get', url)
    request.send()
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

        if (response === 'INVALID_USERNAME' || response === 'INVALID_TOKEN') {
            try {
                delete localStorage.username
                delete localStorage.token
            } catch (e) {
            }
            readyListener()
            return
        }

        signInListener(username, response)

    }

}
