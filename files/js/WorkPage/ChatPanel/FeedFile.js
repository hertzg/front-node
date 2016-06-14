function WorkPage_ChatPanel_FeedFile (token, file) {

    function ChunkedReader (file, chunkSize) {
        var offset = 0
        return {
            hasNextChunk: function () {
                return offset < file.size
            },
            readNextChunk: function (callback) {
                var blob = file.slice(offset, offset + chunkSize)
                var reader = new FileReader
                reader.readAsArrayBuffer(blob)
                reader.onload = function () {
                    offset += chunkSize
                    callback(reader.result)
                }
            },
        }
    }

    function next () {
        reader.readNextChunk(function (chunk) {

            var request = new XMLHttpRequest
            request.open('post', 'data/feedFile?token=' + encodeURIComponent(token))
            request.send(chunk)
            request.onload = function () {
                if (reader.hasNextChunk()) next()
            }

        })
    }

    var reader = ChunkedReader(file, 1024 * 1024)
    next()

}
