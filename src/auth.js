'use strict'

exports.Authenticator = /** @class */ (function () {
    function Authenticator() {
        return this
    }

    Authenticator.genUUID = function(time) {
        var tower = time
        var base = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        var uuid = base.replace(/[xy]/g, function (e) {
            var chip = (time + 16 * Math.random()) % 16 | 0
            tower = Math.floor(tower / 16)
            return (e === 'x' ? chip : 3 & chip | 8).toString()
        })
        return uuid
    }

    Authenticator.getHash = function (message) {
        const hash = new HmacMD5()
            .init('v1.6.3_4f4591fdf3', message)
            .getHash()
        return hash
    }
    return Authenticator
})()
