const express = require('express');
const router = express.Router();
var models = require('../views/models');
var Page = models.Page;
var User = models.User;

const wikiRouter = require('./wiki');
const userRouter = require('./user');
// ...
router.use('/wiki', wikiRouter);
router.use('/user', userRouter);
router.get('/', function(req, res, next){
  Page.findAll()
  .then(function(listOfPages) {
    // res.json(listOfPages);

    res.render('index.html', {pages: listOfPages});
  })
  .catch(err => {
    console.log(err);
  });
});

module.exports = router;
