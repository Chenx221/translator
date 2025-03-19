Setup Guide: https://bailian.console.aliyun.com/?apiKey=1#/api-key

ENV:
```
TRANSLATION_SERVICES=[aliyun-ai]
ALIYUN_AI_ENDPOINT=https://dashscope.aliyuncs.com/compatible-mode/v1  
ALIYUN_AI_API_KEY=
ALIYUN_AI_MODEL=  
ALIYUN_AI_PROMPT=  
ALIYUN_AI_SOURCE_LANGUAGE=
ALIYUN_AI_TARGET_LANGUAGE=
```
---

**Aliyun provides dedicated models for translation services. When using these two models (`qwen-mt-plus`, `qwen-mt-turbo`), the source and target languages must use the values listed in the table below.**

| Language   |
| ---------- |
| Chinese    |
| English    |
| Japanese   |
| Korean     |
| Thai       |
| French     |
| German     |
| Spanish    |
| Arabic     |
| Indonesian |
| Vietnamese |
| Portuguese |
| Italian    |
| Dutch      |
| Russian    |
| Khmer      |
| Cebuano    |
| Filipino   |
| Czech      |
| Polish     |
| Persian    |
| Hebrew     |
| Turkish    |
| Hindi      |
| Bengali    |
| Urdu       |

---

**AI translation response may be slow.**

- ALIYUN_AI_ENDPOINT

		You don't need to modify it unless Alibaba Cloud actually changes the API.

-  ALIYUN_AI_MODEL

		If you have already configured the API key, please check the bottom of this document. 
		Tips: Preview the document through the local API (we will retrieve the list of available models for you).

-  ALIYUN_AI_PROMPT

		I have already prepared a global prompt in the .env. 
		If you have no other requirements, you don't need to set it.

-  ALIYUN_AI_SOURCE_LANGUAGE、 ALIYUN_AI_TARGET_LANGUAGE

		Feel free to fill it in as long as the AI model understands this language.
		
		For example: 
		ALIYUN_AI_SOURCE_LANGUAGE=english
		ALIYUN_AI_TARGET_LANGUAGE=简体中文