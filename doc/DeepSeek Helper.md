Setup Guide: https://platform.deepseek.com/api_keys

ENV:
```
TRANSLATION_SERVICES=[deepseek]
DEEPSEEK_ENDPOINT=https://api.deepseek.com  
DEEPSEEK_API_KEY=
DEEPSEEK_MODEL=[deepseek-chat,deepseek-reasoner]
DEEPSEEK_PROMPT=
DEEPSEEK_SOURCE_LANGUAGE=
DEEPSEEK_TARGET_LANGUAGE=
```
---

**AI translation response is very slow.**

- DEEPSEEK_MODEL

		`deepseek-chat`(Recommend) or `deepseek-reasoner`
		
		`deepseek-reasoner` is very unstable and I haven't tested it yet.
		
		*I may add a feature to retrieve the list of available models in future updates.*

- DEEPSEEK_PROMPT

		I have already prepared a prompt in the .env. 
		If you have no other requirements, you don't need to set it.

- DEEPSEEK_SOURCE_LANGUAGE、DEEPSEEK_TARGET_LANGUAGE

		Feel free to fill it in as long as the AI model understands this language.
		
		For example: 
		DEEPSEEK_SOURCE_LANGUAGE=english
		DEEPSEEK_TARGET_LANGUAGE=schinese