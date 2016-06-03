(function (revisions) {

    function getResourceUrl (url) {
        return url + '?' + revisions[url]
    }

    function showCrashPage () {
        body.appendChild(CrashPage_Page(getResourceUrl, function () {
            location.reload(true)
        }).element)
    }

    function showServiceErrorPage () {
        body.appendChild(ServiceErrorPage_Page(getResourceUrl, function () {
            location.reload(true)
        }).element)
    }

    function showWelcomePage () {

        var welcomePage = WelcomePage_Page(getResourceUrl, function () {
            var signUpPage = SignUpPage_Page(getResourceUrl, showWelcomePage, function (username, session) {
                body.removeChild(signUpPage.element)
                showWorkPage(username, session)
            }, function () {
                body.removeChild(signUpPage.element)
                showCrashPage()
            }, function () {
                body.removeChild(signUpPage.element)
                showServiceErrorPage()
            })
            body.removeChild(welcomePage.element)
            body.appendChild(signUpPage.element)
            signUpPage.focus()
        }, function (username, session) {
            body.removeChild(welcomePage.element)
            showWorkPage(username, session)
        }, function () {
            body.removeChild(welcomePage.element)
            showCrashPage()
        }, function () {
            body.removeChild(welcomePage.element)
            showServiceErrorPage()
        })

        body.appendChild(welcomePage.element)
        welcomePage.focus()

    }

    function showWorkPage (username, session) {

        try {
            localStorage.username = username
            localStorage.token = session.token
        } catch (e) {
        }

        var workPage = WorkPage_Page(username, session, getResourceUrl, function () {
            document.title = initialTitle
            body.removeChild(workPage.element)
            showWelcomePage()
        }, function () {
            document.title = initialTitle
            body.removeChild(workPage.element)
            showCrashPage()
        }, function () {
            document.title = initialTitle
            body.removeChild(workPage.element)
            showServiceErrorPage()
        })
        body.appendChild(workPage.element)

    }

    var body = document.body
    var initialTitle = document.title

    CheckSession(showWelcomePage, showWorkPage,
        showCrashPage, showServiceErrorPage)

})(revisions)
