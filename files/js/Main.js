(function () {

    function showWelcomePage () {
        var welcomePage = WelcomePage_Page(function () {
            body.removeChild(welcomePage.element)
            var signUpPage = SignUpPage_Page(showWelcomePage)
            body.appendChild(signUpPage.element)
        })
        body.appendChild(welcomePage.element)
    }

    var body = document.body
    showWelcomePage()

})()
