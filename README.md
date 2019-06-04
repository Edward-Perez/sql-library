# SQL Library Manager
### Project 8 from the Treehouse Full Stack Javascript TechDegree program. 
**_Node.js, Express, Pug, SQL ORM Sequelizer_**

I have been ask to build a dynamic intuitive web application for a fictional library to help manage their book collection. I will use JavaScript, Node.js, Express, Pug, and the SQL ORM Sequelize to accomplish this goal.

### Project Requirements
* Initialize the app
  * Running npm start serves the app
  * Running npm install all necessary dependencies.
  * The node_modules folder is referenced in the .gitignore file
* Models
  * A "Book" Sequelize Model is present
  * Use the Model validation
  * Book properties are:
    * title - string
    * author - string
    * genre - string
    * year - integer
* Routes
  * Routes render the appropriate pages
* Views
  * The following views are present:
    * layout.pug
    * index.pug
    * new-book.pug
    * update-book.pug
    * error.pug
    * page-not-found.pug
* Form Fields
  * Forms employ Sequelize Model validation
  * title & author fields are required
* Errors
  * Uses a global error handler to render a friendly error page.
  * Renders a user friendly "Page Not Found" page. 
* Layout, CSS and styles
  * General layout matches example markup pages

### Exceeds Requirements
* Main book list has pagination feature.
* Main book list has search feature.
* Search is case insensitive.
* Search works for partial matches on strings.
* Search works for all of the following fields:
  * Title
  * Author
  * Genre
  * Year

### Installation
* Clone or Download files
* Once completed open files in editor and open console
* To download all dependecies require, inside console type:
```javascript 
  npm install 
``` 
  * Once completed, to start app type: 
```javascript
  npm start
```
* There will be a message in your console as to which port the app is listening to
* By default the app listens to port "3000", you can change this option in a global variable named "port"
* Open web browser to view the site with the address "http://localhost:(port)/" 
