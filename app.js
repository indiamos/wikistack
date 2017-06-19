'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const fs = require('fs');
const routes = require('./routes');
const bodyParser = require('body-parser');
const models = require('./views/models');

// logging middleware
app.use(morgan('dev'));

// templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
var env = nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

app.use(express.static('public'));

app.use('/', routes);

models.User.sync({})
  .then(function() {
    return models.Page.sync({});
  })
  .then(function() {
    // make sure to replace the name below with your express app
    const server = app.listen(3001, function() {
      console.log('Server is listening on port 3001!');
    });
  })
  .catch(console.error);
