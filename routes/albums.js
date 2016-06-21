
var express = require('express');
var Album = require('../config/albums_database');

var router = express.Router();


// index
router.get('/', function(req, res) {  Album.find({}, function(err, albums ){
    if(err) console.log(err);
    var albums = albums;
    res.render('albums/index', {albums: albums});
  })

});

// new
router.get('/new', function(req, res) {
  res.render('albums/new');
})

// Show
router.get('/:id', function(req, res) {

  Album.find({_id: req.params.id}, function(err, album) {

    res.render('albums/show', {album: album[0]});
  })
})

// Create
router.post('/', function(req, res) {
  console.log(req.body)
  var album = new Album(req.body)
  album.save(function(err,album){

    res.redirect('/albums');
  })

})

// Edit
router.get('/:id/edit', function(req,res){

  Album.findOne({_id: req.params.id}, function(err, album) {
    res.render('albums/edit', album)
  })

})

// Update
router.put('/:id', function(req, res) {  // console.log('hi:', req.body)
  // console.log('hi:', req.params)
  Album.update({_id: req.params.id}, req.body, function(err, data){
    res.redirect('/albums/' + req.params.id)
  })
})

// Delete
router.delete('/:id', function(req, res) {  console.log('hi:', req.body)
  console.log('hi:', req.params)
  Album.remove({_id: req.params.id}, function(err, data){
    console.log("deleted id: " + req.params.id);
    res.redirect('/albums')
  })

})

module.exports = router;
