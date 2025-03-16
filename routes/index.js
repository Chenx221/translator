import express from 'express';

const router = express.Router();
import fs from 'fs';
import path from 'path';

/* GET home page. */
router.get('/', function (req, res, next) {
    const docDir = path.join(import.meta.dirname, '../doc');
    fs.readdir(docDir, (err, files) => {
        if (err) {
            return next(err);
        }
        const mdFiles = files.filter(file => path.extname(file) === '.md');
        res.render('index', {title: 'Express', files: mdFiles, port: process.env.PORT || 3000});
    });
});

export default router;