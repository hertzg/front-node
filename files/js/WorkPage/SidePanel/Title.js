function WorkPage_SidePanel_Title (accountListener, signOutListener) {

    function deselect () {
        buttonClassList.remove('selected')
        button.removeEventListener('click', deselect)
        button.addEventListener('click', select)
        element.removeChild(accountMenu.element)
    }

    function select () {
        buttonClassList.add('selected')
        button.removeEventListener('click', select)
        button.addEventListener('click', deselect)
        element.appendChild(accountMenu.element)
    }

    var classPrefix = 'WorkPage_SidePanel_Title'

    var accountMenu = WorkPage_SidePanel_AccountMenu(function () {
        deselect()
        accountListener()
    }, function () {
        deselect()
        signOutListener()
    })

    var buttonTextElement = document.createElement('span')
    buttonTextElement.className = classPrefix + '-buttonText'
    buttonTextElement.appendChild(document.createTextNode('Daniel Tompkins'))

    var button = document.createElement('button')
    button.className = classPrefix + '-button'
    button.appendChild(buttonTextElement)
    button.appendChild(document.createTextNode(' \u25be'))
    button.addEventListener('click', select)

    var buttonClassList = button.classList

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(button)

    return { element: element }

}
