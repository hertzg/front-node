function ChangePasswordPage_RepeatNewPasswordItem () {

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

    var classPrefix = 'ChangePasswordPage_RepeatNewPasswordItem'

    var label = document.createElement('label')
    label.htmlFor = Math.random()
    label.appendChild(document.createTextNode('Retype the new password'))

    var labelElement = document.createElement('div')
    labelElement.className = classPrefix + '-label'
    labelElement.appendChild(label)

    var input = document.createElement('input')
    input.id = label.htmlFor
    input.type = 'password'
    input.className = classPrefix + '-input'

    var inputClassList = input.classList

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(labelElement)
    element.appendChild(input)

    return {
        element: element,
        disable: function () {
            input.disabled = true
            input.blur()
        },
        enable: function () {
            input.disabled = false
        },
        getValue: function (password) {
            var value = input.value
            if (value === '') {
                showError(function (errorElement) {
                    errorElement.appendChild(document.createTextNode('This field is required.'))
                })
                return null
            }
            if (value !== password) {
                showError(function (errorElement) {
                    errorElement.appendChild(document.createTextNode('The passwords doesn\'t match.'))
                })
                return null
            }
            return value
        },
    }

}
