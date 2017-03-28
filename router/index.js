var express = require('express');
var router = express.Router();

router.use('/users', require('./routes/users'));

module.exports = router;