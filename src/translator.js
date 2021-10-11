'use strict'

/**
 * 
 * @typedef {object} TranslateConfig
 * @property {boolean} honorfic 경어 사용 여부
 * @property {boolean} verbose raw json으로 반환할 지 여부
 */

const { Authenticator } = require('./auth')
exports.Translator = /** @class */ (function () {
    function Translator() {
        this.time = Date.now()
        this.UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36'
        this.C_TYPE = 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    /**
     * 
     * @return {string} uuid
     * @private
     */
    Translator.prototype.genUUID = function () {
        const time = this.time
        const uuid = Authenticator.genUUID(time)
        return uuid
    }
    /**
     * 
     * @param {string} message 해싱할 문자열
     * @return {string} 해시
     * @private
     */
    Translator.prototype.getHash = function (message) {
        const hash = Authenticator.getHash(message)
        return hash
    }
    /**
     * 
     * @param {string} source 원문 언어 코드
     * @param {string} target 목적 언어 코드
     * @param {string} text 번역할 문장
     * @param {TranslateConfig} config 번역 옵션
     * @returns {string} 번역 결과
     */
    Translator.prototype.translate = function (source, target, text, config) {
        config = (arguments.length > 3 && arguments[3] !== undefined)
            || typeof config === 'object' ? arguments[3] : {
            honorfic: true,
            verbose: false
        }
        const honorfic = config.honorfic !== undefined && typeof config.honorfic === 'boolean' ? config.honorfic : true
        const verbose = config.verbose !== undefined && typeof config.verbose === 'boolean' ? config.verbose : false
        const UUID = this.genUUID()
        const URL = 'https://papago.naver.com/apis/n2mt/translate'
        const AUTH = 'PPG ' + UUID + ':' + this.getHash(
            UUID + '\n' +
            URL + '\n' +
            String(this.time)
        )
        if (source === 'detect') source = this.detect(text)
        const connection = org.jsoup.Jsoup.connect(URL)
            .method(org.jsoup.Connection.Method.POST)
            .header('Authorization', AUTH)
            .header('Content-Type', this.C_TYPE)
            .header('User-Agent', this.UA)
            .header('Timestamp', String(this.time))
            .data('deviceId', UUID)
            .data('locale', 'en')
            .data('dict', 'true')
            .data('dictDisplay', '30')
            .data('honorific', honorfic)
            .data('instant', 'false')
            .data('paging', 'false')
            .data('source', source)
            .data('target', target)
            .data('text', text)
            .data('authroization', AUTH)
            .data('timestamp', String(this.time))
            .ignoreHttpErrors(true)
            .ignoreContentType(true)
        const response = connection.execute()
        if (response.statusCode() === 403) throw new ReferenceError('Invaild authorization')
        if (response.statusCode() !== 200) throw new Error('Connection error')
        const body = response.parse().text()
        const result = (verbose ? body : JSON.parse(body).translatedText)
        return result
    }
    /**
     * 
     * @param {string} source 원문 언어 코드
     * @param {string} target 목적 언어 코드
     * @param {string[]} textList 번역할 문장(리스트)
     * @param {TranslateConfig} config 번역 옵션
     */
    Translator.prototype.multiTranslate = function(source, target, textList, config) {
        const result = textList.map(
            text => this.translate(source, target, text, config)
        )
        return result
    }
    /**
     * 
     * @param {string} text 언어를 감지할 문장
     * @returns {string} 언어 코드
     */
    Translator.prototype.detect = function (text) {
        const UUID = this.genUUID()
        const URL = 'https://papago.naver.com/apis/langs/dect'
        const AUTH = 'PPG ' + UUID + ':' + this.getHash(
            UUID + '\n' +
            URL + '\n' +
            this.time
        )
        const connection = org.jsoup.Jsoup.connect(URL)
            .method(org.jsoup.Connection.Method.POST)
            .header('Authorization', AUTH)
            .header('Content-Type', this.C_TYPE)
            .header('User-Agent', this.UA)
            .header('Timestamp', String(this.time))
            .data('query', text)
            .ignoreHttpErrors(true)
            .ignoreContentType(true)
        const response = connection.execute()
        if (response.statusCode() === 403) throw new ReferenceError('Invaild authorization')
        if (response.statusCode() !== 200) throw new Error('Connection error')
        const body = response.parse().text()
        const result = JSON.parse(body).langCode
        return result
    }
    return Translator
})()
