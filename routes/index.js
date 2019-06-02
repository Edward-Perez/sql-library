const express = require('express');
const router = express.Router();
const Book = require('../models').Book; 

// Home
router.get('/', (req, res, next) => {
  res.redirect('/books');
})

// All Books 
router.get('/books', (req, res, next) => {
  // findAndCountAll
  Book.findAll()
    .then(Book => {
      res.locals.title = 'Books';
      res.render('all-books', {
        Book
      });
    })
    .catch(err => console.log(err));
});

// Form to Create New Book
router.get('/book/new', (req, res, next) => {
  res.render('new-book');
});
// Post/Add New Book to DB
router.post('/book/new', (req, res, next) => {
  res.render('new-book');
});

// A Single Book Detail
router.get('/books/:id', (req, res, next) => {
  const {id} = req.params;
  Book.findByPk(id)
    .then( Book => {
      res.locals.title = Book.title;
      res.render('book-detail', {
        Book
      });
    })
    .catch(err => console.log(err));
});

// A Single Book Update
router.post('/books/:id', (req, res, next) => {
  const {id} = req.params;
  Book.findByPk(id)
    .then( Book => {
      res.locals.title = Book.title;
      res.render('book-detail', {
        Book
      });
    })
    .catch(err => console.log(err));
});

// A Single Book Deletion
router.post('/books/:id/delete', (req, res, next) => {
  const {id} = req.params;
  Book.findByPk(id)
    .then( Book => {
      res.locals.title = Book.title;
      res.render('book-detail', {
        Book
      });
    })
    .catch(err => console.log(err));
});


// 404 Route
router.get('/error/notfound', (req, res, next) => {
  res.render('not-found');
}); 

// Error Route 
router.get('/error', (req, res, next) => {
  res.render('error');
}); 

module.exports = router;