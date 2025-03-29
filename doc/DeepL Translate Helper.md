Setup Guide: https://www.deepl.com/en/pro/change-plan#developer

ENV:
```
TRANSLATION_SERVICES=[deepl-free,deepl-paid,deepl-free2]
DEEPL_API_KEY=  
DEEPL_SOURCE_LANGUAGE=  // Leaving it blank will auto detect the source language
DEEPL_TARGET_LANGUAGE=
```
---

Note: `deepl-free2` is not yet complete because after just a few test requests, DeepL banned my IP for making too many requests.

```
### 

Translation source languages

- `` - Auto Detect

- `AR` - Arabic
    
- `BG` - Bulgarian
    
- `CS` - Czech
    
- `DA` - Danish
    
- `DE` - German
    
- `EL` - Greek
    
- `EN` - English (all English variants)
    
- `ES` - Spanish
    
- `ET` - Estonian
    
- `FI` - Finnish
    
- `FR` - French
    
- `HU` - Hungarian
    
- `ID` - Indonesian
    
- `IT` - Italian
    
- `JA` - Japanese
    
- `KO` - Korean
    
- `LT` - Lithuanian
    
- `LV` - Latvian
    
- `NB` - Norwegian Bokmål
    
- `NL` - Dutch
    
- `PL` - Polish
    
- `PT` - Portuguese (all Portuguese variants)
    
- `RO` - Romanian
    
- `RU` - Russian
    
- `SK` - Slovak
    
- `SL` - Slovenian
    
- `SV` - Swedish
    
- `TR` - Turkish
    
- `UK` - Ukrainian
    
- `ZH` - Chinese (all Chinese variants)
    

### 

[](https://developers.deepl.com/docs/resources/supported-languages#translation-target-languages)

Translation target languages

- `AR` - Arabic
    
- `BG` - Bulgarian
    
- `CS` - Czech
    
- `DA` - Danish
    
- `DE` - German
    
- `EL` - Greek
    
- `EN` - English (unspecified variant for backward compatibility; please select `EN-GB` or `EN-US` instead)
    
- `EN-GB` - English (British)
    
- `EN-US` - English (American)
    
- `ES` - Spanish
    
- `ET` - Estonian
    
- `FI` - Finnish
    
- `FR` - French
    
- `HU` - Hungarian
    
- `ID` - Indonesian
    
- `IT` - Italian
    
- `JA` - Japanese
    
- `KO` - Korean
    
- `LT` - Lithuanian
    
- `LV` - Latvian
    
- `NB` - Norwegian Bokmål
    
- `NL` - Dutch
    
- `PL` - Polish
    
- `PT` - Portuguese (unspecified variant for backward compatibility; please select `PT-BR` or `PT-PT` instead)
    
- `PT-BR` - Portuguese (Brazilian)
    
- `PT-PT` - Portuguese (all Portuguese variants excluding Brazilian Portuguese)
    
- `RO` - Romanian
    
- `RU` - Russian
    
- `SK` - Slovak
    
- `SL` - Slovenian
    
- `SV` - Swedish
    
- `TR` - Turkish
    
- `UK` - Ukrainian
    
- `ZH` - Chinese (unspecified variant for backward compatibility; please select `ZH-HANS` or `ZH-HANT` instead)
    
- `ZH-HANS` - Chinese (simplified)
    
- `ZH-HANT` - Chinese (traditional)
```