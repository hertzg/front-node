function WorkPage_PullMessages (session, messageListener,
    crashListener, signOutListener, serviceErrorListener) {

    function pull () {

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

            if (response === 'INVALID_TOKEN') {
                signOutListener()
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

    var abortFunction
    var url = 'data/pullMessages?token=' + encodeURIComponent(session.token)
    pull()

    return {
        abort: function () {
            abortFunction()
        },
    }

}
