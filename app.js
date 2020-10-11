var express = require('express'),
    app = express(),
    path = require('path'),
    db = require('./models/index.js').sequelize;
    
const createError = require('./helperFunctions').createError;
const port = 3000;
 
app.set('views', './views')
app.set("view engine", "pug");

app.use(require('morgan')('dev'));
app.use(require('body-parser').urlencoded({ extended: false }));

app.use("/static", express.static(path.join(__dirname, "./public")));

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error(err))

db.sync()
  .then(() => app.listen(port, console.log(`Express app is listening on ${port}`)))
  .catch(err => console.error(err))

app.use("/", require('./routes'));

app.use((req, res, next) => { next(createError(404, "Page not found")) })
  
app.use((err, req, res, next) => {
  res.render('error', {       
    errorMsg: err.message || 'Something went wrong',
    status: err.status || 500
    });
  }); 


