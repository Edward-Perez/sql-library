const express = require('express');
const router = express.Router();
const controller = require('../../controllers');

// Form to Create New Book
router.get('/', controller.getNewBooks);

// Post - Add New Book to DB
router.post('/', controller.postCreateBooks);

module.exports = router;