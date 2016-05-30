function AddContactPage_Page (username, foundListener, closeListener) {

    function enableItems () {
        usernameItem.enable()
    }

    var classPrefix = 'AddContactPage_Page'

    var closeButton = CloseButton(closeListener)

    var titleElement = document.createElement('h1')
    titleElement.className = classPrefix + '-title'
    titleElement.appendChild(document.createTextNode('Add Contact'))

    var usernameItem = AddContactPage_UsernameItem(username)

    var button = document.createElement('button')
    button.className = classPrefix + '-button'
    button.appendChild(document.createTextNode('Find User'))

    var form = document.createElement('form')
    form.appendChild(usernameItem.element)
    form.appendChild(button)
    form.addEventListener('submit', function (e) {

        e.preventDefault()

        var username = usernameItem.getValue()
        if (username === null) return

        usernameItem.disable()

        var url = 'data/publicProfile?username=' + encodeURIComponent(username)

        var request = new XMLHttpRequest
        request.open('get', url)
        request.send()
        request.onerror = enableItems
        request.onload = function () {

            if (request.status !== 200) {
                enableItems()
                console.log(request.responseText)
                return
            }

            var response = JSON.parse(request.responseText)
            if (response === 'NO_SUCH_USER') {
                enableItems()
                usernameItem.showError(function (errorElement) {
                    errorElement.appendChild(document.createTextNode('There is no such user.'))
                })
                return
            }

            foundListener(username, response)

        }

    })

    var frameElement = document.createElement('div')
    frameElement.className = classPrefix + '-frame'
    frameElement.appendChild(closeButton.element)
    frameElement.appendChild(titleElement)
    frameElement.appendChild(form)

    var alignerElement = document.createElement('div')
    alignerElement.className = classPrefix + '-aligner'

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(alignerElement)
    element.appendChild(frameElement)
    element.addEventListener('click', function (e) {
        if (e.button !== 0) return
        if (e.target === element) closeListener()
    })

    return {
        element: element,
        focus: usernameItem.focus,
    }

}
