var Alexa = require('alexa-sdk');
var NameSearch = require('./nameSearch.js');

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  // To enable string internationalization (i18n) features, set a resources object.
  alexa.resources = languageStrings;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  'LaunchRequest': function () {
    this.attributes['speechOutput'] = this.t("WELCOME_MESSAGE", this.t("SKILL_NAME"));
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    this.attributes['repromptSpeech'] = this.t("WELCOME_MESSAGE");
    this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
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
    // TODO!! This should be scraping the web, rather than drawing from a static list of stories...
    var stories = NameSearch.findNameFromStories(clubName, fakeStories)
   
    if (stories.length > 0) {
      var speechOutput = this.t('FOUND_STORIES_MESSAGE', clubName)
      var stories = stories.join(" ")
      this.attributes['speechOutput'] = speechOutput += stories
      this.emit(':tell', this.attributes['speechOutput'])
    }
     // if there were no stories, tell the user...
    else {
      var speechOutput = this.t("CLUB_NOT_FOUND_MESSAGE", clubName)
      this.attributes['speechOutput'] = speechOutput
      this.emit(':tell', this.attributes['speechOutput'])
    }

  },
  'AMAZON.HelpIntent': function () {
    // The user asked for help - reply with the help message
    this.attributes['speechOutput'] = this.t("HELP_MESSAGE");
    this.attributes['repromptSpeech'] = this.t("HELP_MESSAGE");
    this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
  },
  'AMAZON.RepeatIntent': function () {
    // The user wanted the message repeated
    this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
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
    this.attributes['repromptSpeech'] = this.t("HELP_REPROMPT");
    this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
  }
}

var languageStrings = {
  "en": {
    "translation": {
      "SKILL_NAME": "Football Rumours",
      "WELCOME_MESSAGE": "Welcome to %s. You can ask for stories in today's papers about a particular football club.",
      "HELP_MESSAGE": "You can ask for stories in today's papers about a particular football club.",
      "FOUND_STORIES_MESSAGE": "I found the following stories for %s: ",
      "CLUB_NOT_FOUND_MESSAGE": "Looks like there are no stories about %s today.",
      "STOP_MESSAGE": "Goodbye!"
    } 
  }
}

/* 
  Fake stories...
  DELETE ALL THIS WHEN IT'S PROPERLY HOOKED UP!
*/

var fakeStories = [
  "Chelsea won the league on Friday.",
  "Arsenal Slipped up against West Brom.",
  "Sunderland were relegated.",
  "Burnley have failed in their bid to sign Brighton midfielder Dale Stephens."
 ]