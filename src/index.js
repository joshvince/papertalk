var Alexa = require('alexa-sdk');
var NameSearch = require('./nameSearch.js');
var Dispatcher = require('./dispatcher.js');

var url = "http://www.skysports.com/football/transfer-paper-talk"

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  // To enable string internationalization (i18n) features, set a resources object.
  alexa.resources = languageStrings;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  'LaunchIntent': function () {
    this.emit('LaunchRequest')
  },
  'LaunchRequest': function () {
    this.attributes['speechOutput'] = this.t("WELCOME_MESSAGE", this.t("SKILL_NAME"));
    this.emit(':tell', this.attributes['speechOutput'])    
  },
  'GetRumours': function() {
    // get the name supplied by the user in the intent request
    var clubNameSlot = this.event.request.intent.slots.ClubName;
    var clubName;
    // assign it to the variable, if it exists...
    if (clubNameSlot && clubNameSlot.value) {
      clubName = clubNameSlot.value.toLowerCase();
    }
    // use the function to match any stories.
    var stories = [];
    // Dispatcher will handle the logic of fetching from the DB or updating it for us...
    Dispatcher.dispatch("national").then(res => {
      // Find our club from the array of stories returned by the Dispatcher.
      stories = NameSearch.findNameFromStories(clubName, res)
      // if there are some matches, add this to the output and tell the user
      if (stories.length > 0) {
        var speechOutput = this.t('FOUND_STORIES_MESSAGE', clubName)
        this.attributes['speechOutput'] = speechOutput += stories
        this.emit(':tell', this.attributes['speechOutput'])
      }
      // if there were no stories that matches, tell the user...
      else {
        var speechOutput = this.t("CLUB_NOT_FOUND_MESSAGE", clubName)
        this.attributes['speechOutput'] = speechOutput
        this.emit(':tell', this.attributes['speechOutput'])
      }
    })
  },
  'AMAZON.HelpIntent': function () {
    // The user asked for help - reply with the help message
    this.attributes['speechOutput'] = this.t("HELP_MESSAGE");
    this.emit(':tell', this.attributes['speechOutput'])
  },
  'AMAZON.StopIntent': function () {
    // The user wants to stop the current cycle
    this.emit('SessionEndedRequest');
  },
  'AMAZON.CancelIntent': function () {
      // The user wants to stop the current cycle
    this.emit('SessionEndedRequest');
  },
  'SessionEndedRequest':function () {
    // Emit the stop message whenever the user wants to end the session.
    this.emit(':tell', this.t("STOP_MESSAGE"));
  },
  'Unhandled': function () {
    this.attributes['speechOutput'] = this.t("HELP_MESSAGE");
    this.emit(':tell', this.attributes['speechOutput'])
  }
}

var languageStrings = {
  "en": {
    "translation": {
      "SKILL_NAME": "Football Rumours",
      "WELCOME_MESSAGE": "Welcome to %s. You can ask me for stories in today's papers about a particular football club.",
      "HELP_MESSAGE": "You can ask for stories in today's papers about any English League football club.",
      "FOUND_STORIES_MESSAGE": "I found the following stories for %s: ",
      "CLUB_NOT_FOUND_MESSAGE": "Looks like there are no stories about %s today.",
      "STOP_MESSAGE": "Goodbye!"
    } 
  }
}
