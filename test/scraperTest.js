var assert = require('chai').assert;
var should = require('chai').should();
var expect = require('chai').expect;
var Scraper = require('../src/scraper.js');
var testHtml = require('./testHtml.js');

describe('Scraper', function() {
  describe('scrape', function () {
    var scrapedObj = Scraper.scrape(testHtml);
    it('should return an array of story strings', function(){
      scrapedObj.should.have.property('stories')
      scrapedObj.stories.forEach(function(el){
        assert.isString(el);
      })      
    });
  });
  
});
