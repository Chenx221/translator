aka 火山方舟大模型

Setup Guide: https://www.volcengine.com/docs/82379/1399008

ENV:
```
TRANSLATION_SERVICES=[volcengine-ai]
VOLCENGINE_AI_ENDPOINT=https://ark.cn-beijing.volces.com/api/v3/  
VOLCENGINE_AI_API_KEY=
VOLCENGINE_AI_MODEL=  
VOLCENGINE_AI_PROMPT=  
VOLCENGINE_AI_SOURCE_LANGUAGE=english  
VOLCENGINE_AI_TARGET_LANGUAGE=schinese
```
---
**AI translation response may be slow.**

- VOLCENGINE_AI_ENDPOINT

		You don't need to modify it unless volcengine actually changes the API.

- VOLCENGINE_AI_MODEL

		https://www.volcengine.com/docs/82379/1330310
		Model ID

-   VOLCENGINE_AI_PROMPT

		I have already prepared a global prompt in the .env. 
		If you have no other requirements, you don't need to set it.

-   VOLCENGINE_AI_SOURCE_LANGUAGE、 VOLCENGINE_AI_TARGET_LANGUAGE

		Feel free to fill it in as long as the AI model understands this language.
		
		For example: 
		 VOLCENGINE_AI_SOURCE_LANGUAGE=english
		 VOLCENGINE_AI_TARGET_LANGUAGE=简体中文