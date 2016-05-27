function BackButton (listener) {

    var element = document.createElement('button')
    element.className = 'BackButton'
    element.appendChild(document.createTextNode('\u2039 Back'))
    element.addEventListener('click', listener)

    return { element: element }

}
