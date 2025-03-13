Setup Guide: https://www.xfyun.cn/doc/platform/quickguide.html

ENV:
```
TRANSLATION_SERVICES=[xftrans-general,xftrans-new,xftrans-niutrans]
IFLYTEK_MT_ENDPOINT=https://itrans.xfyun.cn/v2/its  
IFLYTEK_MT_NEW_ENDPOINT=https://itrans.xf-yun.com/v1/its  
IFLYTEK_MT_NIUTRANS_ENDPOINT=https://ntrans.xfyun.cn/v2/ots  
IFLYTEK_APP_ID=  
IFLYTEK_API_SECRET=  
IFLYTEK_API_KEY=  
IFLYTEK_SOURCE_LANGUAGE=  
IFLYTEK_TARGET_LANGUAGE=
```
---
- ## xftrans-general

Note: **`auto` language detection is not supported.**

| Language           | Code |
| ------------------ | ---- |
| Mandarin Chinese   | cn   |
| English            | en   |
| Yi                 | ii   |
| Cantonese          | yue  |
| Japanese           | ja   |
| Russian            | ru   |
| French             | fr   |
| Spanish            | es   |
| Arabic             | ar   |
| Italian            | it   |
| Turkish            | tr   |
| Vietnamese         | vi   |
| Thai               | th   |
| Korean             | ko   |
| German             | de   |
| Kazakh             | kka  |
| Afrikaans          | af   |
| Amharic            | am   |
| Azerbaijani        | az   |
| Bengali            | bn   |
| Catalan            | ca   |
| Czech              | cs   |
| Danish             | da   |
| Greek              | el   |
| Persian            | fa   |
| Finnish            | fi   |
| Hebrew             | he   |
| Hindi              | hi   |
| Croatian           | hr   |
| Hungarian          | hu   |
| Armenian           | hy   |
| Indonesian         | id   |
| Icelandic          | is   |
| Tagalog (Filipino) | tl   |
| Romanian           | ro   |
| Georgian           | ka   |
| Khmer              | km   |
| Lao                | lo   |
| Lithuanian         | lt   |
| Latvian            | lv   |
| Malayalam          | ml   |
| Marathi            | mr   |
| Norwegian Bokmål   | nb   |
| Nepali             | ne   |
| Dutch              | nl   |
| Polish             | pl   |
| Portuguese         | pt   |
| Sinhala            | si   |
| Slovak             | sk   |
| Slovenian          | sl   |
| Serbian            | sr   |
| Sundanese          | su   |
| Swedish            | sv   |
| Swahili            | sw   |
| Tamil              | ta   |
| Telugu             | te   |
| Javanese           | jv   |
| Malay              | ms   |
| Ukrainian          | uk   |
| Urdu               | ur   |
| Zulu               | zu   |
| Inner Mongolian    | mn   |
| Burmese            | my   |
| Outer Mongolian    | nm   |
| Pashto             | ps   |
| Hausa              | ha   |
| Uzbek              | uz   |
| Turkmen            | tk   |
| Tajik              | tg   |
| Bulgarian          | bg   |

# - xftrans-new

Note: **`auto` language detection is not supported.** **不支持中文**

| Language       | Code |
| ------------- | ---- |
| English       | en   |
| Japanese      | ja   |
| Korean        | ko   |
| Thai          | th   |
| Russian       | ru   |
| Bulgarian     | bg   |
| Ukrainian     | uk   |
| Vietnamese    | vi   |
| Malay         | ms   |
| Indonesian    | id   |
| Filipino      | tl   |
| German        | de   |
| Spanish       | es   |
| French        | fr   |
| Czech         | cs   |
| Romanian      | ro   |
| Swedish       | sv   |
| Dutch         | nl   |
| Polish        | pl   |
| Arabic        | ar   |
| Persian       | fa   |
| Pashto        | ps   |
| Urdu          | ur   |
| Hindi         | hi   |
| Bengali       | bn   |
| Outer Mongolian | nm   |
| Outer Kazakh | kk   |
| Turkish       | tr   |
| Hausa         | ha   |
| Hungarian     | hu   |
| Swahili       | sw   |
| Uzbek         | uz   |
| Zulu          | zu   |
| Greek         | el   |
| Hebrew        | he   |
| Armenian      | hy   |
| Georgian      | ka   |
| Cantonese     | yue  |
| Yi            | ii   |
| Zhuang        | zua  |
| Inner Mongolian | mn   |
| Inner Kazakh  | kka  |

- # xftrans-niutrans

Note: **Supports `auto` for automatic language detection, but accuracy is affected by text length.**

| Language         | Code |
| --------------- | ---- |
| Chinese (Simplified)  | cn   |
| Chinese (Traditional) | cht  |
| English         | en   |
| Japanese        | ja   |
| Korean          | ko   |
| Russian         | ru   |
| French          | fr   |
| Spanish         | es   |
| Arabic          | ar   |
| Portuguese      | pt   |
| Afrikaans       | af   |
| Amharic         | am   |
| Azerbaijani     | az   |
| Bashkir         | ba   |
| Belarusian      | be   |
| Bemba           | bem  |
| Bulgarian       | bg   |
| Bislama         | bi   |
| Bengali         | bn   |
| Bosnian         | bs   |
| Catalan         | ca   |
| Cebuano         | ceb  |
| Corsican        | co   |
| Seychellois Creole | crs  |
| Czech           | cs   |
| Welsh           | cy   |
| Danish          | da   |
| German          | de   |
| Ewe             | ee   |
| Greek           | el   |
| Esperanto       | eo   |
| Estonian        | et   |
| Basque          | eu   |
| Persian         | fa   |
| Finnish         | fi   |
| Filipino        | fil  |
| Fijian          | fj   |
| Frisian         | fy   |
| Irish           | ga   |
| Scottish Gaelic | gd   |
| Galician        | gl   |
| Gujarati        | gu   |
| Hausa           | ha   |
| Hawaiian        | haw  |
| Hebrew          | he   |
| Hindi           | hi   |
| Croatian        | hr   |
| Haitian Creole  | ht   |
| Hungarian       | hu   |
| Armenian        | hy   |
| Indonesian      | id   |
| Igbo            | ig   |
| Icelandic       | is   |
| Italian         | it   |
| Javanese        | jv   |
| Georgian        | jy   |
| Kazakh          | ka   |
| Kʼicheʼ         | kek  |
| Kongo           | kg   |
| Kazakh (Cyrillic) | kk   |
| Khmer           | km   |
| Kannada         | kn   |
| Kurdish         | ku   |
| Kyrgyz          | ky   |
| Latin           | la   |
| Luxembourgish   | lb   |
| Luganda         | lg   |
| Lingala         | ln   |
| Lao             | lo   |
| Lithuanian      | lt   |
| Latvian         | lv   |
| Malagasy        | mg   |
| Mari            | mhr  |
| Maori           | mi   |
| Macedonian      | mk   |
| Malayalam       | ml   |
| Mongolian (Cyrillic) | mn   |
| Marathi         | mr   |
| Hill Mari       | mrj  |
| Malay           | ms   |
| Maltese         | mt   |
| Hmong Daw       | mww  |
| Burmese         | my   |
| Norwegian Bokmål | nb   |
| Nepali          | ne   |
| Dutch           | nl   |
| Norwegian       | no   |
| Chichewa        | ny   |
| Oromo           | om   |
| Ossetian        | os   |
| Querétaro Otomi | otq  |
| Punjabi         | pa   |
| Papiamento      | pap  |
| Polish          | pl   |
| Pashto          | ps   |
| Rundi           | rn   |
| Romanian        | ro   |
| Kinyarwanda     | rw   |
| Sindhi          | sd   |
| Sango           | sg   |
| Sinhala         | si   |
| Slovak          | sk   |
| Slovenian       | sl   |
| Samoan          | sm   |
| Shona           | sn   |
| Somali          | so   |
| Albanian        | sq   |
| Serbian         | sr   |
| Sesotho         | st   |
| Sundanese       | su   |
| Swedish         | sv   |
| Swahili         | sw   |
| Tamil           | ta   |
| Telugu          | te   |
| Tajik           | tg   |
| Tswana          | tn   |
| Thai            | th   |
| Tibetan         | ti   |
| Tigrinya        | tig  |
| Turkmen         | tk   |
| Tongan          | to   |
| Tok Pisin       | tpi  |
| Turkish         | tr   |
| Tsonga          | ts   |
| Tatar           | tt   |
| Twi             | tw   |
| Tahitian        | ty   |
| Udmurt          | udm  |
| Ukrainian       | uk   |
| Urdu            | ur   |
| Uyghur          | uy   |
| Uzbek           | uz   |
| Vietnamese      | vi   |
| Waray           | war  |
| Xhosa           | xh   |
| Yiddish         | yi   |
| Yoruba          | yo   |
| Yucatec Maya    | yua  |
| Cantonese       | yue  |
| Zulu            | zu   |
