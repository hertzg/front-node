(function (revisions) {

    function getResourceUrl (url) {
        return url + '?' + revisions[url]
    }

    function showWelcomePage () {

        var welcomePage = WelcomePage_Page(getResourceUrl, function () {
            var signUpPage = SignUpPage_Page(getResourceUrl, showWelcomePage, function (username, session) {
                body.removeChild(signUpPage.element)
                showWorkPage(username, session)
            })
            body.removeChild(welcomePage.element)
            body.appendChild(signUpPage.element)
            signUpPage.focus()
        }, function (username, session) {
            body.removeChild(welcomePage.element)
            showWorkPage(username, session)
        })

        body.appendChild(welcomePage.element)
        welcomePage.focus()

    }

    function showWorkPage (username, session) {
        var workPage = WorkPage_Page(username,
            session, getResourceUrl, showWelcomePage)
        body.appendChild(workPage.element)
    }

    var body = document.body
    showWelcomePage()

})(revisions)
