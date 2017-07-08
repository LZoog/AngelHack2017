'use strict';

var alexaApp = require('alexa-app');

var alexa = new alexaApp.app('alexa');

module.exports = (app) => {
  alexa.express({
    expressApp: app,
    checkCert: false,
    debug: process.env.NODE_ENV === 'development'
  });

  alexa.launch((req, res) => {
    res.say('You launched the app');
  });

  alexa.dictionary = {
    names: [
      'matt',
      'joe',
      'bob',
      'bill',
      'mary',
      'jane',
      'dawn'
    ]
  };

  alexa.intent('nameIntent', {
    slots: { NAME: 'LITERAL' },
    utterances: [
      'my {name is|name\'s} {names|NAME}',
      'set my name to {names|NAME}'
    ]
  }, (req, res) => {
    res.say('Success!')
  });
};
