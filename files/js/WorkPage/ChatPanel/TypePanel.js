function WorkPage_ChatPanel_TypePanel (typeListener, closeListener) {

    function submit () {
        var value = textarea.value
        if (value.match(/\S/)) {
            typeListener(value)
            sendButton.disabled = sendButtonDisabled = true
        }
        textarea.value = ''
    }

    var classPrefix = 'WorkPage_ChatPanel_TypePanel'

    var textarea = document.createElement('textarea')
    textarea.className = classPrefix + '-textarea'
    textarea.placeholder = 'Type a message here'
    textarea.addEventListener('input', function () {
        sendButtonDisabled = !textarea.value.match(/\S/)
        if (!disabled) sendButton.disabled = sendButtonDisabled
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

    var disabled = false
    var sendButtonDisabled = true

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
        disable: function () {
            disabled = textarea.disabled = true
            sendButton.disabled = true
        },
        enable: function () {
            disabled = textarea.disabled = false
            sendButton.disabled = sendButtonDisabled
        },
        focus: function () {
            textarea.focus()
        },
    }

}
