const Translator = require('translator').Translator;

function response(room, msg, sender, igc, replier) {
    replier.reply(new Translator().translate('detect', 'ko', msg, true, false)); // Only result
    replier.reply(new Translator().translate('en', 'ko', msg, true, true)); // Result by raw json
}
