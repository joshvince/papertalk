function findNameInString(name, storyString) {
  var words = storyString.split(" ").map(function(el) {
    return el.toLowerCase()
  })
  return (words.indexOf(name.toLowerCase()) != -1)
}

function findNameFromStories(name, storyArray) {
  return storyArray.filter(function(el) {
    return findNameInString(name, el)
  })
}

// console.log(findNameInString("Brighton", "Brighton and Hove Albion won the league on Friday"));
var array = [
  "Brighton and Hove Albion won the league on Friday",
  "Newcastle Slipped up against Preston",
  "Rotherham were relegated",
  "Brighton midfielder Dale Stephens signed a new contract"
]
var res = findNameFromStories("Brighton", array)
console.log(res);
