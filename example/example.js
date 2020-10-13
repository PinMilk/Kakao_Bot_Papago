const Translator = require('translator').Translator;

function response(room, msg, sender, igc, replier) {
    replier.reply(new Translator().translate('en', 'ko', msg)); // Only result
    replier.reply(new Translator().translate('en', 'ko', msg, true)); // Result by raw json
}