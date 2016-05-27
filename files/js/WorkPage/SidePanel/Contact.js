function WorkPage_SidePanel_Contact (getResourceUrl,
    data, selectListener, deselectListener, profileListener) {

    function deselect () {
        classList.remove('selected')
        element.removeEventListener('click', deselectAndCallListener)
        element.addEventListener('click', select)
    }

    function deselectAndCallListener () {
        deselect()
        deselectListener()
    }

    function select () {
        classList.add('selected')
        element.removeEventListener('click', select)
        element.addEventListener('click', deselectAndCallListener)
        selectListener()
    }

    var chatPanel = WorkPage_ChatPanel_Panel(data, profileListener, function () {
        console.log('remove')
    }, deselectAndCallListener)

    var element = document.createElement('div')
    element.className = 'WorkPage_SidePanel_Contact offline'
    element.style.backgroundImage = 'url(' + getResourceUrl('img/user-offline.svg') + ')'
    element.appendChild(document.createTextNode(data.displayName))
    element.addEventListener('click', select)

    var classList = element.classList

    return {
        chatPanel: chatPanel,
        data: data,
        deselect: deselect,
        element: element,
    }

}
