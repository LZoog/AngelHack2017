'use strict';

var alexaApp = require('alexa-app');
var _ = require('lodash');
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

  _.each(require('../alexa'), (intent) => {
    alexa.intent(intent.name, intent.options, intent.controller);
  });
};
