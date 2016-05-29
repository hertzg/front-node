function WorkPage_SidePanel_Contact (getResourceUrl, data,
    selectListener, deselectListener, profileListener, removeListener) {

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

    var chatPanel = WorkPage_ChatPanel_Panel(data, getResourceUrl,
        profileListener, removeListener, deselectAndCallListener)

    var element = document.createElement('div')
    element.className = 'WorkPage_SidePanel_Contact offline'
    element.style.backgroundImage = 'url(' + getResourceUrl('img/user-' + (data.online ? 'online' : 'offline') + '.svg') + ')'
    element.appendChild(document.createTextNode(data.displayName || data.username))
    element.addEventListener('click', select)

    var classList = element.classList

    return {
        chatPanel: chatPanel,
        data: data,
        deselect: deselect,
        element: element,
    }

}
