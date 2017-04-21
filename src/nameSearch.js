function findNameInString(name, storyString) {
  var words = storyString.split(" ").map(function(el) {
    return el.toLowerCase()
  })
  var match = (words.indexOf(name.toLowerCase()) != -1)
  return words.includes(name.toLowerCase())
}

function findNameFromStories(name, storyArray) {
  return storyArray.filter(function(el) {
    return findNameInString(name, el)
  })
}

module.exports = {
  findNameFromStories: findNameFromStories
}
