var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var marked = require('marked');

/* GET markdown file. */
router.get('/:filename', function(req, res, next) {
    const docDir = path.join(__dirname, '../doc');
    const filePath = path.join(docDir, req.params.filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return next(err);
        }
        const htmlContent = marked.parse(data);
        res.render('doc', { title: req.params.filename, content: htmlContent });
    });
});

module.exports = router;