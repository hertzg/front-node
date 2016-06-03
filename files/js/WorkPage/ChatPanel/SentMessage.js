function WorkPage_ChatPanel_SentMessage (text) {

    var element = document.createElement('div')
    element.className = 'WorkPage_ChatPanel_SentMessage'
    element.appendChild(document.createTextNode(text))

    var classList = element.classList

    return {
        element: element,
        send: function (session, username) {

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
                classList.remove('sending')
            }

        },
    }

}
