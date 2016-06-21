require('../helper');
var http = require('http'),
    server;
var User = require('../../config/users_database');

before(function() {
    server = http.createServer(require('../../app'));
    server.listen(0);
    browser.baseUrl = 'http://localhost:' + server.address().port;
});

after(function() {
    server.close();
});


describe("A new user can sign up", function (){
  it('user will be redirected to albums index when sign up is clicked', function (){
    browser.get('/users/');

    element(by.id('signUp')).click();

    element(by.id('signUpTitle')).getText().then(function(text) {
      expect(text).to.equal('Sign')
    })
  });
});
