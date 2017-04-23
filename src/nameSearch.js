/*
  NAME CHECKER
  Responsible for finding names of football clubs from arrays of story strings.
*/

function findNameInString(name, storyString) {
  return storyString.toLowerCase().includes(name.toLowerCase())
}

function findNameFromStories(name, storyArray) {
  return storyArray.filter(function(el) {
    return findNameInString(name, el)
  })
}

module.exports = {
  findNameFromStories: findNameFromStories
}
