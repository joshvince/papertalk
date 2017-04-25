/*
CREATING CLUB NAME DATA
This module is not actually deployed as production code, and is only
used to create or update the initial club name data used by alexa.
*/

var rp = require('request-promise');
var fs = require('fs');

var prem = "http://api.football-data.org/v1/soccerseasons/426/teams"
var champ = "http://api.football-data.org/v1/soccerseasons/427/teams"
var league1 = "http://api.football-data.org/v1/soccerseasons/428/teams"
var league2 = "http://api.football-data.org/v1/soccerseasons/429/teams"

// get data from the api to eventually create the utterances.
// getData(prem, '../clubNames/prem.txt')
// getData(champ, '../clubNames/champ.txt')
// getData(league1, '../clubNames/league1.txt')
// getData(league2, '../clubNames/league2.txt')

function getData(url, filePath) {
  rp({uri: url, json: true}).then(function(json){
    var teams = json.teams.map(function(obj){
      return {longName: obj.name, shortName: obj.shortName}
    })
    var fileStream = fs.createWriteStream(filePath);
    fileStream.write(teams.join(`\n`), x => {
      console.log(`wrote ${filePath}`)
    })
  });
}

// use the utterances.txt document to create an array of objects
// createNamesObject('../clubNames/utterances.txt', '../clubNames/clubNames.json')


function createNamesObject(utterancesFile, outputPath) {
  var utterances = fs.readFileSync(utterancesFile, 'utf8')
  var data = utterances.toString()
    .split(`\n`)
    .map(el => { return el.toLowerCase() })
    .map(str => {
      return { utterance: str, hasNickname: false, nickNames: [] }
    })
  var json = JSON.stringify({clubs: data})
  var fileStream = fs.createWriteStream(outputPath);
  fileStream.write(json, z => {
    console.log(`wrote to ${outputPath}`)
  })
}


