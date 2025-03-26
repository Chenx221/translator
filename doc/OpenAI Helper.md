Setup Guide: https://platform.openai.com/docs/libraries#create-and-export-an-api-key

Supports other AI service providers' APIs as long as they follow the OpenAI API standard.

ENV:
```
TRANSLATION_SERVICES=[openai]
OPENAI_ENDPOINT=https://api.openai.com/v1
OPENAI_API_KEY=  
OPENAI_MODEL=  
OPENAI_PROMPT=  
OPENAI_SOURCE_LANGUAGE=  
OPENAI_TARGET_LANGUAGE=
```
---

**AI service providers that have been tested:**

| Provider    | Support Status | Endpoint                      | Note     |
| ----------- | -------------- | ----------------------------- | -------- |
| OpenAI      | ✔              | https://api.openai.com/v1     | official |
| OpenRouter  | ✔              | https://openrouter.ai/api/v1  |          |
| siliconflow | ✔              | https://api.siliconflow.cn/v1 | slow     |


---

**AI translation response may be slow.**

- OPENAI_ENDPOINT

		If you are using a “third-party” OpenAI API, you will need to modify it.
		Supports other AI service providers' APIs as long as they follow the OpenAI API standard.

- OPENAI_MODEL

		If you have already configured the API key, please check the bottom of this document. 
		Tips: Preview the document through the local API (we will retrieve the list of available models for you).

- OPENAI_PROMPT

		I have already prepared a global prompt in the .env. 
		If you have no other requirements, you don't need to set it.

- OPENAI_SOURCE_LANGUAGE、OPENAI_TARGET_LANGUAGE

		Feel free to fill it in as long as the AI model understands this language.
		
		For example: 
		OPENAI_SOURCE_LANGUAGE=english
		OPENAI_TARGET_LANGUAGE=schinese