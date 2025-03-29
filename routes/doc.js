import express from 'express';
import fs from 'fs';
import path from 'path';
import {marked} from 'marked';
import DeepSeekClient from '../services/ai/deepseek.js';
import GeminiClient from "../services/ai/gemini.js";
import OllamaClient from "../services/ai/ollama.js";
import OpenaiClient from "../services/ai/openai.js";
import OpenaiCompatibleClient from "../services/ai/openai-compatible.js";

const router = express.Router();

/* GET markdown file. */
router.get('/:filename', async function (req, res, next) {
    const docDir = path.join(import.meta.dirname, '../doc');
    const filePath = path.join(docDir, req.params.filename);

    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        const htmlContent = marked.parse(data);
        let modelsInfo = [];
        const type = getAIType(req.params.filename);
        var errorMsg = null;
        if (type !== null) {
            try {
                switch (type) {
                    case 'DeepSeek':
                        modelsInfo = await DeepSeekClient.getModels();
                        break;
                    case 'Gemini':
                        modelsInfo = await GeminiClient.getModels();
                        break;
                    case 'OpenAI':
                        modelsInfo = await OpenaiClient.getModels();
                        break;
                    case 'Aliyun AI':
                        modelsInfo = await OpenaiCompatibleClient.getModels(process.env.ALIYUN_AI_ENDPOINT, process.env.ALIYUN_AI_API_KEY);
                        break;
                    case 'Tencent AI':
                        modelsInfo = await OpenaiCompatibleClient.getModels(process.env.TENCENT_AI_ENDPOINT, process.env.TENCENT_AI_API_KEY);
                        modelsInfo.push({
                            id: 'hunyuan-translation',
                            created: Math.floor(new Date('2024-10-25').getTime() / 1000),
                        });
                        modelsInfo.push({
                            id: 'hunyuan-translation-lite',
                            created: Math.floor(new Date('2024-11-25').getTime() / 1000),
                        });
                        break;
                    // case 'Baidu AI':
                    //     modelsInfo = await OpenaiCompatibleClient.getModels(process.env.BAIDU_AI_ENDPOINT, process.env.BAIDU_AI_API_KEY);
                    //     break;
                    // case 'volcengine AI':
                    //     modelsInfo = await OpenaiCompatibleClient.getModels(process.env.VOLCENGINE_AI_ENDPOINT, process.env.VOLCENGINE_AI_API_KEY);
                    //     break;
                    // case 'Huawei AI':
                    //     modelsInfo = await OpenaiCompatibleClient.getModels(process.env.HUAWEI_AI_ENDPOINT, process.env.HUAWEI_AI_API_KEY);
                    //     break;
                    case 'Ollama':
                        modelsInfo = await OllamaClient.getModels();
                        modelsInfo = modelsInfo.map(model => {
                            return {
                                id: model.model,
                                name: model.name,
                                created: Math.floor(new Date(model.modified_at).getTime() / 1000),
                            };
                        });
                        break;
                }
            } catch (error) {
                errorMsg = `${error.message} ${error.cause.code}`
                console.error(`Failed to fetch ${type} models:`, error.message, error.cause.code);
            }
        }

        res.render('doc', {
            title: req.params.filename,
            content: htmlContent,
            isAI: getAIType(req.params.filename) !== null,
            models: modelsInfo,
            errorMsg: errorMsg,
        });
    } catch (err) {
        next(err);
    }
});

function getAIType(filename) {
    if (filename.startsWith('DeepSeek')) return 'DeepSeek';
    if (filename.startsWith('Gemini')) return 'Gemini';
    if (filename.startsWith('OpenAI')) return 'OpenAI';
    if (filename.startsWith('Aliyun AI')) return 'Aliyun AI';
    if (filename.startsWith('Tencent AI')) return 'Tencent AI';
    // Q: Why comment them out?
    // A: They are partially compatible with the OpenAI SDK, but the API for listing available models is missing.
    // I’m not going to waste my time fixing the compatibility issues caused by these platforms.
    // if (filename.startsWith('Baidu AI')) return 'Baidu AI';
    // if (filename.startsWith('volcengine AI')) return 'volcengine AI';
    // if (filename.startsWith('Huawei AI')) return 'Huawei AI';
    if (filename.startsWith('Ollama')) return 'Ollama';
    return null;
}

export default router;