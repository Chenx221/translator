Setup Guide: https://cloud.tencent.com/document/product/551/104415

ENV:
```
TRANSLATION_SERVICES=[tencent]
TENCENT_MT_ENDPOINT=mt.tencentcloudapi.com
TENCENT_MT_REGION=<region code>
TENCENT_SECRET_ID=<your_secret_id>
TENCENT_SECRET_KEY=<your_secret_key>
TENCENT_PROJECT_ID=0 // default
TENCENT_SOURCE_LANGUAGE=<source language Code>
TENCENT_TARGET_LANGUAGE=<target language code>
```
---

|Region|Code|
|---|---|
|Asia Pacific Southeast (Bangkok)|ap-bangkok|
|North China (Beijing)|ap-beijing|
|Southwest China (Chengdu)|ap-chengdu|
|Southwest China (Chongqing)|ap-chongqing|
|South China (Guangzhou)|ap-guangzhou|
|Hong Kong, Macau, and Taiwan (Hong Kong, China)|ap-hongkong|
|Asia Pacific South (Mumbai)|ap-mumbai|
|Asia Pacific Northeast (Seoul)|ap-seoul|
|East China (Shanghai)|ap-shanghai|
|East China (Shanghai Financial)|ap-shanghai-fsi|
|South China (Shenzhen Financial)|ap-shenzhen-fsi|
|Asia Pacific Southeast (Singapore)|ap-singapore|
|Asia Pacific Northeast (Tokyo)|ap-tokyo|
|Europe (Frankfurt)|eu-frankfurt|
|US East (Virginia)|na-ashburn|
|US West (Silicon Valley)|na-siliconvalley|

**Note: Different source languages may support different target translation languages (see the next table).**

| Source Language                         | Code  |
| --------------------------------------- | ----- |
| Auto Detection (Detect as One Language) | auto  |
| Simplified Chinese                      | zh    |
| Traditional Chinese                     | zh-TW |
| English                                 | en    |
| Japanese                                | ja    |
| Korean                                  | ko    |
| French                                  | fr    |
| Spanish                                 | es    |
| Italian                                 | it    |
| German                                  | de    |
| Turkish                                 | tr    |
| Russian                                 | ru    |
| Portuguese                              | pt    |
| Vietnamese                              | vi    |
| Indonesian                              | id    |
| Thai                                    | th    |
| Malay                                   | ms    |
| Arabic                                  | ar    |
| Hindi                                   | hi    |

| Source Language             | Target Language                                                                                                                                                                                                                                                       |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Simplified Chinese (zh)     | Traditional Chinese (zh-TW), English (en), Japanese (ja), Korean (ko), French (fr), Spanish (es), Italian (it), German (de), Turkish (tr), Russian (ru), Portuguese (pt), Vietnamese (vi), Indonesian (id), Thai (th), Malay (ms), Arabic (ar)                        |
| Traditional Chinese (zh-TW) | Simplified Chinese (zh), English (en), Japanese (ja), Korean (ko), French (fr), Spanish (es), Italian (it), German (de), Turkish (tr), Russian (ru), Portuguese (pt), Vietnamese (vi), Indonesian (id), Thai (th), Malay (ms), Arabic (ar)                            |
| English (en)                | Simplified Chinese (zh), Traditional Chinese (zh-TW), Japanese (ja), Korean (ko), French (fr), Spanish (es), Italian (it), German (de), Turkish (tr), Russian (ru), Portuguese (pt), Vietnamese (vi), Indonesian (id), Thai (th), Malay (ms), Arabic (ar), Hindi (hi) |
| Japanese (ja)               | Simplified Chinese (zh), Traditional Chinese (zh-TW), English (en), Korean (ko)                                                                                                                                                                                       |
| Korean (ko)                 | Simplified Chinese (zh), Traditional Chinese (zh-TW), English (en), Japanese (ja)                                                                                                                                                                                     |
| French (fr)                 | Simplified Chinese (zh), Traditional Chinese (zh-TW), English (en), Spanish (es), Italian (it), German (de), Turkish (tr), Russian (ru), Portuguese (pt)                                                                                                              |
| Spanish (es)                | Simplified Chinese (zh), Traditional Chinese (zh-TW), English (en), French (fr), Italian (it), German (de), Turkish (tr), Russian (ru), Portuguese (pt)                                                                                                               |
| Italian (it)                | Simplified Chinese (zh), Traditional Chinese (zh-TW), English (en), French (fr), Spanish (es), German (de), Turkish (tr), Russian (ru), Portuguese (pt)                                                                                                               |
| German (de)                 | Simplified Chinese (zh), Traditional Chinese (zh-TW), English (en), French (fr), Spanish (es), Italian (it), Turkish (tr), Russian (ru), Portuguese (pt)                                                                                                              |
| Turkish (tr)                | Simplified Chinese (zh), Traditional Chinese (zh-TW), English (en), French (fr), Spanish (es), Italian (it), German (de), Russian (ru), Portuguese (pt)                                                                                                               |
| Russian (ru)                | Simplified Chinese (zh), Traditional Chinese (zh-TW), English (en), French (fr), Spanish (es), Italian (it), German (de), Turkish (tr), Portuguese (pt)                                                                                                               |
| Portuguese (pt)             | Simplified Chinese (zh), Traditional Chinese (zh-TW), English (en), French (fr), Spanish (es), Italian (it), German (de), Turkish (tr), Russian (ru)                                                                                                                  |
| Vietnamese (vi)             | Simplified Chinese (zh), Traditional Chinese (zh-TW), English (en)                                                                                                                                                                                                    |
| Indonesian (id)             | Simplified Chinese (zh), Traditional Chinese (zh-TW), English (en)                                                                                                                                                                                                    |
| Thai (th)                   | Simplified Chinese (zh), Traditional Chinese (zh-TW), English (en)                                                                                                                                                                                                    |
| Malay (ms)                  | Simplified Chinese (zh), Traditional Chinese (zh-TW), English (en)                                                                                                                                                                                                    |
| Arabic (ar)                 | Simplified Chinese (zh), Traditional Chinese (zh-TW), English (en)                                                                                                                                                                                                    |
| Hindi (hi)                  | English (en)                                                                                                                                                                                                                                                          |
