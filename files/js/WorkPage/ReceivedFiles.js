function WorkPage_ReceivedFiles () {

    var map = Object.create(null)

    return {
        add: function (token, removeCallback) {
            map[token] = { remove: removeCallback }
        },
        remove: function (token) {
            map[token].remove()
            delete map[token]
        },
    }

}
