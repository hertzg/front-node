function WorkPage_SentFiles () {

    var map = Object.create(null)

    return {
        add: function (token, feedCallback) {
            map[token] = { feed: feedCallback }
        },
        feed: function (token) {
            map[token].feed()
            delete map[token]
        },
    }

}
