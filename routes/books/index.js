const router = require('express').Router({ strict: true });
const book = require('../../controllers/book/book')

router.get('/search', 
    book.search, 
    book.showSearchResults);

router.get('/page/:pageIndex', 
    book.getList, 
    book.showList)

router.route('/add')
    .get(book.showAddForm)
    .post(book.add)

router.route('/:bookId/edit') 
    .all(book.getBookById)
    .get(book.showEditForm)
    .post(book.edit)

router.post('/:bookId/delete', 
    book.getBookById, 
    book.delete)

router.use((err, req, res, next) => {
    if(err.name === "SequelizeValidationError") {
        let id = req.book.dataValues.id
        req.userErrors = err.errors.map(arg => arg.message);
        if (req.path === `/${id}/add`) {
            book.showAddForm(req, res)
        } else if (req.path === `/${id}/edit`) {
            book.showEditForm(req, res);
        } else {
            next(err);
        }
    } 
    else {
        next(err);
    }
});

module.exports = router;