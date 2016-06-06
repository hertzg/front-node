function AccountPage_PrivacySelect (getResourceUrl, value, changeListener) {

    function add (itemValue, text) {

        function click () {
            if (value !== itemValue) {
                value = itemValue
                normalBackgroundImage = backgroundImage(value),
                activeBackgroundImage = backgroundImage(value + '-active')
                changeListener()
            }
            collapse()
        }

        var element = document.createElement('div')
        element.className = classPrefix + '-item'
        element.appendChild(document.createTextNode(text))
        element.style.backgroundImage = backgroundImage(itemValue)
        element.addEventListener('click', click)

        var classList = element.classList

        menuElement.appendChild(element)

        items.push({
            click: click,
            deselect: function () {
                classList.remove('active')
            },
            select: function () {
                classList.add('active')
            },
        })

    }

    function backgroundImage (name) {
        return 'url(' + getResourceUrl('img/privacy-' + name + '.svg') + ')'
    }

    function collapse () {

        buttonClassList.remove('selected')
        button.style.backgroundImage = normalBackgroundImage
        button.removeEventListener('click', collapse)
        button.removeEventListener('keydown', keyDown)
        button.addEventListener('click', expand)

        element.removeChild(menuElement)

        removeEventListener('focus', windowFocus, true)
        removeEventListener('mousedown', windowMouseDown)

        if (selectedIndex !== null) {
            items[selectedIndex].deselect()
            selectedIndex = null
        }

    }

    function expand () {

        buttonClassList.add('selected')
        button.style.backgroundImage = activeBackgroundImage
        button.removeEventListener('click', expand)
        button.addEventListener('click', collapse)
        button.addEventListener('keydown', keyDown)

        element.appendChild(menuElement)

        addEventListener('focus', windowFocus, true)
        addEventListener('mousedown', windowMouseDown)

    }

    function keyDown (e) {
        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
        var keyCode = e.keyCode
        if (keyCode === 13) {
            e.preventDefault()
            if (selectedIndex !== null) {
                items[selectedIndex].click()
            }
        } else if (keyCode === 27) {
            e.preventDefault()
            collapse()
        } else if (keyCode === 38) {
            e.preventDefault()
            if (selectedIndex === null) {
                selectedIndex = items.length - 1
                items[selectedIndex].select()
            } else if (selectedIndex === 0) {
                items[0].deselect()
                selectedIndex = items.length - 1
                items[selectedIndex].select()
            } else {
                items[selectedIndex].deselect()
                selectedIndex--
                items[selectedIndex].select()
            }
        } else if (keyCode === 40) {
            e.preventDefault()
            if (selectedIndex === null) {
                selectedIndex = 0
                items[0].select()
            } else if (selectedIndex === items.length - 1) {
                items[selectedIndex].deselect()
                selectedIndex = 0
                items[0].select()
            } else {
                items[selectedIndex].deselect()
                selectedIndex++
                items[selectedIndex].select()
            }
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

    var normalBackgroundImage = backgroundImage(value),
        activeBackgroundImage = backgroundImage(value + '-active')

    var selectedIndex = null

    var items = []

    var classPrefix = 'AccountPage_PrivacySelect'

    var button = document.createElement('button')
    button.type = 'button'
    button.className = classPrefix + '-button'
    button.style.backgroundImage = normalBackgroundImage
    button.addEventListener('click', expand)

    var buttonClassList = button.classList

    var menuElement = document.createElement('div')
    menuElement.className = classPrefix + '-menu'
    add('private', 'Me')
    add('contacts', 'Contacts')
    add('public', 'Anyone')

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(button)

    return {
        element: element,
        getValue: function () {
            return value
        },
    }

}
