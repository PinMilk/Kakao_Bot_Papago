const { Translator } = require('../lib/translator');

function response(room, msg, sender, igc, replier) {
    replier.reply(new Translator().translate('detect', 'ko', msg)); // Only result
    replier.reply(new Translator().translate('en', 'ko', msg, {
        verbose: true
    })); // Result by raw json
    replier.reply(new Translator().translate('en', 'ko', msg, {
        honorfic: false
    })); // No honorfic
}
