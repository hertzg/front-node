function WorkPage_SidePanel_AccountMenu (accountListener, signOutListener) {

    function resetSelected () {
        selectedElement.classList.remove('active')
    }

    var classPrefix = 'WorkPage_SidePanel_AccountMenu'

    var accountItemElement = document.createElement('div')
    accountItemElement.className = classPrefix + '-item'
    accountItemElement.appendChild(document.createTextNode('Account'))
    accountItemElement.addEventListener('click', accountListener)

    var exitItemElement = document.createElement('div')
    exitItemElement.className = classPrefix + '-item'
    exitItemElement.appendChild(document.createTextNode('Sign Out'))
    exitItemElement.addEventListener('click', signOutListener)

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(accountItemElement)
    element.appendChild(exitItemElement)

    var selectedElement = null

    return {
        element: element,
        openSelected: function () {
            if (selectedElement === accountItemElement) accountListener()
            else if (selectedElement === exitItemElement) signOutListener()
        },
        reset: function () {
            if (selectedElement === null) return
            resetSelected()
            selectedElement = null
        },
        selectDown: function () {
            if (selectedElement === accountItemElement) {
                resetSelected()
                selectedElement = exitItemElement
            } else {
                if (selectedElement !== null) resetSelected()
                selectedElement = accountItemElement
            }
            selectedElement.classList.add('active')
        },
        selectUp: function () {
            if (selectedElement === exitItemElement) {
                resetSelected()
                selectedElement = accountItemElement
            } else {
                if (selectedElement !== null) resetSelected()
                selectedElement = exitItemElement
            }
            selectedElement.classList.add('active')
        },
    }

}
