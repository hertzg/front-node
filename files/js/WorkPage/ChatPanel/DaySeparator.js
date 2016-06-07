function WorkPage_ChatPanel_DaySeparator (time) {

    var date = new Date(time)

    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']

    var dateString = monthNames[date.getUTCMonth()] + ' ' +
        date.getUTCDate() + ', ' + date.getUTCFullYear()

    var element = document.createElement('div')
    element.className = 'WorkPage_ChatPanel_DaySeparator'
    element.appendChild(document.createTextNode(dateString))
    return { element: element }

}
