'use strict'

const { HmacMD5 } = require('./hmacmd5')

exports.Authenticator = /** @class */ (function () {
    function Authenticator() {
        return this
    }
    /**
     * 
     * @param {number} time UNIX 시간(밀리초)
     * @returns {string} UUID
     */
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
    /**
     * 
     * @param {string} message 해싱할 문자열
     * @returns {string} 해싱된 문자열(base64)
     */
    Authenticator.getHash = function (message) {
        const hash = new HmacMD5()
            .init('v1.6.3_4f4591fdf3', message)
            .getHash()
        return hash
    }
    /**
     * 
     * @param {string} uuid uuid
     * @param {string} url url
     * @param {string} time UNIX 시간(밀리초)
     * @returns {string} 인증 헤더
     */
    Authenticator.makeAuthHeader = function (uuid, url, time) {
        const header = 'PPG ' + uuid + ':' + this.getHash(
            uuid + '\n' +
            url + '\n' +
            time
        )
        return header
    }
    return Authenticator
})()
