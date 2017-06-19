const express = require('express');
const router = express.Router();
var models = require('../views/models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
  res.redirect('/');
  next();
});

router.post('/', function(req, res, next){
  console.log(req.body);

  User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    })
  .then(function (values, next) {
    var user = values[0];

    var page = Page.build({
      title: req.body.title,
      content: req.body.content
    });

    return page.save().then(function (page) {
      return page.setAuthor(user);
    });
    next();
  })
  .then(function (page, next) {
    res.redirect(page.route);
    next();
  })
  .catch(next);
});

router.get('/add', function(req, res, next){
  res.render('addpage.html');
  next();
});

router.get('/:urlTitle', function (req, res, next) {
  let url = req.params.urlTitle.toLowerCase();
  Page.findOne({
    where: {
      urlTitle: url
    }
  })
  .then(function(foundPage) {
      res.render('wikipage.html', {page: foundPage});
  })
  .catch(err => {
    console.log(err);
  });
});

//
 module.exports = router;
