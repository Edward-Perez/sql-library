const express = require('express');
const app = express();
const routes = require('./routes/index.js');
const port = 3000;
 

// Template engine set to Pug
app.set('view engine', 'pug');
// Static files set to public folder
app.use(express.static(__dirname + '/public'));
// Routes
app.use(routes);


// App listening on port variable
app.listen(port, console.log(`Express app is listening on ${port}`));
