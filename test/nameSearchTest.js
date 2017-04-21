var assert = require('chai').assert;
var should = require('chai').should();
var expect = require('chai').expect;

var NameSearch = require('../src/nameSearch.js');
var testStories = [
  "Brighton and Hove Albion won the league on Friday",
  "Newcastle Slipped up against Preston",
  "Rotherham were relegated",
  "Brighton midfielder Dale Stephens signed a new contract"
]

describe('NameSearch', function () { 
  describe('FindNameInStories', function () {   
    it('should return an array of any strings containing the given name', function () {
        NameSearch.findNameFromStories("Brighton", testStories).should.have.lengthOf(2)
        NameSearch.findNameFromStories("NEWCasTLE", testStories).should.have.lengthOf(1)
        NameSearch.findNameFromStories("Rovrum", testStories).should.have.lengthOf(0)
    });    
    xit('handles short versions of some club names', function () {
      
    });    
  });
  
});
