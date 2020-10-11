const router = require('express').Router();

router.get('/', (req, res) => res.redirect('/books/page/1'));

router.use('/books', require('./books'));

module.exports = router;