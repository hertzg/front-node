function SignUpPage_Page (getResourceUrl,
    backListener, signUpListener, crashListener) {

    function enableItems () {
        usernameItem.enable()
        passwordItem.enable()
        repeatPasswordItem.enable()
        captchaItem.enable()
        button.disabled = false
    }

    var classPrefix = 'SignUpPage_Page'

    var usernameItem = SignUpPage_UsernameItem()

    var passwordItem = SignUpPage_PasswordItem()

    var repeatPasswordItem = SignUpPage_RepeatPasswordItem()

    var captchaItem = SignUpPage_CaptchaItem(crashListener)

    var backButton = BackButton(backListener)

    var titleElement = document.createElement('h1')
    titleElement.className = classPrefix + '-title'
    titleElement.appendChild(document.createTextNode('Create an Account'))

    var button = document.createElement('button')
    button.className = classPrefix + '-button'
    button.appendChild(document.createTextNode('Sign Up'))

    var form = document.createElement('form')
    form.className = classPrefix + '-form'
    form.appendChild(usernameItem.element)
    form.appendChild(passwordItem.element)
    form.appendChild(repeatPasswordItem.element)
    form.appendChild(captchaItem.element)
    form.appendChild(button)
    form.addEventListener('submit', function (e) {

        e.preventDefault()

        var username = usernameItem.getValue()
        if (username === null) return

        var password = passwordItem.getValue()
        if (password === null) return

        var repeatPassword = repeatPasswordItem.getValue(password)
        if (repeatPassword === null) return

        var captcha = captchaItem.getValue()
        if (captcha === null) return

        usernameItem.disable()
        passwordItem.disable()
        repeatPasswordItem.disable()
        captchaItem.disable()
        button.disabled = true

        var url = 'data/signUp?username=' + encodeURIComponent(username) +
            '&password=' + encodeURIComponent(password) +
            '&captcha_token=' + encodeURIComponent(captcha.token) +
            '&captcha_value=' + encodeURIComponent(captcha.value)

        var request = new XMLHttpRequest
        request.open('get', url)
        request.send()
        request.onerror = enableItems
        request.onload = function () {

            if (request.status !== 200) {
                enableItems()
                console.log(request.responseText)
                return
            }

            try {
                var response = JSON.parse(request.responseText)
            } catch (e) {
                crashListener()
                return
            }

            if (response === 'USERNAME_UNAVAILABLE') {
                enableItems()
                usernameItem.showError(function (errorElement) {
                    errorElement.appendChild(document.createTextNode('The username is unavailable.'))
                    errorElement.appendChild(document.createElement('br'))
                    errorElement.appendChild(document.createTextNode('Please, try something else.'))
                })
                return
            }

            if (response.error === 'INVALID_CAPTCHA_TOKEN') {
                enableItems()
                captchaItem.setNewCaptcha(response.newCaptcha)
                captchaItem.showError(function (errorElement) {
                    errorElement.appendChild(document.createTextNode('The verification has expired.'))
                    errorElement.appendChild(document.createElement('br'))
                    errorElement.appendChild(document.createTextNode('Please, try again.'))
                })
                return
            }

            if (response === 'INVALID_CAPTCHA_VALUE') {
                enableItems()
                captchaItem.showError(function (errorElement) {
                    errorElement.appendChild(document.createTextNode('The verification is invalid.'))
                })
                return
            }

            signUpListener(username, response)

        }

    })

    var frameElement = document.createElement('div')
    frameElement.className = classPrefix + '-frame'
    frameElement.appendChild(backButton.element)
    frameElement.appendChild(titleElement)
    frameElement.appendChild(form)

    var alignerElement = document.createElement('div')
    alignerElement.className = classPrefix + '-aligner'

    var element = document.createElement('div')
    element.className = classPrefix
    element.style.backgroundImage =
        'url(' + getResourceUrl('img/grass.svg') + '),' +
        ' url(' + getResourceUrl('img/clouds.svg') + ')'
    element.appendChild(alignerElement)
    element.appendChild(frameElement)

    return {
        element: element,
        focus: usernameItem.focus,
    }

}
