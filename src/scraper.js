const cheerio = require('cheerio');
const rp = require('request-promise');

function getHtml(url) {
  return new Promise((resolve, reject) => {
    rp(url).then(str => {
      resolve(str)
    }).catch(err => {
      console.error(err)
      reject(err)
    })
  });
}

// find Story text from the html string fetched from sky sports

function getStoryText(htmlString, className) {
  return findListItemsText(htmlString, className).map(str => {
    return sanitizeString(str);
  })
}

function findListItemsText(dataString, className) {
  const $ = cheerio.load(dataString);
  var listItemText = $(className).find($('li')).map(function (i,e) {
    return $(this).text()
  }).get()
  return listItemText
}

function sanitizeString(str) {
  return str.trim().replace('&', 'and');
}

function scrape(url, className) {
  return getHtml(url).then(dataStr => {
    var stories = getStoryText(dataStr, className)
    console.log(stories)
    return {stories: stories}
  })
}

module.exports = {
  getHtml: getHtml, 
  getStoryText: getStoryText,
  scrape: scrape
}
