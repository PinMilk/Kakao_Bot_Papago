'use strict';
exports.HmacMD5 = /** @class */ (function () {
    const { Mac } = javax.crypto;
    const { SecretKeySpec } = javax.crypto.spec;
    function HmacMD5() { }
    /**
     * 
     * @param {string} key key
     * @param {string} message string to be hashed
     * @example new HmacMD5().init('v1.5.1_4dfe1d83c2', 'Normal Text')
     */
    HmacMD5.prototype.init = function (key, message) {
        this.key = java.lang.String(key);
        this.message = java.lang.String(message);
        const KEY_SPEC = new SecretKeySpec(this.key.getBytes('UTF-8'), 'HmacMD5');
        const mac = Mac.getInstance('HmacMD5');
        mac.init(KEY_SPEC);
        mac.update(this.message.getBytes('ASCII'));
        this.mac = mac;
        return this;
    };
    /**
     * 
     * @returns {string} Hash encoded with base64
     * @example new HmacMD5().init('v1.5.1_4dfe1d83c2', 'Normal Text').getHash()
     */
    HmacMD5.prototype.getHash = function () {
        const mac = this.mac;
        if (!mac) new ReferenceError('It is called before initialization');
        this.hash = mac.doFinal();
        const encoder = java.util.Base64.getEncoder();
        const encoded = encoder.encode(this.hash);
        this.hash = java.lang.String(encoded);
        return this.hash;
    };
    return HmacMD5;
})();
