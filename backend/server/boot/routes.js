'use strict';

var AlexaApp = require('alexa-app');
var _ = require('lodash');
var alexa = require('../alexa');

var alexaApp = new AlexaApp.app('alexa');

module.exports = (app) => {
  alexaApp.express({
    expressApp: app,
    checkCert: false,
    debug: process.env.NODE_ENV === 'development'
  });

  alexaApp.launch((req, res) => {
    res.say('You launched the app');
  });

  _.each(alexa.intents, (intent) => {
    alexaApp.intent(intent.name, intent.options, intent.controller);
  });
};
