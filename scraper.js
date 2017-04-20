const cheerio = require('cheerio')

function scrape(html){
  const $ = cheerio.load(html)

  function getStories(containerElement) {
    var stories = $(containerElement).find($('li')).map(function(i,e){
      return $(this).text()
    }).get()
    return {stories: stories}
  }

  return getStories('.paper-stories')

}

module.exports = {scrape: scrape}
