var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();
chai.config.includeStack = true;

var Scraper = require('../src/scraper.js');
var testHtml = require('./testHtml.js');

describe('Scraper', function() {
  
  describe('getHtml', function() {
    var url = "http://www.skysports.com/football/transfer-paper-talk"
    it('eventually returns an html string from the webpage', function() {
      var value = Scraper.getHtml(url)
      return expect(value).to.eventually.be.a('string')
    });
  });

  describe('getStoryText', function () {
    it('grabs text from HTML and returns an array of sanitized strings', function () {
      var stories = Scraper.getStoryText(testHtml, '.paper-stories');
      stories.should.be.an('array')
      stories.forEach(el => {
        el.should.be.a('string')
      })
    });
    it('returns an empty array if there were no stories in the html', function () {
      var stories = Scraper.getStoryText('<html>nothing here</html>', '.paper-stories');
      stories.should.be.an('array').with.length(0)
    });
  });
  
  describe('scrape', function () {
    var url = "http://www.skysports.com/football/transfer-paper-talk"
    var object = Scraper.scrape(url, '.paper-stories')
    
    it('returns an object with an array of stories in it', function () {
      return expect(object).to.eventually.be.an('object').with.property('stories')
      return expect(object.stories).to.eventually.be.an('array').forEach(str => {
        str.should.be.a('string')
      })
    });
  });
  
});
