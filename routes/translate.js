const express = require('express');
const router = express.Router();
const AliyunClient = require('../services/translator/aliyun');
const TencentClient = require('../services/translator/tencent');


router.post('/', async (req, res) => {
    const {text} = req.body;
    const translationPromises = [];

    if (global.services.aliyunGeneral) {
        let resp = await AliyunClient.translate(text, false);
        if (!('statusCode' in resp))
            translationPromises.push('Something went wrong');
        else
            translationPromises.push(resp.statusCode !== 200 ? `[${resp.statusCode}] ${resp.error}` : resp.body.data.translated);
    }

    if (global.services.aliyunProfessional) {
        let resp = await AliyunClient.translate(text, true);
        if (!('statusCode' in resp))
            translationPromises.push('[ERROR] Something went wrong');
        else
            translationPromises.push(resp.statusCode !== 200 ? `[${resp.statusCode}] ${resp.error}` : resp.body.data.translated);
    }

    if (global.services.tencent) {
        try {
            let resp = await TencentClient.translate(text);
            translationPromises.push(resp.TargetText);
        } catch (err) {
            translationPromises.push('[ERROR] ' + err.code);
        }
    }

    try {
        const results = await Promise.all(translationPromises);
        const combinedTranslation = results.join('\u200b\n');
        res.json({translation: combinedTranslation});
    } catch (error) {
        res.status(500).json({error: 'Translation failed', details: error.message}); //useless
    }
});

module.exports = router;
