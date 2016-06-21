
var express = require('express');
var Users = require('../config/users_database');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('users/index');
});

router.post('/', function(req, res, next) {
  console.log('USER: ', req.body);
  res.redirect('albums');
});

router.get('/new', function(req, res, next) {
  res.render('users/new')
})

module.exports = router;
