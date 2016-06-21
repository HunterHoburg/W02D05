var express = require('express');
var Users = require('../config/users_database');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('users/index');
});

router.post('/login', function(req, res, next) {
  Users.find({email: req.body.email}, function(err, user) {
    if (user.hasOwnProperty()) {
      res.redirect('albums');
    } else {
      res.redirect('/users');
    }
  });
});

router.post('/', function(req, res, next) {
  console.log('USER: ', req.body);
  res.redirect('albums');
});

router.get('/new', function(req, res, next) {
  res.render('users/new')
});

module.exports = router;
