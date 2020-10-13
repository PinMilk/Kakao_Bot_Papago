# Kakao_Bot_Papago - 비공식 파파고 라이브러리.
- Note: It can stop working anytime.
- [Korean Reference](./README.ko.md)

## 예시
```javascript
const { Translator } = require('translator');

function response(room, msg, sender, igc, replier) {
    replier.reply(new Translator().translate('en', 'ko', msg)); // 번역 결과만 출력.
    replier.reply(new Translator().translate('en', 'ko', msg, true)); // Raw json으로 출력.
}
```
## Parameter
| 값 | 타입 | 설명 | 필수 여부 |
|----|----|----|----|
| `source` | string | 시작 언어 | Y |
| `target` | string | 목적 언어 | Y |
| `text` | string | 번역할 문장 | Y |
| `verbose` | boolean | JSON으로 출력(Default: false) | N |
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
It is following MIT License.