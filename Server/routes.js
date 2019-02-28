// 1. Include config and modules
var Auth = require('./controllers/auth.js');
var Events = require('./controllers/events.js');
var Relationship = require('./controllers/relationships.js');
var Interests = require('./controllers/interests.js');
var Products = require('./controllers/products.js');
var Supplier = require('./controllers/supplier.js');
var upload = require('./multer.config');
var fileController = require('./controllers/file.controller.js');

// 2. Authentication Middleware
var ensureAuthenticated = require('./utils').ensureAuthenticated;

// 3. Routes
module.exports = function (app) {

    // 4. Authentication Routes
    app.post('/auth/login', Auth.login);
    app.post('/auth/signup', Auth.signup);
    app.post('/auth/checkIfUserExist', Auth.checkIfUserExist);
    app.post('/auth/signUpProvider', Auth.signupProvider);

    app.post('/auth/signupSupplier', Supplier.signup);
    app.post('/auth/loginSupplier', Supplier.login);


    // 5. Application Routes
    app.get('/events', Events.list);
    app.get('/relationship', Relationship.list);
    app.get('/interests', Interests.list);
    app.post('/products', Products.getList);
    app.post('/product/getProductById', Products.getProductById);
    app.post('/product/updateImages', Products.updateProductImages);

    //.6 Application Routes - with Authenticat
    app.post('/product/create', ensureAuthenticated, Products.create);

    //7. files images upload/download
    app.post('/file/upload', upload.array("file", 6), fileController.uploadFile);
    app.post('/file/delete', fileController.deleteFile);
    app.get('/file/all', fileController.listUrlFiles);
    app.get('/file/:filename', fileController.downloadFile);

    //dna club api
    app.post('/auth/dnaRegisterUser', Auth.registerDnaUsers);
    app.post('/auth/updateUserResults', Auth.updateUserResults);
    app.get('/auth/getQuizResults', Auth.getQuizResults);

    //blackSummerApp api
    app.post('/authBlackSummer/login', Auth.loginForBlackSummer);
    app.post('/authBlackSummer/signup', Auth.signupForBlackSummer);
    app.post('/authBlackSummer/checkIfUserExist', Auth.checkIfUserExistForBlackSummer);
};  