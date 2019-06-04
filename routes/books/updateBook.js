const express = require('express');
const router = express.Router('strict');
const controller = require('../../controllers');

// A Single Book Detail
router.get('/:id', controller.getBookDetails);

// A Single Book Update
router.post('/:id', controller.postUpdateDetails);

// Delete Book
router.post('/:id/delete', controller.postDeleteUpdates);

module.exports = router;