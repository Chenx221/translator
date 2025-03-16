var express = require('express');
var path = require('path');
var router = express.Router();

// Serve static files from the "node_modules" directory
router.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));

module.exports = router;