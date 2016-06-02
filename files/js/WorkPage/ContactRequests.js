function WorkPage_ContactRequests (element, session, addContactListener) {

    function show (username, profile) {
        visibleUsername = username
        var contactRequestPage = ContactRequestPage_Page(session, username, profile, function () {
            addContactListener(username, profile)
            showNext()
        }, function () {
            element.removeChild(contactRequestPage.element)
        })
        element.appendChild(contactRequestPage.element)
    }

    function showNext () {

        element.removeChild(contactRequestPage.element)

        if (requests.length === 0) {
            page = null
            visibleUsername = null
            return
        }

        var request = requests.shift()
        show(request.username, request.profile)

    }

    var requests = []

    var page = null
    var visibleUsername = null

    return {
        add: function (username, profile) {
            if (page === null) show(username, profile)
            else requests.push({
                username: username,
                profile: profile,
            })
        },
        remove: function (_username) {
            if (username === _username) showNext()
            else {
                for (var i = 0; i < requests.length; i++) {
                    if (requests[i].username === _username) {
                        requests.splice(i, 1)
                        break
                    }
                }
            }
        },
    }

}
