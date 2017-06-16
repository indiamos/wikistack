const express = require('express');
const router = express.Router();
var models = require('../views/models');
var Page = models.Page;
var User = models.User;


router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/', function(req, res){
  console.log(req.body);
  var page = Page.build({
    title: req.body.title,
    status: req.body.status,
    content: req.body.content
//    urlTitle: encodeURI(req.body.title)
  });
  page.save().then(res.redirect('/'));
});

router.get('/add', function(req, res, next){
  res.render('addpage.html');
});

router.get('/:urlTitle', function (req, res, next) {
  Page.findAll({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(foundPage => {
    // .urlTitle
      res.render('wikipage.html', {page: foundPage});
  })
  .catch(err => {
    console.log(err);
  });
});

//
 module.exports = router;
