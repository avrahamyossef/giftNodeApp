'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');  //<--- Added
const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');
const secret = require('./config');
const Boom = require('boom');

// // Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: (process.env.port || 8080)
});
//const server = new Hapi.Server();

// The connection object takes some
// configuration, including the port
//server.connection({ port: 8000 });

// //Connect to db
// server.app.db = mongojs('mongodb://avrahamyossef3:Ay748596@giftmongoddb-shard-00-00-mpcwb.mongodb.net:27017,giftmongoddb-shard-00-01-mpcwb.mongodb.net:27017,giftmongoddb-shard-00-02-mpcwb.mongodb.net:27017/test?ssl=true&replicaSet=GiftMongodDb-shard-0&authSource=admin');  //<--- Added

const dbUrl = 'mongodb://avrahamyossef3:Ay748596@giftmongoddb-shard-00-00-mpcwb.mongodb.net:27017,giftmongoddb-shard-00-01-mpcwb.mongodb.net:27017,giftmongoddb-shard-00-02-mpcwb.mongodb.net:27017/test?ssl=true&replicaSet=GiftMongodDb-shard-0&authSource=admin';

server.register(require('hapi-auth-jwt'), (err) => {
  // We're giving the strategy both a name
  // and scheme of 'jwt'
  server.auth.strategy('jwt', 'jwt', {
    key: secret,
    verifyOptions: { algorithms: ['HS256'] }
  });
  // Look through the routes in
  // all the subdirectories of API
  // and create a new route for each
  glob.sync('api/**/routes/*.js', { 
    root: __dirname 
  }).forEach(file => {
    const route = require(path.join(__dirname, file));
    server.route(route);
  });
});
// Start the server
server.start((err) => {
  if (err) {
    throw err;
  }

  // Once started, connect to Mongo through Mongoose
  mongoose.connect(dbUrl, {}, (err) => {
    if (err) {
      throw err;
    }
    console.log('Connected succsesfuly to MongoDB.')
  });
  
    console.log('Server running at:', server.info.uri);
});