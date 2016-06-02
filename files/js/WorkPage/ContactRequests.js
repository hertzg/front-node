function WorkPage_ContactRequests (element, session, addContactListener) {

    function show (username, profile) {
        visibleUsername = username
        contactRequestPage = ContactRequestPage_Page(session, username, profile, function () {
            addContactListener(username, profile)
            showNext()
        }, function () {

            showNext()

            var url = 'data/ignoreRequest' +
                '?token=' + encodeURIComponent(session.token) +
                '&username=' + encodeURIComponent(username)

            var request = new XMLHttpRequest
            request.open('get', url)
            request.send()
            request.onload = function () {

                try {
                    var response = JSON.parse(request.responseText)
                } catch (e) {
                    if (contactRequestPage !== null) {
                        element.removeChild(contactRequestPage.element)
                    }
                    crashListener()
                    return
                }

                console.log(response)

            }

        })
        element.appendChild(contactRequestPage.element)
    }

    function showNext () {

        element.removeChild(contactRequestPage.element)

        if (numRequets === 0) {
            contactRequestPage = null
            visibleUsername = null
            return
        }

        var username = Object.keys(requests)[0]
        var profile = requests[username]
        delete requests[username]
        numRequets--
        show(username, profile)

    }

    var numRequets = 0
    var requests = Object.create(null)

    var contactRequestPage = null
    var visibleUsername = null

    return {
        add: function (username, profile) {
            if (contactRequestPage === null) show(username, profile)
            else {
                requests[username] = profile
                numRequets++
            }
        },
        remove: function (_username) {
            if (username === _username) showNext()
            else {
                delete requests[username]
                numRequets++
            }
        },
    }

}
