function WorkPage_ChatPanel_TypePanel (typeListener, closeListener) {

    function submit () {
        var value = textarea.value
        if (value.match(/\S/)) {
            typeListener(value)
            sendButton.disabled = true
        }
        textarea.value = ''
    }

    var classPrefix = 'WorkPage_ChatPanel_TypePanel'

    var textarea = document.createElement('textarea')
    textarea.className = classPrefix + '-textarea'
    textarea.placeholder = 'Type a message here'
    textarea.addEventListener('input', function () {
        sendButton.disabled = !textarea.value.match(/\S/)
    })
    textarea.addEventListener('keydown', function (e) {
        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
        var keyCode = e.keyCode
        if (keyCode === 13) {
            e.preventDefault()
            submit()
        } else if (keyCode === 27) {
            e.preventDefault()
            closeListener()
        }
    })

    var sendButton = document.createElement('button')
    sendButton.disabled = true
    sendButton.className = classPrefix + '-sendButton'
    sendButton.appendChild(document.createTextNode('Send'))
    sendButton.addEventListener('click', function () {
        submit()
        textarea.focus()
    })

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(textarea)
    element.appendChild(sendButton)

    return {
        element: element,
        focus: function () {
            textarea.focus()
        },
    }

}
