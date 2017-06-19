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
  var page = Page.build({
    title: req.body.title,
    status: req.body.status,
    content: req.body.content
//    urlTitle: encodeURI(req.body.title)
  });
  page.save()
  .then(savedPage => {
    res.redirect(savedPage.route); // route virtual FTW
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
