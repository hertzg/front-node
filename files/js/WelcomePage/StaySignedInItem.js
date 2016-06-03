function WelcomePage_StaySignedInItem () {

    var classPrefix = 'WelcomePage_StaySignedInItem'

    var buttonElement = document.createElement('button')
    buttonElement.className = classPrefix + '-button'
    buttonElement.type = 'button'

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(buttonElement)
    element.appendChild(document.createTextNode('Stay signed in'))

    return {
        element: element,
        disable: function () {
            buttonElement.disabled = true
        },
        enable: function () {
            buttonElement.disabled = false
        },
    }

}
