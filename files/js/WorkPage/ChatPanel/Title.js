function WorkPage_ChatPanel_Title (contactUsername,
    profile, overrideProfile, profileListener, removeListener) {

    function collapse () {
        buttonClassList.remove('selected')
        button.removeEventListener('click', collapse)
        button.removeEventListener('keydown', keyDown)
        button.addEventListener('click', expand)
        element.removeChild(contactMenu.element)
        removeEventListener('focus', windowFocus, true)
        removeEventListener('mousedown', windowMouseDown)
        contactMenu.reset()
    }

    function createButtonText () {
        return overrideProfile.fullName || profile.fullName || contactUsername
    }

    function expand () {
        buttonClassList.add('selected')
        button.removeEventListener('click', expand)
        button.addEventListener('click', collapse)
        button.addEventListener('keydown', keyDown)
        element.appendChild(contactMenu.element)
        addEventListener('focus', windowFocus, true)
        addEventListener('mousedown', windowMouseDown)
    }

    function keyDown (e) {
        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
        var keyCode = e.keyCode
        if (keyCode === 13) {
            e.preventDefault()
            contactMenu.openSelected()
        } else if (keyCode === 27) {
            e.preventDefault()
            collapse()
        } else if (keyCode === 38) {
            e.preventDefault()
            contactMenu.selectUp()
        } else if (keyCode === 40) {
            e.preventDefault()
            contactMenu.selectDown()
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

    var classPrefix = 'WorkPage_ChatPanel_Title'

    var contactMenu = WorkPage_ChatPanel_ContactMenu(function () {
        collapse()
        profileListener()
    }, function () {
        collapse()
        removeListener()
    })

    var buttonTextNode = document.createTextNode(createButtonText())

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
        enable: function () {
            button.disabled = false
        },
        editContactProfile: function (_profile) {
            profile = _profile
            buttonTextNode.nodeValue = createButtonText()
        },
        overrideContactProfile: function (_overrideProfile) {
            overrideProfile = _overrideProfile
            buttonTextNode.nodeValue = createButtonText()
        },
    }

}
