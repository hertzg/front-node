function ServiceError () {

    var element = document.createElement('div')
    element.className = 'FormError'
    element.appendChild(document.createTextNode('Operation failed.'))
    element.appendChild(document.createElement('br'))
    element.appendChild(document.createTextNode('Please, try again.'))

    return { element: element }

}
