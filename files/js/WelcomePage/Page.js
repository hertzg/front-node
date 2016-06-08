function WelcomePage_Page (getResourceUrl, signUpListener,
    signInListener, crashListener, serviceErrorListener) {

    function enableItems () {
        usernameItem.enable()
        passwordItem.enable()
        staySignedInItem.disable()
        signInButton.disabled = false
        signInNode.nodeValue = 'Sign In'
    }

    var classPrefix = 'WelcomePage_Page'

    var usernameItem = WelcomePage_UsernameItem()

    var passwordItem = WelcomePage_PasswordItem()

    var signInNode = document.createTextNode('Sign In')

    var signInButton = document.createElement('button')
    signInButton.className = classPrefix + '-signInButton'
    signInButton.appendChild(signInNode)

    var staySignedInItem = WelcomePage_StaySignedInItem()

    var signInForm = document.createElement('form')
    signInForm.className = classPrefix + '-signInForm'
    signInForm.appendChild(usernameItem.element)
    signInForm.appendChild(passwordItem.element)
    signInForm.appendChild(staySignedInItem.element)
    signInForm.appendChild(signInButton)
    signInForm.addEventListener('submit', function (e) {

        e.preventDefault()
        usernameItem.clearError()
        passwordItem.clearError()

        var username = usernameItem.getValue()
        if (username === null) return

        var password = passwordItem.getValue()
        if (password === null) return

        usernameItem.disable()
        passwordItem.disable()
        staySignedInItem.disable()
        signInButton.disabled = true
        signInNode.nodeValue = 'Signing in...'

        var url = 'data/signIn?username=' + encodeURIComponent(username) +
            '&password=' + encodeURIComponent(password)
        if (staySignedInItem.isChecked()) url += '&longTerm=true'

        var request = new XMLHttpRequest
        request.open('get', url)
        request.send()
        request.onload = function () {

            if (request.status !== 200) {
                serviceErrorListener()
                return
            }

            try {
                var response = JSON.parse(request.responseText)
            } catch (e) {
                crashListener()
                return
            }

            if (response === 'INVALID_USERNAME') {
                enableItems()
                usernameItem.showError(function (errorElement) {
                    errorElement.appendChild(document.createTextNode('There is no such user.'))
                })
                return
            }

            if (response === 'INVALID_PASSWORD') {
                enableItems()
                passwordItem.showError(function (errorElement) {
                    errorElement.appendChild(document.createTextNode('The password is incorrect.'))
                })
                return
            }

            signInListener(username, response)

        }

    })

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
