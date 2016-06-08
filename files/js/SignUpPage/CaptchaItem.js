function SignUpPage_CaptchaItem (backListener,
    crashListener, serviceErrorListener) {

    function hideError () {
        inputClassList.remove('error')
        element.removeChild(errorElement)
        input.removeEventListener('input', inputListener)
    }

    function inputListener () {
        hideError()
        errorElement = null
    }

    function setCaptcha (captcha) {
        imageElement.style.backgroundImage = 'url(' + captcha.image + ')'
        token = captcha.token
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

    var token = null

    var classPrefix = 'SignUpPage_CaptchaItem'

    var label = document.createElement('label')
    label.htmlFor = Math.random()
    label.appendChild(document.createTextNode('Verification'))

    var labelElement = document.createElement('div')
    labelElement.className = classPrefix + '-label'
    labelElement.appendChild(label)

    var imageElement = document.createElement('div')
    imageElement.className = classPrefix + '-image'

    var input = document.createElement('input')
    input.id = label.htmlFor
    input.type = 'text'
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
    element.appendChild(imageElement)
    element.appendChild(input)

    var request = new XMLHttpRequest
    request.open('get', 'data/captcha')
    request.send()
    request.onload = function () {

        if (request.status !== 200) {
            serviceErrorListener()
            return
        }

        try {
            var response = JSON.parse(request.responseText)
        } catch (e) {
            crashListener()
            return
        }

        setCaptcha(response)

    }

    return {
        element: element,
        showError: showError,
        clearError: function () {
            if (errorElement === null) return
            hideError()
            errorElement = null
        },
        disable: function () {
            input.disabled = true
            input.blur()
        },
        enable: function () {
            input.disabled = false
        },
        getValue: function () {

            var value = input.value
            if (value === '') {
                showError(function (errorElement) {
                    errorElement.appendChild(document.createTextNode('This field is required.'))
                })
                return null
            }

            return {
                value: input.value,
                token: token,
            }

        },
        setNewCaptcha: function (newCaptcha) {
            setCaptcha(newCaptcha)
            input.value = ''
        },
    }

}
