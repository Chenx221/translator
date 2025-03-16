import express from 'express';
import fs from 'fs';
import path from 'path';
import {marked} from 'marked';
import DeepSeekClient from '../services/ai/deepseek.js';
import GeminiClient from "../services/ai/gemini.js";

const router = express.Router();

/* GET markdown file. */
router.get('/:filename', async function (req, res, next) {
    const docDir = path.join(import.meta.dirname, '../doc');
    const filePath = path.join(docDir, req.params.filename);

    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        const htmlContent = marked.parse(data);
        let modelList = [];
        const type = getAIType(req.params.filename);
        if (type!==null) {
            try {
                switch (type) {
                    case 'DeepSeek':
                        modelList = await DeepSeekClient.getModels();
                        break;
                    case 'Gemini':
                        modelList = await GeminiClient.getModels();
                        break;
                }
            } catch (error) {
                console.error(`Failed to fetch ${type} models:`, error.message);
            }
        }

        res.render('doc', {
            title: req.params.filename,
            content: htmlContent,
            isAI: getAIType(req.params.filename)!==null,
            models: modelList
        });
    } catch (err) {
        next(err);
    }
});

function getAIType(filename) {
    if (filename.startsWith('DeepSeek')) return 'DeepSeek';
    if (filename.startsWith('Gemini')) return 'Gemini';
    return null;
}

export default router;