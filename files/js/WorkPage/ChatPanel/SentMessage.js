function WorkPage_ChatPanel_SentMessage (text) {

    var element = document.createElement('div')
    element.className = 'WorkPage_ChatPanel_SentMessage'
    element.appendChild(document.createTextNode(text))

    var classList = element.classList

    return {
        element: element,
        send: function (session, username, signOutListener,
            crashListener, serviceErrorListener) {

            classList.add('sending')

            var url = 'data/sendTextMessage' +
                '?token=' + encodeURIComponent(session.token) +
                '&username=' + encodeURIComponent(username) +
                '&text=' + encodeURIComponent(text)

            var request = new XMLHttpRequest
            request.open('get', url)
            request.send()
            request.onerror = function () {
                classList.remove('sending')
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

                classList.remove('sending')

            }

        },
    }

}
