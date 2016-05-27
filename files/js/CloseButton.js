function CloseButton (listener) {

    var element = document.createElement('button')
    element.className = 'CloseButton'
    element.appendChild(document.createTextNode('Close'))
    element.addEventListener('click', listener)

    return { element: element }

}
