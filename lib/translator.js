'use strict';
const { HmacMD5 } = require('./hmacmd5');
exports.Translator = /** @class */ (function () {
    function Translator() {
        this.time = Date.now();
    }
    /**
     * 
     * I got this from https://papago.naver.com/main.703d5fc7db22239f9bdf.chunk.js (./app/util/uuid.ts)
     * @return {string} uuid
     * @private
     */
    Translator.prototype.getUUID = function () {
        var time = this.time;
        var tower = time;
        var base = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        var uuid = base.replace(/[xy]/g, function (e) {
            var chip = (time + 16 * Math.random()) % 16 | 0;
            tower = Math.floor(tower / 16);
            return (e === 'x' ? chip : 3 & chip | 8).toString();
        });
        return uuid;
    };
    /**
     * 
     * @param {string} message text to be hashed
     * @return {string} hash
     * @private
     */
    Translator.prototype.getHash = function (message) {
        const hash = new HmacMD5()
            .init('v1.5.1_4dfe1d83c2', message)
            .getHash();
        return hash;
    };
    /**
     * 
     * @param {string} source origin language
     * @param {string} target target language
     * @param {string} text string to be translated
     * @param {boolean} honorfic weather to translate to honorfic message or not
     * @param {boolean} verbose if it is true, it returns raw json
     * @returns {string} translated text
     */
    Translator.prototype.translate = function (source, target, text, verbose) {
        if (!verbose) verbose = false;
        const UUID = this.getUUID();
        const URL = 'https://papago.naver.com/apis/n2mt/translate';
        const AUTH = 'PPG ' + UUID + ':' + this.getHash(
            UUID + '\n' +
            URL + '\n' +
            this.time
        );
        if (source === 'detect') source = this.detect(text);
        const connection = org.jsoup.Jsoup.connect(URL)
            .method(org.jsoup.Connection.Method.POST)
            .header('Accept', 'application/json')
            .header('Accept-Encoding', 'gzip, deflate, br')
            .header('Accept-Language', 'en')
            .header('Authorization', AUTH)
            .header('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
            .header('Device-Type', 'pc')
            .header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36')
            .header('Origin', 'https://papago.naver.com')
            .header('Referer', 'https://papago.naver.com/')
            .header('sec-fetch-dest', 'empty')
            .header('sec-fetch-mode', 'cors')
            .header('sec-fetch-site', 'same-origin')
            .header('Timestamp', new String(this.time))
            .data('deviceId', UUID)
            .data('locale', 'en')
            .data('dict', 'true')
            .data('dictDisplay', '30')
            .data('honorific', false)
            .data('instant', 'true')
            .data('paging', 'false')
            .data('source', source)
            .data('target', target)
            .data('text', text)
            .ignoreHttpErrors(true)
            .ignoreContentType(true);
        const response = connection.execute();
        if (response.statusCode() === 403) throw new ReferenceError('Invaild authorization');
        if (response.statusCode() !== 200) throw new Error('Connection error');
        const body = response.parse().text();
        const result = (verbose ? body : JSON.parse(body).translatedText);
        return result;
    };
    Translator.prototype.detect = function (text) {
        const UUID = this.getUUID();
        const URL = 'https://papago.naver.com/apis/langs/dect';
        const AUTH = 'PPG ' + UUID + ':' + this.getHash(
            UUID + '\n' +
            URL + '\n' +
            this.time
        );
        const connection = org.jsoup.Jsoup.connect(URL)
            .method(org.jsoup.Connection.Method.POST)
            .header('Accept', 'application/json')
            .header('Accept-Encoding', 'gzip, deflate, br')
            .header('Accept-Language', 'en')
            .header('Authorization', AUTH)
            .header('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
            .header('Device-Type', 'pc')
            .header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36')
            .header('Origin', 'https://papago.naver.com')
            .header('Referer', 'https://papago.naver.com/')
            .header('sec-fetch-dest', 'empty')
            .header('sec-fetch-mode', 'cors')
            .header('sec-fetch-site', 'same-origin')
            .header('Timestamp', new String(this.time))
            .data('query', text)
            .ignoreHttpErrors(true)
            .ignoreContentType(true);
        const response = connection.execute();
        if (response.statusCode() === 403) throw new ReferenceError('Invaild authorization');
        if (response.statusCode() !== 200) throw new Error('Connection error');
        const body = response.parse().text();
        const result = JSON.parse(body).langCode;
        return result;
    };
    return Translator;
})();