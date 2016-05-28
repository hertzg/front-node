function SignUpPage_Page (getResourceUrl, backListener) {

    var classPrefix = 'SignUpPage_Page'

    var usernameItem = SignUpPage_UsernameItem()

    var passwordItem = SignUpPage_PasswordItem()

    var repeatPasswordItem = SignUpPage_RepeatPasswordItem()

    var captchaItem = SignUpPage_CaptchaItem()

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

        var password = passwordItem.getValue()

        var repeatPassword = repeatPasswordItem.getValue()

        var captcha = captchaItem.getValue()

        var url = 'data/signUp?username=' + encodeURIComponent(username) +
            '&password=' + encodeURIComponent(password) +
            '&captcha_token=' + encodeURIComponent(captcha.token) +
            '&captcha_value=' + encodeURIComponent(captcha.value)

        var request = new XMLHttpRequest
        request.open('get', url)
        request.send()
        request.onload = function () {
            var response = JSON.parse(request.responseText)
            console.log(response)
        }

    })

    var frameElement = document.createElement('div')
    frameElement.className = classPrefix + '-frame'
    frameElement.appendChild(backButton.element)
    frameElement.appendChild(titleElement)
    frameElement.appendChild(form)

    var element = document.createElement('div')
    element.className = classPrefix
    element.style.backgroundImage =
        'url(' + getResourceUrl('img/grass.svg') + '),' +
        ' url(' + getResourceUrl('img/clouds.svg') + ')'
    element.appendChild(frameElement)

    return { element: element }

}
