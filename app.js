const express = require('express');
const app = express();
const db = require('./models/index.js').sequelize;
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');
const port = 3000;
 
// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Pug
app.set('view engine', 'pug');

// Static Folder
app.use(express.static(__dirname + '/public'));

// Routes
app.use('/', routes);
app.use(require('./routes'));

// Database connection
db.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err))

// Database sync
db.sync()
  .then(() => {
    app.listen(port, console.log(`Express app is listening on ${port}`));
  })
  .catch((err) => console.log(err))

  // 404 Route
  app.use( (req, res, next) => {
    res.locals.title = '404';
    res.render('page-not-found');
  }); 
  
  // Error Route 
  app.use( (err, req, res, next) => {
    res.locals.pageTitle = 'Error';
    console.error('MAINNN ERRORRRR', err.stack);
    res.render('error', { err });
  }); 


