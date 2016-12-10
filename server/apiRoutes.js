var express = require('express');
var bodyParser = require('body-parser');
var apiRoutes = express.Router();


//controllers
var userController = require('./controllers/userController');
var authenticationController = require('./controllers/authenticationController');
var bookController = require('./controllers/bookController');





//routes maintain the order
apiRoutes.post('/users/login', authenticationController.login);
apiRoutes.post('/users/signup',userController.createUser);
//middleware to verifyTokens for below endpoints.
//endpoints mentioned above the token verification middleware does not require token
apiRoutes.use(authenticationController.verifyToken);
apiRoutes.get('/users', userController.getAll);
apiRoutes.post('/users/logout', authenticationController.logout);

//middlewares
apiRoutes.use(bodyParser.urlencoded({ extended: false }));
apiRoutes.use(bodyParser.json());

//books
apiRoutes.put('/books/:id', bookController.updateBook);
apiRoutes.get('/books', bookController.getAll);
apiRoutes.get('/books/:id', bookController.getOne);
apiRoutes.delete('/books/:id', bookController.delete);
apiRoutes.post('/books/create', bookController.createBook);

module.exports = apiRoutes;