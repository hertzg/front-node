function SignUpPage_Page (backListener) {

    var classPrefix = 'SignUpPage_Page'

    var usernameItem = SignUpPage_UsernameItem()

    var passwordItem = SignUpPage_PasswordItem()

    var repeatPasswordItem = SignUpPage_RepeatPasswordItem()

    var backButton = document.createElement('button')
    backButton.className = classPrefix + '-backButton'
    backButton.appendChild(document.createTextNode('\u2039 Back'))
    backButton.addEventListener('click', backListener)

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
    form.appendChild(button)

    var frameElement = document.createElement('div')
    frameElement.className = classPrefix + '-frame'
    frameElement.appendChild(backButton)
    frameElement.appendChild(titleElement)
    frameElement.appendChild(form)

    var element = document.createElement('div')
    element.className = classPrefix
    element.style.backgroundImage = 'url(img/grass.svg), url(img/clouds.svg)'
    element.appendChild(frameElement)

    return { element: element }

}
