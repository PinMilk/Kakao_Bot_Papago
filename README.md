# Kakao_Bot_Papago - Unofficial papago wrapper.
- Note: It can stop working anytime.
- [Korean Reference](./README.ko.md)

## Example
```javascript
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

```
## How to use
`lib` Use files in lib directory. You can write code like example.
## Parameter
| Name | Type | Description | Required |
|----|----|----|----|
| `source` | string | origin language code | Y |
| `target` | string | target language code | Y |
| `text` | string | string to be translated | Y |
| `config` | string | string to be translated | N |
## Config
| Property | Type | Description | Default |
|----|----|----|----|
| `honorfic` | boolean | weather to translate to honorfic message or not | true |
| `verbose` | boolean | return by json string | false |
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
