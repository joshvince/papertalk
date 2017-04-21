const express = require('express');
const request = require('request');
const Scraper = require('./src/scraper.js');
const app     = express();

app.get('/', function(req, response){

  var url = "http://www.skysports.com/football/transfer-paper-talk"

  request(url, function(err, res, html){
    if (!err) {
      var data = Scraper.scrape(html)
      response.send(data)
    }
    else {
      response.send("error!")
    }
  })
})

app.get('/test', function(req, response){

  var html = require('./test.js');
  var data = Scraper.scrape(html)
  response.send(data)
})

app.listen('8081')

console.log('Listening on port 8081');

exports = module.exports = app;
