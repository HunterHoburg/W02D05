var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users_development');
db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));

var usersSchema = mongoose.Schema({
  email: String,
  password: String,
  dinosaur: String
});

var User = mongoose.model('User', usersSchema);

module.exports = User;
