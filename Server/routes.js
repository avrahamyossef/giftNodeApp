// 1. Include config and modules
var User = require('./models/user');
var Auth = require('./controllers/auth.js');
var Events = require('./controllers/events.js');
var Relationship = require('./controllers/relationships.js');
var Interests = require('./controllers/interests.js');

// 2. Authentication Middleware
var ensureAuthenticated = require('./utils').ensureAuthenticated;

// 3. Routes
module.exports = function (app) {

    // 4. Authentication Routes
    app.post('/auth/login', Auth.login);
    app.post('/auth/signup', Auth.signup);

    // 5. Application Routes
    app.get('/events', Events.list);
    app.get('/relationship', Relationship.list);
    app.get('/interests', Interests.list);

    //.6 Application Routes - with Authenticat
    //  app.post('/auth/login', ensureAuthenticated, Auth.login);

};