var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/albums_development');
db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));

var albumsSchema = mongoose.Schema({
  stars: String,
  explicit: String,
  artist: String,
  album: String,
  genre: String
});
Album = mongoose.model('Album', albumsSchema);

module.exports = Album;
