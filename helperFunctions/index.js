module.exports = {
    createError: (status, message) => {
        const err = new Error(message);
        err.status = status;
        return err;
    },

    pugBookObject: (req = {}) => 
        Object.create({
            book: req.book, 
            pagination: req.pagination,
            input: req.body, 
            searchResults:  req.searchResults,
            errorMsg:  req.userErrors
    })
}