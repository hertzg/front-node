function SignUpPage_UsernameItem (backListener) {

    function hideError () {
        inputClassList.remove('error')
        element.removeChild(errorElement)
        input.removeEventListener('input', inputListener)
    }

    function inputListener () {
        hideError()
        errorElement = null
    }

    function showError (callback) {

        if (errorElement !== null) hideError()
        errorElement = document.createElement('div')
        errorElement.className = classPrefix + '-error'
        callback(errorElement)

        inputClassList.add('error')
        element.appendChild(errorElement)
        input.addEventListener('input', inputListener)
        input.focus()

    }

    var errorElement = null

    var classPrefix = 'SignUpPage_UsernameItem'

    var label = document.createElement('label')
    label.htmlFor = Math.random()
    label.appendChild(document.createTextNode('Username'))

    var labelElement = document.createElement('div')
    labelElement.className = classPrefix + '-label'
    labelElement.appendChild(label)

    var input = document.createElement('input')
    input.id = label.htmlFor
    input.type = 'text'
    input.maxLength = Username_maxLength
    input.className = classPrefix + '-input'
    input.addEventListener('keydown', function (e) {
        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
        if (e.keyCode === 27) {
            e.preventDefault()
            backListener()
        }
    })

    var inputClassList = input.classList

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(labelElement)
    element.appendChild(input)

    return {
        element: element,
        showError: showError,
        disable: function () {
            input.disabled = true
            input.blur()
        },
        enable: function () {
            input.disabled = false
        },
        focus: function () {
            input.focus()
        },
        getValue: function () {
            var value = input.value
            if (value === '') {
                showError(function (errorElement) {
                    errorElement.appendChild(document.createTextNode('This field is required.'))
                })
                return null
            }
            if (Username_ContainsIllegalChars(value)) {
                showError(function (errorElement) {
                    errorElement.appendChild(document.createTextNode('The username is illegal.'))
                    errorElement.appendChild(document.createElement('br'))
                    errorElement.appendChild(document.createTextNode('Use latin letters, digits, underscore, dot and dash.'))
                })
                return null
            }
            if (Username_IsShort(value)) {
                showError(function (errorElement) {
                    errorElement.appendChild(document.createTextNode('The username is too short.'))
                    errorElement.appendChild(document.createElement('br'))
                    errorElement.appendChild(document.createTextNode('Minimum ' + Username_minLength + ' characters required.'))
                })
                return null
            }
            return value
        },
    }

}
