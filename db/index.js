'use strict';

const pg = require('pg');

// setting up the node-postgres driver
var postgresUrl = 'postgres://localhost/wikistackdb';
var client = new pg.Client(postgresUrl);

// connecting to the `postgres` server
client.connect();

// make the client available as a Node module
module.exports = client;
