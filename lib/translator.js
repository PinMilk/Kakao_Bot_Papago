'use strict';
const { HmacMD5 } = require('./hmacmd5');
exports.Translator = /** @class */ (function () {
    function Translator() {
        this.time = Date.now();
    }
    /**
     * 
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
            .init('v1.5.6_97f6918302', message)
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
    Translator.prototype.translate = function (source, target, text, honorfic, verbose) {
        if (!verbose) verbose = false;
        const UUID = this.getUUID();
        const URL = 'https://papago.naver.com/apis/n2mt/translate';
        const AUTH = 'PPG ' + UUID + ':' + this.getHash(
            UUID + '\n' +
            URL + '\n' +
            String(this.time)
        );
        if (source === 'detect') source = this.detect(text);
        const connection = org.jsoup.Jsoup.connect(URL)
            .method(org.jsoup.Connection.Method.POST)
            .header('Authorization', AUTH)
            .header('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
            .header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36')
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
            .header('Authorization', AUTH)
            .header('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
            .header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36')
            .header('Timestamp', String(this.time))
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