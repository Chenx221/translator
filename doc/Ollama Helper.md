Setup Guide: https://platform.openai.com/docs/libraries#create-and-export-an-api-key

ENV:
```
TRANSLATION_SERVICES=[ollama]
OLLAMA_HOST=http://127.0.0.1:11434  
OLLAMA_MODEL=  
OLLAMA_PROMPT=  
OLLAMA_SOURCE_LANGUAGE=  
OLLAMA_TARGET_LANGUAGE=
```
---

**AI translation response may be slow.**

- OLLAMA_MODEL

		You can set multiple models separated by commas. 
		Please choose according to your device's resources.

- OLLAMA_SOURCE_LANGUAGE、OLLAMA_TARGET_LANGUAGE

		Feel free to fill it in as long as the AI model understands this language.
		
		Some specialized translation models do not follow these settings.
		
		For example: 
		OPENAI_SOURCE_LANGUAGE=english
		OPENAI_TARGET_LANGUAGE=schinese