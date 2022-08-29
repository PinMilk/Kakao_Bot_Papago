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
    Authenticator.genUUID = function() {
        const uuid = java.util.UUID.randomUUID().toString()
        return uuid
    }
    /**
     * 
     * @param {string} message 해싱할 문자열
     * @returns {string} 해싱된 문자열(base64)
     */
    Authenticator.getHash = function (message) {
        const hash = new HmacMD5()
            .init('v1.7.0_0d2601d5cf', message)
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
