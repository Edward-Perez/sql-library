const express = require('express');
const router = express.Router();

// Home
router.get('/', (req,res,) => {res.redirect('/books')});
// Books
router.use('/books', require('./books/allBooks'));
// Book Page
router.use('/books/page', require('./books/pageBook'));
// New Book Form
router.use('/books/new', require('./books/newBook'));
// Update Book Form
router.use('/books/', require('./books/updateBook'));
// Search Book Results
router.use('/search', require('./books/searchBook'));

module.exports = router;