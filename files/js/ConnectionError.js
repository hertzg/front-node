function ConnectionError () {

    var element = document.createElement('div')
    element.className = 'FormError'
    element.appendChild(document.createTextNode('Connection failed.'))
    element.appendChild(document.createElement('br'))
    element.appendChild(document.createTextNode('Please, check your network and try again.'))

    return { element: element }

}
