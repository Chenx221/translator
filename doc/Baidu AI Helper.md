Setup Guide: https://cloud.baidu.com/doc/WENXINWORKSHOP/s/Um2wxbaps#%E6%AD%A5%E9%AA%A4%E4%BA%8C-%E8%8E%B7%E5%8F%96api-key

ENV:
```
TRANSLATION_SERVICES=[baidu-ai]
BAIDU_AI_ENDPOINT=https://qianfan.baidubce.com/v2  
BAIDU_AI_API_KEY=
BAIDU_AI_MODEL=  
BAIDU_AI_PROMPT=  
BAIDU_AI_SOURCE_LANGUAGE=  
BAIDU_AI_TARGET_LANGUAGE=
```
---
**AI translation response may be slow.**

- BAIDU_AI_ENDPOINT

		You don't need to modify it unless baidu actually changes the API.

- BAIDU_AI_MODEL

| name                | description                           | value(BAIDU_AI_MODEL)                 |
| ------------------- | ------------------------------------- | ------------------------------------- |
| ERNIE 4.5           | ERNIE-4.5-8K-Preview                  | ernie-4.5-8k-preview                  |
| ERNIE 4.0           | ERNIE-4.0-8K-Latest                   | ernie-4.0-8k-latest                   |
| ERNIE 4.0           | ERNIE-4.0-8K-Preview                  | ernie-4.0-8k-preview                  |
| ERNIE 4.0           | ERNIE-4.0-8K                          | ernie-4.0-8k                          |
| ERNIE 4.0 Turbo     | ERNIE-4.0-Turbo-8K-Latest             | ernie-4.0-turbo-8k-latest             |
| ERNIE 4.0 Turbo     | ERNIE-4.0-Turbo-8K-Preview            | ernie-4.0-turbo-8k-preview            |
| ERNIE 4.0 Turbo     | ERNIE-4.0-Turbo-8K                    | ernie-4.0-turbo-8k                    |
| ERNIE 4.0 Turbo     | ERNIE-4.0-Turbo-128K                  | ernie-4.0-turbo-128k                  |
| ERNIE 3.5           | ERNIE-3.5-8K-Preview                  | ernie-3.5-8k-preview                  |
| ERNIE 3.5           | ERNIE-3.5-8K                          | ernie-3.5-8k                          |
| ERNIE 3.5           | ERNIE-3.5-128K                        | ernie-3.5-128k                        |
| ERNIE Speed         | ERNIE-Speed-8K                        | ernie-speed-8k                        |
| ERNIE Speed         | ERNIE-Speed-128K                      | ernie-speed-128k                      |
| ERNIE Speed         | ERNIE-Speed-Pro-128K                  | ernie-speed-pro-128k                  |
| ERNIE Lite          | ERNIE-Lite-8K                         | ernie-lite-8k                         |
| ERNIE Lite          | ERNIE-Lite-Pro-128K                   | ernie-lite-pro-128k                   |
| ERNIE Tiny          | ERNIE-Tiny-8K                         | ernie-tiny-8k                         |
| ERNIE Character     | ERNIE-Character-8K                    | ernie-char-8k                         |
| ERNIE Character     | ERNIE-Character-Fiction-8K            | ernie-char-fiction-8k                 |
| ERNIE-Novel-8K      | ERNIE-Novel-8K                        | ernie-novel-8k                        |
| DeepSeek-Chat       | DeepSeek-V3                           | deepseek-v3                           |
| DeepSeek-Reasoner   | DeepSeek-R1                           | deepseek-r1                           |
| DeepSeek-R1-Distill | DeepSeek-R1-Distill-Qwen-32B          | deepseek-r1-distill-qwen-32b          |
| DeepSeek-R1-Distill | DeepSeek-R1-Distill-Qwen-14B          | deepseek-r1-distill-qwen-14b          |
| DeepSeek-R1-Distill | DeepSeek-R1-Distill-Qwen-7B           | deepseek-r1-distill-qwen-7b           |
| DeepSeek-R1-Distill | DeepSeek-R1-Distill-Qwen-1.5B         | deepseek-r1-distill-qwen-1.5b         |
| DeepSeek-R1-Distill | DeepSeek-R1-Distill-Llama-70B         | deepseek-r1-distill-llama-70b         |
| DeepSeek-R1-Distill | DeepSeek-R1-Distill-Llama-8B          | deepseek-r1-distill-llama-8b          |
| DeepSeek-R1-Distill | DeepSeek-R1-Distill-Qianfan-Llama-70B | deepseek-r1-distill-qianfan-llama-70b |
| DeepSeek-R1-Distill | DeepSeek-R1-Distill-Qianfan-Llama-8B  | deepseek-r1-distill-qianfan-llama-8b  |
| QwQ-32B             | QwQ-32B                               | qwq-32b                               |


-   BAIDU_AI_PROMPT

		I have already prepared a global prompt in the .env. 
		If you have no other requirements, you don't need to set it.

-   BAIDU_AI_SOURCE_LANGUAGE、  BAIDU_AI_TARGET_LANGUAGE

		Feel free to fill it in as long as the AI model understands this language.
		
		For example: 
		 BAIDU_AI_SOURCE_LANGUAGE=english
		 BAIDU_AI_TARGET_LANGUAGE=简体中文