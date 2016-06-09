function CrashError () {

    var element = document.createElement('div')
    element.className = 'FormError'
    element.appendChild(document.createTextNode('Something went wrong.'))
    element.appendChild(document.createElement('br'))
    element.appendChild(document.createTextNode('Please, try again.'))

    return { element: element }

}
