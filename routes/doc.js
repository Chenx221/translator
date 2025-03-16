var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var marked = require('marked');
var DeepSeekClient = require('../services/ai/deepseek');

/* GET markdown file. */
router.get('/:filename', async function (req, res, next) {
    const docDir = path.join(__dirname, '../doc');
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

module.exports = router;