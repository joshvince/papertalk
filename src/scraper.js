const cheerio = require('cheerio');
const rp = require('request-promise');

function request(url) {
  return rp(url)
    .then(function(str){
    return str
    })
    .catch(function(err){
      console.error(err)
    })
}

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
      return str.trim().replace('&', 'and');
    })
  }
  return getStories('.paper-stories')
}

module.exports = {request: request, scrape: scrape}
