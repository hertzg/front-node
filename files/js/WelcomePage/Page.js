function WelcomePage_Page () {

    var classPrefix = 'WelcomePage_Page'

    var usernameItem = WelcomePage_UsernameItem()

    var passwordItem = WelcomePage_PasswordItem()

    var button = document.createElement('button')
    button.className = classPrefix + '-button'
    button.appendChild(document.createTextNode('Sign In'))

    var signInFormElement = document.createElement('div')
    signInFormElement.className = classPrefix + '-signInForm'
    signInFormElement.appendChild(usernameItem.element)
    signInFormElement.appendChild(passwordItem.element)
    signInFormElement.appendChild(button)

    var logoElement = document.createElement('img')
    logoElement.className = classPrefix + '-logo'
    logoElement.src = 'img/logo.svg'

    var centerElement = document.createElement('div')
    centerElement.className = classPrefix + '-center'
    centerElement.appendChild(logoElement)
    centerElement.appendChild(signInFormElement)

    var element = document.createElement('div')
    element.className = classPrefix
    element.style.backgroundImage = 'url(img/grass.svg), url(img/clouds.svg)'
    element.appendChild(centerElement)

    return { element: element }

}
