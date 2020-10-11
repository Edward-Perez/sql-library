const Op = require("sequelize").Op;
const Book = require("../../models").Book; 
const { createError } = require("../../helperFunctions");

exports.showList = (req, res) =>  
    res.render("index", req.List);

exports.showSearchResults = (req, res) => 
    res.render("searchResults", { 
        results: req.searchResults 
    })

exports.showAddForm = (req, res) => 
    res.render("addBook", {
        input: req.body || null, 
        errorMsg: req.userErrors || null
    })

exports.showEditForm = (req, res) => 
    res.render("editBook", {
        book: req.book.dataValues, 
        input: req.body || null, 
        errorMsg: req.userErrors || null
    })

exports.add = (req, res, next) => 
    Book.create(req.body)
      .then(book => { res.redirect(`/books/${book.id}/edit`)})
      .catch(next);

exports.edit = (req, res, next) => 
    req.book.update(req.body)
      .then(() => res.redirect(`/books/${req.book.id}/edit`))
      .catch(next);

exports.delete = (req, res, next) => 
    req.book.destroy()
      .then(() => res.redirect("/books/page/1"))
      .catch(next);

exports.getBookById = (req, res, next) => 
    Book.findByPk(req.params.bookId)
    .then(Book => {
        if (Book) req.book = Book; 
        else throw createError(404, "Book Not Found");
    })
    .then(next)
    .catch(next);

exports.search = (req, res, next) => 
    Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${req.query.keyword}%` } },
          { author: { [Op.like]: `%${req.query.keyword}%` } },
          { genre: { [Op.like]: `%${req.query.keyword}%` } },
          { year: { [Op.like]: `%${req.query.keyword}%` } }
        ]
      }
    })
    .then(Books =>  { req.searchResults = Books.map(arg => arg.dataValues)})
    .then(next)
    .catch(next)

exports.getList = (req, res, next) => {
    const limitOfItems = 5;
    Book.findAndCountAll({ 
        offset: (req.params.pageIndex - 1) * limitOfItems,
        limit: limitOfItems
    })
    .then(Books => {
        if (Books.rows.length > 0) return Books;
        else throw createError(404, "Page not found")
    })
    .then(Books => {
        req.List = {
            books: Books.rows.map(book => book.dataValues),
            total: Books.count,
            index: parseInt(req.params.pageIndex),
            anchorLinksNeeded: Math.ceil(Books.count / limitOfItems) 
        }
    })
    .then(next)
    .catch(next);
}