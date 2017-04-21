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
  
  describe('request', function() {
    var url = "http://www.skysports.com/football/transfer-paper-talk"
    it('returns an html string from the webpage', function() {
      var value = Scraper.request(url)
      expect(value).to.eventually.be.a('string')
    });
    
  });
  
  describe('scrape', function() {
    var scrapedObj = Scraper.scrape(testHtml);
    it('should return an array of story strings', function(){
      scrapedObj.should.have.property('stories')
      scrapedObj.stories.forEach(function(el){
        assert.isString(el);
      })      
    });
  });
  
});
