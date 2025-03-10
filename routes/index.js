var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  const docDir = path.join(__dirname, '../doc');
  fs.readdir(docDir, (err, files) => {
    if (err) {
      return next(err);
    }
    const mdFiles = files.filter(file => path.extname(file) === '.md');
    res.render('index', { title: 'Express', files: mdFiles , port: process.env.PORT || 3000});
  });
});

module.exports = router;