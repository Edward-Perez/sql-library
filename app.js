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

  // 404 Error
  app.use( (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  }); 
  
  // Error Handler
  app.use( (err, req, res, next) => {
    if (err.status === 404) {
      console.error('Error message:', err.message);
      res.render('page-not-found', {
        err, 
        pageTitle: '404',
        status: err.status
      });
    } else {
      console.error('Error message:', err.message);
      res.render('error', { 
        err,
        pageTitle: 'Error',
        status: 500
       });
    }
  }); 


