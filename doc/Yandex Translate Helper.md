Setup Guide: https://yandex.cloud/en/docs/translate/quickstart

ENV:
```
TRANSLATION_SERVICES=[yandex-free,yandex-paid,yandex-browser]
YANDEX_FOLDER_ID=  
YANDEX_TOKEN=
YANDEX_SOURCE_LANGUAGE=en  
YANDEX_TARGET_LANGUAGE=zh
```
---

- yandex-free

| code    | language               |
| ------- | ---------------------- |
| af      | Afrikaans              |
| am      | Amharic                |
| ar      | Arabic                 |
| az      | Azerbaijani            |
| ba      | Bashkir                |
| be      | Belarusian             |
| bg      | Bulgarian              |
| bn      | Bengali                |
| bs      | Bosnian                |
| ca      | Catalan                |
| ceb     | Cebuano                |
| cs      | Czech                  |
| cv      | Chuvash                |
| cy      | Welsh                  |
| da      | Danish                 |
| de      | German                 |
| el      | Greek                  |
| emj     | Emoji                  |
| en      | English                |
| eo      | Esperanto              |
| es      | Spanish                |
| et      | Estonian               |
| eu      | Basque                 |
| fa      | Persian                |
| fi      | Finnish                |
| fr      | French                 |
| ga      | Irish                  |
| gd      | Scottish (Gaelic)      |
| gl      | Galician               |
| gu      | Gujarati               |
| he      | Hebrew                 |
| hi      | Hindi                  |
| hr      | Croatian               |
| ht      | Haitian                |
| hu      | Hungarian              |
| hy      | Armenian               |
| id      | Indonesian             |
| is      | Icelandic              |
| it      | Italian                |
| ja      | Japanese               |
| jv      | Javanese               |
| ka      | Georgian               |
| kazlat  | Kazakh (Latin)         |
| kk      | Kazakh                 |
| km      | Khmer                  |
| kn      | Kannada                |
| ko      | Korean                 |
| ky      | Kirghiz                |
| la      | Latin                  |
| lb      | Luxembourgish          |
| lo      | Lao                    |
| lt      | Lithuanian             |
| lv      | Latvian                |
| mg      | Malagasy               |
| mhr     | Mari                   |
| mi      | Maori                  |
| mk      | Macedonian             |
| ml      | Malayalam              |
| mn      | Mongolian              |
| mr      | Marathi                |
| mrj     | Western Mari           |
| ms      | Malay                  |
| mt      | Maltese                |
| my      | Burmese                |
| ne      | Nepali                 |
| nl      | Dutch                  |
| no      | Norwegian              |
| os      | Ossetian               |
| pa      | Punjabi                |
| pap     | Papiamento             |
| pl      | Polish                 |
| pt      | Portuguese             |
| pt-BR   | Portuguese (Brazilian) |
| ro      | Romanian               |
| ru      | Russian                |
| sah     | Yakut                  |
| si      | Sinhala                |
| sk      | Slovak                 |
| sl      | Slovenian              |
| sq      | Albanian               |
| sr      | Serbian                |
| sr-Latn | Serbian (Latin)        |
| su      | Sundanese              |
| sv      | Swedish                |
| sw      | Swahili                |
| ta      | Tamil                  |
| te      | Telugu                 |
| tg      | Tajik                  |
| th      | Thai                   |
| tl      | Tagalog                |
| tr      | Turkish                |
| tt      | Tatar                  |
| udm     | Udmurt                 |
| uk      | Ukrainian              |
| ur      | Urdu                   |
| uz      | Uzbek                  |
| uzbcyr  | Uzbek (Cyrillic)       |
| vi      | Vietnamese             |
| xh      | Xhosa                  |
| yi      | Yiddish                |
| zh      | Chinese                |
| zu      | Zulu                   |

- yandex-paid

Since I don’t have a test account, its entirely based on the API documentation.

| code    | language            |
| ------- | ------------------- |
| af      | Afrikaans           |
| am      | Amharic             |
| ar      | Arabic              |
| az      | Azerbaijani         |
| ba      | Bashkir             |
| be      | Belarusian          |
| bg      | Bulgarian           |
| bn      | Bengali             |
| bs      | Bosnian             |
| ca      | Catalan             |
| ceb     | Cebuano             |
| cs      | Czech               |
| cv      | Chuvash             |
| cy      | Welsh               |
| da      | Danish              |
| de      | German              |
| el      | Greek               |
| emj     | Emoji               |
| en      | English             |
| eo      | Esperanto           |
| es      | Spanish             |
| et      | Estonian            |
| eu      | Basque              |
| fa      | Persian             |
| fi      | Finnish             |
| fr      | French              |
| ga      | Irish               |
| gd      | Scottish Gaelic     |
| gl      | Galician            |
| gu      | Gujarati            |
| he      | Hebrew              |
| hi      | Hindi               |
| hr      | Croatian            |
| ht      | Haitian             |
| hu      | Hungarian           |
| hy      | Armenian            |
| id      | Indonesian          |
| is      | Icelandic           |
| it      | Italian             |
| ja      | Japanese            |
| jv      | Javanese            |
| ka      | Georgian            |
| kazlat  | Kazakh (Latin)      |
| kk      | Kazakh              |
| km      | Khmer               |
| kn      | Kannada             |
| ko      | Korean              |
| kv      | Komi                |
| ky      | Kyrgyz              |
| la      | Latin               |
| lb      | Luxembourgish       |
| lo      | Lao                 |
| lt      | Lithuanian          |
| lv      | Latvian             |
| mg      | Malagasy            |
| mhr     | Mari                |
| mi      | Maori               |
| mk      | Macedonian          |
| ml      | Malayalam           |
| mn      | Mongolian           |
| mr      | Marathi             |
| mrj     | Hill Mari           |
| ms      | Malay               |
| mt      | Maltese             |
| my      | Burmese             |
| ne      | Nepali              |
| nl      | Dutch               |
| no      | Norwegian           |
| os      | Ossetian            |
| pa      | Punjabi             |
| pap     | Papiamento          |
| pl      | Polish              |
| pt      | Portuguese          |
| pt-BR   | Portuguese (Brazil) |
| ro      | Romanian            |
| ru      | Russian             |
| sah     | Yakut               |
| si      | Sinhalese           |
| sjn     | Sika                |
| sk      | Slovak              |
| sl      | Slovenian           |
| sq      | Albanian            |
| sr      | Serbian             |
| sr-Latn | Serbian (Latin)     |
| su      | Sundanese           |
| sv      | Swedish             |
| sw      | Swahili             |
| ta      | Tamil               |
| te      | Telugu              |
| tg      | Tajik               |
| th      | Thai                |
| tl      | Tagalog             |
| tr      | Turkish             |
| tt      | Tatar               |
| tyv     | Tuvinian            |
| udm     | Udmurt              |
| uk      | Ukrainian           |
| ur      | Urdu                |
| uz      | Uzbek               |
| uzbcyr  | Uzbek (Cyrillic)    |
| vi      | Vietnamese          |
| xh      | Xhosa               |
| yi      | Yiddish             |
| zh      | Chinese             |
| zu      | Zulu                |

- yandex-browser

| code   | language         |
| ------ | ---------------- |
| af     | Afrikaans        |
| am     | Amharic          |
| ar     | Arabic           |
| az     | Azerbaijani      |
| ba     | Bashkir          |
| be     | Belarusian       |
| bg     | Bulgarian        |
| bn     | Bengali          |
| bs     | Bosnian          |
| ca     | Catalan          |
| ceb    | Cebuano          |
| cs     | Czech            |
| cv     | Chuvash          |
| cy     | Welsh            |
| da     | Danish           |
| de     | German           |
| el     | Greek            |
| emj    | Emoji            |
| en     | English          |
| eo     | Esperanto        |
| es     | Spanish          |
| et     | Estonian         |
| eu     | Basque           |
| fa     | Persian          |
| fi     | Finnish          |
| fr     | French           |
| ga     | Irish            |
| gd     | Scottish Gaelic  |
| gl     | Galician         |
| gu     | Gujarati         |
| he     | Hebrew           |
| hi     | Hindi            |
| hr     | Croatian         |
| ht     | Haitian          |
| hu     | Hungarian        |
| hy     | Armenian         |
| id     | Indonesian       |
| is     | Icelandic        |
| it     | Italian          |
| ja     | Japanese         |
| jv     | Javanese         |
| ka     | Georgian         |
| kazlat | Kazakh (Latin)   |
| kk     | Kazakh           |
| km     | Khmer            |
| kn     | Kannada          |
| ko     | Korean           |
| ky     | Kyrgyz           |
| la     | Latin            |
| lb     | Luxembourgish    |
| lo     | Lao              |
| lt     | Lithuanian       |
| lv     | Latvian          |
| mg     | Malagasy         |
| mhr    | Mari             |
| mi     | Maori            |
| mk     | Macedonian       |
| ml     | Malayalam        |
| mn     | Mongolian        |
| mr     | Marathi          |
| mrj    | Hill Mari        |
| ms     | Malay            |
| mt     | Maltese          |
| my     | Burmese          |
| ne     | Nepali           |
| nl     | Dutch            |
| no     | Norwegian        |
| pa     | Punjabi          |
| pap    | Papiamento       |
| pl     | Polish           |
| pt     | Portuguese       |
| ro     | Romanian         |
| ru     | Russian          |
| si     | Sinhalese        |
| sk     | Slovak           |
| sl     | Slovenian        |
| sq     | Albanian         |
| sr     | Serbian          |
| su     | Sundanese        |
| sv     | Swedish          |
| sw     | Swahili          |
| ta     | Tamil            |
| te     | Telugu           |
| tg     | Tajik            |
| th     | Thai             |
| tl     | Tagalog          |
| tr     | Turkish          |
| tt     | Tatar            |
| udm    | Udmurt           |
| uk     | Ukrainian        |
| ur     | Urdu             |
| uz     | Uzbek            |
| uzbcyr | Uzbek (Cyrillic) |
| vi     | Vietnamese       |
| xh     | Xhosa            |
| yi     | Yiddish          |
| zh     | Chinese          |
