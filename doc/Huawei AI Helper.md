aka 菊花大模型

Setup Guide: https://support.huaweicloud.com/usermanual-maas-modelarts/maas-modelarts-0073.html

ENV:
```
TRANSLATION_SERVICES=[huawei-ai]
HUAWEI_AI_ENDPOINT=
HUAWEI_AI_API_KEY=
HUAWEI_AI_MODEL=
HUAWEI_AI_PROMPT=  
HUAWEI_AI_SOURCE_LANGUAGE=english  
HUAWEI_AI_TARGET_LANGUAGE=schinese
```
---
**AI translation response may be slow.**

POST /translate 200 32596.135 ms - 526

As of now, this is the slowest AI service provider I have encountered.


- HUAWEI_AI_ENDPOINT

		After changing the model, you must update the API (ENDPOINT). This is caused by Huawei Cloud, as different models have different endpoints.

- HUAWEI_AI_MODEL

		https://console.huaweicloud.com/modelarts/?region=cn-southwest-2#/model-studio/deployment
		or
		https://support.huaweicloud.com/modelarts/index.html

-   HUAWEI_AI_PROMPT

		I have already prepared a global prompt in the .env. 
		If you have no other requirements, you don't need to set it.

-   HUAWEI_AI_SOURCE_LANGUAGE、 HUAWEI_AI_TARGET_LANGUAGE

		Feel free to fill it in as long as the AI model understands this language.
		
		For example: 
		 HUAWEI_AI_SOURCE_LANGUAGE=english
		 HUAWEI_AI_TARGET_LANGUAGE=简体中文