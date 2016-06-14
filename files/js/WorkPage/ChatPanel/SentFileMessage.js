function WorkPage_ChatPanel_SentFileMessage (file, time) {

    function addItem (file) {
        element.appendChild(document.createTextNode(file.name + ' - ' + file.size + ' byte(s)'))
    }

    var classPrefix = 'WorkPage_ChatPanel_SentFileMessage'

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
