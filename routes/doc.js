import express from 'express';
import fs from 'fs';
import path from 'path';
import {marked} from 'marked';
import DeepSeekClient from '../services/ai/deepseek.js';

const router = express.Router();

/* GET markdown file. */
router.get('/:filename', async function (req, res, next) {
    const docDir = path.join(import.meta.dirname, '../doc');
    const filePath = path.join(docDir, req.params.filename);

    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        const htmlContent = marked.parse(data);
        let modelList = [];

        if (isAI(req.params.filename)) {
            try {
                modelList = await DeepSeekClient.getModels();
            } catch (error) {
                console.error('Failed to fetch DeepSeek models:', error.message);
            }
        }

        res.render('doc', {
            title: req.params.filename,
            content: htmlContent,
            isAI: isAI(req.params.filename),
            models: modelList
        });
    } catch (err) {
        next(err);
    }
});

function isAI(filename) {
    return filename.startsWith('DeepSeek');
}

export default router;