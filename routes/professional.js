const express = require('express');

const proController = require('../controllers/professional');

const router = express.Router();

router.get('/', proController.getData);
module.exports = router;