# Kakao_Bot_Papago - 비공식 파파고 라이브러리.
- Note: 이는 언제라도 작동을 멈출 수 있습니다.

## 예시
```javascript
const { Translator } = require('translator');

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
## Parameter
| 이름 | 타입 | 설명 | 필수 여부 |
|----|----|----|----|
| `source` | string | 시작 언어 | Y |
| `target` | string | 목적 언어 | Y |
| `text` | string | 번역할 문장 | Y |
| `config` | string | string to be translated | N |
## Config
| 프로퍼티 | 타입 | 설명 | 기본값 |
|----|----|----|----|
| `honorfic` | string | 높임말 여부 | true |
| `verbose` | boolean | JSON으로 출력 | false |
## 언어 코드
| 코드 | 언어 |
|----|----|
| `ko` | 한국어 |
| `en` | 영어 |
| `ja` | 일본어 |
| `zh-cn` | 중국어(간체) |
| `zh-tw` | 중국어(번체) |
| `hi` | 힌디어 |
| `es` | 에스파냐어 |
| `fr` | 프랑스어 |
| `de` | 독일어 |
| `pt` | 포르투갈어 |
| `vi` | 베트남어 |
| `id` | 인도네시아어 |
| `fa` | 페르시아어 |
| `ar` | 아랍어 |
| `mm` | 미얀마어 |
| `th` | 태국어 |
| `ru` | 러시아어 |
| `it` | 이탈리아어 |
| `detect` | 자동 감지 |
## License
None
