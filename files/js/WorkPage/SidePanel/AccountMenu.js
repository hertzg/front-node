function WorkPage_SidePanel_AccountMenu (accountListener, signOutListener) {

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

    return { element: element }

}
