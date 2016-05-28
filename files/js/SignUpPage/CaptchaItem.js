function SignUpPage_CaptchaItem () {

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

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(labelElement)
    element.appendChild(imageElement)
    element.appendChild(input)

    var request = new XMLHttpRequest
    request.open('get', 'data/captcha')
    request.send()
    request.onload = function () {
        var response = JSON.parse(request.responseText)
        imageElement.style.backgroundImage = 'url(' + response.image + ')'
        token = response.token
    }

    return { element: element }

}
