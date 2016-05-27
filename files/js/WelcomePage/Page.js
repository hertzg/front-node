function WelcomePage_Page (getResourceUrl, signUpListener, signInListener) {

    var classPrefix = 'WelcomePage_Page'

    var usernameItem = WelcomePage_UsernameItem()

    var passwordItem = WelcomePage_PasswordItem()

    var signInButton = document.createElement('button')
    signInButton.className = classPrefix + '-signInButton'
    signInButton.appendChild(document.createTextNode('Sign In'))

    var staySignedInItem = WelcomePage_StaySignedInItem()

    var signInForm = document.createElement('form')
    signInForm.className = classPrefix + '-signInForm'
    signInForm.appendChild(usernameItem.element)
    signInForm.appendChild(passwordItem.element)
    signInForm.appendChild(staySignedInItem.element)
    signInForm.appendChild(signInButton)
    signInForm.addEventListener('submit', signInListener)

    var logoElement = document.createElement('img')
    logoElement.className = classPrefix + '-logo'
    logoElement.src = getResourceUrl('img/logo.svg')

    var logoWrapperElement = document.createElement('div')
    logoWrapperElement.className = classPrefix + '-logoWrapper'
    logoWrapperElement.appendChild(logoElement)

    var signUpButton = document.createElement('button')
    signUpButton.className = classPrefix + '-signUpButton'
    signUpButton.appendChild(document.createTextNode('Create an Account'))
    signUpButton.addEventListener('click', signUpListener)

    var frameElement = document.createElement('div')
    frameElement.className = classPrefix + '-frame'
    frameElement.appendChild(logoWrapperElement)
    frameElement.appendChild(signInForm)
    frameElement.appendChild(document.createTextNode('New to Bazgu?'))
    frameElement.appendChild(document.createElement('br'))
    frameElement.appendChild(signUpButton)

    var element = document.createElement('div')
    element.className = classPrefix
    element.style.backgroundImage =
        'url(' + getResourceUrl('img/grass.svg') + '),' +
        ' url(' + getResourceUrl('img/clouds.svg') + ')'
    element.appendChild(frameElement)

    return { element: element }

}
