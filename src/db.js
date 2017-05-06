var AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';

const Dynamo = new AWS.DynamoDB.DocumentClient();

function writeToDB(item, table){
  return new Promise((resolve, reject) => {
    if (table === undefined || table === null) {
      reject(`The table argument is ${table}.`);
    }
    else {
      Dynamo.put({
        TableName: table,
        Item: item
      }, (err, result) => {
        if (err) {
          reject(err);
        }
        else {
          console.log("created record");
          resolve(result);
        }
      })
    }
  });
}

function readFromDB(item, table){
  return new Promise((resolve, reject) => {
    if (table == undefined || table === null) {
      reject(`The table argument is ${table}`);
    }
    else {
      Dynamo.get({
        TableName: table,
        Key: item
      }, (err, data) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(data);
        }
      })
    }
  })
}

module.exports = {
  read: readFromDB,
  write: writeToDB
}


