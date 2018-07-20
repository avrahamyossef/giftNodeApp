// 1. Include Packages
var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var cors = require("cors");
var logger = require('morgan');

// 2. Include Configuration
var config = require('./config');

// 3. Initialize the application 
var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 4. Force https in production
if (app.get('env') === 'production') {
    app.use(function (req, res, next) {
        var protocol = req.get('x-forwarded-proto');
        protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });
}

// 5. Connect to MongoDB
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000
};
mongoose.connect(config.MONGO_URI, option).then(() => {
console.log("Connected to MongoDatabase");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

// mongoose.connect(config.MONGO_URI, {}, (err) => {
//     if (err) {
//       throw err;
//     }
//     console.log('Connected succsesfuly to MongoDB.')
//   });

// 6. Load app routes
require('./routes')(app);

// 7. Start the server
app.listen(config.LISTEN_PORT, function () {
    console.log('listening on port ' + config.LISTEN_PORT);
});