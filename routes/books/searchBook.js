const express = require('express');
const router = express.Router();
const controller = require('../../controllers');

// Search Book Get Request
router.get('/', controller.searchBooks);

module.exports = router;