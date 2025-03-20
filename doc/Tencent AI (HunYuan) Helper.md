Setup Guide: https://console.cloud.tencent.com/hunyuan/start

ENV:
```
TRANSLATION_SERVICES=[tencent-ai]
TENCENT_AI_ENDPOINT=https://api.hunyuan.cloud.tencent.com/v1 
TENCENT_AI_API_KEY=

TENCENT_AI_ENDPOINT2=hunyuan.tencentcloudapi.com  
TENCENT_AI_SECRET_ID=
TENCENT_AI_SECRET_KEY=

TENCENT_AI_MODEL=  
TENCENT_AI_PROMPT=  
TENCENT_AI_SOURCE_LANGUAGE=
TENCENT_AI_TARGET_LANGUAGE=
```
---

Note:

`hunyuan-translation` and `hunyuan-translation-lite` require configuring `TENCENT_AI_SECRET_ID` & `TENCENT_AI_SECRET_KEY`, as these models do not appear to support OpenAI SDK and require fixed language codes. 



**Other models are not affected. Configure TENCENT_AI_API_KEY and ignore the language table below.**

| Language              | Code |
| --------------------- | ---- |
| Chinese  (Simplified) | zh   |
| Cantonese             | yue  |
| English               | en   |
| French                | fr   |
| Portuguese            | pt   |
| Spanish               | es   |
| Japanese              | ja   |
| Turkish               | tr   |
| Russian               | ru   |
| Arabic                | ar   |
| Korean                | ko   |
| Thai                  | th   |
| Italian               | it   |
| German                | de   |
| Vietnamese            | vi   |
| Malay                 | ms   |
| Indonesian            | id   |


---
**AI translation response may be slow.**

- TENCENT_AI_ENDPOINT(2)

		You don't need to modify it unless tencent actually changes the API.

- TENCENT_AI_MODEL

  	If you have already configured the API key, please check the bottom of this document. 
  	Tips: Preview the document through the local API (we will retrieve the list of available models for you).

-   TENCENT_AI_PROMPT

		I have already prepared a global prompt in the .env. 
		If you have no other requirements, you don't need to set it.

-   TENCENT_AI_SOURCE_LANGUAGE、  TENCENT_AI_TARGET_LANGUAGE

		Feel free to fill it in as long as the AI model understands this language.
		
		For example: 
		 TENCENT_AI_SOURCE_LANGUAGE=english
		 TENCENT_AI_TARGET_LANGUAGE=简体中文