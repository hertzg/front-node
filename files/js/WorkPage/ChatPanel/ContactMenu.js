function WorkPage_ChatPanel_ContactMenu (profileListener, removeListener) {

    var classPrefix = 'WorkPage_ChatPanel_ContactMenu'

    var profileItemElement = document.createElement('div')
    profileItemElement.className = classPrefix + '-item'
    profileItemElement.appendChild(document.createTextNode('Profile'))
    profileItemElement.addEventListener('click', profileListener)

    var removeItemElement = document.createElement('div')
    removeItemElement.className = classPrefix + '-item'
    removeItemElement.appendChild(document.createTextNode('Remove'))
    removeItemElement.addEventListener('click', removeListener)

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(profileItemElement)
    element.appendChild(removeItemElement)

    return { element: element }

}
