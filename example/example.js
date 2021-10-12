const { Translator } = require('translator');

function response(room, msg, sender, igc, replier) {
    // 언어 감지, 한국어로 번역 후 결과만 리턴
    replier.reply(new Translator().translate('detect', 'ko', msg));
    replier.reply(new Translator().translate('en', 'ko', msg, {
        // raw json으로 리턴
        verbose: true
    }));
    replier.reply(new Translator().translate('en', 'ko', msg, {
        // 경어 X
        honorfic: false
    }));
    replier.reply(new Translator().translate('en', 'ko', msg, {
        // 경어 X
        honorfic: false
    }));
    replier.reply(new Translator().multiTranslate('en', 'ko', [msg, 'Good morning.']));
}
