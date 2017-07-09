'use strict';

var alexaApp = require('alexa-app');
var _ = require('lodash');
var alexa = new alexaApp.app('alexa');
var services = require('../services');

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

  app.get('/test', (req, res) => {
    services.answer.create('fishoil', 'hunger', new Date(), 4).then((users) => {
      res.json(users);
    });
  });
};
