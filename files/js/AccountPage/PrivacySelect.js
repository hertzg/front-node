function AccountPage_PrivacySelect (getResourceUrl, value, changeListener) {

    function add (itemValue, text) {

        function click () {
            if (value !== itemValue) setValue(itemValue)
            collapse()
        }

        var item = AccountPag_PrivacySelectItem(text,
            itemValue, backgroundImage, click)

        menuElement.appendChild(item.element)
        if (value === itemValue) valueIndex = items.length
        items.push({
            click: click,
            value: itemValue,
            deselect: item.deselect,
            select: item.select,
        })

    }

    function backgroundImage (name) {
        return 'url(' + getResourceUrl('img/privacy-' + name + '.svg') + ')'
    }

    function collapse () {

        buttonClassList.remove('selected')
        button.style.backgroundImage = normalBackgroundImage
        button.removeEventListener('click', collapse)
        button.removeEventListener('keydown', expandedKeyDown)
        button.addEventListener('click', expand)
        button.addEventListener('keydown', collapsedKeyDown)

        element.removeChild(menuElement)

        removeEventListener('focus', windowFocus, true)
        removeEventListener('mousedown', windowMouseDown)

        if (selectedIndex !== null) {
            items[selectedIndex].deselect()
            selectedIndex = null
        }

    }

    function collapsedKeyDown (e) {
        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
        var keyCode = e.keyCode
        if (keyCode === 38) {
            e.preventDefault()
            if (valueIndex === 0) return
            valueIndex--
            setValue(items[valueIndex].value)
            button.style.backgroundImage = normalBackgroundImage
        } else if (keyCode === 40) {
            e.preventDefault()
            if (valueIndex === items.length - 1) return
            valueIndex++
            setValue(items[valueIndex].value)
            button.style.backgroundImage = normalBackgroundImage
        }
    }

    function expand () {

        buttonClassList.add('selected')
        button.style.backgroundImage = activeBackgroundImage
        button.removeEventListener('click', expand)
        button.removeEventListener('keydown', collapsedKeyDown)
        button.addEventListener('click', collapse)
        button.addEventListener('keydown', expandedKeyDown)

        element.appendChild(menuElement)

        addEventListener('focus', windowFocus, true)
        addEventListener('mousedown', windowMouseDown)

    }

    function expandedKeyDown (e) {
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

    function setValue (newValue) {
        value = newValue
        normalBackgroundImage = backgroundImage(value),
        activeBackgroundImage = backgroundImage(value + '-active')
        changeListener()
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

    var items = []
    var valueIndex
    var selectedIndex = null

    var classPrefix = 'AccountPage_PrivacySelect'

    var button = document.createElement('button')
    button.type = 'button'
    button.className = classPrefix + '-button'
    button.style.backgroundImage = normalBackgroundImage
    button.addEventListener('click', expand)
    button.addEventListener('keydown', collapsedKeyDown)

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
