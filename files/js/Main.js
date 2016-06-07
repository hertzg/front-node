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

        function hideWelcomePage () {
            body.removeChild(welcomePage.element)
        }

        var welcomePage = WelcomePage_Page(getResourceUrl, function () {

            function hideSignUpPage () {
                body.removeChild(signUpPage.element)
            }

            var signUpPage = SignUpPage_Page(getResourceUrl, showWelcomePage, function (username, session) {
                hideSignUpPage()
                showWorkPage(username, session)
            }, function () {
                hideSignUpPage()
                showCrashPage()
            }, function () {
                hideSignUpPage()
                showServiceErrorPage()
            })
            hideWelcomePage()
            body.appendChild(signUpPage.element)
            signUpPage.focus()

        }, function (username, session) {
            hideWelcomePage()
            showWorkPage(username, session)
        }, function () {
            hideWelcomePage()
            showCrashPage()
        }, function () {
            hideWelcomePage()
            showServiceErrorPage()
        })

        body.appendChild(welcomePage.element)
        welcomePage.focus()

    }

    function showWorkPage (username, session) {

        function hideWorkPage () {
            document.title = initialTitle
            body.removeChild(workPage.element)
        }

        try {
            localStorage.username = username
            localStorage.token = session.token
        } catch (e) {
        }

        var workPage = WorkPage_Page(username, session, getResourceUrl, function () {
            hideWorkPage()
            showWelcomePage()
        }, function () {
            hideWorkPage()
            showCrashPage()
        }, function () {
            hideWorkPage()
            showServiceErrorPage()
        })
        body.appendChild(workPage.element)

    }

    var body = document.body
    var initialTitle = document.title

    for (var i in revisions) {
        var image = new Image
        image.src = getResourceUrl(i)
    }

    CheckSession(showWelcomePage, showWorkPage,
        showCrashPage, showServiceErrorPage)

})(revisions)
