function CloseButton (listener) {

    var button = document.createElement('button')
    button.className = 'CloseButton'
    button.appendChild(document.createTextNode('Close \xd7'))
    button.addEventListener('click', listener)

    return {
        element: button,
        disable: function () {
            button.disabled = true
        },
        enable: function () {
            button.disabled = false
        },
    }

}
