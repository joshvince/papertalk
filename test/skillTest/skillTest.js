// Copyright 2015, Amazon Web Services.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// the role ARN to assume for any AWS SDK related calls
// the role must have a trusted policy with
// "lambda.amazonaws.com" and "arn:aws:iam::<YOUR ACCOUNT ID>:user/<YOUR USER>"

function testFile(pathToEventFile){

  var roleArn = 'arn:aws:iam::575696867055:role/service-role/lambdaRole';
  var region = 'us-east-1';
  var AWS = require('aws-sdk');

  function context(filePath) {
    var context = require('./context.json');
    context.done = function(error, result) {
      console.log(`context.done, eventFile used: ${filePath}\n reply:`);
      console.log(error);
      console.log(result);
      process.exit();
    }
    context.succeed = function(result) {
      console.log(`context.succeed, eventFile used: ${filePath}\n reply:`);
      console.log(result);
      process.exit();
    }
    context.fail = function(error) {
      console.log(`context.fail, eventFile used: ${filePath}\n reply:`);
      console.log(error);
      process.exit();
    }
    return context;
  }

  function testLambda(filePath){
    AWS.config.region = region;
    var sts = new AWS.STS();
    sts.assumeRole({
      RoleArn: roleArn,
      RoleSessionName: 'emulambda'
    }, function(err, data) {
      if (err) { // an error occurred
        console.log('Cannot assume role');
        console.log(err, err.stack);
      } else { // successful response
        AWS.config.update({
          accessKeyId: data.Credentials.AccessKeyId,
          secretAccessKey: data.Credentials.SecretAccessKey,
          sessionToken: data.Credentials.sessionToken
        });
        var Module = require('module');
        var originalRequire = Module.prototype.require;
        Module.prototype.require = function(){
          if (arguments[0] === 'aws-sdk'){
            return AWS;
          } else {
            return originalRequire.apply(this, arguments);
          }
        };        
        var lambda = require('../../index.js');
        var event = require(filePath);
        lambda.handler(event, context(filePath));
      }
    });
  };

  return testLambda(pathToEventFile)
}

module.exports = {
  testFile: testFile
}
