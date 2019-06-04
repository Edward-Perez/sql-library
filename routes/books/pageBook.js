const express = require('express');
const router = express.Router();
const controller = require('../../controllers');

router.get('/:page', controller.getAllBooks);

module.exports = router;