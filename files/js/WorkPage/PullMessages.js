function WorkPage_PullMessages (session, messageListener, crashListener) {

    function pull () {

        var request = new XMLHttpRequest
        request.open('get', 'data/pullMessages?token=' + encodeURIComponent(session.token))
        request.send()
        request.onerror = schedulePull
        request.onload = function () {

            try {
                var response = JSON.parse(request.responseText)
            } catch (e) {
                crashListener()
                return
            }

            if (response === 'INTERNAL_SERVER_ERROR') {
                schedulePull()
                return
            }

            if (response !== 'NOTHING_TO_PULL') {
                response.forEach(messageListener)
            }

            pull()

        }

        abortFunction = function () {
            request.abort()
        }

    }

    function schedulePull () {
        var timeout = setTimeout(pull, 2000)
        abortFunction = function () {
            clearTimeout(timeout)
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
