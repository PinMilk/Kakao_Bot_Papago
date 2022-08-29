'use strict'

/**
 * 
 * @typedef {object} TranslateConfig
 * @property {boolean} honorfic 경어 사용 여부
 * @property {boolean} verbose Raw JSON 반환 여부
 */

const { Authenticator } = require('./login/auth')
exports.Translator = /** @class */ (function () {
    function Translator() {
        this.time = Date.now()
        this.UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36'     // User-Agent
        this.C_TYPE = 'application/x-www-form-urlencoded; charset=UTF-8'                                                                        // Content-Type
        this.path = {
            parentURL: 'https://papago.naver.com/apis',                                                                                         // 요청 URL
            childURL: [
                '/n2mt/translate',                                                                                                              // 번역 요청 Child URL
                '/langs/dect'                                                                                                                   // 언어 감지 요청 Child URL
            ]
        }
        return this
    }
    /**
     * 
     * @return {string} uuid
     * @private
     */
    Translator.prototype.genUUID = function () {
        const uuid = Authenticator.genUUID()
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
     * @returns {string|object} 번역 결과
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
        const URL = this.path.parentURL + this.path.childURL[0]
        const AUTH_HEADER = Authenticator.makeAuthHeader(UUID, URL, this.time)
        // 언어 감지
        if (source === 'detect') source = this.detect(text)
        const connection = org.jsoup.Jsoup.connect(URL)
            .method(org.jsoup.Connection.Method.POST)
            .header('Authorization', AUTH_HEADER)
            .header('Content-Type', this.C_TYPE)
            .header('User-Agent', this.UA)
            .header('Timestamp', String(this.time))
            .data('deviceId', UUID)
            .data('locale', 'ko')
            .data('dict', 'true')
            .data('dictDisplay', '30')
            .data('honorific', honorfic)
            .data('instant', 'false')
            .data('paging', 'false')
            .data('source', source)
            .data('target', target)
            .data('text', text)
            .data('authroization', AUTH_HEADER)
            .data('timestamp', String(this.time))
            .ignoreHttpErrors(true)
            .ignoreContentType(true)
        const response = connection.execute()
        if (response.statusCode() === 403) {
            Log.d('이 레포(https://github.com/PinMilk/Kakao_Bot_Papago)에 한국어로 이슈를 만들어 주세요.')
            throw new ReferenceError('Invaild authorization. Read a log.')
        }
        if (response.statusCode() !== 200) throw new Error('Connection error: ' + response.statusCode())
        const body = JSON.parse(response.parse().text())
        const result = (verbose ? body : body.translatedText)
        return result
    }
    /**
     * 
     * @param {string} source 원문 언어 코드
     * @param {string} target 목적 언어 코드
     * @param {string[]} textList 번역할 문장(리스트)
     * @param {TranslateConfig} config 번역 옵션
     * @returns {string[]} 번역 결과(리스트)
     */
    Translator.prototype.multiTranslate = function (source, target, textList, config) {
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
        // 랜덤 UUID
        const UUID = this.genUUID()
        // 요청 URL
        const URL = this.path.parentURL + this.path.childURL[1]
        // authorization header
        const AUTH_HEADER = Authenticator.makeAuthHeader(UUID, URL, this.time)
        // 요청
        const connection = org.jsoup.Jsoup.connect(URL)
            .method(org.jsoup.Connection.Method.POST)
            .header('Authorization', AUTH_HEADER)
            .header('Content-Type', this.C_TYPE)
            .header('User-Agent', this.UA)
            .header('Timestamp', String(this.time))
            .data('query', text)
            .ignoreHttpErrors(true)
            .ignoreContentType(true)
        const response = connection.execute()
        if (response.statusCode() === 403) {
            throw new ReferenceError('Invaild authorization.')
        } else if (response.statusCode() !== 200) throw new Error('Connection Error: ' + response.statusCode())
        const body = response.parse().text()
        const result = JSON.parse(body).langCode
        return result
    }
    return Translator
})()
