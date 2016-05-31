function WorkPage_PullMessages (session, messageListener) {

    function pull () {

        var request = new XMLHttpRequest
        request.open('get', 'data/pullMessages?token=' + encodeURIComponent(session.token))
        request.send()
        request.onerror = function () {
            var timeout = setTimeout(pull, 1000)
            abortFunction = function () {
                clearTimeout(timeout)
            }
        }
        request.onload = function () {
            var response = JSON.parse(request.responseText)
            if (response !== 'NOTHING_TO_PULL') {
                response.forEach(messageListener)
            }
            pull()
        }

        abortFunction = function () {
            request.abort()
        }

    }

    var abortFunction

    pull()

    return {
        abort: function () {
            abortFunction()
        },
    }

}
