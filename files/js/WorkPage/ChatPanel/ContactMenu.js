function WorkPage_ChatPanel_ContactMenu (profileListener, removeListener) {

    function resetSelected () {
        selectedElement.classList.remove('active')
    }

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

    var selectedElement = null

    return {
        element: element,
        openSelected: function () {
            if (selectedElement === profileItemElement) profileListener()
            else if (selectedElement === removeItemElement) removeListener()
        },
        reset: function () {
            if (selectedElement === null) return
            resetSelected()
            selectedElement = null
        },
        selectDown: function () {
            if (selectedElement === profileItemElement) {
                resetSelected()
                selectedElement = removeItemElement
            } else {
                if (selectedElement !== null) resetSelected()
                selectedElement = profileItemElement
            }
            selectedElement.classList.add('active')
        },
        selectUp: function () {
            if (selectedElement === removeItemElement) {
                resetSelected()
                selectedElement = profileItemElement
            } else {
                if (selectedElement !== null) resetSelected()
                selectedElement = removeItemElement
            }
            selectedElement.classList.add('active')
        },
    }
}
