/*
DISPATCHER
Handles requests, checks whether the cache is up to date and 
sends back new or cached data to the client
*/

const DB = require('./db.js');
const Scraper = require('./scraper.js');
const NameSearch = require('./nameSearch.js');

/*
Return the cache if the stories are from today, 
or scrape some more from the URL, update the cache and 
return the new stories.

`paperType` should be "national". TODO: support "regional" here
*/
function dispatch(paperType) {
  var tableName = 'footballRumours';
  var url = "http://www.skysports.com/football/transfer-paper-talk"
  return new Promise((resolve, reject) => {
    fetchFromCache(paperType, tableName).then(dbReply => {
      // if we found an item, check if it is from today
      if (isFromToday(dbReply)) {
        resolve(dbReply.stories)
      }
      else {
      // It wasn't from today, so fetch a new set of stories, add to the DB and return
        fetchNewStories(url, tableName).then(stories => {
          resolve(stories)
        })
      }
    })
    .catch(err => {
      // we didn't find an item in the DB, so try to insert a new one and return stories.
      fetchNewStories(url, tableName).then(stories => {
        resolve(stories)
      }).catch(error => { reject(err) })
    })   
  });
}

// fetch the cache from the DB

function fetchFromCache(type, dbTableName){
  return new Promise((resolve, reject) => {
    DB.read({type: type}, dbTableName).then(res =>{
      // check that it found a match, return the Item itself or reject the promise.
      res.hasOwnProperty('Item') ? resolve(res["Item"]) : reject(res)
    })
    .catch(err => {
      reject(err)
    })
  });  
}

// check whether the cache contains a record from the same day
function isFromToday(storiesObject) {
  var today = new Date().getDate()
  var cacheDay = new Date(storiesObject.date).getDate();
  return cacheDay === today
}

// scrape the url, add to the cache and then return the stories
function fetchNewStories(url, dbTableName) {
  return new Promise((resolve, reject) => {
    Scraper.scrape(url, '.paper-stories').then(obj => {
      var data = {
        date: new Date().toString(),
        type: "national",
        stories: obj.stories
      }
      DB.write(data, dbTableName)
      resolve(obj.stories)
    })   
  });
}

module.exports = {
  dispatch: dispatch
}

dispatch("national");