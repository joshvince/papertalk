# Football Rumours
An Alexa Skill that tells you your team's transfer rumours

## Setup
- Clone the repo
- `npm i` to install dependencies
- You can run mocha tests with `npm run test`
- You can run sample Utterances by modifying `/test/skillTest/test.js` to uncomment out the relevant skill file (look in that directory - each file represents a different utterance) and then running `npm run skillTest`. You'll need credentials for the AWS account to do this.
- There is a `./vscode` directory that contains a file to help set these tests up through VSCode itself :)


### Resources I have used to help  
Local debugging:   https://developer.amazon.com/blogs/post/Tx24Z2QZP5RRTG1/new-alexa-technical-tutorial-debugging-aws-lambda-code-locally  

lambda-local  
https://www.npmjs.com/package/lambda-local  

BigNerdRanch's series on testing    
https://www.bignerdranch.com/blog/developing-alexa-skills-locally-with-nodejs-implementing-an-intent-with-alexa-app-and-alexa-app-server/  

Amazon's series on building a skill  
https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/overviews/steps-to-build-a-custom-skill

