# Kakao_Bot_Papago - Unofficial papago wrapper.
- Note: It can stop working anytime.
- [Korean Reference](./README.ko.md)

## Example
```javascript
const { Translator } = require('translator');

function response(room, msg, sender, igc, replier) {
    replier.reply(new Translator().translate('en', 'ko', msg)); // Only result
    replier.reply(new Translator().translate('en', 'ko', msg, true)); // Result by raw json
}
```
## Parameter
| value | type | Description | Required |
|----|----|----|----|
| `source` | string | origin language code | Y |
| `target` | string | target language code | Y |
| `text` | string | string to be translated | Y |
| `honorfic` | boolean | weather to translate to honorfic message or not | Y |
| `verbose` | boolean | return by json string(Default: false) | N |
## Language Code
| Code | Language |
|----|----|
| `ko` | Korean |
| `en` | English |
| `ja` | Japanese |
| `zh-cn` | Chinese(Simplified) |
| `zh-tw` | Chinese(Traditional) |
| `hi` | Hindi |
| `es` | Spanish |
| `fr` | French |
| `de` | German |
| `pt` | Portuguese |
| `vi` | Vietnamese |
| `id` | Indonesian |
| `fa` | Persian |
| `ar` | Arabic |
| `mm` | Myanmar |
| `th` | Thai |
| `ru` | Russian |
| `it` | Italian |
| `detect` | Auto detect |
## License
It is following MIT License.
