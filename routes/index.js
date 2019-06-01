const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('all-books');
});

router.get('/book/details', (req, res, next) => {
  res.render('book-detail');
});

router.get('/book/new', (req, res, next) => {
  res.render('new-book');
});

router.get('/error/notfound', (req, res, next) => {
  res.render('not-found');
}); 

router.get('/error/form', (req, res, next) => {
  res.render('form-error');
}); 

router.get('/error', (req, res, next) => {
  res.render('error');
}); 

module.exports = router;