function WelcomePage_StaySignedInItem () {

    var classPrefix = 'WelcomePage_StaySignedInItem'

    var boxElement = document.createElement('button')
    boxElement.className = classPrefix + '-box'
    boxElement.type = 'button'

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(boxElement)
    element.appendChild(document.createTextNode('Stay signed in'))

    return { element: element }

}
