Setup Guide: https://ai.google.dev/gemini-api/docs/quickstart?lang=node

ENV:
```
TRANSLATION_SERVICES=[gemini]
GEMINI_API_KEY=
GEMINI_MODEL=  
GEMINI_PROMPT=  
GEMINI_SOURCE_LANGUAGE=
GEMINI_TARGET_LANGUAGE=
```
---

**AI translation response may be slow.**
Except for the first request, Gemini's response speed is fairly acceptable (with a response time of 2s in Mainland China + US Proxy), whereas the previously added DeepSeek takes over 15s.

- GEMINI_MODEL

		If you have already configured the API key, please check the bottom of this document. 
		Tips: Preview the document through the local API (we will retrieve the list of available models for you).

- GEMINI_PROMPT

		I have already prepared a global prompt in the .env. 
		If you have no other requirements, you don't need to set it.

- GEMINI_SOURCE_LANGUAGE、GEMINI_TARGET_LANGUAGE

		Feel free to fill it in as long as the AI model understands this language.
		
		For example: 
		GEMINI_SOURCE_LANGUAGE=english
		GEMINI_TARGET_LANGUAGE=schinese