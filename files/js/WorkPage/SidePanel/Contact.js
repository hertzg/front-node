function WorkPage_SidePanel_Contact (getResourceUrl,
    data, selectListener, deselectListener) {

    function deselect () {
        classList.remove('selected')
        element.removeEventListener('click', deselect)
        element.addEventListener('click', select)
        deselectListener()
    }

    function select () {
        classList.add('selected')
        element.removeEventListener('click', select)
        element.addEventListener('click', deselect)
        selectListener()
    }

    var element = document.createElement('div')
    element.className = 'WorkPage_SidePanel_Contact offline'
    element.style.backgroundImage = 'url(' + getResourceUrl('img/user-offline.svg') + ')'
    element.appendChild(document.createTextNode(data.displayName))
    element.addEventListener('click', select)

    var classList = element.classList

    return {
        deselect: deselect,
        element: element,
    }

}
