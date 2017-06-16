const express = require('express');
const router = express.Router();

router.use(function(req, res, next) {
  // .. some logic here .. like any other middleware
  next();
});


module.exports = router;
