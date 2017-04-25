var assert = require('chai').assert;
var should = require('chai').should();
var expect = require('chai').expect;

var NameSearch = require('../src/nameSearch.js');
var testStories = [
  "Brighton and Hove Albion won the league on Friday",
  "Sheffield Wednesday's team slipped up against Preston",
  "Spurs missed out on the title",
  "Man United forward Wayne Rooney has left the club",
  "Brighton rejected a £30m offer from Manchester United for young midfielder Solly March",
  "Brighton midfielder Dale Stephens signed a new contract"
]

describe('NameSearch', function () { 
  describe('FindNameInStories', function () {   
    it('should return an array of any strings containing the given name', function () {
      NameSearch.findNameFromStories("Brighton", testStories).should.have.lengthOf(3)
    });
    it('handles club names with more than one word', function () {
      NameSearch.findNameFromStories("Sheffield Wednesday", testStories).should.have.lengthOf(1)
    });      
    it('handles short versions of some club names', function () {
      NameSearch.findNameFromStories("Manchester United", testStories).should.have.lengthOf(2)
      NameSearch.findNameFromStories("Tottenham", testStories).should.have.lengthOf(1)
    });    
  });
});
