const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Book = require('../models').Book; 

module.exports = {

  ////////// Main Book Page/Pages //////////
  getAllBooks: (req, res, next) => {
    let { page } = req.params;
    let pageLimit = 5;
    Book.findAndCountAll( { offset: page * pageLimit | 0, limit: pageLimit})
      .then( Book => { 
        res.render('index', {
        pageTitle: 'Books', 
        Book: Book.rows,
        Count: Math.ceil(Book.count / pageLimit),
        Page: page  | 0
        });
      })
      .catch(err => console.log(err))
  },

  ////////// Search Books //////////
  searchBooks: (req, res) => {
    const { keyword } = req.query;
    Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } },
          { author: { [Op.like]: `%${keyword}%` } },
          { genre: { [Op.like]: `%${keyword}%` } },
          { year: { [Op.like]: `%${keyword}%` } }
        ]
      }
    })
    .then( Books => {
      if (Books.length === 0) {
        Books = false;
      } 
      res.render('search-results', { pageTitle: 'Search', Books } )
    })
    .catch(err => console.log(err))
  },
  ////////// New Book Form //////////
  getNewBooks: (req, res, next) => {
    res.render('new-book', { pageTitle : 'New Book' });
  },

  postCreateBooks: (req, res, next) => {
    const input = req.body;
    Book.create(input)
      .then(() => {
        res.redirect('/');
      })
      .catch(err => {
        if(err.name === 'SequelizeValidationError') {
          const errorMsg = (err.errors).map((arg) => arg.message);
          res.render('new-book', { input, errorMsg });
        } else {
          throw err;
        }
      })
      .catch(err => console.log(err))
  },

  ////////// Update Book Form //////////
  getBookDetails: (req, res, next) => {
    const {id} = req.params;
    Book.findByPk(id)
      .then( Book => {
        res.render('update-book', { pageTitle: Book.title, Book });
      })
      .catch(err => {next(err)});
  },

  postUpdateDetails: (req, res, next) => {
    const {id} = req.params;
    const input = req.body;
    Book.findByPk(id)
      .then( Book => {
        Book.update(input)
          .then(() => res.redirect('/books'))
          .catch( err => {
            if(err.name === 'SequelizeValidationError') {
              const errorMsg = (err.errors).map((arg) => arg.message);
              res.render('update-book', { Book, input, errorMsg });
            } else {
            throw err;
          }
        })
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err));
  },

  postDeleteUpdates: (req, res, next) => {
    const {id} = req.params;
    Book.findByPk(id)
      .then( Book => {
        Book.destroy()
          .then(() => res.redirect('/books'))
          .catch( err => console.log(err))
      })
      .catch(err => console.log(err));
  }

};