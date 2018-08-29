// 1. Include config and modules
var User = require('./models/user');
var Auth = require('./controllers/auth.js');
var Events = require('./controllers/events.js');
var Relationship = require('./controllers/relationships.js');
var Interests = require('./controllers/interests.js');
var Products = require('./controllers/products.js');

// 2. Authentication Middleware
var ensureAuthenticated = require('./utils').ensureAuthenticated;

// 3. Routes
module.exports = function (app) {

    // 4. Authentication Routes
    app.post('/auth/login', Auth.login);
    app.post('/auth/signup', Auth.signup);
    app.post('/auth/checkIfUserExist', Auth.checkIfUserExist);
    app.post('/auth/signUpProvider', Auth.signupProvider);

    // 5. Application Routes
    app.get('/events', Events.list);
    app.get('/relationship', Relationship.list);
    app.get('/interests', Interests.list);
    app.post('/products', Products.getList);
    app.post('/product/getProductById', Products.getProductById);

    //.6 Application Routes - with Authenticat
    app.post('/product/create', ensureAuthenticated, Products.create);

};