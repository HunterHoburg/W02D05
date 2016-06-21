require('../helper');
var Album = require('../../config/database');



var http = require('http'),
    server;

var alb = {artist: 'Test',
            album: 'testsafdsaf',
            genre: 'Rock',
            stars: '2',
            explicit: 'on'
          };
before(function() {
    server = http.createServer(require('../../app'));
    server.listen(0);
    browser.baseUrl = 'http://localhost:' + server.address().port;
});

beforeEach(function() {


  Album(alb).save();
  return browser.ignoreSynchronization = true;

});
afterEach(function() {
  Album.remove({},function(){

  });
});
after(function() {
    server.close();
});

describe('Album CRUD', function() {
  describe('A user at the homepage', function(){
    it('shows the title of teh page', function(){
      browser.get('/');
      element(by.tagName('h1')).getText().then(function(text) {
        expect(text).to.equal('OMG Albums!');
      });
    });
    it('shows has the correct link name', function(){
      browser.get('/');
      element(by.tagName('a')).getText().then(function(text) {
        expect(text).to.equal('Let me see the RIGHT NOW!');
      });
    });
    it('links to the correct page', function(){
      browser.get('/');
      element(by.partialLinkText('Let me see')).click();
      element(by.tagName('h2')).getText().then(function(text) {
        expect(text).to.equal('Albums');
      });
    });
  });

  describe('Album index', function(){
    it('shows the title of the page', function(){
      browser.get('/albums');
      element(by.tagName('h2')).getText().then(function(text) {
        expect(text).to.equal('Albums');
      });
    });
    it('shows the artist', function(done){
      browser.get('/albums/');
      Album.find({}, function(err, album) {

        element(by.id('artist')).getText().then(function(text) {

          expect(text).to.equal(album[0].artist);

          done();
        });
      });
    });
  });

  describe('A user at Create Album page', function(){
    it('shows the title of teh page', function(){
      browser.get('/albums/new');
      element(by.tagName('h3')).getText().then(function(text) {
        expect(text).to.equal('Create album');
      });
    });
    it('links to the the index when cancel is clicked', function(){
      browser.get('/albums/new');
      element(by.partialLinkText('Cancel')).click();
      element(by.tagName('h2')).getText().then(function(text) {
        expect(text).to.equal('Albums');
      });
    });
  });

  describe('A user at Show Album page', function(){
    it('shows the title of the album', function(done){
      Album.find({}, function(err, album) {
        browser.get('/albums/' + album[0]._id);
        element(by.tagName('h1')).getText().then(function(text) {

          expect(text).to.equal(album[0].album);

          done();
        });
      });
    });
    it('shows the artist', function(done){
      Album.find({}, function(err, album) {
        browser.get('/albums/' + album[0]._id);
        element(by.id('artist')).getText().then(function(text) {

          expect(text).to.equal('Artist: ' + album[0].artist);

          done();
        });
      });
    });
  });

  describe('A user can delete an album', function(){
    it('redirects to index after user clicks delete', function(done){
      Album.find({}, function(err, album) {
        browser.get('/albums/' + album[0]._id);
        element(by.id('delete')).click()

        element(by.tagName('h2')).getText().then(function(text){
          expect(text).to.equal('Albums')
          done();
        })
      });
    });
  });

  describe('edit page', function(){
    it('redirects to edit form after clicking edit', function(done){
      Album.find({}, function(err, album) {
        browser.get('/albums/' + album[0]._id);
        element(by.id('edit')).click()

        element(by.tagName('h3')).getText().then(function(text) {
          expect(text).to.equal('Edit album');
        });

        element(by.id('album')).getAttribute('value').then(function(text) {
          expect(text).to.equal(album[0].album);
          done();
        });
      });
    });
  });

  describe('Update album', function(){
    it('redirects to index after update is clicked', function(done){
      Album.find({}, function(err, album) {
        browser.get('/albums/' + album[0]._id);
        element(by.id('edit')).click()

        element(by.id('album')).clear().sendKeys("It worked")

        element(by.id('update')).click()
        element(by.id('albumTitle')).getText().then(function(text) {
          expect(text).to.include('It worked');
          done();
        });
      });
    });
  });
});
