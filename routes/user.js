const express = require('express');
const router = express.Router();
var models = require('../views/models');
var User = models.User;

router.get('/',function(req, res, next) {
  User.findAll({})
  .then(function(listOfUsers) {
    // res.json(listOfUsers);

    res.render('users.html', {users: listOfUsers});
  })
  .catch(next);
});

module.exports = router;
