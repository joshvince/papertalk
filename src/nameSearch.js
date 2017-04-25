/*
  NAME CHECKER
  Responsible for finding names of football clubs from arrays of story strings.
*/
var fs = require('fs');

var clubNames = fs.readFileSync('clubNames/clubNames.json');
clubNames = JSON.parse(clubNames);

function findClubNameInString(club, storyString) {
  var story = storyString.toLowerCase();

  if(club.hasNickname){
    return club.nicknames.some(str => {
      return story.includes(str)
    })
  }
  else {
    return story.includes(club.utterance)
  }
}

function findNameObject(name, objArray) {
  return objArray.find(obj => {
    return name === obj.utterance
  }) 
}

function findNameFromStories(utterance, storyArray) {
  var name = utterance.toLowerCase()
  var nameObject = findNameObject(name, clubNames.clubs)

  // if there were no club Objects matching the name, then nameObject will be `undefined`
  if (typeof nameObject === 'undefined') {
    return []
  }
  else{
    var matches = storyArray.filter(function(el) {
      return findClubNameInString(nameObject, el)
    })
  // This is a new bit of syntax that dedupes an array. 
    return Array.from( new Set(matches) )
  }
}

module.exports = {
  findNameFromStories: findNameFromStories
}
