function WorkPage_SidePanel_Title (username, session, accountListener, signOutListener) {

    function collapse () {
        buttonClassList.remove('selected')
        button.removeEventListener('click', collapse)
        button.removeEventListener('keydown', keyDown)
        button.addEventListener('click', expand)
        element.removeChild(accountMenu.element)
        removeEventListener('focus', windowFocus, true)
        removeEventListener('mousedown', windowMouseDown)
        accountMenu.reset()
    }

    function expand () {
        buttonClassList.add('selected')
        button.removeEventListener('click', expand)
        button.addEventListener('click', collapse)
        button.addEventListener('keydown', keyDown)
        element.appendChild(accountMenu.element)
        addEventListener('focus', windowFocus, true)
        addEventListener('mousedown', windowMouseDown)
    }

    function keyDown (e) {
        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
        var keyCode = e.keyCode
        if (keyCode === 13) {
            e.preventDefault()
            accountMenu.openSelected()
        } else if (keyCode === 27) {
            e.preventDefault()
            collapse()
        } else if (keyCode === 38) {
            e.preventDefault()
            accountMenu.selectUp()
        } else if (keyCode === 40) {
            e.preventDefault()
            accountMenu.selectDown()
        }
    }

    function windowFocus (e) {
        if (IsChildElement(element, e.target)) return
        collapse()
    }

    function windowMouseDown (e) {
        if (e.button !== 0) return
        if (IsChildElement(element, e.target)) return
        collapse()
    }

    var classPrefix = 'WorkPage_SidePanel_Title'

    var accountMenu = WorkPage_SidePanel_AccountMenu(function () {
        collapse()
        accountListener()
    }, function () {
        collapse()
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
    button.addEventListener('click', expand)

    var buttonClassList = button.classList

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(button)

    return {
        element: element,
        disable: function () {
            button.disabled = true
        },
        editProfile: function (profile) {
            buttonTextNode.nodeValue = profile.fullName || username
        },
        enable: function () {
            button.disabled = false
        },
    }

}
