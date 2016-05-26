function WelcomePage_Page () {

    var classPrefix = 'WelcomePage_Page'

    var usernameItem = WelcomePage_UsernameItem()

    var passwordItem = WelcomePage_PasswordItem()

    var signInButton = document.createElement('button')
    signInButton.className = classPrefix + '-signInButton'
    signInButton.appendChild(document.createTextNode('Sign In'))

    var signInFormElement = document.createElement('div')
    signInFormElement.className = classPrefix + '-signInForm'
    signInFormElement.appendChild(usernameItem.element)
    signInFormElement.appendChild(passwordItem.element)
    signInFormElement.appendChild(signInButton)

    var logoElement = document.createElement('img')
    logoElement.className = classPrefix + '-logo'
    logoElement.src = 'img/logo.svg'

    var logoWrapperElement = document.createElement('div')
    logoWrapperElement.className = classPrefix + '-logoWrapper'
    logoWrapperElement.appendChild(logoElement)

    var signUpButton = document.createElement('button')
    signUpButton.className = classPrefix + '-signUpButton'
    signUpButton.appendChild(document.createTextNode('Create an Account'))

    var centerElement = document.createElement('div')
    centerElement.className = classPrefix + '-center'
    centerElement.appendChild(logoWrapperElement)
    centerElement.appendChild(signInFormElement)
    centerElement.appendChild(document.createTextNode('New to Bazgu?'))
    centerElement.appendChild(signUpButton)

    var element = document.createElement('div')
    element.className = classPrefix
    element.style.backgroundImage = 'url(img/grass.svg), url(img/clouds.svg)'
    element.appendChild(centerElement)

    return { element: element }

}
