'use strict';

var _ = require('lodash');
var alexaApp = require('alexa-app');
var alexa = new alexaApp.app('alexa');
var app = require('../server');
var prescriptionService = require('../services/prescription');

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
