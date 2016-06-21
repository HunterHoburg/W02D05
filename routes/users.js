var express = require('express');
var User = require('../config/users_database');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('users/index');
});

router.post('/login', function(req, res, next) {
  User.find({email: req.body.email}, function(err, user) {
    if (user.hasOwnProperty()) {
      res.redirect('albums');
    } else {
      res.redirect('/users');
    }
  });
});

router.get('/new', function(req, res, next) {
  res.render('users/new');
});

router.post('/new', function(req, res, next) {
  console.log('req.body: ', req.body.email);
  // User.find({email: req.body.email} , function(err, user) {
  //   console.log(user.email)
  //   var user = new User(req.body)
  //   user.save(function(err,user){
  //     res.redirect('/albums')
  //   })
  var user = new User(req.body);
  user.save(function(err, user) {
    if(err) console.log('error: ', err);
    console.log('user: ', user);
  })
    // if (user.email) {
    //   console.log('it already exists');
    //   res.redirect('/users')
    // } else {
    //   var user = new User(req.body)
    //   user.save(function(err,album){
    //
    //     res.redirect('/albums');
    //   })
    // }
  // });
});

module.exports = router;
