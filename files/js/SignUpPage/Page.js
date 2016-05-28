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
