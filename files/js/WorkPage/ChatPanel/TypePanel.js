function WorkPage_ChatPanel_TypePanel (typeListener) {

    var classPrefix = 'WorkPage_ChatPanel_TypePanel'

    var textarea = document.createElement('textarea')
    textarea.className = classPrefix + '-textarea'
    textarea.placeholder = 'Type a message here'
    textarea.addEventListener('keydown', function (e) {
        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
        if (e.keyCode === 13) {
            var value = textarea.value
            if (value !== '') {
                typeListener(textarea.value)
                textarea.value = ''
            }
        }
    })

    var sendButton = document.createElement('button')
    sendButton.className = classPrefix + '-sendButton'
    sendButton.appendChild(document.createTextNode('Send'))

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
