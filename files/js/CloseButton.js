function CloseButton (listener) {

    var element = document.createElement('button')
    element.className = 'CloseButton'
    element.appendChild(document.createTextNode('Close \xd7'))
    element.addEventListener('click', listener)

    return { element: element }

}
