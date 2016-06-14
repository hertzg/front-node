function WorkPage_ChatPanel_ReceivedFileMessage (receivedFiles, file, time) {

    function addItem (file) {

        var receiveLink = document.createElement('a')
        receiveLink.appendChild(document.createTextNode('Receive'))
        receiveLink.target = '_blank'
        receiveLink.href = 'data/receiveFile?token=' + encodeURIComponent(file.token)

        element.appendChild(document.createTextNode(file.name + ' - ' + file.size + ' byte(s) '))
        element.appendChild(receiveLink)

        receivedFiles.add(file.token, function () {
            element.removeChild(receiveLink)
        })

    }

    var classPrefix = 'WorkPage_ChatPanel_ReceivedFileMessage'

    var date = new Date(time)

    var timeString = TwoDigitPad(date.getUTCHours()) +
        ':' + TwoDigitPad(date.getUTCMinutes())

    var timeElement = document.createElement('div')
    timeElement.className = classPrefix + '-time'
    timeElement.appendChild(document.createTextNode(timeString))

    var element = document.createElement('div')
    element.className = classPrefix
    element.appendChild(timeElement)
    addItem(file)

    return {
        element: element,
        add: function (file) {
            element.appendChild(document.createElement('br'))
            addItem(file)
        },
    }

}
