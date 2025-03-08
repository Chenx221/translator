const express = require('express');
const router = express.Router();
const Client = require('../services/translator/aliyun');


router.post('/', async (req, res) => {
    const {text} = req.body;

    const sourceLanguage = process.env.SOURCE_LANGUAGE;
    const aliyunTargetLanguage = process.env.ALIYUN_TARGET_LANGUAGE;

    const translationPromises = [];

    if (global.services.aliyunGeneral) {
        let resp = await Client.translate(text, sourceLanguage, aliyunTargetLanguage, false);
        if (!'statusCode' in resp)
            translationPromises.push('Something went wrong');
        else
            translationPromises.push(resp.statusCode !== 200 ? `[${resp.statusCode}] ${resp.error}` : resp.body.data.translated);
    }

    if (global.services.aliyunProfessional) {
        let resp = await Client.translate(text, sourceLanguage, aliyunTargetLanguage, true);
        if (!'statusCode' in resp)
            translationPromises.push('Something went wrong');
        else
            translationPromises.push(resp.statusCode !== 200 ? `[${resp.statusCode}] ${resp.error}` : resp.body.data.translated);
    }

    try {
        const results = await Promise.all(translationPromises);
        res.json({translations: results});
    } catch (error) {
        res.status(500).json({error: 'Translation failed', details: error.message}); //useless
    }
});

module.exports = router;
