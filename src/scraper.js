const cheerio = require('cheerio')

function scrape(html){
  const $ = cheerio.load(html)

  function getStories(containerElement) {
    var stories = $(containerElement).find($('li')).map(function (i,e) {
      return $(this).text()
    }).get()
    return {stories: sanitize(stories)}
  }

  function sanitize(arr) {
    return arr.map(function(str) {
      return str.trim();
    })
  }

  return getStories('.paper-stories')

}

module.exports = {scrape: scrape}
