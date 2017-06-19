const express = require('express');
const router = express.Router();
var models = require('../views/models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
  res.redirect('/');
 // next();
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
  })
  .then(function (page, next) {
    res.redirect(page.route);
  })
  .catch(next);
});

router.get('/add', function(req, res, next){
  res.render('addpage.html');
});

router.get('/:urlTitle', function (req, res, next) {
  let url = req.params.urlTitle.toLowerCase();
  Page.findOne({
    where: { urlTitle: url },
      include: [{model: User, as: 'author'}]
  })
.then(function (page) {
    // page instance will have a .author property
    // as a filled in user object ({ name, email })
    if (page === null) {
        res.status(404).send();
    } else {
        res.render('wikipage', { page: page});
    }
})
  .catch(err => {
    console.log(err);
  });
});

router.get('/users/:id', function(req, res, next) {
  res.redirect('/users/'+ req.params.id);
});

//
 module.exports = router;
