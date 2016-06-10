function SignUpPage_CaptchaItem (backListener) {

    function disable () {
        input.disabled = true
        input.blur()
    }

    function enable () {
        input.disabled = false
    }

    function hideError () {
        inputClassList.remove('error')
        element.removeChild(errorElement)
        input.removeEventListener('input', inputListener)
    }

    function inputListener () {
        hideError()
        errorElement = null
    }

    function load () {

        disable()

        var request = new XMLHttpRequest
        request.open('get', 'data/captcha')
        request.send()
        request.onerror = function () {
            imageElement.removeChild(loadingNode)
            showCaptchaError()
        }
        request.onload = function () {

            imageElement.removeChild(loadingNode)

            if (request.status !== 200) {
                showCaptchaError()
                return
            }

            try {
                var response = JSON.parse(request.responseText)
            } catch (e) {
                showCaptchaError()
                return
            }

            enable()
            setCaptcha(response)

        }

    }

    function setCaptcha (captcha) {
        imageElement.style.backgroundImage = 'url(' + captcha.image + ')'
        token = captcha.token
    }

    function showCaptchaError () {

        var reloadButton = document.createElement('button')
        reloadButton.type = 'button'
        reloadButton.className = classPrefix + '-reloadButton'
        reloadButton.appendChild(document.createTextNode('Reload'))
        reloadButton.addEventListener('click', function () {
            imageBarElement.removeChild(reloadButton)
            imageElement.removeChild(errorNode)
            imageElement.appendChild(loadingNode)
            imageClassList.remove('error')
            load()
        })

        var errorNode = document.createTextNode('Failed')

        imageBarElement.appendChild(reloadButton)
        imageElement.appendChild(errorNode)
        imageClassList.add('error')

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

    var loadingNode = document.createTextNode('Loading...')

    var imageElement = document.createElement('div')
    imageElement.className = classPrefix + '-image'
    imageElement.appendChild(loadingNode)

    var imageClassList = imageElement.classList

    var imageBarElement = document.createElement('div')
    imageBarElement.appendChild(imageElement)

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
    element.appendChild(imageBarElement)
    element.appendChild(input)

    load()

    return {
        disable: disable,
        element: element,
        enable: enable,
        showError: showError,
        clearError: function () {
            if (errorElement === null) return
            hideError()
            errorElement = null
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
