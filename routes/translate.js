import express from 'express';
import AliyunClient from '../services/translator/aliyun.js';
import BaiduClient from '../services/translator/baidu.js';
import CaiyunClient from '../services/translator/caiyun.js';
import DeepseekClient from '../services/ai/deepseek.js';
import GeminiClient from '../services/ai/gemini.js';
import HunyuanClient from '../services/ai/hunyuan.js';
import iFlytekClient from '../services/translator/iflytek.js';
import NiutransClient from '../services/translator/niutrans.js';
import OpenaiClient from '../services/ai/openai.js';
import OpenaiCompatibleClient from "../services/ai/openai-compatible.js";
import TencentClient from '../services/translator/tencent.js';
import TencentTransmartClient from '../services/translator/tencent-transmart.js';
import volcengineClient from '../services/translator/volcengine.js';
import YoudaoClient from '../services/translator/youdao.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const {text} = req.body;
    const translationPromises = [];

    if (global.services.aliyunAI) {
        try {
            const sp = ['qwen-mt-plus', 'qwen-mt-turbo'].includes(process.env.ALIYUN_AI_MODEL);
            let resp = await OpenaiCompatibleClient.translate({
                baseURL: process.env.ALIYUN_AI_ENDPOINT,
                apiKey: process.env.ALIYUN_AI_API_KEY,
                text,
                from: process.env.ALIYUN_AI_SOURCE_LANGUAGE,
                to: process.env.ALIYUN_AI_TARGET_LANGUAGE,
                model: process.env.ALIYUN_AI_MODEL,
                prompt: process.env.ALIYUN_AI_PROMPT || process.env.GLOBAL_AI_PROMPT,
                specificMessage: sp ?
                    ([{
                        role: "user", content: text
                    }])
                    : null,
                translation_options: sp ? ({
                    source_lang: process.env.ALIYUN_AI_SOURCE_LANGUAGE,
                    target_lang: process.env.ALIYUN_AI_TARGET_LANGUAGE
                }) : null
            });
            translationPromises.push(sp ? resp : parseJsonOrExtractFromAiResponse(resp).translation);
        } catch (err) {
            console.error(`[ERROR] ${err.message}`);
            translationPromises.push('aliyunAI: [Error] Please check the console for error details.');
        }
    }

    if (global.services.aliyunFree) {
        let resp = await AliyunClient.translate(text, 'free');
        if (resp.httpStatusCode !== 200) {
            console.error(`aliyunFree: [ERROR] ${resp.code} ${resp.message}`);
            translationPromises.push(`aliyunFree: [ERROR] ${resp.httpStatusCode} ${resp.code}`);
            // Q: Why does the 500 Query csi check not pass error occur?
            // A: Alibaba has added content censorship to the free API.
            // If the original text for translation contains sensitive words, the CSI check will fail.
            // For example, "Donald Trump".
        } else {
            translationPromises.push(resp.data.translateText);
        }
    }

    if (global.services.aliyunGeneral) {
        let resp = await AliyunClient.translate(text, 'general');
        if (!('statusCode' in resp))
            translationPromises.push('Something went wrong');
        else if (resp.statusCode !== 200) {
            translationPromises.push(`aliyunGeneral: [ERROR] ${resp.statusCode} ${resp.error}`);
        } else {
            translationPromises.push(resp.body.data.translated);
        }
    }

    if (global.services.aliyunProfessional) {
        let resp = await AliyunClient.translate(text, 'pro');
        if (!('statusCode' in resp))
            translationPromises.push('[ERROR] Something went wrong');
        else if (resp.statusCode !== 200) {
            translationPromises.push(`aliyunGeneral: [ERROR] ${resp.statusCode} ${resp.error}`);
        } else {
            translationPromises.push(resp.body.data.translated);
        }
    }

    if (global.services.baidu) {
        try {
            let resp = await BaiduClient.translate(text);
            translationPromises.push(resp.result.trans_result[0].dst);
        } catch (err) {
            translationPromises.push('baidu: [Error] ' + err.message);
        }
    }

    if (global.services.caiyun) {
        try {
            let resp = await CaiyunClient.translate(text);
            translationPromises.push(resp.target);
        } catch (err) {
            translationPromises.push('caiyun: [Error] ' + err.response.status + ' ' + err.response.statusText);
        }
    }

    if (global.services.deepseek) {
        try {
            let resp = await DeepseekClient.translate(text);
            translationPromises.push(parseJsonOrExtractFromAiResponse(resp).translation);
        } catch (err) {
            console.error(`[ERROR] ${err.message}`);
            translationPromises.push('deepseek: [Error] Please check the console for error details.');
        }
    }

    if (global.services.gemini) {
        try {
            let resp = await GeminiClient.translate(text);
            translationPromises.push(parseJsonOrExtractFromAiResponse(resp).translation);
        } catch (err) {
            console.error(`[ERROR] ${err.message}`);
            translationPromises.push('deepseek: [Error] Please check the console for error details.');
        }
    }

    if (global.services.niutrans) {
        let resp = await NiutransClient.translate(text);
        if (resp.error_code === undefined)
            translationPromises.push(resp.tgt_text);
        else {
            console.error(`[ERROR] ${resp.error_code} ${resp.error_msg}`);
            translationPromises.push('niutrans: [Error] ' + resp.error_code + ' ' + resp.error_msg);
        }
    }

    if (global.services.openai) {
        try {
            let resp = await OpenaiClient.translate(text);
            translationPromises.push(parseJsonOrExtractFromAiResponse(resp).translation);
        } catch (err) {
            console.error(`[ERROR] ${err.message}`);
            translationPromises.push('openai: [Error] Please check the console for error details.');
        }
    }

    if (global.services.tencentAI) {
        const sp = ['hunyuan-translation', 'hunyuan-translation-lite'].includes(process.env.TENCENT_AI_MODEL);
        try {
            if(sp){
                let resp = await HunyuanClient.translate(text);
                translationPromises.push(resp.Choices[0].Message.Content);
            }else{
                let resp = await OpenaiCompatibleClient.translate({
                    baseURL: process.env.TENCENT_AI_ENDPOINT,
                    apiKey: process.env.TENCENT_AI_API_KEY,
                    text,
                    from: process.env.TENCENT_AI_SOURCE_LANGUAGE,
                    to: process.env.TENCENT_AI_TARGET_LANGUAGE,
                    model: process.env.TENCENT_AI_MODEL,
                    prompt: process.env.TENCENT_AI_PROMPT || process.env.GLOBAL_AI_PROMPT,
                    specificMessage: null,
                    translation_options: {
                        enable_enhancement: false, // disable search?
                    }
                });
                translationPromises.push(sp ? resp : parseJsonOrExtractFromAiResponse(resp).translation);
            }
        } catch (err) {
            console.error(`[ERROR] ${err.message}`);
            translationPromises.push('tencentAI: [Error] Please check the console for error details.');
        }
    }

    if (global.services.tencentGeneral) {
        try {
            let resp = await TencentClient.translate(text);
            translationPromises.push(resp.TargetText);
        } catch (err) {
            translationPromises.push('tencent: [ERROR] ' + err.code);
        }
    }

    if (global.services.tencentTransmart) {
        try {
            let resp = await TencentTransmartClient.translate(text);
            translationPromises.push(resp.auto_translation[0]);
        } catch (err) {
            translationPromises.push('tencentTransmart: [ERROR] ');
        }
    }

    if (global.services.volcengine) {
        let resp = await volcengineClient.translate(text);
        if (!resp.ResponseMetadata.Error)
            translationPromises.push(resp.TranslationList[0].Translation);
        else {
            console.error(`[ERROR] ${resp.ResponseMetadata.Error.Code}. ${resp.ResponseMetadata.Error.Message} (RequestId: ${resp.ResponseMetadata.RequestId})`);
            translationPromises.push(`volcengine: [ERROR] ${resp.ResponseMetadata.Error.Code}`);
        }
    }

    if (global.services.xftransGeneral) {
        try {
            let resp = await iFlytekClient.translate(text, 0);
            translationPromises.push(resp.TargetText);
        } catch (err) {
            translationPromises.push(`xftransGeneral: [ERROR] ${err.status} ${err.response.statusText}`);
        }
    }

    if (global.services.xftransNew) {
        try {
            let resp = await iFlytekClient.translate(text, 1);
            translationPromises.push(resp.TargetText);
        } catch (err) {
            translationPromises.push(`xftransNew: [ERROR] ${err.status} ${err.response.statusText}`);
        }
    }

    if (global.services.xftransNiutrans) {
        try {
            let resp = await iFlytekClient.translate(text, 2);
            translationPromises.push(resp.TargetText);
        } catch (err) {
            translationPromises.push(`xftransNiutrans: [ERROR] ${err.status} ${err.response.statusText}`);
        }
    }

    if (global.services.youdaoGereral) {
        let resp = await YoudaoClient.translate(text, false);
        if (resp.errorCode === "0")
            translationPromises.push(resp.translation[0]);
        else {
            console.error(`[ERROR] ${resp.errorCode}, RequestId: ${resp.requestId}`);
            translationPromises.push(`youdaoGereral: [ERROR] ${resp.errorCode}, RequestId: ${resp.requestId}`);
        }

    }

    if (global.services.youdaoLLM) {
        try {
            let resp = await YoudaoClient.translate(text, true);
            translationPromises.push(resp);
        } catch (err) {
            translationPromises.push('[Error] Please check the console output.');
        }
    }

    try {
        const results = await Promise.all(translationPromises);
        const combinedTranslation = results.join('\u200b\n');
        res.json({translation: combinedTranslation});
    } catch (error) {
        res.status(500).json({error: 'Translation failed', details: error.message});
    }
});

function parseJsonOrExtractFromAiResponse(content) {
    try {
        return JSON.parse(content);
    } catch {
        try {
            const match = content.match(/```json\s*([\s\S]*?)\s*```/);
            if (match) {
                return JSON.parse(match[1]);
            }
        } catch (error) {
            console.error('Damn, the AI returned unparseable data. Data: ', content);
            throw error;
        }
    }
}

export default router;
