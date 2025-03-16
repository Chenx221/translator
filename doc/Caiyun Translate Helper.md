Setup Guide: https://docs.caiyunapp.com/lingocloud-api/

ENV:
```
TRANSLATION_SERVICES=[caiyun]
CAIYUN_MT_ENDPOINT=https://api.interpreter.caiyunai.com/v1/translator
CAIYUN_TOKEN=
CAIYUN_FROM_TO=
```
---

`3975l6lr5pcbvidl6jl2` 

The official test token is provided, but it's completely unusable :(

| From-to  | Chinese | English | Japanese |
| :------- | :------ | :------ | :------- |
| Chinese  | -       | zh2en   | zh2ja    |
| English  | en2zh   | -       | -        |
| Japanese | ja2zh   | -       | -        |

Using `auto2xx`, the source language can be automatically detected.

The API officially supports only these languages; for other languages, email inquiries are required...