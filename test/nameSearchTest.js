var assert = require('chai').assert;
var should = require('chai').should();
var expect = require('chai').expect;

var NameSearch = require('../src/nameSearch.js');
var testStories = [
  "Brighton and Hove Albion won the league on Friday",
  "Newcastle Slipped up against Preston",
  "Rotherham were relegated",
  "Manchester United forward Wayne Rooney has left the club",
  "Brighton rejected a £30m offer from Manchester United for young midfielder Solly March",
  "Brighton midfielder Dale Stephens signed a new contract"
]

describe('NameSearch', function () { 
  describe('FindNameInStories', function () {   
    it('should return an array of any strings containing the given name', function () {
      NameSearch.findNameFromStories("Brighton", testStories).should.have.lengthOf(3)
      NameSearch.findNameFromStories("Rovrum", testStories).should.have.lengthOf(0)
    });
    it('handles club names with more than one word', function () {
      NameSearch.findNameFromStories("Manchester United", testStories).should.have.lengthOf(2)
    });      
    xit('handles short versions of some club names', function () {
      
    });    
  });
});
