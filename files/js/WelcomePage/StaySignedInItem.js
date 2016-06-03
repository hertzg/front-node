function WelcomePage_StaySignedInItem () {

    function check () {
        checked = true
        buttonNode.nodeValue = '\u2713'
        buttonElement.removeEventListener('click', check)
        buttonElement.addEventListener('click', uncheck)
    }

    function uncheck () {
        checked = false
        buttonNode.nodeValue = ''
        buttonElement.removeEventListener('click', uncheck)
        buttonElement.addEventListener('click', check)
    }

    var classPrefix = 'WelcomePage_StaySignedInItem'

    var buttonNode = document.createTextNode('')

    var buttonElement = document.createElement('button')
    buttonElement.className = classPrefix + '-button'
    buttonElement.type = 'button'
    buttonElement.appendChild(buttonNode)
    buttonElement.addEventListener('click', check)

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(buttonElement)
    element.appendChild(document.createTextNode('Stay signed in'))

    var checked = false

    return {
        element: element,
        disable: function () {
            buttonElement.disabled = true
        },
        enable: function () {
            buttonElement.disabled = false
        },
        isChecked: function () {
            return checked
        },
    }

}
