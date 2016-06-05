function WorkPage_SidePanel_Title (username, session, accountListener, signOutListener) {

    function deselect () {
        buttonClassList.remove('selected')
        button.removeEventListener('click', deselect)
        button.removeEventListener('keydown', keyDown)
        button.addEventListener('click', select)
        element.removeChild(accountMenu.element)
        removeEventListener('mousedown', windowMouseDown)
        accountMenu.reset()
    }

    function keyDown (e) {
        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
        var keyCode = e.keyCode
        if (keyCode === 13) {
            e.preventDefault()
            accountMenu.openSelected()
        } else if (keyCode === 27) {
            e.preventDefault()
            deselect()
        } else if (keyCode === 38) {
            e.preventDefault()
            accountMenu.selectUp()
        } else if (keyCode === 40) {
            e.preventDefault()
            accountMenu.selectDown()
        }
    }

    function select () {
        buttonClassList.add('selected')
        button.removeEventListener('click', select)
        button.addEventListener('click', deselect)
        button.addEventListener('keydown', keyDown)
        element.appendChild(accountMenu.element)
        addEventListener('mousedown', windowMouseDown)
    }

    function windowMouseDown (e) {
        if (e.button !== 0) return
        if (IsChildElement(element, e.target)) return
        deselect()
    }

    var classPrefix = 'WorkPage_SidePanel_Title'

    var accountMenu = WorkPage_SidePanel_AccountMenu(function () {
        deselect()
        accountListener()
    }, function () {
        deselect()
        signOutListener()
    })

    var buttonTextNode = document.createTextNode(session.profile.fullName || username)

    var buttonTextElement = document.createElement('span')
    buttonTextElement.className = classPrefix + '-buttonText'
    buttonTextElement.appendChild(buttonTextNode)

    var button = document.createElement('button')
    button.className = classPrefix + '-button'
    button.appendChild(buttonTextElement)
    button.appendChild(document.createTextNode(' \u25be'))
    button.addEventListener('click', select)

    var buttonClassList = button.classList

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(button)

    return {
        element: element,
        editProfile: function (profile) {
            buttonTextNode.nodeValue = profile.fullName || username
        },
    }

}
