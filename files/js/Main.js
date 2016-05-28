(function (revisions) {

    function getResourceUrl (url) {
        return url + '?' + revisions[url]
    }

    function showWelcomePage () {
        var welcomePage = WelcomePage_Page(getResourceUrl, function () {
            var signUpPage = SignUpPage_Page(getResourceUrl, showWelcomePage)
            body.removeChild(welcomePage.element)
            body.appendChild(signUpPage.element)
        }, function () {
            var workPage = WorkPage_Page({
                username: 'daniel.tompkins',
                displayName: 'Daniel Tompkins',
            }, getResourceUrl, showWelcomePage)
            body.removeChild(welcomePage.element)
            body.appendChild(workPage.element)
        })
        body.appendChild(welcomePage.element)
    }


    var body = document.body
//    showWelcomePage()
    body.appendChild(SignUpPage_Page(getResourceUrl, showWelcomePage).element)

})(revisions)
