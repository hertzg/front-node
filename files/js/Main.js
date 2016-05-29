(function (revisions) {

    function getResourceUrl (url) {
        return url + '?' + revisions[url]
    }

    function showWelcomePage () {

        var welcomePage = WelcomePage_Page(getResourceUrl, function () {
            var signUpPage = SignUpPage_Page(getResourceUrl, showWelcomePage, function () {
                body.removeChild(signUpPage.element)
                showWorkPage()
            })
            body.removeChild(welcomePage.element)
            body.appendChild(signUpPage.element)
            signUpPage.focus()
        }, function () {
            body.removeChild(welcomePage.element)
            showWorkPage()
        })

        body.appendChild(welcomePage.element)

    }

    function showWorkPage () {
        var workPage = WorkPage_Page({
            username: 'daniel.tompkins',
            displayName: 'Daniel Tompkins',
        }, getResourceUrl, showWelcomePage)
        body.appendChild(workPage.element)
    }

    var body = document.body
    showWelcomePage()

})(revisions)
